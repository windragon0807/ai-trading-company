from __future__ import annotations

import hashlib
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo


KST = ZoneInfo("Asia/Seoul")


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def parse_iso8601(value: str | None) -> datetime:
    if not value:
        return utc_now()
    text = value.strip()
    if text.endswith("Z"):
        text = text[:-1] + "+00:00"
    dt = datetime.fromisoformat(text)
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


def parse_date(value: str) -> datetime:
    return datetime.strptime(value, "%Y-%m-%d").replace(tzinfo=KST)


def as_kst(dt: datetime) -> datetime:
    return dt.astimezone(KST)


def ensure_dir(path: str | os.PathLike[str]) -> Path:
    p = Path(path)
    p.mkdir(parents=True, exist_ok=True)
    return p


def json_dumps(obj: object) -> str:
    return json.dumps(obj, ensure_ascii=False, sort_keys=True)


def stable_seed(*parts: str) -> int:
    joined = "::".join(parts)
    return int(hashlib.sha256(joined.encode("utf-8")).hexdigest()[:12], 16)
