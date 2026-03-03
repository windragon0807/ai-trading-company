from datetime import datetime, timedelta, timezone

from trading_firm.data.market_data import Candle
from trading_firm.strategies.meanrev import meanrev_signal
from trading_firm.strategies.trend import trend_signal


def _candles(values: list[float]) -> list[Candle]:
    now = datetime.now(timezone.utc)
    out = []
    for i, v in enumerate(values):
        ts = now - timedelta(minutes=(len(values) - i) * 30)
        out.append(Candle(ts=ts, open=v, high=v * 1.01, low=v * 0.99, close=v, volume=1_000_000))
    return out


def test_trend_signal_long() -> None:
    base = [100.0] * 24 + [105.0]
    sig = trend_signal(_candles(base))
    assert sig is not None
    side, _strength = sig
    assert side == "long"


def test_meanrev_signal_short() -> None:
    base = [100.0] * 24 + [110.0]
    sig = meanrev_signal(_candles(base))
    assert sig is not None
    side, _strength = sig
    assert side == "short"
