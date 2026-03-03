from __future__ import annotations

import json
import os
import re
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from functools import lru_cache
from email.utils import parsedate_to_datetime
from pathlib import Path
from typing import Any
from urllib.parse import quote, urlencode
from zoneinfo import ZoneInfo

from flask import Flask, Response, jsonify, redirect, request, send_from_directory, stream_with_context

try:
    from flask_sock import Sock
except Exception:  # pragma: no cover - optional dependency
    Sock = None

from trading_firm.config import load_config
from trading_firm.models.db import connect, ensure_accounts, get_system_state, init_db, upsert_system_state
from trading_firm.reporting.charts import tradingview_symbol

try:
    import holidays as pyholidays
except Exception:  # pragma: no cover - optional dependency fallback
    pyholidays = None


PROJECT_ROOT = Path(__file__).resolve().parents[1]
WEB_DIR = Path(__file__).resolve().parent / "web"
FX_CACHE: dict[str, Any] = {
    "rate": None,
    "source": None,
    "quote_time_utc": None,
    "fetched_at_monotonic": 0.0,
}
CHART_CACHE: dict[str, dict[str, Any]] = {}
CHART_CACHE_TTL_SEC = 2.5
INDICATOR_CACHE: dict[str, Any] = {
    "items": None,
    "fetched_at_monotonic": 0.0,
}
INDICATOR_CACHE_TTL_LIVE_SEC = 1.0
INDICATOR_CACHE_TTL_DELAYED_SEC = 3.0
INDICATOR_CACHE_TTL_CLOSED_SEC = 60.0
FX_CACHE_TTL_SEC = 3.0
LOGO_CACHE_DIR = PROJECT_ROOT / "state" / "logo_cache"
LOGO_CACHE_TTL_SEC = 6 * 60 * 60

MARKET_INDICATOR_SPECS: tuple[dict[str, str], ...] = (
    {"id": "usdkrw", "label": "달러 환율", "symbol": "USDKRW=X", "session": "fx_24_5", "tz": "Asia/Seoul"},
    {"id": "nasdaq", "label": "나스닥", "symbol": "^IXIC", "session": "us_equity", "tz": "America/New_York"},
    {"id": "nasdaq100f", "label": "나스닥 100 선물", "symbol": "NQ=F", "session": "us_futures", "tz": "America/New_York"},
    {"id": "sp500", "label": "S&P 500", "symbol": "^GSPC", "session": "us_equity", "tz": "America/New_York"},
    {"id": "dowjones", "label": "다우존스", "symbol": "^DJI", "session": "us_equity", "tz": "America/New_York"},
    {"id": "vix", "label": "VIX", "symbol": "^VIX", "session": "us_equity", "tz": "America/New_York"},
    {"id": "kospi", "label": "코스피", "symbol": "^KS11", "session": "kr_equity", "tz": "Asia/Seoul"},
    {"id": "kosdaq", "label": "코스닥", "symbol": "^KQ11", "session": "kr_equity", "tz": "Asia/Seoul"},
)
MARKET_INDICATOR_SPEC_BY_ID: dict[str, dict[str, str]] = {spec["id"]: spec for spec in MARKET_INDICATOR_SPECS}

US_SYMBOL_DOMAINS: dict[str, str] = {
    "AAPL": "apple.com",
    "NVDA": "nvidia.com",
    "TSLA": "tesla.com",
    "MSFT": "microsoft.com",
    "GOOGL": "google.com",
    "GOOG": "google.com",
    "AMZN": "amazon.com",
    "META": "meta.com",
    "NFLX": "netflix.com",
    "AMD": "amd.com",
    "INTC": "intel.com",
    "ORCL": "oracle.com",
    "CRM": "salesforce.com",
    "QCOM": "qualcomm.com",
    "ADBE": "adobe.com",
    "PYPL": "paypal.com",
    "JPM": "jpmorganchase.com",
    "BAC": "bankofamerica.com",
    "WMT": "walmart.com",
    "KO": "coca-colacompany.com",
    "PEP": "pepsico.com",
}

KR_SYMBOL_DOMAINS: dict[str, str] = {
    "005930": "samsung.com",
    "000660": "skhynix.com",
    "373220": "lgensol.com",
    "207940": "samsungbiologics.com",
    "005380": "hyundai.com",
    "035420": "navercorp.com",
    "051910": "lgchem.com",
    "068270": "celltrion.com",
    "006400": "samsungsdi.com",
    "003670": "poscofuturem.com",
    "105560": "kbstar.com",
    "055550": "shinhan.com",
    "035720": "kakaocorp.com",
    "012330": "hyundaimotorgroup.com",
    "096770": "skinnovation.com",
    "066570": "lge.com",
    "017670": "sktelecom.com",
    "000270": "kia.com",
    "015760": "kepco.co.kr",
    "259960": "krafton.com",
    "003490": "koreanair.com",
}


def _now_kst() -> datetime:
    return datetime.now(ZoneInfo("Asia/Seoul"))


def _today_kst() -> str:
    return _now_kst().strftime("%Y-%m-%d")


def _utc_now_iso() -> str:
    return datetime.now(ZoneInfo("UTC")).isoformat()


def _load_env_file(path: Path | None = None) -> None:
    env_path = path or (PROJECT_ROOT / ".env")
    if not env_path.exists():
        return

    try:
        for raw_line in env_path.read_text(encoding="utf-8").splitlines():
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip("'").strip('"')
            if key:
                os.environ.setdefault(key, value)
    except Exception:
        # Environment file parsing errors should not block app startup.
        return


def _safe_rate(value: Any) -> float | None:
    try:
        rate = float(value)
    except Exception:
        return None
    # Sanity range for USD/KRW.
    if 500.0 <= rate <= 3000.0:
        return rate
    return None


def _normalize_kr_code(symbol: str) -> str:
    return (
        str(symbol or "")
        .upper()
        .replace("KRX:", "")
        .replace(".KS", "")
        .replace(".KQ", "")
        .strip()
    )


def _normalize_us_ticker(symbol: str) -> str:
    raw = str(symbol or "").upper().strip()
    if ":" in raw:
        raw = raw.split(":", 1)[1]
    return raw


def _logo_domain_for_symbol(market: str, symbol: str) -> str | None:
    if str(market or "").lower() == "kr":
        return KR_SYMBOL_DOMAINS.get(_normalize_kr_code(symbol))
    return US_SYMBOL_DOMAINS.get(_normalize_us_ticker(symbol))


def _logo_cache_files(domain: str) -> tuple[Path, Path]:
    slug = "".join(ch if ch.isalnum() else "_" for ch in str(domain).lower().strip())
    return LOGO_CACHE_DIR / f"{slug}.img", LOGO_CACHE_DIR / f"{slug}.json"


def _load_logo_cache(domain: str, ttl_sec: int = LOGO_CACHE_TTL_SEC) -> tuple[bytes, str] | None:
    img_file, meta_file = _logo_cache_files(domain)
    try:
        if not img_file.exists() or not meta_file.exists():
            return None
        age_sec = time.time() - img_file.stat().st_mtime
        if age_sec > float(ttl_sec):
            return None

        meta = json.loads(meta_file.read_text(encoding="utf-8"))
        mime = str(meta.get("mime") or "image/png")
        data = img_file.read_bytes()
        if not data:
            return None
        return data, mime
    except Exception:
        return None


def _save_logo_cache(domain: str, data: bytes, mime: str) -> None:
    try:
        LOGO_CACHE_DIR.mkdir(parents=True, exist_ok=True)
        img_file, meta_file = _logo_cache_files(domain)
        img_file.write_bytes(data)
        meta_file.write_text(
            json.dumps(
                {
                    "domain": domain,
                    "mime": mime,
                    "saved_at_utc": _utc_now_iso(),
                }
            ),
            encoding="utf-8",
        )
    except Exception:
        # Cache write failures should not break dashboard response.
        return


def _detect_image_mime(data: bytes, fallback: str = "image/png") -> str:
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if data.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if data.startswith(b"GIF87a") or data.startswith(b"GIF89a"):
        return "image/gif"
    if data.startswith(b"\x00\x00\x01\x00"):
        return "image/x-icon"
    if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        return "image/webp"
    return fallback


def _fetch_logo(url: str, timeout_sec: float = 2.5) -> tuple[bytes, str] | None:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=timeout_sec) as resp:
            content_type = str(resp.headers.get("Content-Type") or "").split(";")[0].strip().lower()
            data = resp.read()
            if not data:
                return None

            if not content_type.startswith("image/"):
                # Some providers return generic MIME for ico files.
                content_type = _detect_image_mime(data, fallback=content_type or "image/png")
            if not content_type.startswith("image/"):
                return None
            return data, content_type
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError):
        return None
    except Exception:
        return None


def _logo_provider_urls(domain: str, token: str | None, size: int = 128) -> list[tuple[str, str]]:
    providers: list[tuple[str, str]] = []
    if token:
        providers.append(
            (
                "logo.dev",
                f"https://img.logo.dev/{domain}?token={token}&size={size}&format=png",
            )
        )
    providers.extend(
        [
            ("google-s2", f"https://www.google.com/s2/favicons?domain={domain}&sz={size}"),
            ("duckduckgo", f"https://icons.duckduckgo.com/ip3/{domain}.ico"),
            ("site-favicon", f"https://{domain}/favicon.ico"),
        ]
    )
    return providers


def _parse_timestamp_any(text: str | None) -> datetime | None:
    if not text:
        return None
    raw = str(text).strip()
    if not raw:
        return None
    try:
        iso = raw[:-1] + "+00:00" if raw.endswith("Z") else raw
        dt = datetime.fromisoformat(iso)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=ZoneInfo("UTC"))
        return dt.astimezone(ZoneInfo("UTC"))
    except Exception:
        pass
    try:
        dt = parsedate_to_datetime(raw)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=ZoneInfo("UTC"))
        return dt.astimezone(ZoneInfo("UTC"))
    except Exception:
        return None


