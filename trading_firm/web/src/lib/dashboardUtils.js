export const NAV_SECTIONS = ["workspace", "positions", "reports"];
export const STORAGE_NAV_ACTIVE = "tf.nav.active";
export const STORAGE_SIDEBAR_COLLAPSED = "tf.sidebar.collapsed";
export const STORAGE_THEME = "tf.theme";

export const STRATEGY_AGENT_PROFILE = {
  trend: {
    name: "하준 PM",
    style: "추세추종 · 강한 모멘텀 위주",
  },
  meanrev: {
    name: "서윤 PM",
    style: "평균회귀 · 과열/과매도 역추세",
  },
  event: {
    name: "민재 PM",
    style: "이벤트 드리븐 · 뉴스/공시 민감",
  },
  unassigned: {
    name: "운용 보조",
    style: "분류 전 포지션",
  },
};

export const KR_SYMBOL_NAMES = {
  "005930": "삼성전자",
  "000660": "SK하이닉스",
  "373220": "LG에너지솔루션",
  "207940": "삼성바이오로직스",
  "005380": "현대차",
  "035420": "NAVER",
  "051910": "LG화학",
  "068270": "셀트리온",
  "006400": "삼성SDI",
  "003670": "포스코퓨처엠",
  "105560": "KB금융",
  "055550": "신한지주",
  "035720": "카카오",
  "028260": "삼성물산",
  "012330": "현대모비스",
  "096770": "SK이노베이션",
  "066570": "LG전자",
  "034730": "SK",
  "017670": "SK텔레콤",
  "000270": "기아",
  "018260": "삼성SDS",
  "015760": "한국전력",
  "251270": "넷마블",
  "138040": "메리츠금융지주",
  "009150": "삼성전기",
  "011200": "HMM",
  "086790": "하나금융지주",
  "032830": "삼성생명",
  "010130": "고려아연",
  "259960": "크래프톤",
  "003550": "LG",
  "047810": "한국항공우주",
  "323410": "카카오뱅크",
  "011170": "롯데케미칼",
  "024110": "기업은행",
  "267250": "HD현대",
  "042700": "한미반도체",
  "336260": "두산퓨얼셀",
  "196170": "알테오젠",
  "003490": "대한항공",
};

const USD_FMT = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const KRW_FMT = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export async function api(path, options = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return data;
}

export function storageGet(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value == null ? fallback : value;
  } catch (_) {
    return fallback;
  }
}

export function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (_) {
    // ignore storage failures
  }
}

