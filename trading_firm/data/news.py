from __future__ import annotations

from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from typing import Any

try:
    import feedparser  # type: ignore
except Exception:  # pragma: no cover
    feedparser = None


def infer_market(title: str) -> str:
    t = title.lower()
    kr_keywords = ["korea", "kospi", "kosdaq", "seoul", "삼성", "한국", "코스피", "코스닥"]
    if any(k in t for k in kr_keywords):
        return "kr"
    return "us"


def impact_score(title: str, summary: str) -> float:
    text = f"{title} {summary}".lower()
    high = ["rate", "fomc", "cpi", "inflation", "tariff", "war", "ban", "earnings", "guidance"]
    score = 0.0
    for k in high:
        if k in text:
            score += 0.4
    if "downgrade" in text or "miss" in text:
        score += 0.3
    if "upgrade" in text or "beat" in text:
        score += 0.3
    return min(score, 3.0)


def collect_news_events(rss_feeds: list[str], asof: datetime) -> list[dict[str, Any]]:
    if feedparser is None:
        return []
    since = asof - timedelta(hours=18)
    events: list[dict[str, Any]] = []
    for feed in rss_feeds:
        parsed = feedparser.parse(feed)
        source = getattr(parsed, "feed", {}).get("title", feed)
        for entry in getattr(parsed, "entries", []):
            title = str(entry.get("title", "")).strip()
            if not title:
                continue
            summary = str(entry.get("summary", "")).strip()
            published_raw = entry.get("published") or entry.get("updated")
            if published_raw:
                try:
                    published = parsedate_to_datetime(str(published_raw)).astimezone(timezone.utc)
                except Exception:
                    published = asof
            else:
                published = asof
            if published < since:
                continue
            events.append(
                {
                    "id": entry.get("id") or entry.get("link") or f"{feed}:{title}",
                    "market": infer_market(title),
                    "title": title,
                    "source": str(source),
                    "url": entry.get("link"),
                    "published_ts": published.isoformat(),
                    "summary": summary,
                    "impact_score": impact_score(title, summary),
                }
            )
    return events