def _is_quote_stale(quote_time_utc: str | None, max_age_minutes: int = 60) -> bool:
    dt = _parse_timestamp_any(quote_time_utc)
    if dt is None:
        return True
    age_seconds = (datetime.now(ZoneInfo("UTC")) - dt).total_seconds()
    return age_seconds > (max_age_minutes * 60)


def _fetch_usdkrw_from_yahoo(timeout_sec: float = 2.0) -> tuple[float, str, str]:
    url = "https://query1.finance.yahoo.com/v8/finance/chart/USDKRW=X?range=1d&interval=1m"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout_sec) as resp:
        payload = json.loads(resp.read().decode("utf-8"))

    result = ((payload.get("chart") or {}).get("result") or [None])[0]
    if not result:
        raise RuntimeError("Yahoo result missing")

    meta = result.get("meta") or {}
    rate = _safe_rate(meta.get("regularMarketPrice"))
    if rate is None:
        closes = ((((result.get("indicators") or {}).get("quote") or [{}])[0]).get("close") or [])
        for v in reversed(closes):
            rate = _safe_rate(v)
            if rate is not None:
                break
    if rate is None:
        raise RuntimeError("Yahoo price missing")

    quote_ts = meta.get("regularMarketTime")
    quote_time_utc = _utc_now_iso()
    if quote_ts:
        try:
            quote_time_utc = datetime.fromtimestamp(int(quote_ts), tz=ZoneInfo("UTC")).isoformat()
        except Exception:
            pass
    return rate, "yahoo", quote_time_utc


def _fetch_usdkrw_from_open_er_api(timeout_sec: float = 2.0) -> tuple[float, str, str]:
    url = "https://open.er-api.com/v6/latest/USD"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout_sec) as resp:
        payload = json.loads(resp.read().decode("utf-8"))

    rate = _safe_rate((payload.get("rates") or {}).get("KRW"))
    if rate is None:
        raise RuntimeError("open.er-api KRW rate missing")
    quote_time_utc = str(payload.get("time_last_update_utc") or _utc_now_iso())
    return rate, "open.er-api", quote_time_utc


def _fallback_usdkrw(conn) -> dict[str, Any]:
    rate_state = get_system_state(conn, "fx.usdkrw", None)
    rate = _safe_rate(rate_state)
    meta = get_system_state(conn, "fx.usdkrw.meta", {})
    quote_time_utc = meta.get("quote_time_utc") if isinstance(meta, dict) else None
    return {
        "rate": rate,
        "source": "fallback-state" if rate is not None else "unavailable",
        "quote_time_utc": quote_time_utc or _utc_now_iso(),
        "stale": True,
    }


def _get_live_usdkrw(conn, ttl_sec: float = FX_CACHE_TTL_SEC) -> dict[str, Any]:
    # Avoid network dependency in unit tests.
    if os.getenv("PYTEST_CURRENT_TEST"):
        return _fallback_usdkrw(conn)

    now_mono = time.monotonic()
    cached_rate = _safe_rate(FX_CACHE.get("rate"))
    cached_at = float(FX_CACHE.get("fetched_at_monotonic") or 0.0)
    if cached_rate is not None and now_mono - cached_at <= float(ttl_sec):
        quote_time_utc = str(FX_CACHE.get("quote_time_utc") or _utc_now_iso())
        return {
            "rate": cached_rate,
            "source": str(FX_CACHE.get("source") or "cache"),
            "quote_time_utc": quote_time_utc,
            "stale": _is_quote_stale(quote_time_utc),
        }

    fetchers = (_fetch_usdkrw_from_yahoo, _fetch_usdkrw_from_open_er_api)
    for fetch in fetchers:
        try:
            rate, source, quote_time_utc = fetch()
            FX_CACHE.update(
                {
                    "rate": rate,
                    "source": source,
                    "quote_time_utc": quote_time_utc,
                    "fetched_at_monotonic": now_mono,
                }
            )
            upsert_system_state(conn, "fx.usdkrw", rate)
            upsert_system_state(
                conn,
                "fx.usdkrw.meta",
                {
                    "source": source,
                    "quote_time_utc": quote_time_utc,
                    "updated_at_utc": _utc_now_iso(),
                },
            )
            return {
                "rate": rate,
                "source": source,
                "quote_time_utc": quote_time_utc,
                "stale": _is_quote_stale(quote_time_utc),
            }
        except Exception:
            continue
    return _fallback_usdkrw(conn)


def _safe_float(value: Any) -> float | None:
    try:
        n = float(value)
    except Exception:
        return None
    if n != n or n in {float("inf"), float("-inf")}:
        return None
    return n


def _parse_naver_numeric_text(value: Any) -> float | None:
    if value is None:
        return None
    text = str(value).strip()
    if not text:
        return None
    text = text.replace(",", "")
    text = text.replace("백만", "")
    m = re.search(r"[-+]?\d+(?:\.\d+)?", text)
    if not m:
        return None
    return _safe_float(m.group(0))


def _downsample_points(values: list[float], max_points: int = 42) -> list[float]:
    if not values:
        return []
    if len(values) <= max_points:
        return values
    if max_points <= 1:
        return [values[-1]]
    last_index = len(values) - 1
    step = last_index / float(max_points - 1)
    sampled: list[float] = []
    for i in range(max_points):
        idx = min(last_index, int(round(i * step)))
        sampled.append(values[idx])
    return sampled


def _indicator_direction(change: float | None) -> str:
    if change is None:
        return "flat"
    if change > 0:
        return "up"
    if change < 0:
        return "down"
    return "flat"


def _parse_utc_iso(text: str | None) -> datetime | None:
    if not text:
        return None
    try:
        iso = str(text).replace("Z", "+00:00")
        dt = datetime.fromisoformat(iso)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=ZoneInfo("UTC"))
        return dt.astimezone(ZoneInfo("UTC"))
    except Exception:
        return None


@lru_cache(maxsize=32)
def _holiday_calendar(kind: str, year: int):
    if pyholidays is None:
        return None

    try:
        if kind == "kr":
            return pyholidays.country_holidays("KR", years=[year])
        if kind == "xnys":
            return pyholidays.financial_holidays("XNYS", years=[year])
    except Exception:
        return None
    return None


def _is_market_holiday(spec: dict[str, str], now_local: datetime) -> bool:
    session = str(spec.get("session") or "").strip().lower()
    if session == "kr_equity":
        cal = _holiday_calendar("kr", now_local.year)
    elif session == "us_equity":
        cal = _holiday_calendar("xnys", now_local.year)
    else:
        return False

    if cal is None:
        return False
    try:
        return now_local.date() in cal
    except Exception:
        return False


def _session_phase(spec: dict[str, str], now_local: datetime) -> str:
    session = str(spec.get("session") or "").strip().lower()
    weekday = now_local.weekday()  # Mon=0 ... Sun=6
    hhmm = now_local.hour * 100 + now_local.minute

    if session == "us_equity":
        if _is_market_holiday(spec, now_local):
            return "holiday"
        if weekday >= 5:
            return "holiday"
        if 400 <= hhmm < 930:
            return "pre"
        if 930 <= hhmm < 1600:
            return "regular"
        if 1600 <= hhmm < 2000:
            return "after"
        return "closed"

    if session == "kr_equity":
        if _is_market_holiday(spec, now_local):
            return "holiday"
        if weekday >= 5:
            return "holiday"
        if 900 <= hhmm < 1530:
            return "regular"
        return "closed"

    if session == "us_futures":
        # CME equity futures (rough): Sun 18:00 ET open, Fri 17:00 ET close,
        # daily 17:00-18:00 ET maintenance break.
        if weekday == 5:  # Saturday
            return "holiday"
        if weekday == 6:  # Sunday
            return "regular" if hhmm >= 1800 else "closed"
        if weekday == 4:  # Friday
            return "regular" if hhmm < 1700 else "closed"
        if 1700 <= hhmm < 1800:
            return "closed"
        return "regular"

    if session == "fx_24_5":
        return "regular" if weekday < 5 else "holiday"

    return "regular" if weekday < 5 else "holiday"


def _market_is_open(spec: dict[str, str], now_local: datetime) -> bool:
    phase = _session_phase(spec, now_local)
    return phase in {"pre", "regular", "after"}


def _live_session_label(spec: dict[str, str], phase: str) -> str:
    session = str(spec.get("session") or "").strip().lower()
    if session == "us_equity":
        if phase == "pre":
            return "프리장 실시간"
        if phase == "regular":
            return "정규장 실시간"
        if phase == "after":
            return "애프터장 실시간"
    return "실시간"


def _delayed_session_label(spec: dict[str, str], phase: str) -> str:
    session = str(spec.get("session") or "").strip().lower()
    if session == "us_equity":
        if phase == "pre":
            return "프리장 지연"
        if phase == "regular":
            return "정규장 지연"
        if phase == "after":
            return "애프터장 지연"
    return "지연"


def _delay_cutoff_minutes(spec: dict[str, str], phase: str) -> int:
    session = str(spec.get("session") or "").strip().lower()
    if session == "us_equity":
        if phase in {"pre", "after"}:
            return 45
        return 20
    if session == "kr_equity":
        return 20
    if session == "us_futures":
        return 20
    if session == "fx_24_5":
        return 10
    return 15


