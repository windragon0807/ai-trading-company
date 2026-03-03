import { KR_SYMBOL_NAMES, normalizeKrCode } from "./dashboardUtils";

export function localChartPalette(theme) {
  const dark = theme === "dark";
  return {
    background: dark ? "#141f2b" : "#ffffff",
    text: dark ? "#9fb0c2" : "#6b7684",
    grid: dark ? "#243546" : "#eef2f7",
    up: "#f04452",
    down: "#3f7cff",
    volumeUp: dark ? "rgba(240, 68, 82, 0.55)" : "rgba(240, 68, 82, 0.38)",
    volumeDown: dark ? "rgba(63, 124, 255, 0.55)" : "rgba(63, 124, 255, 0.38)",
  };
}

export function defaultOverview() {
  return {
    paused: false,
    server_time_kst: null,
    accounts: [],
    metrics: { signals_today: 0, fills_today: 0 },
    latest_report: null,
  };
}

export function defaultPortfolio() {
  return {
    totals: {},
    positions: [],
    recent_fills: [],
    agent_exposure: [],
    quick_symbols: [],
  };
}

export const TEMP_MACRO_SKELETON_MS = 4000;
export const OVERVIEW_PORTFOLIO_POLL_MS = 5000;
export const MARKET_INDICATOR_FALLBACK_POLL_MS = 2000;
export const MARKET_INDICATOR_STREAM_STALE_MS = 4500;
export const LOCAL_CHART_RIGHT_OFFSET = 4;
export const LOCAL_CHART_PRICE_SCALE_MIN_WIDTH = 92;

const LOCAL_CHART_REFRESH_MS = {
  "1m": 3000,
  "3m": 4000,
  "5m": 5000,
  "15m": 8000,
  "30m": 12000,
  "60m": 15000,
  "4h": 30000,
  "1d": 60000,
};

export const LOCAL_CHART_INTERVAL_OPTIONS = [
  { value: "1m", label: "1분", range: "5d" },
  { value: "3m", label: "3분", range: "5d" },
  { value: "5m", label: "5분", range: "5d" },
  { value: "15m", label: "15분", range: "5d" },
  { value: "30m", label: "30분", range: "1mo" },
  { value: "60m", label: "1시간", range: "2mo" },
  { value: "4h", label: "4시간", range: "6mo" },
  { value: "1d", label: "1일", range: "1y" },
];

const LOCAL_CHART_INTERVAL_VALUES = new Set(LOCAL_CHART_INTERVAL_OPTIONS.map((opt) => opt.value));
export const LOCAL_CHART_INTERVAL_DEFAULT = "30m";
export const LOCAL_CHART_BACKFILL_PAST_BARS_THRESHOLD = 24;
export const LOCAL_CHART_LEFT_BACKFILL_COOLDOWN_MS = 1200;

const MACRO_INDICATOR_CHART_QUERY = {
  usdkrw: "FX_IDC:USDKRW",
  nasdaq: "NASDAQ:IXIC",
  nasdaq100f: "CME_MINI:NQ1!",
  sp500: "SP:SPX",
  dowjones: "DJ:DJI",
  vix: "TVC:VIX",
  kospi: "TVC:KOSPI",
  kosdaq: "TVC:KOSDAQ",
};

export const DEFAULT_BOOTSTRAP_INDICATOR = {
  id: "usdkrw",
  label: "달러 환율",
  tv_symbol: "FX_IDC:USDKRW",
};

export function macroIndicatorChartQuery(item) {
  const id = String(item?.id || "").trim().toLowerCase();
  if (id && MACRO_INDICATOR_CHART_QUERY[id]) {
    return MACRO_INDICATOR_CHART_QUERY[id];
  }
  const fallback = String(item?.tv_symbol || item?.symbol || "").trim();
  return fallback || "";
}

export function tvChartUrl(tvSymbol) {
  return `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(tvSymbol)}`;
}

export function buildTvWidgetUrl(tvSymbol) {
  const params = new URLSearchParams({
    symbol: tvSymbol,
    interval: "30",
    hidesidetoolbar: "0",
    symboledit: "1",
    saveimage: "1",
    toolbarbg: "#f5f7fa",
    theme: "light",
    style: "1",
    timezone: "Asia/Seoul",
    withdateranges: "1",
    hide_top_toolbar: "0",
    allow_symbol_change: "1",
    locale: "kr",
    details: "1",
    hotlist: "1",
    calendar: "1",
  });
  return `https://s.tradingview.com/widgetembed/?${params.toString()}`;
}

export function normalizeLocalChartInterval(interval) {
  const normalized = String(interval || "").trim().toLowerCase();
  return LOCAL_CHART_INTERVAL_VALUES.has(normalized) ? normalized : LOCAL_CHART_INTERVAL_DEFAULT;
}

export function localChartRangeByInterval(interval) {
  const normalized = normalizeLocalChartInterval(interval);
  return LOCAL_CHART_INTERVAL_OPTIONS.find((opt) => opt.value === normalized)?.range || "2mo";
}

function localChartRangeSteps(interval) {
  const normalized = normalizeLocalChartInterval(interval);
  if (normalized === "1d") {
    return ["1y", "2y", "5y"];
  }
  if (normalized === "4h") {
    return ["6mo", "1y", "2y", "5y"];
  }
  if (normalized === "60m") {
    return ["2mo", "3mo", "6mo", "1y", "2y", "5y"];
  }
  if (normalized === "30m") {
    return ["1mo", "2mo", "3mo", "6mo", "1y", "2y", "5y"];
  }
  return ["5d", "1mo", "2mo", "3mo", "6mo", "1y", "2y", "5y"];
}

export function localChartNextRange(interval, currentRange) {
  const steps = localChartRangeSteps(interval);
  const current = String(currentRange || "").trim().toLowerCase();
  const idx = steps.indexOf(current);
  if (idx < 0) {
    const base = localChartRangeByInterval(interval);
    const baseIdx = steps.indexOf(base);
    if (baseIdx >= 0 && baseIdx + 1 < steps.length) return steps[baseIdx + 1];
    return steps[0] || "";
  }
  return steps[idx + 1] || "";
}

export function localChartIntervalLabel(interval) {
  const normalized = normalizeLocalChartInterval(interval);
  return LOCAL_CHART_INTERVAL_OPTIONS.find((opt) => opt.value === normalized)?.label || "30분";
}

export function localChartRangeLabel(rangeValue) {
  const raw = String(rangeValue || "").trim().toLowerCase();
  const labels = {
    "1d": "최근 1일",
    "5d": "최근 5일",
    "1mo": "최근 1개월",
    "2mo": "최근 2개월",
    "3mo": "최근 3개월",
    "6mo": "최근 6개월",
    "1y": "최근 1년",
    "2y": "최근 2년",
    "5y": "최근 5년",
  };
  return labels[raw] || "최근 구간";
}

export function localChartRefreshIntervalMs(interval) {
  const normalized = normalizeLocalChartInterval(interval);
  return LOCAL_CHART_REFRESH_MS[normalized] || 10000;
}

export function localChartTitleFromTvSymbol(tvSymbol) {
  const raw = String(tvSymbol || "").toUpperCase().trim();
  if (!raw) return "차트";
  if (raw.startsWith("KRX:") || raw.endsWith(".KS") || raw.endsWith(".KQ")) {
    const code = normalizeKrCode(raw);
    const name = KR_SYMBOL_NAMES[code];
    if (name) return name;
    return code ? `한국주식 ${code}` : "한국주식";
  }
  if (raw.includes(":")) {
    const [, symbol] = raw.split(":", 2);
    return symbol || raw;
  }
  return raw;
}
