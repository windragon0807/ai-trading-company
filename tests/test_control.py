from trading_firm.control.commands import apply_control_action
from trading_firm.models.db import connect, ensure_accounts, init_db


def test_control_authorization(tmp_path) -> None:
    db = tmp_path / "t.db"
    conn = connect(str(db))
    init_db(conn)
    cfg = {
        "accounts": {
            "us": {"account_id": "us-paper", "currency": "USD", "initial_equity": 100000.0},
            "kr": {"account_id": "kr-paper", "currency": "KRW", "initial_equity": 100000000.0},
        },
        "control": {"allowed_actors": ["telegram:1", "local-cli"]},
    }
    ensure_accounts(conn, cfg)

    denied = apply_control_action(conn, cfg, "pause", actor="telegram:999")
    assert denied["ok"] is False

    allowed = apply_control_action(conn, cfg, "pause", actor="telegram:1")
    assert allowed["ok"] is True
    assert allowed["paused"] is True