def _session_label(
    spec: dict[str, str],
    quote_time_utc: str,
    *,
    delay_cutoff_min: int | None = None,
    phase_hint: str | None = None,
) -> tuple[str, str]:
    tz_name = str(spec.get("tz") or "UTC")
    try:
        tz = ZoneInfo(tz_name)
    except Exception:
        tz = ZoneInfo("UTC")

    now_local = datetime.now(tz)
    now_utc = datetime.now(ZoneInfo("UTC"))
    quote_dt_utc = _parse_utc_iso(quote_time_utc)
    age_minutes: float | None = None
    if quote_dt_utc is not None:
        age_minutes = (now_utc - quote_dt_utc).total_seconds() / 60.0

    phase = str(phase_hint or _session_phase(spec, now_local) or "").strip().lower()
    open_now = phase in {"pre", "regular", "after"}
    weekend = now_local.weekday() >= 5
    holiday = phase == "holiday" or _is_market_holiday(spec, now_local)
    cutoff_min = int(delay_cutoff_min) if delay_cutoff_min is not None else _delay_cutoff_minutes(spec, phase)

    if open_now:
        if age_minutes is not None and age_minutes <= float(cutoff_min):
            return "live", _live_session_label(spec, phase)
        return "delayed", _delayed_session_label(spec, phase)

    if weekend or holiday:
        return "holiday", "휴장"
    return "closed", "장마감"


def _empty_indicator_item(spec: dict[str, str], *, source: str, stale: bool) -> dict[str, Any]:
    session_status, session_label = _session_label(spec, _utc_now_iso())
    return {
        "id": spec["id"],
        "label": spec["label"],
        "symbol": spec["symbol"],
        "price": None,
        "prev_close": None,
        "change": None,
        "change_pct": None,
        "direction": "flat",
        "sparkline": [],
        "source": source,
        "quote_time_utc": _utc_now_iso(),
        "stale": bool(stale),
        "session_status": session_status,
        "session_label": session_label,
    }


def _parse_indicator_quote(spec: dict[str, str], payload: dict[str, Any]) -> dict[str, Any]:
    result = ((payload.get("chart") or {}).get("result") or [None])[0]
    if not isinstance(result, dict):
        raise RuntimeError("Yahoo indicator result missing")

    meta = result.get("meta") or {}
    quote = (((result.get("indicators") or {}).get("quote") or [{}])[0]) or {}
    closes_raw = quote.get("close") or []
    timestamps = result.get("timestamp") or []

    closes: list[float] = []
    for raw in closes_raw:
        n = _safe_float(raw)
        if n is not None:
            closes.append(n)

    tz_name = str(spec.get("tz") or "UTC")
    try:
        tz = ZoneInfo(tz_name)
    except Exception:
        tz = ZoneInfo("UTC")
    phase = _session_phase(spec, datetime.now(tz))

    price_key = "regularMarketPrice"
    change_key = "regularMarketChange"
    pct_key = "regularMarketChangePercent"
    ts_key = "regularMarketTime"

    if str(spec.get("session") or "").strip().lower() == "us_equity":
        if phase == "pre":
            price_key = "preMarketPrice"
            change_key = "preMarketChange"
            pct_key = "preMarketChangePercent"
            ts_key = "preMarketTime"
        elif phase == "after":
            price_key = "postMarketPrice"
            change_key = "postMarketChange"
            pct_key = "postMarketChangePercent"
            ts_key = "postMarketTime"

    price = _safe_float(meta.get(price_key))
    if price is None:
        price = _safe_float(meta.get("regularMarketPrice"))
    if price is None and closes:
        price = closes[-1]

    prev_close = _safe_float(meta.get("regularMarketPreviousClose"))
    if prev_close is None:
        prev_close = _safe_float(meta.get("previousClose"))
    if prev_close is None and len(closes) >= 2:
        prev_close = closes[-2]
    if prev_close is None and price is not None:
        prev_close = price

    change = _safe_float(meta.get(change_key))
    change_pct = _safe_float(meta.get(pct_key))
    if change is None and (price is not None and prev_close is not None):
        change = price - prev_close
    if change_pct is None and (change is not None and prev_close not in {None, 0.0}):
        change_pct = (change / prev_close) * 100.0

    quote_ts = meta.get(ts_key)
    if quote_ts is None:
        quote_ts = meta.get("regularMarketTime")
    if quote_ts is None and timestamps:
        quote_ts = timestamps[-1]
    quote_time_utc = _utc_now_iso()
    if quote_ts is not None:
        try:
            quote_time_utc = datetime.fromtimestamp(int(quote_ts), tz=ZoneInfo("UTC")).isoformat()
        except Exception:
            pass

    session_status, session_label = _session_label(spec, quote_time_utc, phase_hint=phase)
    return {
        "id": spec["id"],
        "label": spec["label"],
        "symbol": spec["symbol"],
        "price": price,
        "prev_close": prev_close,
        "change": change,
        "change_pct": change_pct,
        "direction": _indicator_direction(change),
        "sparkline": _downsample_points(closes),
        "source": "yahoo",
        "quote_time_utc": quote_time_utc,
        "stale": session_status != "live",
        "session_status": session_status,
        "session_label": session_label,
    }


def _fetch_market_indicator(spec: dict[str, str], timeout_sec: float = 2.8) -> dict[str, Any]:
    symbol = quote(spec["symbol"], safe="")
    params = urlencode(
        {
            "range": "1d",
            "interval": "1m",
            "includePrePost": "true",
            "events": "div,splits",
        }
    )
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout_sec) as resp:
        payload = json.loads(resp.read().decode("utf-8"))
    return _parse_indicator_quote(spec, payload)


def _test_market_indicators() -> list[dict[str, Any]]:
    base_prices = {
        "usdkrw": 1450.25,
        "nasdaq": 22688.45,
        "nasdaq100f": 20312.50,
        "sp500": 6788.20,
        "dowjones": 43421.40,
        "vix": 19.86,
        "kospi": 2644.13,
        "kosdaq": 731.22,
    }
    changes = {
        "usdkrw": 4.12,
        "nasdaq": -118.77,
        "nasdaq100f": 62.35,
        "sp500": -17.91,
        "dowjones": -188.50,
        "vix": 1.23,
        "kospi": -12.18,
        "kosdaq": 3.84,
    }
    now = _utc_now_iso()
    items: list[dict[str, Any]] = []
    for spec in MARKET_INDICATOR_SPECS:
        price = base_prices.get(spec["id"], 0.0)
        change = changes.get(spec["id"], 0.0)
        prev_close = price - change
        points = [round(price - (change * 0.25) + (i - 6) * (change / 24.0), 6) for i in range(12)]
        items.append(
            {
                "id": spec["id"],
                "label": spec["label"],
                "symbol": spec["symbol"],
                "price": price,
                "prev_close": prev_close,
                "change": change,
                "change_pct": (change / prev_close * 100.0) if prev_close else 0.0,
                "direction": _indicator_direction(change),
                "sparkline": points,
                "source": "test",
                "quote_time_utc": now,
                "stale": False,
                "session_status": "live",
                "session_label": "실시간",
            }
        )
    return items


def _indicator_cache_ttl(items: list[dict[str, Any]]) -> float:
    saw_delayed = False
    for item in items:
        status = str(item.get("session_status") or "").strip().lower()
        if status == "live":
            return float(INDICATOR_CACHE_TTL_LIVE_SEC)
        if status == "delayed":
            saw_delayed = True
    if saw_delayed:
        return float(INDICATOR_CACHE_TTL_DELAYED_SEC)
    return float(INDICATOR_CACHE_TTL_CLOSED_SEC)


def _indicator_stream_sleep_seconds(items: list[dict[str, Any]]) -> float:
    return max(0.8, _indicator_cache_ttl(items))


def _indicator_stream_signature(items: list[dict[str, Any]]) -> tuple[Any, ...]:
    sig_rows: list[tuple[Any, ...]] = []
    for item in items:
        sig_rows.append(
            (
                str(item.get("id") or ""),
                float(_safe_float(item.get("price")) or 0.0),
                float(_safe_float(item.get("change")) or 0.0),
                float(_safe_float(item.get("change_pct")) or 0.0),
                str(item.get("quote_time_utc") or ""),
                str(item.get("session_status") or ""),
                str(item.get("session_label") or ""),
            )
        )
    return tuple(sig_rows)


def _get_market_indicators(ttl_sec: float | None = None) -> list[dict[str, Any]]:
    if os.getenv("PYTEST_CURRENT_TEST"):
        return _test_market_indicators()

    now_mono = time.monotonic()
    cached_items = INDICATOR_CACHE.get("items")
    cached_at = float(INDICATOR_CACHE.get("fetched_at_monotonic") or 0.0)

    stale_items: list[dict[str, Any]] = cached_items if isinstance(cached_items, list) else []
    effective_ttl = float(ttl_sec) if ttl_sec is not None else _indicator_cache_ttl(stale_items)
    if stale_items and (now_mono - cached_at <= effective_ttl):
        return stale_items

    fresh_by_id: dict[str, dict[str, Any]] = {}
    with ThreadPoolExecutor(max_workers=min(4, len(MARKET_INDICATOR_SPECS))) as executor:
        future_map = {executor.submit(_fetch_market_indicator, spec): spec for spec in MARKET_INDICATOR_SPECS}
        for future in as_completed(future_map):
            spec = future_map[future]
            try:
                fresh_by_id[spec["id"]] = future.result()
            except Exception:
                continue

    stale_by_id = {
        str(item.get("id")): item
        for item in stale_items
        if isinstance(item, dict) and str(item.get("id") or "").strip()
    }
    items: list[dict[str, Any]] = []
    for spec in MARKET_INDICATOR_SPECS:
        fresh = fresh_by_id.get(spec["id"])
        if fresh:
            items.append(fresh)
            continue
        stale = stale_by_id.get(spec["id"])
        if stale:
            cloned = dict(stale)
            cloned["stale"] = True
            cloned["source"] = str(cloned.get("source") or "cache")
            items.append(cloned)
            continue
        items.append(_empty_indicator_item(spec, source="unavailable", stale=True))

    INDICATOR_CACHE.update({"items": items, "fetched_at_monotonic": now_mono})
    return items


