from __future__ import annotations

import uuid
from dataclasses import replace
from datetime import datetime
from typing import Any

from trading_firm.execution.base import ExecutionAdapter
from trading_firm.models.types import FillV1, OrderIntentV1


class PaperExecutionAdapter(ExecutionAdapter):
    def execute_intents(
        self,
        *,
        market: str,
        intents: list[OrderIntentV1],
        price_by_symbol: dict[str, float],
        asof: datetime,
        cfg: dict[str, Any],
    ) -> list[FillV1]:
        fills: list[FillV1] = []
        fee_bps = float(cfg["execution"]["fee_bps"])
        slip_cfg = cfg["execution"]["slippage_bps"][market]

        for intent in intents:
            mid = float(price_by_symbol[intent.symbol])
            if intent.side == "BUY":
                slippage_bps = float(slip_cfg["long"])
                px = mid * (1.0 + slippage_bps / 10_000.0)
            else:
                slippage_bps = float(slip_cfg["short"])
                px = mid * (1.0 - slippage_bps / 10_000.0)
            notional = abs(intent.qty * px)
            fee = notional * fee_bps / 10_000.0
            fills.append(
                FillV1(
                    fill_id=str(uuid.uuid4()),
                    order_id="",  # populated by caller with order mapping
                    intent_id=intent.intent_id,
                    signal_id=intent.signal_id,
                    market=market,  # type: ignore[arg-type]
                    symbol=intent.symbol,
                    side=intent.side,
                    qty=float(intent.qty),
                    price=float(px),
                    fee=float(fee),
                    slippage_bps=float(slippage_bps),
                    ts=asof,
                    realized_pnl=0.0,
                )
            )
        return fills


def direction_from_side(side: str) -> float:
    return 1.0 if side == "BUY" else -1.0


def apply_fill_to_position(
    *,
    prev_qty: float,
    prev_avg_price: float,
    side: str,
    fill_qty: float,
    fill_price: float,
) -> tuple[float, float, float]:
    """
    Returns: (new_qty, new_avg_price, realized_pnl_delta)
    qty sign convention: positive=long, negative=short.
    """
    delta = direction_from_side(side) * fill_qty
    new_qty = prev_qty + delta

    # Increasing same direction
    if prev_qty == 0 or (prev_qty > 0 and delta > 0) or (prev_qty < 0 and delta < 0):
        abs_total = abs(prev_qty) + abs(delta)
        new_avg = ((abs(prev_qty) * prev_avg_price) + (abs(delta) * fill_price)) / abs_total
        return new_qty, new_avg, 0.0

    # Reducing or flipping
    closing_qty = min(abs(prev_qty), abs(delta))
    if prev_qty > 0:
        realized = (fill_price - prev_avg_price) * closing_qty
    else:
        realized = (prev_avg_price - fill_price) * closing_qty

    if new_qty == 0:
        return 0.0, 0.0, realized

    # Flipped into opposite direction, new avg becomes fill price for remaining qty.
    if (prev_qty > 0 and new_qty < 0) or (prev_qty < 0 and new_qty > 0):
        return new_qty, fill_price, realized

    # Reduced without flip keeps old avg.
    return new_qty, prev_avg_price, realized
