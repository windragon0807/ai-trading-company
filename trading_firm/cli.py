from __future__ import annotations

import argparse
import json
import os
from dataclasses import replace
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from trading_firm.config import load_config
from trading_firm.control.commands import apply_control_action
from trading_firm.data.market_data import atr14, fetch_candles, is_market_open, pick_top_liquidity
from trading_firm.data.news import collect_news_events
from trading_firm.execution.paper import PaperExecutionAdapter, apply_fill_to_position
from trading_firm.models.db import (
    append_command_audit,
    connect,
    delete_flat_positions,
    ensure_accounts,
    fetch_account,
    fetch_positions,
    get_recent_risk_events,
    get_system_state,
    get_top_pnl_positions,
    get_top_positions,
    init_db,
    insert_fills,
    insert_news_events,
    insert_orders,
    insert_signals,
    record_risk_events,
    set_daily_report,
    update_account_cash,
    upsert_market_bar,
    upsert_position_row,
    upsert_system_state,
)
from trading_firm.reporting.charts import build_chart_artifacts, save_chart_manifest
from trading_firm.reporting.morning import build_morning_report, deliver_report_via_openclaw, persist_morning_report
from trading_firm.risk.engine import evaluate_risk, mark_to_market
from trading_firm.strategies.engine import aggregate_news_bias, generate_signals, signals_to_intents
from trading_firm.utils import ensure_dir, parse_date, parse_iso8601


def _json_print(payload: dict[str, Any]) -> None:
    print(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True))


def _init(cfg_path: str | None) -> tuple[dict[str, Any], Any]:
    cfg_obj = load_config(cfg_path)
    cfg = cfg_obj.raw
    conn = connect(cfg_obj.db_path)
    init_db(conn)
    ensure_accounts(conn, cfg)
    if get_system_state(conn, "trading.paused") is None:
        upsert_system_state(conn, "trading.paused", False)
    return cfg, conn


def cmd_universe_refresh(args: argparse.Namespace) -> None:
    cfg, conn = _init(args.config)
    asof = parse_iso8601(args.asof)
    us_candidates = list(cfg["universe"]["us_candidates"])
    kr_candidates = list(cfg["universe"]["kr_candidates"])

    us = pick_top_liquidity(us_candidates, asof=asof, top_n=30)
    kr = pick_top_liquidity(kr_candidates, asof=asof, top_n=30)
    upsert_system_state(conn, "universe:us", us)
    upsert_system_state(conn, "universe:kr", kr)

    # Also collect overnight events for research workflow.
    events = collect_news_events(cfg.get("news", {}).get("rss_feeds", []), asof=asof)
    inserted = insert_news_events(conn, events)

    _json_print(
        {
            "ok": True,
            "asof": asof.isoformat(),
            "universe": {"us": us, "kr": kr},
            "news_events_collected": inserted,
        }
    )


def _latest_close_map(conn, market: str) -> dict[str, float]:
    rows = conn.execute(
        """
        SELECT b.symbol, b.close
        FROM market_bars b
        JOIN (
            SELECT symbol, MAX(ts) AS max_ts
            FROM market_bars
            WHERE market=?
            GROUP BY symbol
        ) latest ON latest.symbol=b.symbol AND latest.max_ts=b.ts
        WHERE b.market=?
        """,
        (market, market),
    ).fetchall()
    return {r["symbol"]: float(r["close"]) for r in rows}


def _is_paused(conn) -> bool:
    paused = get_system_state(conn, "trading.paused", False)
    return bool(paused)


def _load_universe(conn, market: str) -> list[str]:
    key = f"universe:{market}"
    val = get_system_state(conn, key, None)
    if isinstance(val, list) and val:
        return [str(x) for x in val]
    return []


