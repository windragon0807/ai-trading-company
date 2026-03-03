from __future__ import annotations

from trading_firm.data.market_data import Candle, sma, stdev
from trading_firm.models.types import SignalSide


def meanrev_signal(candles: list[Candle]) -> tuple[SignalSide, float] | None:
    if len(candles) < 25:
        return None
    m = sma(candles, 20)
    sd = stdev(candles, 20)
    if sd <= 1e-8:
        return None
    z = (candles[-1].close - m) / sd
    if z >= 1.5:
        return ("short", min(1.0, (z - 1.5) / 2.0 + 0.3))
    if z <= -1.5:
        return ("long", min(1.0, (-z - 1.5) / 2.0 + 0.3))
    return None
