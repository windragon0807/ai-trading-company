from __future__ import annotations

import json
import os
import subprocess
from pathlib import Path
from typing import Any

from trading_firm.models.db import set_daily_report
from trading_firm.utils import ensure_dir


def _fetch_one(conn, query: str, params: tuple = ()) -> Any:
    row = conn.execute(query, params).fetchone()
    return dict(row) if row is not None else None


def _fetch_all(conn, query: str, params: tuple = ()) -> list[dict[str, Any]]:
    return [dict(r) for r in conn.execute(query, params).fetchall()]


def _fmt_usd(value: float) -> str:
    return f"${value:,.2f}"


def _fmt_krw(value: float) -> str:
    return f"₩{value:,.0f}"


def _fmt_money_by_market(value: float, market: str) -> str:
    if market == "kr":
        return _fmt_krw(value)
    return _fmt_usd(value)


def _fmt_price_by_market(value: float, market: str) -> str:
    if market == "kr":
        return f"₩{value:,.0f}"
    return f"${value:,.4f}"


def build_morning_report(conn, cfg: dict[str, Any], report_date: str) -> tuple[str, dict[str, Any]]:
    start = f"{report_date}T00:00:00"
    end = f"{report_date}T23:59:59"

    account_us = _fetch_one(conn, "SELECT * FROM accounts WHERE market='us'")
    account_kr = _fetch_one(conn, "SELECT * FROM accounts WHERE market='kr'")

    pnl_rows = _fetch_all(
        conn,
        """
        SELECT market, SUM(realized_pnl - fee) AS realized
        FROM fills
        WHERE ts BETWEEN ? AND ?
        GROUP BY market
        """,
        (start, end),
    )
    pnl_by_market = {r["market"]: float(r["realized"] or 0.0) for r in pnl_rows}

    strategy_rows = _fetch_all(
        conn,
        """
        SELECT o.strategy, o.bucket,
               SUM(f.realized_pnl - f.fee) AS pnl,
               SUM(CASE WHEN f.realized_pnl - f.fee > 0 THEN 1 ELSE 0 END) AS win_cnt,
               COUNT(*) AS total_cnt
        FROM fills f
        JOIN orders o ON o.order_id=f.order_id
        WHERE date(f.ts)=date(?)
        GROUP BY o.strategy, o.bucket
        ORDER BY pnl DESC
        """,
        (report_date,),
    )

    events = _fetch_all(
        conn,
        """
        SELECT market, title, source, url, published_ts
        FROM news_events
        WHERE published_ts >= datetime(?, '-18 hours')
        ORDER BY published_ts DESC
        LIMIT 12
        """,
        (f"{report_date}T07:00:00",),
    )

    breaches = _fetch_all(
        conn,
        """
        SELECT level, rule_id, market, message, ts
        FROM risk_events
        WHERE date(ts)=date(?)
        ORDER BY ts DESC
        LIMIT 20
        """,
        (report_date,),
    )

    top_trades = _fetch_all(
        conn,
        """
        SELECT market, symbol, side, qty, price, realized_pnl, fee, ts
        FROM fills
        WHERE date(ts)=date(?)
        ORDER BY ABS(realized_pnl - fee) DESC
        LIMIT 10
        """,
        (report_date,),
    )

    chart_manifest = Path(cfg["reporting"]["daily_report_dir"]) / f"{report_date}-charts.json"
    charts = []
    if chart_manifest.exists():
        charts = json.loads(chart_manifest.read_text(encoding="utf-8"))

    kpi = {
        "date": report_date,
        "pnl_us": pnl_by_market.get("us", 0.0),
        "pnl_kr": pnl_by_market.get("kr", 0.0),
        "equity_us": (account_us or {}).get("equity", 0.0),
        "equity_kr": (account_kr or {}).get("equity", 0.0),
        "breach_count": len(breaches),
    }

    lines: list[str] = []
    lines.append(f"# [Ryong Investment] 일일 보고서 ({report_date} 07:00 KST)")
    lines.append("")
    lines.append("## 1. 경영요약 (10줄 이내)")
    lines.append(f"- 전일 실현손익: 미국 {_fmt_usd(kpi['pnl_us'])}, 한국 {_fmt_krw(kpi['pnl_kr'])}")
    lines.append(f"- 현재 자본: 미국 {_fmt_usd(kpi['equity_us'])}, 한국 {_fmt_krw(kpi['equity_kr'])}")
    lines.append(f"- 리스크 위반 건수: {kpi['breach_count']}건")
    lines.append(f"- 시스템 상태: {'PAUSED' if _is_paused(conn) else 'RUNNING'}")
    lines.append("- 핵심 판단: 리스크 준수율을 1순위로 유지합니다.")
    lines.append("")

    lines.append("## 2. 밤사이 이벤트")
    if not events:
        lines.append("- 주요 뉴스/공시 이벤트 없음")
    for ev in events[:8]:
        lines.append(f"- [{ev['market'].upper()}] {ev['title']} ({ev['source']})")
    lines.append("")

    lines.append("## 3. 전략별 성과")
    if not strategy_rows:
        lines.append("- 전일 체결 없음")
    for row in strategy_rows:
        win_rate = (row["win_cnt"] / row["total_cnt"] * 100.0) if row["total_cnt"] else 0.0
        lines.append(
            f"- {row['strategy']} ({row['bucket']}): PnL {float(row['pnl'] or 0.0):.2f}, 승률 {win_rate:.1f}%"
        )
    lines.append("")

    lines.append("## 4. 리스크 컴플라이언스")
    if not breaches:
        lines.append("- 위반 없음")
    for b in breaches[:10]:
        lines.append(f"- [{b['level']}] {b['rule_id']} ({b['market']}): {b['message']}")
    lines.append("")

    lines.append("## 5. 오늘 액션 플랜")
    lines.append("- 변동성 확대 구간에서는 신규 진입보다 기존 포지션 리스크 축소를 우선합니다.")
    lines.append("- 버킷별 한도(C/B/A)를 초과하지 않도록 포지션 크기를 보수적으로 조정합니다.")
    lines.append("- 중요 이벤트 알림 발생 시 즉시 `risk-ops` 정책(Pause/Resume)으로 대응합니다.")
    lines.append("")

    lines.append("## 6. 상세부록")
    lines.append("### 6.1 체결 로그 상위")
    if not top_trades:
        lines.append("- 체결 없음")
    for t in top_trades:
        market = str(t["market"])
        trade_pnl = float(t["realized_pnl"] - t["fee"])
        lines.append(
            f"- {t['ts']} {market.upper()} {t['symbol']} {t['side']} qty={t['qty']:.0f} px={_fmt_price_by_market(float(t['price']), market)} pnl={_fmt_money_by_market(trade_pnl, market)}"
        )
    lines.append("")

    lines.append("### 6.2 차트")
    if not charts:
        lines.append("- 차트 데이터 없음")
    else:
        for c in charts:
            if c.get("path"):
                lines.append(f"- {c['symbol']} ({c['market'].upper()}): ![]({c['path']})")
            lines.append(f"  - TradingView: {c['url']}")

    report_md = "\n".join(lines)
    return report_md, kpi