def _apply_fills_to_ledger(
    *,
    conn,
    market: str,
    intents,
    fills,
    order_by_intent,
    asof: datetime,
    price_by_symbol: dict[str, float],
) -> list[dict[str, Any]]:
    account = fetch_account(conn, market)
    account_id = account["account_id"]
    out: list[dict[str, Any]] = []
    intent_map = {i.intent_id: i for i in intents}

    for fill in fills:
        order_id = order_by_intent[fill.intent_id]
        fill = replace(fill, order_id=order_id)
        side = fill.side
        qty = float(fill.qty)
        px = float(fill.price)
        fee = float(fill.fee)

        pos = conn.execute(
            "SELECT * FROM positions WHERE account_id=? AND symbol=?",
            (account_id, fill.symbol),
        ).fetchone()
        prev_qty = float(pos["qty"]) if pos else 0.0
        prev_avg = float(pos["avg_price"]) if pos else 0.0

        new_qty, new_avg, realized_delta = apply_fill_to_position(
            prev_qty=prev_qty,
            prev_avg_price=prev_avg,
            side=side,
            fill_qty=qty,
            fill_price=px,
        )

        if side == "BUY":
            cash_delta = -(qty * px) - fee
        else:
            cash_delta = (qty * px) - fee

        update_account_cash(conn, account_id, cash_delta)
        mark_px = float(price_by_symbol.get(fill.symbol, px))
        unrealized = (mark_px - new_avg) * new_qty if abs(new_qty) > 1e-12 else 0.0

        upsert_position_row(
            conn,
            account_id=account_id,
            market=market,
            symbol=fill.symbol,
            qty=new_qty,
            avg_price=new_avg,
            mark_price=mark_px,
            unrealized_pnl=unrealized,
            realized_pnl_delta=realized_delta,
            strategy=intent_map[fill.intent_id].strategy,
            ts_iso=asof.isoformat(),
        )

        out.append(
            {
                "fill": replace(fill, realized_pnl=realized_delta),
                "realized_delta": realized_delta,
            }
        )

    delete_flat_positions(conn, account_id)
    conn.commit()
    return out