def _tv_symbol_from_query(query: str) -> str:
    raw = (query or "").strip().upper().replace(" ", "")
    if not raw:
        return "NASDAQ:AAPL"

    exchange_alias = {
        "KR": "KRX",
        "KOSPI": "KRX",
        "KOSDAQ": "KRX",
        "DJ": "DJI",
    }
    allowed_exchange = {
        "NASDAQ",
        "NYSE",
        "AMEX",
        "KRX",
        "FX_IDC",
        "TVC",
        "SP",
        "DJI",
        "CBOE",
        "CME",
        "CME_MINI",
    }

    if ":" in raw:
        exchange, symbol = raw.split(":", 1)
        exchange = exchange_alias.get(exchange, exchange)
        symbol = symbol.replace(".KS", "").replace(".KQ", "")
        if symbol == "BRK-B":
            symbol = "BRK.B"
        if exchange in allowed_exchange and symbol:
            return f"{exchange}:{symbol}"

    if raw.endswith(".KS") or raw.endswith(".KQ"):
        return f"KRX:{raw.split('.', 1)[0]}"

    if raw.isdigit():
        return f"KRX:{raw.zfill(6)}"

    if raw == "BRK-B":
        return "NYSE:BRK.B"

    cleaned = "".join(ch for ch in raw if ch.isalnum() or ch in {".", "-"})
    if not cleaned:
        cleaned = "AAPL"
    return f"NASDAQ:{cleaned}"


def _tv_symbol_parts(tv_symbol: str) -> tuple[str, str]:
    raw = str(tv_symbol or "").upper().strip()
    if ":" in raw:
        exchange, symbol = raw.split(":", 1)
        return exchange or "NASDAQ", symbol or "AAPL"
    return "NASDAQ", raw or "AAPL"


def _market_from_tv_symbol(tv_symbol: str) -> str:
    exchange, _ = _tv_symbol_parts(tv_symbol)
    return "kr" if exchange == "KRX" else "us"


def _yahoo_symbol_from_tv_symbol(tv_symbol: str) -> str:
    exchange, symbol = _tv_symbol_parts(tv_symbol)
    if exchange == "KRX":
        code = "".join(ch for ch in symbol if ch.isdigit())
        if len(code) == 6:
            return f"{code}.KS"
        cleaned = symbol.replace(".KS", "").replace(".KQ", "")
        return f"{cleaned}.KS"
    if symbol == "BRK.B":
        return "BRK-B"
    return symbol


def _normalize_chart_interval(value: str | None) -> str:
    raw = str(value or "").strip().lower()
    aliases = {
        "1": "1m",
        "5": "5m",
        "3": "3m",
        "15": "15m",
        "30": "30m",
        "60": "60m",
        "240": "4h",
        "240m": "4h",
        "4hour": "4h",
        "d": "1d",
        "1day": "1d",
        "w": "1wk",
        "1week": "1wk",
        "m": "1mo",
        "1month": "1mo",
    }
    raw = aliases.get(raw, raw)
    allowed = {"1m", "3m", "5m", "15m", "30m", "60m", "4h", "1d", "1wk", "1mo"}
    return raw if raw in allowed else "30m"


def _normalize_chart_range(value: str | None, interval: str) -> str:
    raw = str(value or "").strip().lower()
    if interval.endswith("m"):
        allowed = {"5d", "1mo", "2mo", "3mo", "6mo", "1y", "2y", "5y"}
        return raw if raw in allowed else "2mo"
    allowed = {"3mo", "6mo", "1y", "2y", "5y"}
    return raw if raw in allowed else "1y"


def _kr_chart_count_from_range(range_value: str) -> int:
    mapping = {
        "5d": 7,
        "1mo": 25,
        "2mo": 45,
        "3mo": 70,
        "6mo": 140,
        "1y": 280,
        "2y": 560,
        "5y": 1400,
    }
    return int(mapping.get(str(range_value or "").lower(), 280))


def _fetch_naver_kr_candles(code: str, *, count: int = 280, timeout_sec: float = 3.0) -> dict[str, Any]:
    cleaned = "".join(ch for ch in str(code or "") if ch.isdigit())
    if len(cleaned) != 6:
        raise RuntimeError("Invalid KRX code")

    params = urlencode(
        {
            "symbol": cleaned,
            "timeframe": "day",
            "count": str(max(30, min(count, 2000))),
            "requestType": "0",
        }
    )
    url = f"https://fchart.stock.naver.com/sise.nhn?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout_sec) as resp:
        raw = resp.read().decode("euc-kr", errors="ignore")

    rows = re.findall(r'<item\s+data="([^"]+)"\s*/?>', raw)
    candles: list[dict[str, Any]] = []
    for row in rows:
        parts = row.split("|")
        if len(parts) < 6:
            continue
        d, o, h, l, c, v = parts[:6]
        if any(x in {"", "null", "None"} for x in (d, o, h, l, c)):
            continue
        if len(d) < 8:
            continue
        try:
            dt = datetime.strptime(d[:8], "%Y%m%d").replace(tzinfo=ZoneInfo("Asia/Seoul"))
            candles.append(
                {
                    "time": int(dt.astimezone(ZoneInfo("UTC")).timestamp()),
                    "open": float(o),
                    "high": float(h),
                    "low": float(l),
                    "close": float(c),
                    "volume": int(float(v)) if v not in {"", "null", "None"} else 0,
                }
            )
        except Exception:
            continue

    if not candles:
        raise RuntimeError("Naver candles empty")

    return {
        "candles": candles,
        "meta": {
            "currency": "KRW",
            "exchange": "KRX",
            "timezone": "Asia/Seoul",
            "source": "naver",
        },
    }


def _kr_intraday_bucket_seconds(interval: str) -> int | None:
    normalized = str(interval or "").strip().lower()
    mapping = {
        "1m": 60,
        "3m": 3 * 60,
        "5m": 5 * 60,
        "15m": 15 * 60,
        "30m": 30 * 60,
        "60m": 60 * 60,
        "4h": 4 * 60 * 60,
    }
    return mapping.get(normalized)


def _kr_intraday_range_seconds(range_value: str) -> int:
    normalized = str(range_value or "").strip().lower()
    mapping = {
        "1d": 1 * 24 * 60 * 60,
        "5d": 5 * 24 * 60 * 60,
        "1mo": 31 * 24 * 60 * 60,
        "2mo": 62 * 24 * 60 * 60,
        "3mo": 93 * 24 * 60 * 60,
        "6mo": 186 * 24 * 60 * 60,
        "1y": 366 * 24 * 60 * 60,
        "2y": 2 * 366 * 24 * 60 * 60,
        "5y": 5 * 366 * 24 * 60 * 60,
    }
    return int(mapping.get(normalized, 5 * 24 * 60 * 60))


def _fetch_naver_kr_realtime_quote(code: str, timeout_sec: float = 2.0) -> dict[str, Any]:
    cleaned = "".join(ch for ch in str(code or "") if ch.isdigit())
    if len(cleaned) != 6:
        raise RuntimeError("Invalid KRX code")

    url = f"https://polling.finance.naver.com/api/realtime/domestic/stock/{cleaned}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout_sec) as resp:
        payload = json.loads(resp.read().decode("utf-8"))

    item = ((payload.get("datas") or [None])[0]) or {}
    if not isinstance(item, dict):
        raise RuntimeError("Naver realtime quote missing")

    price = _parse_naver_numeric_text(item.get("closePriceRaw") or item.get("closePrice"))
    high = _parse_naver_numeric_text(item.get("highPriceRaw") or item.get("highPrice"))
    low = _parse_naver_numeric_text(item.get("lowPriceRaw") or item.get("lowPrice"))
    open_price = _parse_naver_numeric_text(item.get("openPriceRaw") or item.get("openPrice"))
    volume_total = _parse_naver_numeric_text(
        item.get("accumulatedTradingVolumeRaw") or item.get("accumulatedTradingVolume")
    )
    traded_at = str(item.get("localTradedAt") or "").strip()

    traded_at_utc = None
    traded_ts = None
    if traded_at:
        try:
            dt = datetime.fromisoformat(traded_at)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=ZoneInfo("Asia/Seoul"))
            traded_ts = int(dt.astimezone(ZoneInfo("UTC")).timestamp())
            traded_at_utc = dt.astimezone(ZoneInfo("UTC")).isoformat()
        except Exception:
            traded_ts = None
            traded_at_utc = None

    if price is None:
        raise RuntimeError("Naver realtime close price missing")

    return {
        "price": float(price),
        "open": float(open_price) if open_price is not None else None,
        "high": float(high) if high is not None else float(price),
        "low": float(low) if low is not None else float(price),
        "volume_total": int(volume_total) if volume_total is not None else None,
        "market_status": str(item.get("marketStatus") or "").strip().upper(),
        "traded_ts": traded_ts,
        "traded_at_utc": traded_at_utc or _utc_now_iso(),
    }


