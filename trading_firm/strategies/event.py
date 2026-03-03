from __future__ import annotations

from trading_firm.data.market_data import Candle, returns
from trading_firm.models.types import SignalSide


def event_signal(candles: list[Candle], news_bias: float = 0.0) -> tuple[SignalSide, float] | None:
    if len(candles) < 3:
        return None
    r1 = returns(candles, 1)
    threshold = 0.03
    if r1 + news_bias >= threshold:
        return ("long", min(1.0, abs(r1 + news_bias) * 15))
    if r1 + news_bias <= -threshold:
        return ("short", min(1.0, abs(r1 + news_bias) * 15))
    return None
