from __future__ import annotations

import uuid
from collections import defaultdict
from datetime import datetime
from typing import Any

from trading_firm.models.types import RiskEventV1


def mark_to_market(
    *,
    conn,
    market: str,
    price_by_symbol: dict[str, float],
    cfg: dict[str, Any],
) -> dict[str, float]:
    account = conn.execute("SELECT * FROM accounts WHERE market=?", (market,)).fetchone()
    if account is None:
        raise RuntimeError(f"Missing account for market={market}")
    account_id = account["account_id"]

    rows = conn.execute("SELECT * FROM positions WHERE account_id=?", (account_id,)).fetchall()
    gross = 0.0
    net = 0.0
    unrealized_total = 0.0
    for row in rows:
        symbol = row["symbol"]
        price = float(price_by_symbol.get(symbol, row["mark_price"] or row["avg_price"] or 0.0))
        qty = float(row["qty"])
        avg = float(row["avg_price"])
        unreal = (price - avg) * qty
        notional = abs(qty * price)
        gross += notional
        net += qty * price
        unrealized_total += unreal
        conn.execute(
            "UPDATE positions SET mark_price=?, unrealized_pnl=?, updated_ts=CURRENT_TIMESTAMP WHERE position_id=?",
            (price, unreal, row["position_id"]),
        )

    cash = float(account["cash"])
    equity = cash + net
    conn.execute(
        "UPDATE accounts SET equity=?, gross_exposure=?, net_exposure=?, updated_ts=CURRENT_TIMESTAMP WHERE account_id=?",
        (equity, gross, net, account_id),
    )
    conn.commit()
    return {
        "equity": equity,
        "gross": gross,
        "net": net,
        "unrealized": unrealized_total,
        "account_id": account_id,
    }


def _ensure_baselines(conn, market: str, equity: float, asof_date: str) -> tuple[float, float]:
    day_key = f"baseline:{market}:day:{asof_date}"
    month_key = f"baseline:{market}:month:{asof_date[:7]}"
    row_day = conn.execute("SELECT value FROM system_state WHERE key=?", (day_key,)).fetchone()
    row_month = conn.execute("SELECT value FROM system_state WHERE key=?", (month_key,)).fetchone()
    if row_day is None:
        conn.execute(
            "INSERT INTO system_state(key, value, updated_ts) VALUES(?, ?, CURRENT_TIMESTAMP)",
            (day_key, str(equity)),
        )
        day_base = equity
    else:
        day_base = float(row_day[0])
    if row_month is None:
        conn.execute(
            "INSERT INTO system_state(key, value, updated_ts) VALUES(?, ?, CURRENT_TIMESTAMP)",
            (month_key, str(equity)),
        )
        month_base = equity
    else:
        month_base = float(row_month[0])
    conn.commit()
    return day_base, month_base


def evaluate_risk(
    *,
    conn,
    market: str,
    asof: datetime,
    cfg: dict[str, Any],
    m2m: dict[str, float],
) -> list[RiskEventV1]:
    risk_cfg = cfg["risk"]
    events: list[RiskEventV1] = []
    account = conn.execute("SELECT * FROM accounts WHERE market=?", (market,)).fetchone()
    if account is None:
        return events

    equity = float(m2m["equity"])
    asof_date = asof.astimezone().strftime("%Y-%m-%d")
    day_base, month_base = _ensure_baselines(conn, market, equity, asof_date)
    day_ret = (equity / day_base - 1.0) if day_base else 0.0
    month_ret = (equity / month_base - 1.0) if month_base else 0.0

    # Portfolio limits
    if day_ret <= float(risk_cfg["portfolio_daily_loss_limit"]):
        events.append(
            RiskEventV1(
                event_id=str(uuid.uuid4()),
                level="critical",
                rule_id="portfolio_daily_loss_limit",
                market=market,  # type: ignore[arg-type]
                symbol=None,
                message=f"Daily loss limit breached: {day_ret:.2%}",
                ts=asof,
            )
        )
    if month_ret <= float(risk_cfg["portfolio_monthly_loss_limit"]):
        events.append(
            RiskEventV1(
                event_id=str(uuid.uuid4()),
                level="critical",
                rule_id="portfolio_monthly_loss_limit",
                market=market,  # type: ignore[arg-type]
                symbol=None,
                message=f"Monthly loss limit breached: {month_ret:.2%}",
                ts=asof,
            )
        )

    # Leverage cap
    if equity > 0:
        gross_lev = float(m2m["gross"]) / equity
        if gross_lev > float(cfg["execution"]["leverage_cap_gross"]):
            events.append(
                RiskEventV1(
                    event_id=str(uuid.uuid4()),
                    level="error",
                    rule_id="gross_leverage_cap",
                    market=market,  # type: ignore[arg-type]
                    symbol=None,
                    message=f"Gross leverage breached: {gross_lev:.2f}x",
                    ts=asof,
                )
            )

    # Bucket-level realized PnL checks.
    strategy_bucket = cfg["strategy"]["bucket_by_strategy"]
    rows = conn.execute(
        """
        SELECT o.bucket AS bucket, SUM(f.realized_pnl - f.fee) AS pnl
        FROM fills f
        JOIN orders o ON o.order_id = f.order_id
        WHERE f.market=? AND date(f.ts)=date(?)
        GROUP BY o.bucket
        """,
        (market, asof.isoformat()),
    ).fetchall()
    pnl_by_bucket = defaultdict(float)
    for r in rows:
        pnl_by_bucket[r["bucket"]] = float(r["pnl"] or 0.0)

    account_initial = float(account["initial_equity"])
    for bucket, pnl in pnl_by_bucket.items():
        ret = pnl / account_initial if account_initial else 0.0
        limit = float(risk_cfg["bucket_daily_loss_limit"].get(bucket, -999))
        if ret <= limit:
            events.append(
                RiskEventV1(
                    event_id=str(uuid.uuid4()),
                    level="error",
                    rule_id=f"bucket_daily_loss_limit:{bucket}",
                    market=market,  # type: ignore[arg-type]
                    symbol=None,
                    message=f"Bucket {bucket} daily limit breached: {ret:.2%}",
                    ts=asof,
                )
            )

    if events:
        conn.execute(
            """
            INSERT INTO system_state(key, value, updated_ts)
            VALUES('trading.paused', 'true', CURRENT_TIMESTAMP)
            ON CONFLICT(key) DO UPDATE SET value='true', updated_ts=CURRENT_TIMESTAMP
            """
        )
        conn.commit()
    return events