def _apply_realtime_quote_to_candles(
    candles: list[dict[str, Any]],
    *,
    interval: str,
    quote: dict[str, Any],
) -> list[dict[str, Any]]:
    bucket_seconds = _kr_intraday_bucket_seconds(interval)
    traded_ts = int(_safe_float(quote.get("traded_ts")) or 0)
    price = _safe_float(quote.get("price"))
    if not candles or not bucket_seconds or traded_ts <= 0 or price is None:
        return candles

    bucket_ts = traded_ts // int(bucket_seconds) * int(bucket_seconds)
    rows = sorted(list(candles), key=lambda x: int(_safe_float(x.get("time")) or 0))
    last = rows[-1]
    last_ts = int(_safe_float(last.get("time")) or 0)

    if last_ts > bucket_ts:
        # Ignore out-of-order quote snapshots.
        return rows

    if last_ts < bucket_ts:
        prev_close = _safe_float(last.get("close")) or price
        rows.append(
            {
                "time": int(bucket_ts),
                "open": float(prev_close),
                "high": float(max(prev_close, price)),
                "low": float(min(prev_close, price)),
                "close": float(price),
                "volume": 0,
            }
        )
        return rows

    updated = dict(last)
    current_open = _safe_float(updated.get("open")) or price
    current_high = _safe_float(updated.get("high")) or price
    current_low = _safe_float(updated.get("low")) or price
    updated["close"] = float(price)
    updated["high"] = float(max(current_high, price))
    updated["low"] = float(min(current_low, price))
    updated["open"] = float(current_open)
    rows[-1] = updated
    return rows


def _fetch_naver_kr_intraday_candles(
    code: str,
    *,
    interval: str,
    range_value: str,
    timeout_sec: float = 3.0,
) -> dict[str, Any]:
    cleaned = "".join(ch for ch in str(code or "") if ch.isdigit())
    if len(cleaned) != 6:
        raise RuntimeError("Invalid KRX code")

    bucket_seconds = _kr_intraday_bucket_seconds(interval)
    if bucket_seconds is None:
        raise RuntimeError("Unsupported KR intraday interval")

    params = urlencode(
        {
            "symbol": cleaned,
            "timeframe": "minute",
            "count": "10000",
            "requestType": "0",
        }
    )
    url = f"https://fchart.stock.naver.com/sise.nhn?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout_sec) as resp:
        raw = resp.read().decode("euc-kr", errors="ignore")

    rows = re.findall(r'<item\s+data="([^"]+)"\s*/?>', raw)
    if not rows:
        raise RuntimeError("Naver minute candles empty")

    minute_candles: list[dict[str, Any]] = []
    prev_close: float | None = None
    prev_volume_cum: int | None = None
    for row in rows:
        parts = row.split("|")
        if len(parts) < 6:
            continue
        dt_raw, _open, _high, _low, close_raw, volume_raw = parts[:6]
        if len(dt_raw) < 12:
            continue

        close = _safe_float(close_raw)
        if close is None:
            continue

        try:
            dt = datetime.strptime(dt_raw[:12], "%Y%m%d%H%M").replace(tzinfo=ZoneInfo("Asia/Seoul"))
        except Exception:
            continue

        volume_cum = int(_safe_float(volume_raw) or 0)
        if prev_volume_cum is None or volume_cum < prev_volume_cum:
            volume = max(0, volume_cum)
        else:
            volume = max(0, volume_cum - prev_volume_cum)
        prev_volume_cum = volume_cum

        open_price = prev_close if prev_close is not None else close
        prev_close = close
        minute_candles.append(
            {
                "time": int(dt.astimezone(ZoneInfo("UTC")).timestamp()),
                "open": float(open_price),
                "high": float(max(open_price, close)),
                "low": float(min(open_price, close)),
                "close": float(close),
                "volume": int(volume),
            }
        )

    if not minute_candles:
        raise RuntimeError("Naver minute candles parse failed")

    candles = _aggregate_candles(minute_candles, bucket_seconds)
    if not candles:
        raise RuntimeError("Naver intraday aggregation failed")

    range_seconds = _kr_intraday_range_seconds(range_value)
    last_ts = int(candles[-1]["time"])
    cutoff_ts = max(0, last_ts - range_seconds)
    candles = [c for c in candles if int(c["time"]) >= cutoff_ts]
    if not candles:
        candles = [minute_candles[-1]]

    live_last_ts = int(_safe_float(minute_candles[-1].get("time")) or 0)
    quote_time_utc = _utc_now_iso()
    if live_last_ts > 0:
        try:
            quote_time_utc = datetime.fromtimestamp(live_last_ts, tz=ZoneInfo("UTC")).isoformat()
        except Exception:
            pass

    return {
        "candles": candles,
        "meta": {
            "currency": "KRW",
            "exchange": "KRX",
            "timezone": "Asia/Seoul",
            "source": "naver-live",
            "aggregated_from": "1m",
            "quote_time_utc": quote_time_utc,
        },
    }


def _yahoo_fetch_interval(interval: str) -> str:
    normalized = str(interval or "").strip().lower()
    if normalized == "3m":
        return "1m"
    if normalized == "4h":
        return "60m"
    return normalized


def _interval_bucket_seconds(interval: str) -> int | None:
    normalized = str(interval or "").strip().lower()
    mapping = {
        "3m": 3 * 60,
        "4h": 4 * 60 * 60,
    }
    return mapping.get(normalized)


def _aggregate_candles(candles: list[dict[str, Any]], bucket_seconds: int | None) -> list[dict[str, Any]]:
    if not bucket_seconds or bucket_seconds <= 0:
        return candles
    if len(candles) <= 1:
        return candles

    aggregated: list[dict[str, Any]] = []
    current: dict[str, Any] | None = None

    for row in sorted(candles, key=lambda x: int(_safe_float(x.get("time")) or 0)):
        ts = _safe_float(row.get("time"))
        o = _safe_float(row.get("open"))
        h = _safe_float(row.get("high"))
        l = _safe_float(row.get("low"))
        c = _safe_float(row.get("close"))
        if ts is None or o is None or h is None or l is None or c is None:
            continue

        bucket = int(ts) // int(bucket_seconds) * int(bucket_seconds)
        volume = int(_safe_float(row.get("volume")) or 0)

        if current is None or int(current["time"]) != bucket:
            if current is not None:
                aggregated.append(current)
            current = {
                "time": bucket,
                "open": o,
                "high": h,
                "low": l,
                "close": c,
                "volume": max(0, volume),
            }
            continue

        current["high"] = max(float(current["high"]), h)
        current["low"] = min(float(current["low"]), l)
        current["close"] = c
        current["volume"] = int(current["volume"]) + max(0, volume)

    if current is not None:
        aggregated.append(current)

    return aggregated or candles


def _merge_candles_prefer_live(base: list[dict[str, Any]], live: list[dict[str, Any]]) -> list[dict[str, Any]]:
    merged: dict[int, dict[str, Any]] = {}

    for row in base or []:
        ts = int(_safe_float(row.get("time")) or 0)
        if ts <= 0:
            continue
        merged[ts] = {
            "time": ts,
            "open": float(_safe_float(row.get("open")) or 0.0),
            "high": float(_safe_float(row.get("high")) or 0.0),
            "low": float(_safe_float(row.get("low")) or 0.0),
            "close": float(_safe_float(row.get("close")) or 0.0),
            "volume": int(_safe_float(row.get("volume")) or 0),
        }

    for row in live or []:
        ts = int(_safe_float(row.get("time")) or 0)
        if ts <= 0:
            continue
        merged[ts] = {
            "time": ts,
            "open": float(_safe_float(row.get("open")) or 0.0),
            "high": float(_safe_float(row.get("high")) or 0.0),
            "low": float(_safe_float(row.get("low")) or 0.0),
            "close": float(_safe_float(row.get("close")) or 0.0),
            "volume": int(_safe_float(row.get("volume")) or 0),
        }

    return sorted(merged.values(), key=lambda x: int(x["time"]))


def _replace_candle_tail_with_live(
    base: list[dict[str, Any]],
    live: list[dict[str, Any]],
    *,
    overlap_seconds: int = 0,
) -> list[dict[str, Any]]:
    if not live:
        return base or []
    live_sorted = sorted((live or []), key=lambda x: int(_safe_float(x.get("time")) or 0))
    first_live_ts = int(_safe_float(live_sorted[0].get("time")) or 0)
    cutoff_ts = max(0, first_live_ts - max(0, int(overlap_seconds or 0)))

    base_kept: list[dict[str, Any]] = []
    for row in base or []:
        ts = int(_safe_float(row.get("time")) or 0)
        if ts < cutoff_ts:
            base_kept.append(row)

    return _merge_candles_prefer_live(base_kept, live_sorted)


def _fetch_yahoo_candles(
    yahoo_symbol: str,
    *,
    interval: str = "30m",
    range_value: str = "2mo",
    timeout_sec: float = 3.0,
) -> dict[str, Any]:
    symbol = quote(str(yahoo_symbol or "").strip(), safe="=.-")
    params = urlencode(
        {
            "interval": interval,
            "range": range_value,
            "includePrePost": "false",
            "events": "div,splits",
        }
    )
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=timeout_sec) as resp:
        payload = json.loads(resp.read().decode("utf-8"))

    result = ((payload.get("chart") or {}).get("result") or [None])[0]
    if not result:
        raise RuntimeError("Yahoo chart result missing")

    meta = result.get("meta") or {}
    timestamps = result.get("timestamp") or []
    quote_data = (((result.get("indicators") or {}).get("quote") or [{}])[0]) or {}
    opens = quote_data.get("open") or []
    highs = quote_data.get("high") or []
    lows = quote_data.get("low") or []
    closes = quote_data.get("close") or []
    volumes = quote_data.get("volume") or []

    candles: list[dict[str, Any]] = []
    max_len = min(len(timestamps), len(opens), len(highs), len(lows), len(closes))
    for i in range(max_len):
        ts = timestamps[i]
        o = opens[i]
        h = highs[i]
        l = lows[i]
        c = closes[i]
        if ts is None or o is None or h is None or l is None or c is None:
            continue
        try:
            volume = int(volumes[i]) if i < len(volumes) and volumes[i] is not None else 0
        except Exception:
            volume = 0
        candles.append(
            {
                "time": int(ts),
                "open": float(o),
                "high": float(h),
                "low": float(l),
                "close": float(c),
                "volume": volume,
            }
        )

    if not candles:
        raise RuntimeError("Yahoo candles empty")

    return {
        "candles": candles,
        "meta": {
            "currency": str(meta.get("currency") or ""),
            "exchange": str(meta.get("exchangeName") or ""),
            "timezone": str(meta.get("exchangeTimezoneName") or ""),
        },
    }


