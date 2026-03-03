# OpenClaw Operations

## Agents
- main (CEO)
- research-intel
- strategy-trend
- strategy-meanrev
- strategy-event
- risk-ops

## Cron responsibilities
- `firm-universe-refresh`: refresh universe + overnight news ingest
- `firm-overnight-news`: produce overnight intelligence summary
- `firm-us-cycle`: run US cycle
- `firm-kr-cycle`: run KR cycle
- `firm-risk-watch`: enforce risk checks and pause if needed
- `firm-morning-report`: capture charts + generate report + Telegram delivery
- `firm-daily-archive`: archive DB/report snapshot

## Manual controls
```bash
python3 -m trading_firm.cli control --action pause --actor local-cli
python3 -m trading_firm.cli control --action resume --actor local-cli
python3 -m trading_firm.cli control --action status --actor local-cli
```
