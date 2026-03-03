from __future__ import annotations

import json
from datetime import datetime
from zoneinfo import ZoneInfo

import trading_firm.dashboard_server as dashboard_server
from trading_firm.dashboard_server import create_app


def test_dashboard_api_basic(tmp_path, monkeypatch) -> None:
    db_path = tmp_path / "dash.db"
    report_dir = tmp_path / "reports"
    chart_dir = tmp_path / "charts"
    report_dir.mkdir(parents=True, exist_ok=True)
    chart_dir.mkdir(parents=True, exist_ok=True)

    cfg = {
        "timezone": "Asia/Seoul",
        "db_path": str(db_path),
        "accounts": {
            "us": {"account_id": "us-paper", "currency": "USD", "initial_equity": 100000.0},
            "kr": {"account_id": "kr-paper", "currency": "KRW", "initial_equity": 100000000.0},
        },
        "reporting": {"daily_report_dir": str(report_dir), "chart_dir": str(chart_dir)},
        "control": {"allowed_actors": ["local-ui"]},
    }
    cfg_path = tmp_path / "firm.json"
    cfg_path.write_text(json.dumps(cfg), encoding="utf-8")

    app = create_app(str(cfg_path))
    client = app.test_client()

    monkeypatch.setattr(
        dashboard_server,
        "_fetch_yahoo_candles",
        lambda *_args, **_kwargs: {
            "candles": [
                {"time": 1700000000, "open": 65000.0, "high": 65500.0, "low": 64800.0, "close": 65200.0, "volume": 1200000},
                {"time": 1700001800, "open": 65200.0, "high": 65700.0, "low": 65100.0, "close": 65600.0, "volume": 980000},
            ],
            "meta": {"currency": "KRW", "exchange": "KRX", "timezone": "Asia/Seoul"},
        },
    )
    monkeypatch.setattr(
        dashboard_server,
        "_fetch_naver_kr_candles",
        lambda *_args, **_kwargs: {
            "candles": [
                {"time": 1700000000, "open": 65000.0, "high": 65500.0, "low": 64800.0, "close": 65200.0, "volume": 1200000},
                {"time": 1700086400, "open": 65200.0, "high": 65700.0, "low": 65100.0, "close": 65600.0, "volume": 980000},
            ],
            "meta": {"currency": "KRW", "exchange": "KRX", "timezone": "Asia/Seoul", "source": "naver"},
        },
    )

    rv = client.get("/api/overview")
    assert rv.status_code == 200
    payload = rv.get_json()
    assert payload["ok"] is True
    assert isinstance(payload["accounts"], list)

    rv = client.get("/api/reports")
    assert rv.status_code == 200
    payload = rv.get_json()
    assert payload["ok"] is True

    rv = client.get("/api/market-indicators")
    assert rv.status_code == 200
    payload = rv.get_json()
    assert payload["ok"] is True
    assert isinstance(payload["items"], list)
    assert len(payload["items"]) >= 8
    sample = payload["items"][0]
    assert "session_status" in sample
    assert "session_label" in sample

    rv = client.get("/api/market-indicators/nasdaq/candles?interval=30m&range=1mo")
    assert rv.status_code == 200
    payload = rv.get_json()
    assert payload["ok"] is True
    assert payload["id"] == "nasdaq"
    assert payload["symbol"] == "^IXIC"
    assert payload["interval"] == "30m"
    assert payload["range"] == "1mo"
    assert len(payload["candles"]) >= 1

    rv = client.get("/api/market-indicators/unknown/candles")
    assert rv.status_code == 404
    payload = rv.get_json()
    assert payload["ok"] is False

    rv = client.get("/api/chart/resolve?query=005930")
    assert rv.status_code == 200
    payload = rv.get_json()
    assert payload["ok"] is True
    assert payload["tv_symbol"] == "KRX:005930"
    assert payload["market"] == "kr"
    assert payload["yahoo_symbol"] == "005930.KS"
    assert "widget_url" in payload

    rv = client.get("/api/chart/candles?query=005930")
    assert rv.status_code == 200
    payload = rv.get_json()
    assert payload["ok"] is True
    assert payload["market"] == "kr"
    assert payload["yahoo_symbol"] == "005930.KS"
    assert len(payload["candles"]) >= 1

    rv = client.get("/api/portfolio")
    assert rv.status_code == 200
    payload = rv.get_json()
    assert payload["ok"] is True
    assert "totals" in payload
    assert isinstance(payload["positions"], list)


