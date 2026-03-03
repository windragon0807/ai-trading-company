#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DATE="${1:-$(date +%F)}"
mkdir -p "$ROOT/state/archive"
cp "$ROOT/state/trading.db" "$ROOT/state/archive/trading-${DATE}.db"
if [ -f "$ROOT/reports/daily/${DATE}.md" ]; then
  cp "$ROOT/reports/daily/${DATE}.md" "$ROOT/state/archive/report-${DATE}.md"
fi
echo "archived:${DATE}"
