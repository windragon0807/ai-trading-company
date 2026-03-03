from __future__ import annotations

from trading_firm.data.market_data import Candle, sma
from trading_firm.models.types import SignalSide


def trend_signal(candles: list[Candle]) -> tuple[SignalSide, float] | None:
    if len(candles) < 25:
        return None
    s20 = sma(candles, 20)
    close = candles[-1].close
    if s20 <= 0:
        return None
    ratio = close / s20
    if ratio >= 1.01:
        return ("long", min(1.0, (ratio - 1.0) * 30))
    if ratio <= 0.99:
        return ("short", min(1.0, (1.0 - ratio) * 30))
    return None