def _cached_yahoo_candles(
    yahoo_symbol: str,
    *,
    interval: str,
    range_value: str,
    ttl_sec: float = CHART_CACHE_TTL_SEC,
) -> dict[str, Any]:
    key = f"{yahoo_symbol}|{interval}|{range_value}"
    now_mono = time.monotonic()
    cached = CHART_CACHE.get(key)
    if cached:
        cached_at = float(cached.get("fetched_at_monotonic") or 0.0)
        if now_mono - cached_at <= float(ttl_sec):
            payload = cached.get("payload")
            if isinstance(payload, dict):
                return payload

    payload = _fetch_yahoo_candles(yahoo_symbol, interval=interval, range_value=range_value)
    CHART_CACHE[key] = {
        "payload": payload,
        "fetched_at_monotonic": now_mono,
    }
    return payload


def _cached_yahoo_candles_with_fallback(
    yahoo_symbol: str,
    *,
    interval: str,
    range_value: str,
) -> tuple[dict[str, Any], str, str]:
    requested_interval = str(interval or "").strip().lower()
    fetch_interval = _yahoo_fetch_interval(requested_interval)
    attempts: list[tuple[str, str]] = [(fetch_interval, range_value)]

    if fetch_interval == "1m":
        for intraday_range in ("5d", "1d"):
            attempts.append((fetch_interval, intraday_range))
    elif fetch_interval.endswith("m"):
        for intraday_range in ("2mo", "1mo", "5d"):
            attempts.append((fetch_interval, intraday_range))
    elif fetch_interval == "60m":
        for intraday_range in ("6mo", "3mo", "2mo", "1mo"):
            attempts.append((fetch_interval, intraday_range))

    attempts.append(("1d", "1y"))

    fetched: dict[str, Any] | None = None
    used_interval = interval
    used_range = range_value
    last_exc: Exception | None = None
    seen: set[tuple[str, str]] = set()

    for interval_try, range_try in attempts:
        key = (interval_try, range_try)
        if key in seen:
            continue
        seen.add(key)
        try:
            fetched = _cached_yahoo_candles(yahoo_symbol, interval=interval_try, range_value=range_try)
            used_interval = interval_try
            used_range = range_try
            break
        except Exception as exc:
            last_exc = exc
            continue

    if fetched is None:
        raise RuntimeError(str(last_exc or "Yahoo candles fetch failed"))

    bucket_seconds = _interval_bucket_seconds(requested_interval)
    if bucket_seconds and used_interval == fetch_interval:
        fetched = {
            **fetched,
            "candles": _aggregate_candles(list(fetched.get("candles") or []), bucket_seconds),
        }
        meta = dict(fetched.get("meta") or {})
        meta["aggregated_from"] = fetch_interval
        fetched["meta"] = meta
        used_interval = requested_interval

    return fetched, used_interval, used_range


def _tv_chart_url(tv_symbol: str) -> str:
    return f"https://www.tradingview.com/chart/?symbol={tv_symbol}"


def _tv_widget_url(tv_symbol: str) -> str:
    params = {
        "symbol": tv_symbol,
        "interval": "30",
        "hidesidetoolbar": "0",
        "symboledit": "1",
        "saveimage": "1",
        "toolbarbg": "#f5f7fa",
        "theme": "light",
        "style": "1",
        "timezone": "Asia/Seoul",
        "withdateranges": "1",
        "hide_top_toolbar": "0",
        "allow_symbol_change": "1",
        "locale": "kr",
        "details": "1",
        "hotlist": "1",
        "calendar": "1",
    }
    return f"https://s.tradingview.com/widgetembed/?{urlencode(params)}"


def _load_symbol_chart_payload(
    *,
    query: str,
    interval: str,
    range_value: str,
    provider: str = "",
    yahoo_symbol_override: str = "",
) -> dict[str, Any]:
    tv_symbol = _tv_symbol_from_query(query)
    market = _market_from_tv_symbol(tv_symbol)
    yahoo_symbol = str(yahoo_symbol_override or "").strip().upper() or _yahoo_symbol_from_tv_symbol(tv_symbol)
    if not yahoo_symbol:
        raise RuntimeError("Invalid symbol")

    interval_used = interval
    range_used = range_value
    if market == "kr":
        fetched = None
        _, kr_symbol = _tv_symbol_parts(tv_symbol)
        kr_code = "".join(ch for ch in kr_symbol if ch.isdigit())
        kr_live_intraday_intervals = {"1m", "3m", "5m", "15m"}
        kr_hybrid_intraday_intervals = {"30m", "60m", "4h"}

        if provider != "yahoo" and interval in kr_live_intraday_intervals:
            try:
                fetched = _fetch_naver_kr_intraday_candles(
                    kr_code,
                    interval=interval,
                    range_value=range_value,
                )
                interval_used = interval
                range_used = range_value
            except Exception:
                fetched = None

        if provider == "yahoo" or interval != "1d":
            if fetched is None:
                try:
                    fetched, interval_used, range_used = _cached_yahoo_candles_with_fallback(
                        yahoo_symbol,
                        interval=interval,
                        range_value=range_value,
                    )
                except Exception:
                    fetched = None

        if provider != "yahoo" and interval in kr_hybrid_intraday_intervals:
            try:
                live_patch = _fetch_naver_kr_intraday_candles(
                    kr_code,
                    interval=interval,
                    range_value="5d",
                )
                if fetched is None:
                    fetched = live_patch
                    interval_used = interval
                    range_used = "5d"
                else:
                    bucket_seconds = int(_kr_intraday_bucket_seconds(interval) or 0)
                    merged_candles = _replace_candle_tail_with_live(
                        list(fetched.get("candles") or []),
                        list(live_patch.get("candles") or []),
                        overlap_seconds=bucket_seconds,
                    )
                    merged_meta = dict(fetched.get("meta") or {})
                    live_quote_time_utc = str((live_patch.get("meta") or {}).get("quote_time_utc") or "").strip()
                    if not live_quote_time_utc:
                        live_last_ts = int(_safe_float((live_patch.get("candles") or [{}])[-1].get("time")) or 0)
                        if live_last_ts > 0:
                            try:
                                live_quote_time_utc = datetime.fromtimestamp(
                                    live_last_ts,
                                    tz=ZoneInfo("UTC"),
                                ).isoformat()
                            except Exception:
                                live_quote_time_utc = ""
                    merged_meta.update(
                        {
                            "source": "hybrid-live",
                            "source_label": "야후+네이버",
                            "live_patch_source": (live_patch.get("meta") or {}).get("source"),
                            "quote_time_utc": live_quote_time_utc or _utc_now_iso(),
                        }
                    )
                    fetched = {
                        **fetched,
                        "candles": merged_candles,
                        "meta": merged_meta,
                    }
                    interval_used = interval
            except Exception:
                pass

        if fetched is None:
            fetched = _fetch_naver_kr_candles(kr_code, count=_kr_chart_count_from_range(range_value))
            interval_used = "1d"
            range_used = "1y" if interval == "1d" else range_value

        if provider != "yahoo" and interval in (kr_live_intraday_intervals | kr_hybrid_intraday_intervals):
            try:
                quote = _fetch_naver_kr_realtime_quote(kr_code)
                patched_candles = _apply_realtime_quote_to_candles(
                    list(fetched.get("candles") or []),
                    interval=interval,
                    quote=quote,
                )
                meta = dict(fetched.get("meta") or {})
                meta.update(
                    {
                        "quote_time_utc": str(quote.get("traded_at_utc") or _utc_now_iso()),
                        "realtime_quote_source": "naver-realtime",
                    }
                )
                fetched = {
                    **fetched,
                    "candles": patched_candles,
                    "meta": meta,
                }
            except Exception:
                pass
    else:
        fetched, interval_used, range_used = _cached_yahoo_candles_with_fallback(
            yahoo_symbol,
            interval=interval,
            range_value=range_value,
        )

    return {
        "ok": True,
        "tv_symbol": tv_symbol,
        "market": market,
        "yahoo_symbol": yahoo_symbol,
        "interval": interval_used,
        "range": range_used,
        "candles": fetched["candles"],
        "meta": fetched["meta"],
    }


def _load_indicator_chart_payload(
    *,
    indicator_id: str,
    interval: str,
    range_value: str,
) -> dict[str, Any]:
    indicator_key = str(indicator_id or "").strip().lower()
    spec = MARKET_INDICATOR_SPEC_BY_ID.get(indicator_key)
    if not spec:
        raise RuntimeError("Unknown indicator")

    yahoo_symbol = str(spec.get("symbol") or "").strip()
    if not yahoo_symbol:
        raise RuntimeError("Invalid indicator symbol")

    fetched, used_interval, used_range = _cached_yahoo_candles_with_fallback(
        yahoo_symbol,
        interval=interval,
        range_value=range_value,
    )
    session = str(spec.get("session") or "").strip().lower()
    market = "kr" if session == "kr_equity" else "us"
    return {
        "ok": True,
        "id": spec.get("id"),
        "label": spec.get("label"),
        "symbol": yahoo_symbol,
        "market": market,
        "interval": used_interval,
        "range": used_range,
        "candles": fetched["candles"],
        "meta": fetched["meta"],
    }


