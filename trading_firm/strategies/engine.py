from __future__ import annotations

import uuid
from collections import defaultdict
from datetime import datetime
from typing import Any

from trading_firm.data.market_data import Candle, atr14
from trading_firm.models.types import OrderIntentV1, SignalV1
from trading_firm.strategies.event import event_signal
from trading_firm.strategies.meanrev import meanrev_signal
from trading_firm.strategies.trend import trend_signal


def generate_signals(
    market: str,
    bars_by_symbol: dict[str, list[Candle]],
    asof: datetime,
    cfg: dict[str, Any],
    news_bias_by_symbol: dict[str, float] | None = None,
) -> list[SignalV1]:
    news_bias_by_symbol = news_bias_by_symbol or {}
    bucket_by_strategy: dict[str, str] = cfg["strategy"]["bucket_by_strategy"]
    out: list[SignalV1] = []

    for symbol, candles in bars_by_symbol.items():
        for strategy_name, func in (
            ("trend", lambda cs: trend_signal(cs)),
            ("meanrev", lambda cs: meanrev_signal(cs)),
            ("event", lambda cs: event_signal(cs, news_bias_by_symbol.get(symbol, 0.0))),
        ):
            sig = func(candles)
            if sig is None:
                continue
            side, strength = sig
            out.append(
                SignalV1(
                    signal_id=str(uuid.uuid4()),
                    strategy=strategy_name,
                    market=market,  # type: ignore[arg-type]
                    symbol=symbol,
                    side=side,
                    strength=float(max(0.0, min(1.0, strength))),
                    horizon="intraday" if strategy_name != "trend" else "swing",
                    ts=asof,
                    bucket=bucket_by_strategy[strategy_name],  # type: ignore[arg-type]
                )
            )
    return out


def signals_to_intents(
    signals: list[SignalV1],
    bars_by_symbol: dict[str, list[Candle]],
    account_equity: float,
    cfg: dict[str, Any],
) -> list[OrderIntentV1]:
    out: list[OrderIntentV1] = []
    risk_cfg = cfg["risk"]
    bucket_risk_per_trade: dict[str, float] = risk_cfg["bucket_risk_per_trade"]
    stop_atr_multiple = float(risk_cfg["stop_atr_multiple"])
    min_vol = int(cfg["market_data"].get("kr_short_min_volume", 0))

    for s in signals:
        candles = bars_by_symbol.get(s.symbol)
        if not candles:
            continue
        price = candles[-1].close
        atr = atr14(candles)
        if atr <= 0 or price <= 0:
            continue
        risk_per_trade = float(bucket_risk_per_trade[s.bucket])
        notional = (risk_per_trade * account_equity * max(0.3, s.strength)) / max(1e-9, (atr * stop_atr_multiple) / price)
        qty = max(1, int(notional / price))

        if s.market == "kr" and s.side == "short" and candles[-1].volume < min_vol:
            continue

        out.append(
            OrderIntentV1(
                intent_id=str(uuid.uuid4()),
                signal_id=s.signal_id,
                symbol=s.symbol,
                side="BUY" if s.side == "long" else "SELL",
                qty=float(qty),
                limit_price=None,
                stop_price=round(price - atr * stop_atr_multiple, 4) if s.side == "long" else round(price + atr * stop_atr_multiple, 4),
                tif="DAY",
                strategy=s.strategy,
                bucket=s.bucket,
            )
        )
    return out


def aggregate_news_bias(news_rows: list[dict[str, Any]], symbols: list[str]) -> dict[str, float]:
    # Lightweight heuristic: map market sentiment equally to symbols in that market.
    score_by_market: dict[str, float] = defaultdict(float)
    count_by_market: dict[str, int] = defaultdict(int)
    for row in news_rows:
        market = str(row.get("market", "us"))
        score_by_market[market] += float(row.get("impact_score", 0.0))
        count_by_market[market] += 1
    out: dict[str, float] = {}
    for symbol in symbols:
        market = "kr" if symbol.endswith(".KS") else "us"
        if count_by_market[market] == 0:
            out[symbol] = 0.0
        else:
            # Neutralized directional bias by parity of score.
            avg = score_by_market[market] / count_by_market[market]
            out[symbol] = 0.01 if int(avg * 10) % 2 == 0 else -0.01
    return out
