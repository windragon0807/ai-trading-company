from datetime import datetime, timezone

from trading_firm.reporting.charts import build_chart_artifacts


def test_chart_fallback_link_only(tmp_path) -> None:
    artifacts = build_chart_artifacts(
        market="us",
        symbols=["AAPL"],
        out_dir=str(tmp_path),
        asof=datetime(2026, 3, 1, tzinfo=timezone.utc),
    )
    assert len(artifacts) == 1
    assert artifacts[0].url.startswith("https://www.tradingview.com/chart/")
    assert artifacts[0].status in {"captured", "link_only"}
