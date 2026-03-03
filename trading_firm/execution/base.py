from __future__ import annotations

from abc import ABC, abstractmethod
from datetime import datetime
from typing import Any

from trading_firm.models.types import FillV1, OrderIntentV1


class ExecutionAdapter(ABC):
    @abstractmethod
    def execute_intents(
        self,
        *,
        market: str,
        intents: list[OrderIntentV1],
        price_by_symbol: dict[str, float],
        asof: datetime,
        cfg: dict[str, Any],
    ) -> list[FillV1]:
        raise NotImplementedError