def _update_strategy_snapshots(conn, market: str, asof: datetime) -> None:
    rows = conn.execute(
        """
        SELECT o.strategy, o.bucket,
               SUM(f.realized_pnl - f.fee) AS pnl,
               SUM(CASE WHEN f.realized_pnl - f.fee > 0 THEN 1 ELSE 0 END) AS wins,
               COUNT(*) AS n
        FROM fills f
        JOIN orders o ON o.order_id=f.order_id
        WHERE f.market=? AND date(f.ts)=date(?)
        GROUP BY o.strategy, o.bucket
        """,
        (market, asof.isoformat()),
    ).fetchall()
    for row in rows:
        wins = int(row["wins"] or 0)
        n = int(row["n"] or 0)
        win_rate = (wins / n) if n else 0.0
        conn.execute(
            """
            INSERT OR REPLACE INTO strategy_snapshots(id, strategy, market, bucket, pnl_day, pnl_month, win_rate, updated_ts, metrics_json)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                f"{market}:{row['strategy']}",
                row["strategy"],
                market,
                row["bucket"],
                float(row["pnl"] or 0.0),
                float(row["pnl"] or 0.0),
                float(win_rate),
                asof.isoformat(),
                json.dumps({"wins": wins, "count": n}),
            ),
        )
    conn.commit()


def cmd_run_cycle(args: argparse.Namespace) -> None:
    cfg, conn = _init(args.config)
    market = args.market
    asof = parse_iso8601(args.asof)

    if not is_market_open(market, asof):
        _json_print({"ok": True, "status": "skipped", "reason": "market-closed", "market": market})
        return

    paused = _is_paused(conn)
    universe = _load_universe(conn, market)
    if not universe:
        # bootstrap if no universe exists
        if market == "us":
            universe = list(cfg["universe"]["us_candidates"][:30])
        else:
            universe = list(cfg["universe"]["kr_candidates"][:30])
        upsert_system_state(conn, f"universe:{market}", universe)

    bars_by_symbol = {}
    prices = {}
    for symbol in universe:
        candles = fetch_candles(symbol=symbol, asof=asof, bars=int(cfg["market_data"]["bars_per_symbol"]))
        if not candles:
            continue
        bars_by_symbol[symbol] = candles
        prices[symbol] = candles[-1].close
        a14 = atr14(candles)
        c = candles[-1]
        upsert_market_bar(conn, market, symbol, c.ts.isoformat(), c.open, c.high, c.low, c.close, c.volume, a14)
    conn.commit()

    # lightweight event bias from collected overnight news
    news_rows = [dict(r) for r in conn.execute("SELECT * FROM news_events WHERE market=? ORDER BY published_ts DESC LIMIT 200", (market,))]
    news_bias = aggregate_news_bias(news_rows, list(bars_by_symbol.keys()))

    signals = generate_signals(market=market, bars_by_symbol=bars_by_symbol, asof=asof, cfg=cfg, news_bias_by_symbol=news_bias)
    insert_signals(conn, signals)

    account = fetch_account(conn, market)
    intents = [] if paused else signals_to_intents(signals, bars_by_symbol, float(account["equity"]), cfg)
    order_map = insert_orders(conn, market=market, intents=intents, ts=asof.isoformat()) if intents else {}

    adapter = PaperExecutionAdapter()
    raw_fills = adapter.execute_intents(market=market, intents=intents, price_by_symbol=prices, asof=asof, cfg=cfg)

    applied = _apply_fills_to_ledger(
        conn=conn,
        market=market,
        intents=intents,
        fills=raw_fills,
        order_by_intent=order_map,
        asof=asof,
        price_by_symbol=prices,
    )
    final_fills = [entry["fill"] for entry in applied]
    if final_fills:
        insert_fills(conn, final_fills)

    m2m = mark_to_market(conn=conn, market=market, price_by_symbol=prices, cfg=cfg)
    events = evaluate_risk(conn=conn, market=market, asof=asof, cfg=cfg, m2m=m2m)
    if events:
        record_risk_events(conn, events)
    _update_strategy_snapshots(conn, market, asof)

    _json_print(
        {
            "ok": True,
            "market": market,
            "asof": asof.isoformat(),
            "paused_before": paused,
            "symbols": len(universe),
            "signals": len(signals),
            "intents": len(intents),
            "fills": len(final_fills),
            "risk_events": [e.__dict__ for e in events],
            "equity": m2m["equity"],
            "gross": m2m["gross"],
        }
    )


def cmd_risk_check(args: argparse.Namespace) -> None:
    cfg, conn = _init(args.config)
    asof = parse_iso8601(args.asof)
    all_events = []
    for market in ("us", "kr"):
        prices = _latest_close_map(conn, market)
        if not prices:
            continue
        m2m = mark_to_market(conn=conn, market=market, price_by_symbol=prices, cfg=cfg)
        events = evaluate_risk(conn=conn, market=market, asof=asof, cfg=cfg, m2m=m2m)
        if events:
            record_risk_events(conn, events)
        all_events.extend([e.__dict__ for e in events])
    _json_print({"ok": True, "asof": asof.isoformat(), "risk_events": all_events})


def _chart_symbol_selection(conn, market: str, cfg: dict[str, Any]) -> list[str]:
    account_id = cfg["accounts"][market]["account_id"]
    include_pos = int(cfg["reporting"]["include_position_top_n"])
    include_pnl = int(cfg["reporting"]["include_pnl_top_n"])
    symbols: list[str] = []
    for row in get_top_positions(conn, account_id, limit=include_pos):
        symbols.append(row["symbol"])
    for row in get_top_pnl_positions(conn, account_id, winners=True, limit=include_pnl // 2):
        symbols.append(row["symbol"])
    for row in get_top_pnl_positions(conn, account_id, winners=False, limit=include_pnl // 2):
        symbols.append(row["symbol"])
    if not symbols:
        symbols = _load_universe(conn, market)[: int(cfg["reporting"]["include_chart_count"] // 2)]
    return list(dict.fromkeys(symbols))


def cmd_capture_charts(args: argparse.Namespace) -> None:
    cfg, conn = _init(args.config)
    day = parse_date(args.date)
    asof = datetime(day.year, day.month, day.day, 7, 0, 0, tzinfo=timezone.utc)

    out_dir = cfg["reporting"]["chart_dir"]
    us_symbols = _chart_symbol_selection(conn, "us", cfg)
    kr_symbols = _chart_symbol_selection(conn, "kr", cfg)

    artifacts = []
    artifacts.extend(build_chart_artifacts(market="us", symbols=us_symbols, out_dir=out_dir, asof=asof))
    artifacts.extend(build_chart_artifacts(market="kr", symbols=kr_symbols, out_dir=out_dir, asof=asof))

    daily_dir = ensure_dir(cfg["reporting"]["daily_report_dir"])
    manifest = str(Path(daily_dir) / f"{args.date}-charts.json")
    save_chart_manifest(manifest, artifacts)

    _json_print(
        {
            "ok": True,
            "date": args.date,
            "manifest": manifest,
            "captured": sum(1 for a in artifacts if a.status == "captured"),
            "link_only": sum(1 for a in artifacts if a.status != "captured"),
        }
    )


def cmd_morning_report(args: argparse.Namespace) -> None:
    cfg, conn = _init(args.config)
    report_md, kpi = build_morning_report(conn, cfg, args.date)
    out_file = persist_morning_report(conn, cfg, args.date, report_md, kpi)

    deliver = bool(args.deliver)
    delivered = {"ok": False, "message": "delivery skipped"}
    if deliver:
        ok, message = deliver_report_via_openclaw(out_file)
        delivered = {"ok": ok, "message": message}

    _json_print({"ok": True, "date": args.date, "report_file": out_file, "deliver": delivered})


def cmd_control(args: argparse.Namespace) -> None:
    cfg, conn = _init(args.config)
    actor = args.actor or "local-cli"
    result = apply_control_action(conn, cfg, args.action, actor=actor, reason=args.reason)
    result["recent_risk_events"] = get_recent_risk_events(conn, limit=5)
    _json_print(result)


def cmd_dashboard(args: argparse.Namespace) -> None:
    from trading_firm.dashboard_server import create_app

    app = create_app(args.config)
    app.run(host=args.host, port=args.port, debug=False)


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="Trading firm pilot CLI")
    p.add_argument("--config", default=None, help="Path to config/firm.yaml")
    sub = p.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("universe-refresh")
    s.add_argument("--asof", required=False, default=None)
    s.set_defaults(func=cmd_universe_refresh)

    s = sub.add_parser("run-cycle")
    s.add_argument("--market", choices=["us", "kr"], required=True)
    s.add_argument("--asof", required=False, default=None)
    s.set_defaults(func=cmd_run_cycle)

    s = sub.add_parser("risk-check")
    s.add_argument("--asof", required=False, default=None)
    s.set_defaults(func=cmd_risk_check)

    s = sub.add_parser("morning-report")
    s.add_argument("--date", required=True)
    s.add_argument("--deliver", action="store_true", default=False)
    s.set_defaults(func=cmd_morning_report)

    s = sub.add_parser("capture-charts")
    s.add_argument("--date", required=True)
    s.set_defaults(func=cmd_capture_charts)

    s = sub.add_parser("control")
    s.add_argument("--action", choices=["pause", "resume", "status"], required=True)
    s.add_argument("--actor", default="local-cli")
    s.add_argument("--reason", default=None)
    s.set_defaults(func=cmd_control)

    s = sub.add_parser("dashboard")
    s.add_argument("--host", default="127.0.0.1")
    s.add_argument("--port", type=int, default=8765)
    s.set_defaults(func=cmd_dashboard)

    return p


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
