from __future__ import annotations


class AlpacaExecutionAdapter:
    """Phase-2 stub for Alpaca paper/live integration."""

    def healthcheck(self) -> dict[str, str]:
        return {"status": "not-configured", "message": "Phase-2 adapter stub"}
