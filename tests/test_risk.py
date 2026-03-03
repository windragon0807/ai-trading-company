from datetime import datetime, timezone

from trading_firm.models.db import connect, ensure_accounts, init_db
from trading_firm.risk.engine import evaluate_risk


def test_risk_breach_pauses_system(tmp_path) -> None:
    db = tmp_path / "r.db"
    conn = connect(str(db))
    init_db(conn)

    cfg = {
        "accounts": {
            "us": {"account_id": "us-paper", "currency": "USD", "initial_equity": 100000.0},
            "kr": {"account_id": "kr-paper", "currency": "KRW", "initial_equity": 100000000.0},
        },
        "risk": {
            "portfolio_daily_loss_limit": -0.015,
            "portfolio_monthly_loss_limit": -0.07,
            "bucket_daily_loss_limit": {"conservative": -0.005, "balanced": -0.008, "aggressive": -0.012},
        },
        "execution": {"leverage_cap_gross": 1.2},
        "strategy": {"bucket_by_strategy": {"trend": "conservative", "meanrev": "balanced", "event": "aggressive"}},
    }
    ensure_accounts(conn, cfg)

    conn.execute("UPDATE accounts SET equity=98000, cash=98000, gross_exposure=50000 WHERE market='us'")
    conn.execute("INSERT INTO system_state(key, value, updated_ts) VALUES('baseline:us:day:2026-03-01', '100000', CURRENT_TIMESTAMP)")
    conn.execute("INSERT INTO system_state(key, value, updated_ts) VALUES('baseline:us:month:2026-03', '100000', CURRENT_TIMESTAMP)")
    conn.commit()

    events = evaluate_risk(
        conn=conn,
        market="us",
        asof=datetime(2026, 3, 1, 0, 0, tzinfo=timezone.utc),
        cfg=cfg,
        m2m={"equity": 98000.0, "gross": 50000.0, "net": 0.0},
    )
    assert any(e.rule_id == "portfolio_daily_loss_limit" for e in events)

    paused = conn.execute("SELECT value FROM system_state WHERE key='trading.paused'").fetchone()
    assert paused is not None
    assert paused[0] == "true"
