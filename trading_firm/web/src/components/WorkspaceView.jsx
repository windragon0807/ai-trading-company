import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { StockIcon, StockInline } from "./StockInline";
import {
  currencyByMarket,
  fmtMoney,
  fmtSignedMoney,
  formatQty,
  formatTs,
  normalizeKrCode,
  numberClass,
  quickChipLabel,
  symbolDisplay,
} from "../lib/dashboardUtils";

const US_EQUITY_EXCHANGES = new Set([
  "NASDAQ",
  "NYSE",
  "AMEX",
  "ARCA",
  "BATS",
  "OTC",
]);

const NON_EQUITY_SYMBOLS = new Set([
  "FX_IDC:USDKRW",
  "SP:SPX",
  "DJ:DJI",
  "TVC:VIX",
  "TVC:KOSPI",
  "TVC:KOSDAQ",
  "NASDAQ:IXIC",
  "CME_MINI:NQ1!",
]);

function resolveLocalChartIdentity(tvSymbol, title) {
  const seedLabel = String(title || "차트").trim() || "차트";
  const raw = String(tvSymbol || "").trim();
  if (!raw) return { market: "", symbol: "", seedLabel };

  const upper = raw.toUpperCase();
  if (/^\d{6}$/.test(upper)) {
    return { market: "kr", symbol: upper, seedLabel };
  }
  if (upper.startsWith("KRX:") || upper.endsWith(".KS") || upper.endsWith(".KQ")) {
    const code = normalizeKrCode(upper);
    return { market: "kr", symbol: code || upper, seedLabel };
  }
  if (!upper.includes(":")) {
    if (/^[A-Z][A-Z0-9.-]{0,9}$/.test(upper)) {
      return { market: "us", symbol: upper, seedLabel };
    }
    return { market: "", symbol: "", seedLabel };
  }

  const [exchangeRaw, symbolRaw] = upper.split(":", 2);
  const exchange = String(exchangeRaw || "").trim();
  const symbol = String(symbolRaw || "").trim();
  if (!symbol || NON_EQUITY_SYMBOLS.has(`${exchange}:${symbol}`)) {
    return { market: "", symbol: "", seedLabel };
  }
  if (US_EQUITY_EXCHANGES.has(exchange)) {
    return { market: "us", symbol, seedLabel };
  }
  return { market: "", symbol: "", seedLabel };
}

function SymbolButton({ row, label, onClick, className = "symbol-link" }) {
  return (
    <button type="button" className={className} title={label} onClick={onClick}>
      <StockInline market={row.market} symbol={row.symbol} label={label} />
    </button>
  );
}