def _chart_stream_signature(payload: dict[str, Any]) -> tuple[Any, ...]:
    candles = list(payload.get("candles") or [])
    last_row = candles[-1] if candles else {}
    meta = dict(payload.get("meta") or {})
    return (
        int(_safe_float(last_row.get("time")) or 0),
        float(_safe_float(last_row.get("close")) or 0.0),
        float(_safe_float(last_row.get("high")) or 0.0),
        float(_safe_float(last_row.get("low")) or 0.0),
        int(_safe_float(last_row.get("volume")) or 0),
        str(meta.get("quote_time_utc") or ""),
        len(candles),
    )


def _chart_stream_sleep_seconds(interval: str) -> float:
    return 1.5 if interval in {"1m", "3m", "5m", "15m"} else 2.5


def create_app(config_path: str | None = None) -> Flask:
    _load_env_file()
    cfg = load_config(config_path).raw
    db_path = cfg["db_path"]
    chart_dir = Path(cfg["reporting"]["chart_dir"])
    report_dir = Path(cfg["reporting"]["daily_report_dir"])

    app = Flask(__name__, static_folder=str(WEB_DIR), static_url_path="/static")
    sock = Sock(app) if Sock is not None else None

    def _conn():
        conn = connect(db_path)
        init_db(conn)
        ensure_accounts(conn, cfg)
        return conn

    @app.get("/")
    def index() -> Any:
        return send_from_directory(WEB_DIR, "index.html")

    @app.get("/favicon.ico")
    def favicon() -> Any:
        return redirect("/static/favicon.svg", code=302)

    @app.get("/api/overview")
    def api_overview() -> Any:
        conn = _conn()
        try:
            accounts = [dict(r) for r in conn.execute("SELECT * FROM accounts ORDER BY market").fetchall()]
            kst_today = _today_kst()
            fills_today = conn.execute("SELECT COUNT(*) AS n FROM fills WHERE date(ts)=date(?)", (kst_today,)).fetchone()["n"]
            signals_today = conn.execute("SELECT COUNT(*) AS n FROM signals WHERE date(ts)=date(?)", (kst_today,)).fetchone()["n"]
            paused = bool(get_system_state(conn, "trading.paused", False))

            reports = sorted([p.name.replace(".md", "") for p in report_dir.glob("*.md")], reverse=True)
            latest_report = reports[0] if reports else None

            return jsonify(
                {
                    "ok": True,
                    "server_time_kst": _now_kst().isoformat(),
                    "paused": paused,
                    "accounts": accounts,
                    "metrics": {
                        "signals_today": int(signals_today),
                        "fills_today": int(fills_today),
                    },
                    "latest_report": latest_report,
                }
            )
        finally:
            conn.close()

    @app.get("/api/reports")
    def api_reports() -> Any:
        reports = sorted([p.name.replace(".md", "") for p in report_dir.glob("*.md")], reverse=True)
        return jsonify({"ok": True, "reports": reports})

    @app.get("/api/report/<date>")
    def api_report(date: str) -> Any:
        target = report_dir / f"{date}.md"
        if not target.exists():
            return jsonify({"ok": False, "error": "report not found"}), 404
        return jsonify({"ok": True, "date": date, "content": target.read_text(encoding="utf-8")})

    @app.get("/api/charts")
    def api_charts() -> Any:
        date = request.args.get("date", _today_kst())
        manifest = report_dir / f"{date}-charts.json"
        if not manifest.exists():
            return jsonify({"ok": True, "date": date, "charts": []})

        rows = json.loads(manifest.read_text(encoding="utf-8"))
        charts = []
        for row in rows:
            path = row.get("path")
            local_url = None
            if path:
                filename = Path(path).name
                local_path = chart_dir / filename
                if local_path.exists():
                    local_url = f"/charts/{filename}"
            charts.append(
                {
                    "symbol": row.get("symbol"),
                    "market": row.get("market"),
                    "status": row.get("status"),
                    "tradingview_url": row.get("url"),
                    "local_url": local_url,
                }
            )
        return jsonify({"ok": True, "date": date, "charts": charts})

    @app.get("/api/chart/resolve")
    def api_chart_resolve() -> Any:
        query = str(request.args.get("query", ""))
        tv_symbol = _tv_symbol_from_query(query)
        market = _market_from_tv_symbol(tv_symbol)
        yahoo_symbol = _yahoo_symbol_from_tv_symbol(tv_symbol)
        return jsonify(
            {
                "ok": True,
                "query": query,
                "tv_symbol": tv_symbol,
                "market": market,
                "yahoo_symbol": yahoo_symbol,
                "preferred_renderer": "local-candles" if market == "kr" else "tradingview-embed",
                "chart_url": _tv_chart_url(tv_symbol),
                "widget_url": _tv_widget_url(tv_symbol),
            }
        )

    @app.get("/api/chart/candles")
    def api_chart_candles() -> Any:
        query = str(request.args.get("query", ""))
        interval = _normalize_chart_interval(request.args.get("interval"))
        range_value = _normalize_chart_range(request.args.get("range"), interval)
        provider = str(request.args.get("provider", "")).strip().lower()
        yahoo_override = str(request.args.get("yahoo", "")).strip().upper()

        try:
            payload = _load_symbol_chart_payload(
                query=query,
                interval=interval,
                range_value=range_value,
                provider=provider,
                yahoo_symbol_override=yahoo_override,
            )
        except Exception as exc:
            tv_symbol = _tv_symbol_from_query(query)
            market = _market_from_tv_symbol(tv_symbol)
            yahoo_symbol = str(yahoo_override or "").strip().upper() or _yahoo_symbol_from_tv_symbol(tv_symbol)
            return (
                jsonify(
                    {
                        "ok": False,
                        "error": "차트 데이터를 가져오지 못했습니다.",
                        "details": str(exc),
                        "tv_symbol": tv_symbol,
                        "market": market,
                        "yahoo_symbol": yahoo_symbol,
                    }
                ),
                502,
            )
        return jsonify(payload)

    @app.get("/api/market-indicators")
    def api_market_indicators() -> Any:
        items = _get_market_indicators()
        return jsonify(
            {
                "ok": True,
                "server_time_kst": _now_kst().isoformat(),
                "items": items,
            }
        )

    @app.get("/api/market-indicators/<indicator_id>/candles")
    def api_market_indicator_candles(indicator_id: str) -> Any:
        indicator_key = str(indicator_id or "").strip().lower()
        spec = MARKET_INDICATOR_SPEC_BY_ID.get(indicator_key)
        if not spec:
            return jsonify({"ok": False, "error": "Unknown indicator"}), 404

        interval = _normalize_chart_interval(request.args.get("interval"))
        range_value = _normalize_chart_range(request.args.get("range"), interval)

        try:
            payload = _load_indicator_chart_payload(
                indicator_id=indicator_id,
                interval=interval,
                range_value=range_value,
            )
        except Exception as exc:
            indicator_key = str(indicator_id or "").strip().lower()
            spec = MARKET_INDICATOR_SPEC_BY_ID.get(indicator_key) or {}
            return (
                jsonify(
                    {
                        "ok": False,
                        "error": "지표 차트 데이터를 가져오지 못했습니다.",
                        "details": str(exc),
                        "id": spec["id"],
                        "label": spec["label"],
                        "symbol": spec["symbol"],
                    }
                ),
                502,
            )
        return jsonify(payload)

    @app.get("/api/chart/stream")
    def api_chart_stream() -> Any:
        indicator_id = str(request.args.get("indicator_id", "")).strip().lower()
        query = str(request.args.get("query", "")).strip()
        interval = _normalize_chart_interval(request.args.get("interval"))
        range_value = _normalize_chart_range(request.args.get("range"), interval)
        provider = str(request.args.get("provider", "")).strip().lower()
        yahoo_override = str(request.args.get("yahoo", "")).strip().upper()

        if not indicator_id and not query:
            return jsonify({"ok": False, "error": "query or indicator_id is required"}), 400

        def _event_stream():
            last_sig: tuple[Any, ...] | None = None
            heartbeat_n = 0
            sleep_sec = _chart_stream_sleep_seconds(interval)

            while True:
                try:
                    if indicator_id:
                        payload = _load_indicator_chart_payload(
                            indicator_id=indicator_id,
                            interval=interval,
                            range_value=range_value,
                        )
                    else:
                        payload = _load_symbol_chart_payload(
                            query=query,
                            interval=interval,
                            range_value=range_value,
                            provider=provider,
                            yahoo_symbol_override=yahoo_override,
                        )

                    sig = _chart_stream_signature(payload)
                    if sig != last_sig:
                        last_sig = sig
                        message = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
                        yield f"data: {message}\n\n"
                    else:
                        heartbeat_n += 1
                        if heartbeat_n % 8 == 0:
                            yield ": keep-alive\n\n"
                except Exception as exc:
                    error_payload = {"ok": False, "error": str(exc)}
                    yield f"data: {json.dumps(error_payload, ensure_ascii=False)}\n\n"
                time.sleep(sleep_sec)

        return Response(
            stream_with_context(_event_stream()),
            mimetype="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no",
                "Connection": "keep-alive",
            },
        )

    if sock is not None:

        @sock.route("/api/chart/ws")
        def api_chart_ws(ws: Any) -> None:
            indicator_id = str(request.args.get("indicator_id", "")).strip().lower()
            query = str(request.args.get("query", "")).strip()
            interval = _normalize_chart_interval(request.args.get("interval"))
            range_value = _normalize_chart_range(request.args.get("range"), interval)
            provider = str(request.args.get("provider", "")).strip().lower()
            yahoo_override = str(request.args.get("yahoo", "")).strip().upper()

            if not indicator_id and not query:
                ws.send(json.dumps({"ok": False, "error": "query or indicator_id is required"}, ensure_ascii=False))
                return

            last_sig: tuple[Any, ...] | None = None
            heartbeat_n = 0
            sleep_sec = _chart_stream_sleep_seconds(interval)

            while True:
                try:
                    if indicator_id:
                        payload = _load_indicator_chart_payload(
                            indicator_id=indicator_id,
                            interval=interval,
                            range_value=range_value,
                        )
                    else:
                        payload = _load_symbol_chart_payload(
                            query=query,
                            interval=interval,
                            range_value=range_value,
                            provider=provider,
                            yahoo_symbol_override=yahoo_override,
                        )

                    sig = _chart_stream_signature(payload)
                    if sig != last_sig:
                        last_sig = sig
                        ws.send(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
                    else:
                        heartbeat_n += 1
                        if heartbeat_n % 10 == 0:
                            ws.send(json.dumps({"ok": True, "type": "keepalive"}, ensure_ascii=False))
                    time.sleep(sleep_sec)
                except Exception as exc:
                    try:
                        ws.send(json.dumps({"ok": False, "error": str(exc)}, ensure_ascii=False))
                    except Exception:
                        return
                    time.sleep(2.0)

    @app.get("/api/market-indicators/stream")
    def api_market_indicators_stream() -> Any:
        def _event_stream():
            last_sig: tuple[Any, ...] | None = None
            heartbeat_n = 0
            while True:
                try:
                    items = _get_market_indicators()
                    payload = {
                        "ok": True,
                        "server_time_kst": _now_kst().isoformat(),
                        "items": items,
                    }
                    sig = _indicator_stream_signature(items)
                    if sig != last_sig:
                        last_sig = sig
                        yield f"data: {json.dumps(payload, ensure_ascii=False, separators=(',', ':'))}\n\n"
                    else:
                        heartbeat_n += 1
                        if heartbeat_n % 8 == 0:
                            yield ": keep-alive\n\n"
                    time.sleep(_indicator_stream_sleep_seconds(items))
                except GeneratorExit:
                    break
                except Exception as exc:
                    err = {"ok": False, "error": str(exc), "server_time_kst": _now_kst().isoformat()}
                    yield f"event: error\ndata: {json.dumps(err, ensure_ascii=False)}\n\n"
                    time.sleep(2.0)

        headers = {
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        }
        return Response(stream_with_context(_event_stream()), mimetype="text/event-stream", headers=headers)

    if sock is not None:

        @sock.route("/api/market-indicators/ws")
        def api_market_indicators_ws(ws: Any) -> None:
            last_sig: tuple[Any, ...] | None = None
            heartbeat_n = 0

            while True:
                try:
                    items = _get_market_indicators()
                    payload = {
                        "ok": True,
                        "server_time_kst": _now_kst().isoformat(),
                        "items": items,
                    }
                    sig = _indicator_stream_signature(items)
                    if sig != last_sig:
                        last_sig = sig
                        ws.send(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
                    else:
                        heartbeat_n += 1
                        if heartbeat_n % 10 == 0:
                            ws.send(json.dumps({"ok": True, "type": "keepalive"}, ensure_ascii=False))
                    time.sleep(_indicator_stream_sleep_seconds(items))
                except Exception as exc:
                    try:
                        ws.send(
                            json.dumps(
                                {
                                    "ok": False,
                                    "error": str(exc),
                                    "server_time_kst": _now_kst().isoformat(),
                                },
                                ensure_ascii=False,
                            )
                        )
                    except Exception:
                        return
                    time.sleep(2.0)

    @app.get("/api/portfolio")
    def api_portfolio() -> Any:
        conn = _conn()
        try:
            account_rows = [dict(r) for r in conn.execute("SELECT * FROM accounts ORDER BY market").fetchall()]
            accounts = {str(r["market"]): r for r in account_rows}
            us_equity = float(accounts.get("us", {}).get("equity", 0.0))
            kr_equity = float(accounts.get("kr", {}).get("equity", 0.0))

            fx_quote = _get_live_usdkrw(conn, ttl_sec=FX_CACHE_TTL_SEC)
            usdkrw = _safe_rate(fx_quote.get("rate"))
            if usdkrw is not None and usdkrw > 0:
                total_krw = kr_equity + (us_equity * usdkrw)
                total_usd = us_equity + (kr_equity / usdkrw)
            else:
                total_krw = None
                total_usd = None

            positions = [
                dict(r)
                for r in conn.execute(
                    """
                    SELECT market, symbol, qty, avg_price, mark_price, unrealized_pnl, realized_pnl,
                           COALESCE(strategy, 'unassigned') AS strategy, updated_ts,
                           ABS(qty * mark_price) AS notional
                    FROM positions
                    ORDER BY ABS(qty * mark_price) DESC
                    LIMIT 60
                    """
                ).fetchall()
            ]

            recent_fills = [
                dict(r)
                for r in conn.execute(
                    """
                    SELECT f.ts, f.market, f.symbol, f.side, f.qty, f.price, f.fee,
                           f.realized_pnl, COALESCE(o.strategy, 'unassigned') AS strategy,
                           COALESCE(o.bucket, '-') AS bucket
                    FROM fills f
                    LEFT JOIN orders o ON o.order_id=f.order_id
                    ORDER BY f.ts DESC
                    LIMIT 80
                    """
                ).fetchall()
            ]

            agent_exposure = [
                dict(r)
                for r in conn.execute(
                    """
                    SELECT COALESCE(strategy, 'unassigned') AS strategy, market,
                           COUNT(*) AS position_count,
                           SUM(ABS(qty * mark_price)) AS notional,
                           SUM(unrealized_pnl + realized_pnl) AS pnl
                    FROM positions
                    GROUP BY COALESCE(strategy, 'unassigned'), market
                    ORDER BY notional DESC
                    """
                ).fetchall()
            ]

            quick_rows = [
                dict(r)
                for r in conn.execute(
                    """
                    SELECT market, symbol
                    FROM (
                        SELECT market, symbol, ABS(qty * mark_price) AS rank_v, updated_ts AS ts_v
                        FROM positions
                        UNION ALL
                        SELECT market, symbol, ABS(qty * price) AS rank_v, ts AS ts_v
                        FROM fills
                    )
                    ORDER BY rank_v DESC, ts_v DESC
                    LIMIT 30
                    """
                ).fetchall()
            ]

            seen: set[str] = set()
            quick_symbols: list[dict[str, str]] = []
            for row in quick_rows:
                market = str(row["market"])
                symbol = str(row["symbol"])
                key = f"{market}:{symbol}"
                if key in seen:
                    continue
                seen.add(key)
                quick_symbols.append(
                    {
                        "market": market,
                        "symbol": symbol,
                        "tv_symbol": tradingview_symbol(market, symbol),
                    }
                )
                if len(quick_symbols) >= 12:
                    break

            return jsonify(
                {
                    "ok": True,
                    "totals": {
                        "us_equity": us_equity,
                        "kr_equity": kr_equity,
                        "usdkrw": usdkrw,
                        "fx_source": fx_quote["source"],
                        "fx_quote_time_utc": fx_quote["quote_time_utc"],
                        "fx_stale": bool(fx_quote["stale"]),
                        "total_usd_est": total_usd,
                        "total_krw_est": total_krw,
                    },
                    "agent_exposure": agent_exposure,
                    "positions": positions,
                    "recent_fills": recent_fills,
                    "quick_symbols": quick_symbols,
                }
            )
        finally:
            conn.close()

    @app.get("/api/fx")
    def api_fx() -> Any:
        conn = _conn()
        try:
            fx_quote = _get_live_usdkrw(conn, ttl_sec=FX_CACHE_TTL_SEC)
            return jsonify(
                {
                    "ok": True,
                    "usdkrw": _safe_rate(fx_quote.get("rate")),
                    "source": fx_quote["source"],
                    "stale": bool(fx_quote["stale"]),
                    "quote_time_utc": fx_quote["quote_time_utc"],
                }
            )
        finally:
            conn.close()

    @app.get("/api/logo")
    def api_logo() -> Any:
        market = str(request.args.get("market", "")).strip().lower()
        symbol = str(request.args.get("symbol", "")).strip()
        try:
            size = int(str(request.args.get("size", "128")).strip() or "128")
        except Exception:
            size = 128
        size = max(32, min(256, size))

        domain = _logo_domain_for_symbol(market, symbol)
        if not domain:
            return "", 404

        cached = _load_logo_cache(domain)
        if cached is not None:
            data, mime = cached
            resp = app.response_class(data, mimetype=mime)
            resp.headers["Cache-Control"] = "public, max-age=3600"
            resp.headers["X-Logo-Source"] = "cache"
            return resp

        token = str(os.getenv("LOGO_DEV_TOKEN") or os.getenv("TRADING_FIRM_LOGO_DEV_TOKEN") or "").strip() or None
        for source, url in _logo_provider_urls(domain, token=token, size=size):
            fetched = _fetch_logo(url)
            if fetched is None:
                continue
            data, mime = fetched
            _save_logo_cache(domain, data, mime)

            resp = app.response_class(data, mimetype=mime)
            resp.headers["Cache-Control"] = "public, max-age=3600"
            resp.headers["X-Logo-Source"] = source
            return resp

        return "", 404

    @app.get("/charts/<path:filename>")
    def chart_file(filename: str) -> Any:
        return send_from_directory(chart_dir, filename)

    return app


def main() -> None:
    app = create_app()
    host = os.environ.get("TRADING_FIRM_DASHBOARD_HOST", "127.0.0.1")
    port = int(os.environ.get("TRADING_FIRM_DASHBOARD_PORT", "8765"))
    app.run(host=host, port=port, debug=False)


if __name__ == "__main__":
    main()
