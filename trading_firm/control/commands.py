from __future__ import annotations

from typing import Any

from trading_firm.models.db import append_command_audit


def parse_firm_command(text: str) -> str | None:
    t = text.strip().lower()
    if t == "/firm pause":
        return "pause"
    if t == "/firm resume":
        return "resume"
    if t == "/firm status":
        return "status"
    return None


def is_actor_allowed(cfg: dict[str, Any], actor: str) -> bool:
    allow = set(cfg.get("control", {}).get("allowed_actors", []))
    return actor in allow


def apply_control_action(conn, cfg: dict[str, Any], action: str, actor: str, reason: str | None = None) -> dict[str, Any]:
    allowed = is_actor_allowed(cfg, actor)
    if action not in {"pause", "resume", "status"}:
        append_command_audit(conn, actor=actor, command=action, allowed=False, reason="invalid-action")
        raise ValueError(f"Unsupported action: {action}")

    if action != "status" and not allowed:
        append_command_audit(conn, actor=actor, command=action, allowed=False, reason="unauthorized")
        return {"ok": False, "action": action, "reason": "unauthorized"}

    if action == "pause":
        conn.execute(
            """
            INSERT INTO system_state(key, value, updated_ts)
            VALUES('trading.paused', 'true', CURRENT_TIMESTAMP)
            ON CONFLICT(key) DO UPDATE SET value='true', updated_ts=CURRENT_TIMESTAMP
            """
        )
        conn.commit()
    elif action == "resume":
        conn.execute(
            """
            INSERT INTO system_state(key, value, updated_ts)
            VALUES('trading.paused', 'false', CURRENT_TIMESTAMP)
            ON CONFLICT(key) DO UPDATE SET value='false', updated_ts=CURRENT_TIMESTAMP
            """
        )
        conn.commit()

    row = conn.execute("SELECT value FROM system_state WHERE key='trading.paused'").fetchone()
    paused = (row[0] == "true") if row else False

    append_command_audit(conn, actor=actor, command=action, allowed=True, reason=reason)
    return {"ok": True, "action": action, "paused": paused}
