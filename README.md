# Ryong Investment Pilot (OpenClaw + Python)

A rules-based paper-trading engine for a 1-month OpenClaw multi-agent pilot.

## Commands

```bash
python -m trading_firm.cli universe-refresh --asof <ISO8601>
python -m trading_firm.cli run-cycle --market us|kr --asof <ISO8601>
python -m trading_firm.cli risk-check --asof <ISO8601>
python -m trading_firm.cli morning-report --date <YYYY-MM-DD>
python -m trading_firm.cli capture-charts --date <YYYY-MM-DD>
python -m trading_firm.cli control --action pause|resume|status
python -m trading_firm.cli dashboard --host 127.0.0.1 --port 8765
```

## Notes

- Engine is deterministic and rules-based (no free-form model execution for order decisions).
- Internal paper execution is default.
- Alpaca/KIS adapters are stubbed for phase-2 migration.
- To use brand logos (Apple, Tesla, etc.) in the UI, set `LOGO_DEV_TOKEN` in `.env` (fallback favicon source works without token).

## Local UI Dashboard

Start the local web dashboard:

```bash
cd /path/to/trading-company
npm install
npm run frontend:build
./.venv/bin/python -m trading_firm.cli dashboard --host 127.0.0.1 --port 8765
```

Then open: `http://127.0.0.1:8765`
