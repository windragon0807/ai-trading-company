from __future__ import annotations

from dataclasses import dataclass
import json
from pathlib import Path
from typing import Any

try:
    import yaml  # type: ignore
except Exception:  # pragma: no cover
    yaml = None


@dataclass(frozen=True)
class FirmConfig:
    raw: dict[str, Any]

    @property
    def timezone(self) -> str:
        return str(self.raw["timezone"])

    @property
    def db_path(self) -> str:
        return str(self.raw["db_path"])


def load_config(path: str | None = None) -> FirmConfig:
    if path is None:
        root = Path(__file__).resolve().parents[1]
        # JSON first so runtime works even when PyYAML is not installed.
        default_json = root / "config" / "firm.json"
        default_yaml = root / "config" / "firm.yaml"
        if default_json.exists():
            path = str(default_json)
        else:
            path = str(default_yaml)
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    if path.endswith(".json"):
        data = json.loads(text)
    else:
        if yaml is None:
            raise RuntimeError("PyYAML is required to read .yaml configs. Use config/firm.json or install PyYAML.")
        data = yaml.safe_load(text)
    if not isinstance(data, dict):
        raise ValueError("Invalid config format")
    return FirmConfig(raw=data)
