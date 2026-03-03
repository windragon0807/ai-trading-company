from __future__ import annotations

import math
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from statistics import mean
from typing import Any

try:
    import yfinance as yf  # type: ignore
except Exception:  # pragma: no cover
    yf = None


@dataclass(frozen=True)
class Candle:
    ts: datetime
    open: float
    high: float
    low: float
    close: float
    volume: float


def normalize_symbol_for_yf(symbol: str) -> str:
    return symbol.replace("-", "") if symbol.endswith(".KS") else symbol


def fetch_candles(symbol: str, asof: datetime, bars: int = 80) -> list[Candle]:
    if bars < 20:
        bars = 20
    if yf is None:
        return []
    ticker = normalize_symbol_for_yf(symbol)
    try:
        hist = yf.Ticker(ticker).history(period="3mo", interval="30m", auto_adjust=False)
        if hist is None or len(hist) < 20:
            return []
        tail = hist.tail(bars)
        candles: list[Candle] = []
        for idx, row in tail.iterrows():
            ts = idx.to_pydatetime().astimezone(timezone.utc)
            candles.append(
                Candle(
                    ts=ts,
                    open=float(row["Open"]),
                    high=float(row["High"]),
                    low=float(row["Low"]),
                    close=float(row["Close"]),
                    volume=float(row["Volume"]),
                )
            )
        return candles
    except Exception:
        return []


def atr14(candles: list[Candle]) -> float:
    if len(candles) < 15:
        return max(0.01, candles[-1].close * 0.01) if candles else 1.0
    trs: list[float] = []
    prev_close = candles[0].close
    for c in candles[1:]:
        tr = max(c.high - c.low, abs(c.high - prev_close), abs(c.low - prev_close))
        trs.append(tr)
        prev_close = c.close
    window = trs[-14:]
    return max(0.01, mean(window))


def returns(candles: list[Candle], lookback: int = 1) -> float:
    if len(candles) <= lookback:
        return 0.0
    base = candles[-lookback - 1].close
    if base == 0:
        return 0.0
    return candles[-1].close / base - 1.0


def sma(candles: list[Candle], length: int) -> float:
    if not candles:
        return 0.0
    subset = candles[-length:] if len(candles) >= length else candles
    return sum(c.close for c in subset) / len(subset)


def stdev(candles: list[Candle], length: int) -> float:
    subset = candles[-length:] if len(candles) >= length else candles
    if len(subset) < 2:
        return 0.0
    m = sum(c.close for c in subset) / len(subset)
    var = sum((c.close - m) ** 2 for c in subset) / (len(subset) - 1)
    return math.sqrt(var)


def pick_top_liquidity(symbols: list[str], asof: datetime, top_n: int) -> list[str]:
    scored: list[tuple[str, float]] = []
    for symbol in symbols:
        candles = fetch_candles(symbol, asof=asof, bars=5)
        if not candles:
            continue
        v = candles[-1].volume
        p = candles[-1].close
        scored.append((symbol, v * p))
    scored.sort(key=lambda x: x[1], reverse=True)
    return [s for s, _ in scored[:top_n]]


def is_market_open(market: str, now_utc: datetime) -> bool:
    # Simplified session windows for pilot operations.
    if market == "kr":
        kst = now_utc.astimezone(tz=timezone(timedelta(hours=9)))
        if kst.weekday() >= 5:
            return False
        hhmm = kst.hour * 100 + kst.minute
        return 900 <= hhmm <= 1530

    # US market based on America/New_York session clock.
    from zoneinfo import ZoneInfo

    ny = now_utc.astimezone(ZoneInfo("America/New_York"))
    if ny.weekday() >= 5:
        return False
    hhmm = ny.hour * 100 + ny.minute
    return 930 <= hhmm <= 1600