def test_logo_api_symbol_proxy(tmp_path, monkeypatch) -> None:
    db_path = tmp_path / "dash.db"
    report_dir = tmp_path / "reports"
    chart_dir = tmp_path / "charts"
    report_dir.mkdir(parents=True, exist_ok=True)
    chart_dir.mkdir(parents=True, exist_ok=True)

    cfg = {
        "timezone": "Asia/Seoul",
        "db_path": str(db_path),
        "accounts": {
            "us": {"account_id": "us-paper", "currency": "USD", "initial_equity": 100000.0},
            "kr": {"account_id": "kr-paper", "currency": "KRW", "initial_equity": 100000000.0},
        },
        "reporting": {"daily_report_dir": str(report_dir), "chart_dir": str(chart_dir)},
        "control": {"allowed_actors": ["local-ui"]},
    }
    cfg_path = tmp_path / "firm.json"
    cfg_path.write_text(json.dumps(cfg), encoding="utf-8")

    png_bytes = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR"

    monkeypatch.setattr(dashboard_server, "_load_logo_cache", lambda _domain: None)
    monkeypatch.setattr(dashboard_server, "_save_logo_cache", lambda _domain, _data, _mime: None)
    monkeypatch.setattr(dashboard_server, "_fetch_logo", lambda _url, timeout_sec=2.5: (png_bytes, "image/png"))

    app = create_app(str(cfg_path))
    client = app.test_client()

    rv = client.get("/api/logo?market=us&symbol=AAPL")
    assert rv.status_code == 200
    assert rv.mimetype == "image/png"
    assert rv.data.startswith(b"\x89PNG")

    rv = client.get("/api/logo?market=us&symbol=UNKNOWN")
    assert rv.status_code == 404


def test_market_holiday_detection_and_open_flag() -> None:
    kr_spec = next(spec for spec in dashboard_server.MARKET_INDICATOR_SPECS if spec["id"] == "kospi")
    us_spec = next(spec for spec in dashboard_server.MARKET_INDICATOR_SPECS if spec["id"] == "nasdaq")

    # 2026-03-02 is substitute holiday in Korea (March 1st observance).
    kr_holiday_dt = datetime(2026, 3, 2, 10, 0, tzinfo=ZoneInfo("Asia/Seoul"))
    assert dashboard_server._is_market_holiday(kr_spec, kr_holiday_dt) is True
    assert dashboard_server._market_is_open(kr_spec, kr_holiday_dt) is False

    # 2026-01-01 is New Year's Day holiday for NYSE.
    us_holiday_dt = datetime(2026, 1, 1, 10, 0, tzinfo=ZoneInfo("America/New_York"))
    assert dashboard_server._is_market_holiday(us_spec, us_holiday_dt) is True
    assert dashboard_server._market_is_open(us_spec, us_holiday_dt) is False


def test_us_equity_session_phase_windows() -> None:
    us_spec = next(spec for spec in dashboard_server.MARKET_INDICATOR_SPECS if spec["id"] == "nasdaq")

    pre_dt = datetime(2026, 2, 3, 8, 0, tzinfo=ZoneInfo("America/New_York"))
    reg_dt = datetime(2026, 2, 3, 11, 0, tzinfo=ZoneInfo("America/New_York"))
    aft_dt = datetime(2026, 2, 3, 17, 30, tzinfo=ZoneInfo("America/New_York"))
    closed_dt = datetime(2026, 2, 3, 22, 0, tzinfo=ZoneInfo("America/New_York"))

    assert dashboard_server._session_phase(us_spec, pre_dt) == "pre"
    assert dashboard_server._session_phase(us_spec, reg_dt) == "regular"
    assert dashboard_server._session_phase(us_spec, aft_dt) == "after"
    assert dashboard_server._session_phase(us_spec, closed_dt) == "closed"

    assert dashboard_server._market_is_open(us_spec, pre_dt) is True
    assert dashboard_server._market_is_open(us_spec, reg_dt) is True
    assert dashboard_server._market_is_open(us_spec, aft_dt) is True
    assert dashboard_server._market_is_open(us_spec, closed_dt) is False
