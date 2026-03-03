from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Literal


Market = Literal["us", "kr"]
SignalSide = Literal["long", "short"]
OrderSide = Literal["BUY", "SELL"]
Bucket = Literal["conservative", "balanced", "aggressive"]


@dataclass(frozen=True)
class SignalV1:
    signal_id: str
    strategy: str
    market: Market
    symbol: str
    side: SignalSide
    strength: float
    horizon: str
    ts: datetime
    bucket: Bucket


@dataclass(frozen=True)
class OrderIntentV1:
    intent_id: str
    signal_id: str
    symbol: str
    side: OrderSide
    qty: float
    limit_price: float | None
    stop_price: float | None
    tif: str
    strategy: str
    bucket: Bucket


@dataclass(frozen=True)
class FillV1:
    fill_id: str
    order_id: str
    intent_id: str
    signal_id: str
    market: Market
    symbol: str
    side: OrderSide
    qty: float
    price: float
    fee: float
    slippage_bps: float
    ts: datetime
    realized_pnl: float


@dataclass(frozen=True)
class RiskEventV1:
    event_id: str
    level: str
    rule_id: str
    market: Market
    symbol: str | None
    message: str
    ts: datetime


@dataclass(frozen=True)
class DailyReportV1:
    date: str
    kpi: dict
    pnl: dict
    drawdown: dict
    exposure: dict
    breaches: list[dict]
    top_trades: list[dict]
    overnight_events: list[dict]
    charts: list[dict]