def _is_paused(conn) -> bool:
    row = conn.execute("SELECT value FROM system_state WHERE key='trading.paused'").fetchone()
    return bool(row and row[0] == "true")


def persist_morning_report(conn, cfg: dict[str, Any], report_date: str, report_md: str, kpi: dict[str, Any]) -> str:
    out_dir = ensure_dir(cfg["reporting"]["daily_report_dir"])
    out_file = out_dir / f"{report_date}.md"
    out_file.write_text(report_md, encoding="utf-8")
    set_daily_report(conn, report_date, report_md, kpi, chart_count=report_md.count("TradingView:"))
    return str(out_file)


def deliver_report_via_openclaw(report_path: str) -> tuple[bool, str]:
    target = os.getenv("TRADING_FIRM_TELEGRAM_TARGET", "").strip()
    if not target:
        return False, "TRADING_FIRM_TELEGRAM_TARGET not set"
    openclaw_bin = os.getenv("OPENCLAW_BIN", "openclaw")
    summary = Path(report_path).read_text(encoding="utf-8").splitlines()[:20]
    message = "\n".join(summary)
    try:
        cmd = [
            openclaw_bin,
            "message",
            "send",
            "--channel",
            "telegram",
            "--target",
            target,
            "--message",
            message,
        ]
        result = subprocess.run(cmd, check=True, capture_output=True, text=True, env=os.environ.copy())
        return True, (result.stdout or "sent").strip()
    except Exception as exc:
        return False, str(exc)