export function WorkspaceView({
  active,
  symbolInput,
  onChangeSymbolInput,
  onSubmitSymbol,
  currentSymbol,
  openTradingViewUrl,
  tvWidgetUrl,
  chartRenderer,
  localChartTitle,
  localChartMeta,
  localChartInterval,
  localChartIntervalOptions,
  onChangeLocalChartInterval,
  localChartCanvasRef,
  localChartViewportRef,
  quickSymbols,
  onClickQuickSymbol,
  overview,
  portfolioTotals,
  positions,
  onClickPositionSymbol,
}) {
  const us = (overview?.accounts || []).find((x) => x.market === "us");
  const kr = (overview?.accounts || []).find((x) => x.market === "kr");
  const metrics = overview?.metrics || {};
  const topPositions = (positions || []).slice(0, 5);
  const intervalOptions = useMemo(() => localChartIntervalOptions || [], [localChartIntervalOptions]);
  const currentIntervalValue = String(localChartInterval || "30m");
  const localChartIdentity = useMemo(
    () => resolveLocalChartIdentity(currentSymbol, localChartTitle),
    [currentSymbol, localChartTitle],
  );
  const intervalTabsRef = useRef(null);
  const intervalTabRefs = useRef({});
  const [intervalIndicator, setIntervalIndicator] = useState(() => ({
    x: 0,
    width: 0,
    ready: false,
  }));

  const fxValue = Number(portfolioTotals?.usdkrw || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
  const fxTag = portfolioTotals?.fx_stale ? "지연" : "실시간";
  const fxSource = portfolioTotals?.fx_source ? `, ${portfolioTotals.fx_source}` : "";
  const fxTime = portfolioTotals?.fx_quote_time_utc ? `, ${formatTs(portfolioTotals.fx_quote_time_utc)}` : "";

  const registerIntervalTab = useCallback(
    (value) => (el) => {
      if (!value) return;
      if (el) {
        intervalTabRefs.current[value] = el;
      } else {
        delete intervalTabRefs.current[value];
      }
    },
    [],
  );

  const syncIntervalIndicator = useCallback(() => {
    const root = intervalTabsRef.current;
    const target = intervalTabRefs.current[currentIntervalValue];
    if (!root || !target) {
      setIntervalIndicator((prev) => (prev.ready ? { x: 0, width: 0, ready: false } : prev));
      return;
    }

    const rootRect = root.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const x = Math.max(0, targetRect.left - rootRect.left);
    const width = Math.max(0, targetRect.width);
    setIntervalIndicator((prev) => {
      const same =
        prev.ready &&
        Math.abs(prev.x - x) < 0.25 &&
        Math.abs(prev.width - width) < 0.25;
      if (same) {
        return prev;
      }
      return {
        x,
        width,
        ready: width > 0,
      };
    });
  }, [currentIntervalValue]);

  useLayoutEffect(() => {
    syncIntervalIndicator();
  }, [syncIntervalIndicator, intervalOptions.length]);

  useEffect(() => {
    const root = intervalTabsRef.current;
    if (!root) return undefined;

    const onResize = () => syncIntervalIndicator();
    window.addEventListener("resize", onResize);

    let observer = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => syncIntervalIndicator());
      observer.observe(root);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [syncIntervalIndicator]);

  return (
    <section id="view-workspace" className={`view-pane ${active ? "active" : ""}`}>
      <div className="workspace-grid">
        <div className="workspace-main">
          <section className="module chart-header">
            <div className="chart-toolbar">
              <form id="symbolSearchForm" className="symbol-form" onSubmit={onSubmitSymbol}>
                <input
                  id="symbolInput"
                  type="text"
                  placeholder="AAPL / NASDAQ:AAPL / 005930"
                  autoComplete="off"
                  value={symbolInput}
                  onChange={(ev) => onChangeSymbolInput(ev.target.value)}
                />
                <button className="btn accent" type="submit">
                  차트 불러오기
                </button>
              </form>
              <div className="chart-links">
                <span id="currentSymbol" className="symbol-badge">
                  {currentSymbol || "NASDAQ:AAPL"}
                </span>
                <a id="openTradingView" href={openTradingViewUrl || "#"} target="_blank" rel="noopener noreferrer">
                  트레이딩뷰 열기
                </a>
              </div>
            </div>
            <div className="symbol-quick-list" id="symbolQuickList">
              {(quickSymbols?.length
                ? quickSymbols
                : [{ market: "us", symbol: "AAPL", tv_symbol: "NASDAQ:AAPL" }]
              ).map((row) => {
                const label = quickChipLabel(row.market, row.symbol);
                return (
                  <button
                    key={`${row.market}-${row.symbol}-${row.tv_symbol || ""}`}
                    className="sym-chip"
                    type="button"
                    onClick={() => onClickQuickSymbol(row.tv_symbol || row.symbol, row)}
                  >
                    <StockInline
                      market={row.market}
                      symbol={row.symbol}
                      label={label}
                      iconSeedLabel={symbolDisplay(row.market, row.symbol)}
                    />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="module chart-stage">
            <iframe
              id="tvChartFrame"
              title="TradingView Chart"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={chartRenderer === "local" ? "is-hidden" : ""}
              src={tvWidgetUrl || ""}
            />
            <section id="localChartShell" className={`local-chart-shell ${chartRenderer === "local" ? "active" : ""}`} aria-label="로컬 캔들 차트">
              <header className="local-chart-top">
                <div className="local-chart-identity">
                  <span className="local-chart-identity-icon" aria-hidden="true">
                    <StockIcon
                      market={localChartIdentity.market}
                      symbol={localChartIdentity.symbol}
                      seedLabel={localChartIdentity.seedLabel}
                    />
                  </span>
                  <span id="localChartTitle" className="local-chart-title">
                    {localChartTitle || "차트"}
                  </span>
                </div>

                <div className="local-chart-interval-group">
                  <span className="local-chart-interval-label">주기</span>
                  <div
                    id="localChartIntervalSelect"
                    className="local-chart-interval-tabs"
                    role="tablist"
                    aria-label="차트 주기 선택"
                    ref={intervalTabsRef}
                  >
                    <span
                      className={`local-chart-interval-indicator ${intervalIndicator.ready ? "ready" : ""}`}
                      aria-hidden="true"
                      style={{
                        "--interval-tab-x": `${intervalIndicator.x}px`,
                        "--interval-tab-width": `${intervalIndicator.width}px`,
                      }}
                    />
                    {intervalOptions.map((option) => (
                      <button
                        key={option.value}
                        ref={registerIntervalTab(option.value)}
                        type="button"
                        role="tab"
                        aria-selected={currentIntervalValue === option.value}
                        className={`local-chart-interval-tab ${currentIntervalValue === option.value ? "active" : ""}`}
                        onClick={() => onChangeLocalChartInterval?.(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="local-chart-meta-wrap">
                  <span id="localChartMeta" className="local-chart-meta">
                    {localChartMeta || "데이터 로딩 중..."}
                  </span>
                </div>
              </header>
              <div className="local-chart-canvas-wrap" ref={localChartViewportRef}>
                <div id="localChartCanvas" className="local-chart-canvas" ref={localChartCanvasRef} />
              </div>
            </section>
          </section>
        </div>

        <aside className="workspace-side">
          <section className="module metrics-module">
            <header className="panel-head">
              <div>
                <p className="panel-kicker">Workspace Overview</p>
                <h2>실시간 지표</h2>
              </div>
              <span id="overviewStatusPill" className={`panel-state-pill ${overview?.paused ? "paused" : ""}`}>
                {overview?.paused ? "PAUSED" : "RUNNING"}
              </span>
            </header>
            <div className="metric-grid">
              <article className="metric-card metric-card-emphasis">
                <label>미국 자산</label>
                <strong id="usEquity">{fmtMoney(us?.equity, "USD")}</strong>
              </article>
              <article className="metric-card metric-card-emphasis">
                <label>한국 자산</label>
                <strong id="krEquity">{fmtMoney(kr?.equity, "KRW")}</strong>
              </article>
              <article className="metric-card">
                <label>오늘 신호</label>
                <strong id="signalsToday">{String(metrics.signals_today ?? "-")}</strong>
              </article>
              <article className="metric-card">
                <label>오늘 체결</label>
                <strong id="fillsToday">{String(metrics.fills_today ?? "-")}</strong>
              </article>
              <article className="metric-card metric-card-wide">
                <label>최신 보고서</label>
                <strong id="latestReport">{overview?.latest_report || "없음"}</strong>
                <p className="metric-meta">
                  업데이트 <span id="overviewUpdatedAt">{formatTs(overview?.server_time_kst)}</span>
                </p>
              </article>
            </div>
          </section>

          <section className="module total-module">
            <header className="panel-head">
              <div>
                <p className="panel-kicker">Firm Balance</p>
                <h2>회사 총자산</h2>
              </div>
            </header>
            <div className="total-grid">
              <article className="metric-card">
                <label>미국 자산</label>
                <strong id="portfolioUsEquity">{fmtMoney(portfolioTotals?.us_equity, "USD")}</strong>
              </article>
              <article className="metric-card">
                <label>한국 자산</label>
                <strong id="portfolioKrEquity">{fmtMoney(portfolioTotals?.kr_equity, "KRW")}</strong>
              </article>
              <article className="metric-card metric-card-emphasis">
                <label>총액 (USD 환산)</label>
                <strong id="portfolioTotalUsd">{fmtMoney(portfolioTotals?.total_usd_est, "USD")}</strong>
              </article>
              <article className="metric-card metric-card-emphasis">
                <label>총액 (KRW 환산)</label>
                <strong id="portfolioTotalKrw">{fmtMoney(portfolioTotals?.total_krw_est, "KRW")}</strong>
              </article>
            </div>
            <p className="fx-note">
              환산 기준 USD/KRW: <span id="portfolioFxRate">{`${fxValue} (${fxTag}${fxSource}${fxTime})`}</span>
            </p>
          </section>

          <section className="module position-summary-module">
            <header className="panel-head">
              <div>
                <p className="panel-kicker">Top Holdings</p>
                <h2>보유 포지션 요약</h2>
              </div>
              <span className="panel-caption">상위 5</span>
            </header>
            <ol className="position-summary-list" id="workspacePositionList">
              {!topPositions.length ? (
                <li className="position-summary-empty">보유 포지션 없음</li>
              ) : (
                topPositions.map((row, index) => {
                  const label = symbolDisplay(row.market, row.symbol);
                  return (
                    <li key={`${row.market}-${row.symbol}-${index}`} className="position-summary-item">
                      <div className="position-summary-left">
                        <span className="position-rank">{String(index + 1).padStart(2, "0")}</span>
                        <SymbolButton
                          row={row}
                          label={label}
                          className="symbol-link summary-symbol-link"
                          onClick={() => onClickPositionSymbol(row)}
                        />
                      </div>
                      <div className="position-summary-stats">
                        <span className="position-stat">
                          <em>수량</em>
                          <b>{formatQty(row.qty)}</b>
                        </span>
                        <span className={`position-stat ${numberClass(row.unrealized_pnl)}`}>
                          <em>평가손익</em>
                          <b>{fmtSignedMoney(row.unrealized_pnl, currencyByMarket(row.market))}</b>
                        </span>
                      </div>
                    </li>
                  );
                })
              )}
            </ol>
          </section>
        </aside>
      </div>
    </section>
  );
}