export function normalizeNav(value) {
  const v = String(value || "").replace(/^#/, "").trim();
  return NAV_SECTIONS.includes(v) ? v : "workspace";
}

export function normalizeTheme(value) {
  const v = String(value || "").trim().toLowerCase();
  return v === "dark" ? "dark" : "light";
}

export function widgetThemeParams(theme) {
  const normalized = normalizeTheme(theme);
  if (normalized === "dark") {
    return { theme: "dark", toolbarbg: "#0f1720" };
  }
  return { theme: "light", toolbarbg: "#f5f7fa" };
}

export function withThemeWidgetUrl(url, theme) {
  try {
    const u = new URL(url);
    const params = widgetThemeParams(theme);
    u.searchParams.set("theme", params.theme);
    u.searchParams.set("toolbarbg", params.toolbarbg);
    return u.toString();
  } catch (_) {
    return url;
  }
}

export function isKrTvSymbol(tvSymbol) {
  return String(tvSymbol || "").toUpperCase().startsWith("KRX:");
}

export function fmtMoney(value, currency) {
  if (value == null || Number.isNaN(Number(value))) return "-";
  const n = Number(value);
  return currency === "KRW" ? KRW_FMT.format(n) : USD_FMT.format(n);
}

export function fmtSignedMoney(value, currency) {
  const n = Number(value || 0);
  if (!Number.isFinite(n)) return "-";
  if (n === 0) return fmtMoney(0, currency);
  const sign = n > 0 ? "+" : "-";
  return `${sign}${fmtMoney(Math.abs(n), currency)}`;
}

export function currencyByMarket(market) {
  return market === "kr" ? "KRW" : "USD";
}

export function numberClass(value) {
  const n = Number(value || 0);
  if (!Number.isFinite(n) || n === 0) return "";
  return n > 0 ? "positive" : "negative";
}

export function formatQty(value) {
  const n = Number(value || 0);
  if (!Number.isFinite(n)) return "-";
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export function formatTs(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function marketLabel(market) {
  return market === "kr" ? "한국" : "미국";
}

export function sideLabel(side) {
  if (side === "BUY") return "매수";
  if (side === "SELL") return "매도";
  return side || "-";
}

export function normalizeKrCode(symbol) {
  return String(symbol || "")
    .toUpperCase()
    .replace(/^KRX:/, "")
    .replace(".KS", "")
    .replace(".KQ", "")
    .trim();
}

export function krDisplayName(symbol) {
  const code = normalizeKrCode(symbol);
  const name = KR_SYMBOL_NAMES[code];
  if (!code) return String(symbol || "-");
  return name ? `${name} (${code})` : `한국주식 (${code})`;
}

export function symbolDisplay(market, symbol) {
  if (market === "kr") return krDisplayName(symbol);
  return String(symbol || "-").toUpperCase();
}

export function quickChipLabel(market, symbol) {
  if (market === "kr") {
    const code = normalizeKrCode(symbol);
    const name = KR_SYMBOL_NAMES[code] || code;
    return `KR ${name}`;
  }
  return `US ${String(symbol || "").toUpperCase()}`;
}

export function resolveKrQueryAlias(query) {
  const raw = String(query || "").trim();
  if (!raw) return raw;
  const direct = Object.entries(KR_SYMBOL_NAMES).find(([, name]) => name === raw);
  if (direct) return direct[0];
  const partial = Object.entries(KR_SYMBOL_NAMES).find(([, name]) => name.includes(raw));
  if (partial) return partial[0];
  return raw;
}

export function toTvSymbol(market, symbol) {
  const s = String(symbol || "").toUpperCase();
  if (market === "kr") {
    return `KRX:${normalizeKrCode(s)}`;
  }
  if (s === "BRK-B") return "NYSE:BRK.B";
  if (s.includes(":")) return s;
  return `NASDAQ:${s}`;
}

export function stockLogoUrl(market, symbol) {
  const m = String(market || "").toLowerCase().trim();
  const s = String(symbol || "").trim();
  if (!m || !s) return "";
  const params = new URLSearchParams({
    market: m,
    symbol: s,
    size: "128",
  });
  return `/api/logo?${params.toString()}`;
}

export function stockFallbackGlyph(seed, symbol) {
  const base = String(seed || symbol || "")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^0-9A-Za-z가-힣]/g, "");
  return base ? base.slice(0, 1).toUpperCase() : "•";
}

export function fmtIndicatorPrice(item) {
  const price = Number(item?.price);
  if (!Number.isFinite(price)) return "-";
  const id = String(item?.id || "");
  if (id === "usdkrw") {
    return price.toLocaleString("ko-KR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function fmtIndicatorPriceFromValue(item, value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  const id = String(item?.id || "");
  const locale = id === "usdkrw" ? "ko-KR" : "en-US";
  return n.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function fmtSignedFixed(value, digits = 2) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
}

export function sparklineGeometry(points, width = 112, height = 34, pad = 2) {
  const values = (points || [])
    .map((v) => Number(v))
    .filter((v) => Number.isFinite(v));

  if (!values.length || values.length === 1) {
    const mid = Math.round(height / 2);
    return {
      linePath: `M0 ${mid} L${width} ${mid}`,
      areaPath: `M0 ${mid} L${width} ${mid} L${width} ${height} L0 ${height} Z`,
    };
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const innerW = Math.max(1, width - pad * 2);
  const innerH = Math.max(1, height - pad * 2);
  const stepX = innerW / (values.length - 1);
  const coords = values.map((v, i) => {
    const x = pad + stepX * i;
    const y = pad + ((max - v) / span) * innerH;
    return {
      x: Number.isFinite(x) ? x : 0,
      y: Number.isFinite(y) ? y : height / 2,
    };
  });

  const linePath = coords
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  const first = coords[0];
  const last = coords[coords.length - 1];
  const floorY = height - 1;
  const areaPath = `${linePath} L${last.x.toFixed(2)} ${floorY} L${first.x.toFixed(2)} ${floorY} Z`;

  return { linePath, areaPath };
}

export function sparklineGradient(tone) {
  if (tone === "up") {
    return {
      top: "rgba(240, 68, 82, 0.22)",
      bottom: "rgba(240, 68, 82, 0.01)",
    };
  }
  if (tone === "down") {
    return {
      top: "rgba(63, 124, 255, 0.22)",
      bottom: "rgba(63, 124, 255, 0.01)",
    };
  }
  return {
    top: "rgba(130, 149, 173, 0.20)",
    bottom: "rgba(130, 149, 173, 0.01)",
  };
}

export function macroBadgeClass(status) {
  const normalized = String(status || "").trim().toLowerCase();
  if (normalized === "live") return "live";
  if (normalized === "holiday") return "holiday";
  if (normalized === "closed") return "closed";
  if (normalized === "delayed") return "delayed";
  return "";
}
