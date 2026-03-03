from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any

from trading_firm.utils import ensure_dir

try:
    from playwright.sync_api import sync_playwright  # type: ignore
except Exception:  # pragma: no cover
    sync_playwright = None


@dataclass(frozen=True)
class ChartArtifact:
    symbol: str
    market: str
    path: str | None
    url: str
    status: str


def tradingview_symbol(market: str, symbol: str) -> str:
    if market == "kr":
        base = symbol.replace(".KS", "")
        return f"KRX:{base}"
    if symbol == "BRK-B":
        return "NYSE:BRK.B"
    return f"NASDAQ:{symbol}"


def tradingview_url(market: str, symbol: str) -> str:
    tv_symbol = tradingview_symbol(market, symbol)
    return f"https://www.tradingview.com/chart/?symbol={tv_symbol}"


def capture_chart_png(url: str, output_path: Path) -> bool:
    if sync_playwright is None:
        return False
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": 1600, "height": 900})
            page.goto(url, timeout=45_000, wait_until="domcontentloaded")
            page.wait_for_timeout(3500)
            page.screenshot(path=str(output_path), full_page=True)
            browser.close()
            return output_path.exists() and output_path.stat().st_size > 0
    except Exception:
        return False


def build_chart_artifacts(
    *,
    market: str,
    symbols: list[str],
    out_dir: str,
    asof: datetime,
) -> list[ChartArtifact]:
    ensure_dir(out_dir)
    artifacts: list[ChartArtifact] = []
    stamp = asof.strftime("%Y%m%d-%H%M")
    for symbol in symbols:
        url = tradingview_url(market, symbol)
        png = Path(out_dir) / f"{market}-{symbol.replace('.', '_')}-{stamp}.png"
        ok = capture_chart_png(url, png)
        artifacts.append(
            ChartArtifact(
                symbol=symbol,
                market=market,
                path=str(png) if ok else None,
                url=url,
                status="captured" if ok else "link_only",
            )
        )
    return artifacts


def save_chart_manifest(path: str, artifacts: list[ChartArtifact]) -> None:
    payload = [
        {"symbol": a.symbol, "market": a.market, "path": a.path, "url": a.url, "status": a.status}
        for a in artifacts
    ]
    Path(path).write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
