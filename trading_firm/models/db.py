from __future__ import annotations

import json
import sqlite3
import uuid
from dataclasses import asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

from trading_firm.models.types import FillV1, OrderIntentV1, RiskEventV1, SignalV1
from trading_firm.utils import ensure_dir


def connect(db_path: str) -> sqlite3.Connection:
    ensure_dir(Path(db_path).parent)
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db(conn: sqlite3.Connection) -> None:
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS accounts (
            account_id TEXT PRIMARY KEY,
            market TEXT NOT NULL,
            currency TEXT NOT NULL,
            initial_equity REAL NOT NULL,
            cash REAL NOT NULL,
            equity REAL NOT NULL,
            gross_exposure REAL NOT NULL DEFAULT 0,
            net_exposure REAL NOT NULL DEFAULT 0,
            updated_ts TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS positions (
            position_id TEXT PRIMARY KEY,
            account_id TEXT NOT NULL,
            market TEXT NOT NULL,
            symbol TEXT NOT NULL,
            qty REAL NOT NULL,
            avg_price REAL NOT NULL,
            mark_price REAL NOT NULL DEFAULT 0,
            unrealized_pnl REAL NOT NULL DEFAULT 0,
            realized_pnl REAL NOT NULL DEFAULT 0,
            strategy TEXT,
            opened_ts TEXT NOT NULL,
            updated_ts TEXT NOT NULL,
            UNIQUE(account_id, symbol)
        );

        CREATE TABLE IF NOT EXISTS orders (
            order_id TEXT PRIMARY KEY,
            intent_id TEXT NOT NULL,
            signal_id TEXT NOT NULL,
            market TEXT NOT NULL,
            symbol TEXT NOT NULL,
            side TEXT NOT NULL,
            qty REAL NOT NULL,
            limit_price REAL,
            stop_price REAL,
            tif TEXT NOT NULL,
            strategy TEXT NOT NULL,
            bucket TEXT NOT NULL,
            status TEXT NOT NULL,
            ts TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS fills (
            fill_id TEXT PRIMARY KEY,
            order_id TEXT NOT NULL,
            intent_id TEXT NOT NULL,
            signal_id TEXT NOT NULL,
            market TEXT NOT NULL,
            symbol TEXT NOT NULL,
            side TEXT NOT NULL,
            qty REAL NOT NULL,
            price REAL NOT NULL,
            fee REAL NOT NULL,
            slippage_bps REAL NOT NULL,
            realized_pnl REAL NOT NULL DEFAULT 0,
            ts TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS signals (
            signal_id TEXT PRIMARY KEY,
            strategy TEXT NOT NULL,
            market TEXT NOT NULL,
            symbol TEXT NOT NULL,
            side TEXT NOT NULL,
            strength REAL NOT NULL,
            horizon TEXT NOT NULL,
            bucket TEXT NOT NULL,
            ts TEXT NOT NULL,
            meta_json TEXT
        );

        CREATE TABLE IF NOT EXISTS risk_events (
            event_id TEXT PRIMARY KEY,
            level TEXT NOT NULL,
            rule_id TEXT NOT NULL,
            market TEXT NOT NULL,
            symbol TEXT,
            message TEXT NOT NULL,
            ts TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS strategy_snapshots (
            id TEXT PRIMARY KEY,
            strategy TEXT NOT NULL,
            market TEXT NOT NULL,
            bucket TEXT NOT NULL,
            pnl_day REAL NOT NULL,
            pnl_month REAL NOT NULL,
            win_rate REAL NOT NULL,
            updated_ts TEXT NOT NULL,
            metrics_json TEXT
        );

        CREATE TABLE IF NOT EXISTS market_bars (
            id TEXT PRIMARY KEY,
            market TEXT NOT NULL,
            symbol TEXT NOT NULL,
            ts TEXT NOT NULL,
            open REAL NOT NULL,
            high REAL NOT NULL,
            low REAL NOT NULL,
            close REAL NOT NULL,
            volume REAL NOT NULL,
            atr14 REAL NOT NULL
        );

        CREATE TABLE IF NOT EXISTS news_events (
            id TEXT PRIMARY KEY,
            market TEXT NOT NULL,
            title TEXT NOT NULL,
            source TEXT NOT NULL,
            url TEXT,
            published_ts TEXT NOT NULL,
            summary TEXT,
            impact_score REAL NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS daily_reports (
            date TEXT PRIMARY KEY,
            report_md TEXT NOT NULL,
            kpi_json TEXT NOT NULL,
            sent_ts TEXT,
            chart_count INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS system_state (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL,
            updated_ts TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS command_audit (
            id TEXT PRIMARY KEY,
            actor TEXT NOT NULL,
            command TEXT NOT NULL,
            allowed INTEGER NOT NULL,
            reason TEXT,
            ts TEXT NOT NULL
        );
        """
    )
    conn.commit()


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def ensure_accounts(conn: sqlite3.Connection, cfg: dict[str, Any]) -> None:
    rows = conn.execute("SELECT account_id FROM accounts").fetchall()
    existing = {r[0] for r in rows}
    for market in ("us", "kr"):
        account = cfg["accounts"][market]
        account_id = account["account_id"]
        if account_id in existing:
            continue
        initial = float(account["initial_equity"])
        conn.execute(
            """
            INSERT INTO accounts(account_id, market, currency, initial_equity, cash, equity, gross_exposure, net_exposure, updated_ts)
            VALUES(?, ?, ?, ?, ?, ?, 0, 0, ?)
            """,
            (account_id, market, account["currency"], initial, initial, initial, now_iso()),
        )
    conn.commit()


def upsert_system_state(conn: sqlite3.Connection, key: str, value: Any) -> None:
    serialized = json.dumps(value, ensure_ascii=False)
    conn.execute(
        """
        INSERT INTO system_state(key, value, updated_ts)
        VALUES(?, ?, ?)
        ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_ts=excluded.updated_ts
        """,
        (key, serialized, now_iso()),
    )
    conn.commit()


def get_system_state(conn: sqlite3.Connection, key: str, default: Any = None) -> Any:
    row = conn.execute("SELECT value FROM system_state WHERE key=?", (key,)).fetchone()
    if row is None:
        return default
    return json.loads(row[0])


def insert_signals(conn: sqlite3.Connection, signals: Iterable[SignalV1]) -> None:
    def _json_default(value: Any) -> Any:
        if isinstance(value, datetime):
            return value.isoformat()
        raise TypeError(f"Unsupported type: {type(value)!r}")

    payload = [
        (
            s.signal_id,
            s.strategy,
            s.market,
            s.symbol,
            s.side,
            s.strength,
            s.horizon,
            s.bucket,
            s.ts.isoformat(),
            json.dumps(asdict(s), ensure_ascii=False, default=_json_default),
        )
        for s in signals
    ]
    conn.executemany(
        """
        INSERT OR REPLACE INTO signals(signal_id, strategy, market, symbol, side, strength, horizon, bucket, ts, meta_json)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        payload,
    )
    conn.commit()


def insert_orders(conn: sqlite3.Connection, market: str, intents: Iterable[OrderIntentV1], ts: str) -> dict[str, str]:
    mapping: dict[str, str] = {}
    for intent in intents:
        order_id = str(uuid.uuid4())
        mapping[intent.intent_id] = order_id
        conn.execute(
            """
            INSERT INTO orders(order_id, intent_id, signal_id, market, symbol, side, qty, limit_price, stop_price, tif, strategy, bucket, status, ts)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'filled', ?)
            """,
            (
                order_id,
                intent.intent_id,
                intent.signal_id,
                market,
                intent.symbol,
                intent.side,
                intent.qty,
                intent.limit_price,
                intent.stop_price,
                intent.tif,
                intent.strategy,
                intent.bucket,
                ts,
            ),
        )
    conn.commit()
    return mapping


def fetch_account(conn: sqlite3.Connection, market: str) -> sqlite3.Row:
    row = conn.execute("SELECT * FROM accounts WHERE market=?", (market,)).fetchone()
    if row is None:
        raise RuntimeError(f"Missing account for market={market}")
    return row


def fetch_positions(conn: sqlite3.Connection, account_id: str) -> list[sqlite3.Row]:
    return conn.execute(
        "SELECT * FROM positions WHERE account_id=?",
        (account_id,),
    ).fetchall()


def upsert_market_bar(
    conn: sqlite3.Connection,
    market: str,
    symbol: str,
    ts: str,
    o: float,
    h: float,
    l: float,
    c: float,
    v: float,
    atr14: float,
) -> None:
    key = f"{market}:{symbol}:{ts}"
    conn.execute(
        """
        INSERT OR REPLACE INTO market_bars(id, market, symbol, ts, open, high, low, close, volume, atr14)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (key, market, symbol, ts, o, h, l, c, v, atr14),
    )


def insert_news_events(conn: sqlite3.Connection, rows: list[dict[str, Any]]) -> int:
    count = 0
    for row in rows:
        row_id = row.get("id") or str(uuid.uuid4())
        conn.execute(
            """
            INSERT OR IGNORE INTO news_events(id, market, title, source, url, published_ts, summary, impact_score)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                row_id,
                row["market"],
                row["title"],
                row["source"],
                row.get("url"),
                row["published_ts"],
                row.get("summary", ""),
                float(row.get("impact_score", 0.0)),
            ),
        )
        count += 1
    conn.commit()
    return count


def insert_fills(conn: sqlite3.Connection, fills: Iterable[FillV1]) -> None:
    conn.executemany(
        """
        INSERT INTO fills(fill_id, order_id, intent_id, signal_id, market, symbol, side, qty, price, fee, slippage_bps, realized_pnl, ts)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        [
            (
                f.fill_id,
                f.order_id,
                f.intent_id,
                f.signal_id,
                f.market,
                f.symbol,
                f.side,
                f.qty,
                f.price,
                f.fee,
                f.slippage_bps,
                f.realized_pnl,
                f.ts.isoformat(),
            )
            for f in fills
        ],
    )
    conn.commit()


def record_risk_events(conn: sqlite3.Connection, events: Iterable[RiskEventV1]) -> None:
    conn.executemany(
        """
        INSERT INTO risk_events(event_id, level, rule_id, market, symbol, message, ts)
        VALUES(?, ?, ?, ?, ?, ?, ?)
        """,
        [
            (e.event_id, e.level, e.rule_id, e.market, e.symbol, e.message, e.ts.isoformat())
            for e in events
        ],
    )
    conn.commit()


def set_daily_report(conn: sqlite3.Connection, date: str, report_md: str, kpi: dict[str, Any], chart_count: int) -> None:
    conn.execute(
        """
        INSERT INTO daily_reports(date, report_md, kpi_json, sent_ts, chart_count)
        VALUES(?, ?, ?, ?, ?)
        ON CONFLICT(date) DO UPDATE SET report_md=excluded.report_md, kpi_json=excluded.kpi_json, sent_ts=excluded.sent_ts, chart_count=excluded.chart_count
        """,
        (date, report_md, json.dumps(kpi, ensure_ascii=False), now_iso(), chart_count),
    )
    conn.commit()


def append_command_audit(conn: sqlite3.Connection, actor: str, command: str, allowed: bool, reason: str | None) -> None:
    conn.execute(
        """
        INSERT INTO command_audit(id, actor, command, allowed, reason, ts)
        VALUES(?, ?, ?, ?, ?, ?)
        """,
        (str(uuid.uuid4()), actor, command, 1 if allowed else 0, reason, now_iso()),
    )
    conn.commit()


def get_recent_risk_events(conn: sqlite3.Connection, limit: int = 10) -> list[dict[str, Any]]:
    rows = conn.execute(
        "SELECT event_id, level, rule_id, market, symbol, message, ts FROM risk_events ORDER BY ts DESC LIMIT ?",
        (limit,),
    ).fetchall()
    return [dict(r) for r in rows]


def get_top_positions(conn: sqlite3.Connection, account_id: str, limit: int = 6) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT symbol, qty, avg_price, mark_price, unrealized_pnl,
               ABS(qty * mark_price) AS notional
        FROM positions
        WHERE account_id=?
        ORDER BY notional DESC
        LIMIT ?
        """,
        (account_id, limit),
    ).fetchall()
    return [dict(r) for r in rows]


def get_top_pnl_positions(conn: sqlite3.Connection, account_id: str, winners: bool, limit: int = 2) -> list[dict[str, Any]]:
    direction = "DESC" if winners else "ASC"
    rows = conn.execute(
        f"""
        SELECT symbol, qty, avg_price, mark_price, unrealized_pnl
        FROM positions
        WHERE account_id=?
        ORDER BY unrealized_pnl {direction}
        LIMIT ?
        """,
        (account_id, limit),
    ).fetchall()
    return [dict(r) for r in rows]


def update_account_cash(conn: sqlite3.Connection, account_id: str, cash_delta: float) -> None:
    conn.execute(
        """
        UPDATE accounts
        SET cash = cash + ?, updated_ts = CURRENT_TIMESTAMP
        WHERE account_id=?
        """,
        (cash_delta, account_id),
    )


def upsert_position_row(
    conn: sqlite3.Connection,
    *,
    account_id: str,
    market: str,
    symbol: str,
    qty: float,
    avg_price: float,
    mark_price: float,
    unrealized_pnl: float,
    realized_pnl_delta: float,
    strategy: str,
    ts_iso: str,
) -> None:
    row = conn.execute(
        """
        SELECT position_id, realized_pnl
        FROM positions
        WHERE account_id=? AND symbol=?
        """,
        (account_id, symbol),
    ).fetchone()
    if row is None:
        position_id = str(uuid.uuid4())
        conn.execute(
            """
            INSERT INTO positions(
                position_id, account_id, market, symbol, qty, avg_price,
                mark_price, unrealized_pnl, realized_pnl, strategy, opened_ts, updated_ts
            )
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                position_id,
                account_id,
                market,
                symbol,
                qty,
                avg_price,
                mark_price,
                unrealized_pnl,
                realized_pnl_delta,
                strategy,
                ts_iso,
                ts_iso,
            ),
        )
        return
    next_realized = float(row["realized_pnl"] or 0.0) + realized_pnl_delta
    conn.execute(
        """
        UPDATE positions
        SET qty=?, avg_price=?, mark_price=?, unrealized_pnl=?, realized_pnl=?, strategy=?, updated_ts=?
        WHERE position_id=?
        """,
        (
            qty,
            avg_price,
            mark_price,
            unrealized_pnl,
            next_realized,
            strategy,
            ts_iso,
            row["position_id"],
        ),
    )


def delete_flat_positions(conn: sqlite3.Connection, account_id: str) -> None:
    conn.execute("DELETE FROM positions WHERE account_id=? AND ABS(qty) < 1e-12", (account_id,))
