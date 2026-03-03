import { useCallback, useEffect, useRef, useState } from "react";

import { MacroStrip } from "./components/MacroStrip";
import { MobileTabBar, SidebarNav } from "./components/NavShell";
import { PositionsView } from "./components/PositionsView";
import { ReportsView } from "./components/ReportsView";
import { TopBar } from "./components/TopBar";
import { WorkspaceView } from "./components/WorkspaceView";
import { useAppShellState } from "./hooks/useAppShellState";
import { useMarketIndicatorsState } from "./hooks/useMarketIndicatorsState";
import { useMacroStripControls } from "./hooks/useMacroStripControls";
import { useReportsState } from "./hooks/useReportsState";
import { connectRealtimeFeed } from "./lib/connectRealtimeFeed";
import {
  DEFAULT_BOOTSTRAP_INDICATOR,
  LOCAL_CHART_BACKFILL_PAST_BARS_THRESHOLD,
  LOCAL_CHART_INTERVAL_DEFAULT,
  LOCAL_CHART_INTERVAL_OPTIONS,
  LOCAL_CHART_LEFT_BACKFILL_COOLDOWN_MS,
  LOCAL_CHART_PRICE_SCALE_MIN_WIDTH,
  LOCAL_CHART_RIGHT_OFFSET,
  OVERVIEW_PORTFOLIO_POLL_MS,
  buildTvWidgetUrl,
  defaultOverview,
  defaultPortfolio,
  localChartIntervalLabel,
  localChartNextRange,
  localChartPalette,
  localChartRangeByInterval,
  localChartRangeLabel,
  localChartRefreshIntervalMs,
  localChartTitleFromTvSymbol,
  macroIndicatorChartQuery,
  normalizeLocalChartInterval,
  tvChartUrl,
} from "./lib/appCoreConfig";
import {
  api,
  isKrTvSymbol,
  normalizeNav,
  resolveKrQueryAlias,
  toTvSymbol,
  withThemeWidgetUrl,
} from "./lib/dashboardUtils";

export function App() {
  const {
    theme,
    setTheme,
    activeNav,
    setActiveNav,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobile,
  } = useAppShellState();

  const [overview, setOverview] = useState(defaultOverview);
  const [portfolio, setPortfolio] = useState(defaultPortfolio);

  const { reports, selectedReport, reportContent, loadReport, loadReports, changeReport } = useReportsState();
  const [operationLog, setOperationLog] = useState("준비 완료.");

  const [symbolInput, setSymbolInput] = useState(DEFAULT_BOOTSTRAP_INDICATOR.tv_symbol);
  const [currentSymbol, setCurrentSymbol] = useState(DEFAULT_BOOTSTRAP_INDICATOR.tv_symbol);
  const [openTradingViewUrl, setOpenTradingViewUrl] = useState("#");
  const [tvBaseWidgetUrl, setTvBaseWidgetUrl] = useState("");
  const [tvWidgetUrl, setTvWidgetUrl] = useState("");
  const [chartRenderer, setChartRenderer] = useState("tv");
  const [localChartTitle, setLocalChartTitle] = useState("차트");
  const [localChartMeta, setLocalChartMeta] = useState("데이터 로딩 중...");
  const [localChartInterval, setLocalChartInterval] = useState(LOCAL_CHART_INTERVAL_DEFAULT);
  const [localChartRange, setLocalChartRange] = useState(localChartRangeByInterval(LOCAL_CHART_INTERVAL_DEFAULT));
  const sidebarCollapsedEffective = sidebarCollapsed && !mobile;

  const macroStripRef = useRef(null);
  const localChartCanvasRef = useRef(null);
  const localChartViewportRef = useRef(null);
  const localChartRef = useRef(null);
  const localChartViewportStateRef = useRef({
    lastLength: 0,
    userDetached: false,
    loadedRange: "",
    loadedInterval: LOCAL_CHART_INTERVAL_DEFAULT,
    firstTime: 0,
    backfillBusy: false,
    historyExhausted: false,
    lastBackfillTriggeredAt: 0,
    exploringPast: false,
  });
  const localChartBackfillHandlerRef = useRef(null);
  const localChartContextRef = useRef(null);
  const localChartRefreshBusyRef = useRef(false);
  const chartReadyRef = useRef(false);

  const chartStreamActiveRef = useRef(false);
  const localChartPointerRef = useRef({
    downX: null,
    downY: null,
    active: false,
  });

  const log = useCallback((text) => {
    const line = `[${new Date().toLocaleTimeString()}] ${text}`;
    setOperationLog((prev) => `${line}\n${prev}`.slice(0, 20000));
  }, []);

  const {
    marketIndicators,
    marketIndicatorsBooting,
    marketIndicatorsSkeletonDemo,
    setMarketIndicatorsSkeletonDemo,
    loadMarketIndicators,
  } = useMarketIndicatorsState({ log });

  const measureLocalChartViewport = useCallback(() => {
    const canvasEl = localChartCanvasRef.current;
    const viewportEl = localChartViewportRef.current || canvasEl?.parentElement || canvasEl;
    if (!viewportEl) return null;

    const rect = viewportEl.getBoundingClientRect();
    const clientW = Number(viewportEl.clientWidth || rect.width || 0);
    const clientH = Number(viewportEl.clientHeight || rect.height || 0);
    const style = window.getComputedStyle(viewportEl);
    const padX = Number.parseFloat(style.paddingLeft || "0") + Number.parseFloat(style.paddingRight || "0");
    const padY = Number.parseFloat(style.paddingTop || "0") + Number.parseFloat(style.paddingBottom || "0");
    const width = Math.max(1, Math.floor(clientW - padX));
    const height = Math.max(1, Math.floor(clientH - padY));
    return { width, height, viewportEl };
  }, []);

  const ensureLocalChart = useCallback(() => {
    if (!localChartCanvasRef.current) return null;
    if (!window.LightweightCharts || typeof window.LightweightCharts.createChart !== "function") return null;
    if (localChartRef.current?.chart) return localChartRef.current;

    const palette = localChartPalette(theme);
    const measured = measureLocalChartViewport();
    const width = measured?.width || 900;
    const height = measured?.height || 520;
    const chart = window.LightweightCharts.createChart(localChartCanvasRef.current, {
      width,
      height,
      layout: {
        background: { type: "solid", color: palette.background },
        textColor: palette.text,
      },
      grid: {
        vertLines: { color: palette.grid },
        horzLines: { color: palette.grid },
      },
      crosshair: { mode: 1 },
      leftPriceScale: {
        visible: false,
        borderVisible: false,
      },
      rightPriceScale: {
        borderColor: palette.grid,
        minimumWidth: LOCAL_CHART_PRICE_SCALE_MIN_WIDTH,
        entireTextOnly: true,
      },
      timeScale: {
        borderColor: palette.grid,
        timeVisible: true,
        secondsVisible: false,
        rightOffset: LOCAL_CHART_RIGHT_OFFSET,
        rightBarStaysOnScroll: true,
        fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: true,
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: palette.up,
      downColor: palette.down,
      wickUpColor: palette.up,
      wickDownColor: palette.down,
      borderUpColor: palette.up,
      borderDownColor: palette.down,
      priceLineVisible: true,
    });
    const volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: "volume" },
      priceScaleId: "",
    });
    chart.priceScale("").applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    const onRangeChange = (range) => {
      const state = localChartViewportStateRef.current;
      const lastLength = Number(state.lastLength || 0);
      if (!range || !Number.isFinite(range.to) || lastLength <= 0) {
        return;
      }
      const latestLogicalIndex = lastLength - 1;
      const nearRightEdge = range.to >= latestLogicalIndex - 0.75;
      state.userDetached = !nearRightEdge;
      const distanceFromRight = latestLogicalIndex - Number(range.to || 0);
      const exploringPast = distanceFromRight >= LOCAL_CHART_BACKFILL_PAST_BARS_THRESHOLD;
      if (exploringPast && state.userDetached && typeof localChartBackfillHandlerRef.current === "function") {
        const now = Date.now();
        if (now - Number(state.lastBackfillTriggeredAt || 0) >= LOCAL_CHART_LEFT_BACKFILL_COOLDOWN_MS) {
          state.lastBackfillTriggeredAt = now;
          localChartBackfillHandlerRef.current();
        }
      }
    };
    chart.timeScale().subscribeVisibleLogicalRangeChange(onRangeChange);

    localChartRef.current = { chart, candleSeries, volumeSeries, onRangeChange };
    return localChartRef.current;
  }, [theme, measureLocalChartViewport]);

  const applyLocalChartTheme = useCallback(() => {
    if (!localChartRef.current?.chart) return;
    const palette = localChartPalette(theme);
    localChartRef.current.chart.applyOptions({
      layout: {
        background: { type: "solid", color: palette.background },
        textColor: palette.text,
      },
      grid: {
        vertLines: { color: palette.grid },
        horzLines: { color: palette.grid },
      },
      rightPriceScale: {
        borderColor: palette.grid,
        minimumWidth: LOCAL_CHART_PRICE_SCALE_MIN_WIDTH,
        entireTextOnly: true,
      },
      timeScale: {
        borderColor: palette.grid,
        rightOffset: LOCAL_CHART_RIGHT_OFFSET,
        rightBarStaysOnScroll: true,
        fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: true,
      },
    });
    localChartRef.current.candleSeries.applyOptions({
      upColor: palette.up,
      downColor: palette.down,
      wickUpColor: palette.up,
      wickDownColor: palette.down,
      borderUpColor: palette.up,
      borderDownColor: palette.down,
    });
  }, [theme]);

  const syncLocalChartSize = useCallback((fit = false) => {
    const chartApi = localChartRef.current?.chart;
    if (!chartApi) return;

    const measured = measureLocalChartViewport();
    if (!measured) return;
    const { width, height } = measured;

    if (typeof chartApi.resize === "function") {
      chartApi.resize(width, height);
    } else {
      chartApi.applyOptions({ width, height });
    }

    chartApi.timeScale().applyOptions({
      rightOffset: LOCAL_CHART_RIGHT_OFFSET,
      rightBarStaysOnScroll: true,
      fixLeftEdge: true,
      lockVisibleTimeRangeOnResize: true,
    });
    chartApi.priceScale("right").applyOptions({
      minimumWidth: LOCAL_CHART_PRICE_SCALE_MIN_WIDTH,
      entireTextOnly: true,
    });
    if (fit) {
      chartApi.timeScale().fitContent();
      chartApi.timeScale().applyOptions({
        rightOffset: LOCAL_CHART_RIGHT_OFFSET,
      });
    }
  }, [measureLocalChartViewport]);

  useEffect(() => {
    applyLocalChartTheme();
    if (tvBaseWidgetUrl) {
      setTvWidgetUrl(withThemeWidgetUrl(tvBaseWidgetUrl, theme));
    }
  }, [theme, tvBaseWidgetUrl, applyLocalChartTheme]);

  useEffect(() => {
    const onResize = () => {
      syncLocalChartSize(false);
    };
    window.addEventListener("resize", onResize);

    let observer = null;
    const observedEl = localChartViewportRef.current || localChartCanvasRef.current?.parentElement || localChartCanvasRef.current;
    if (typeof ResizeObserver !== "undefined" && observedEl) {
      observer = new ResizeObserver(() => syncLocalChartSize(false));
      observer.observe(observedEl);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [syncLocalChartSize]);

  useEffect(() => {
    if (chartRenderer !== "local" || activeNav !== "workspace") return undefined;

    const refresh = () => syncLocalChartSize(true);
    const raf1 = window.requestAnimationFrame(refresh);
    const raf2 = window.requestAnimationFrame(refresh);
    const timerId = window.setTimeout(refresh, 120);
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.clearTimeout(timerId);
    };
  }, [chartRenderer, activeNav, sidebarCollapsedEffective, mobile, syncLocalChartSize]);

  useEffect(() => {
    return () => {
      if (localChartRef.current?.chart) {
        if (localChartRef.current?.onRangeChange) {
          localChartRef.current.chart.timeScale().unsubscribeVisibleLogicalRangeChange(localChartRef.current.onRangeChange);
        }
        localChartRef.current.chart.remove();
      }
      localChartRef.current = null;
    };
  }, []);

  const { canScrollMacroPrev, canScrollMacroNext, scrollMacroBy } = useMacroStripControls({
    macroStripRef,
    marketIndicators,
    marketIndicatorsBooting,
    marketIndicatorsSkeletonDemo,
    setMarketIndicatorsSkeletonDemo,
  });

  const renderLocalChartFromPayload = useCallback((data, { title = "", fitContent = true } = {}) => {
    const chart = ensureLocalChart();
    if (!chart) return false;
    const timeScaleApi = chart.chart.timeScale();
    const viewportState = localChartViewportStateRef.current;

    const candles = (data.candles || []).map((c) => ({
      time: Number(c.time),
      open: Number(c.open),
      high: Number(c.high),
      low: Number(c.low),
      close: Number(c.close),
    }));
    if (!candles.length) return false;

    const palette = localChartPalette(theme);
    const volumes = (data.candles || []).map((c) => ({
      time: Number(c.time),
      value: Number(c.volume || 0),
      color: Number(c.close) >= Number(c.open) ? palette.volumeUp : palette.volumeDown,
    }));

    let priorVisibleRange = null;
    let priorLogicalRange = null;
    const preserveRange = !fitContent && Boolean(viewportState.userDetached);
    if (preserveRange && timeScaleApi) {
      if (typeof timeScaleApi.getVisibleRange === "function") {
        priorVisibleRange = timeScaleApi.getVisibleRange();
      }
      if (typeof timeScaleApi.getVisibleLogicalRange === "function") {
        priorLogicalRange = timeScaleApi.getVisibleLogicalRange();
      }
    }

    chart.candleSeries.setData(candles);
    chart.volumeSeries.setData(volumes);
    viewportState.lastLength = candles.length;
    viewportState.firstTime = Number(candles[0]?.time || 0);
    viewportState.loadedRange = String(data.range || viewportState.loadedRange || "").trim().toLowerCase();
    viewportState.loadedInterval = normalizeLocalChartInterval(data.interval || viewportState.loadedInterval);
    if (fitContent) {
      timeScaleApi.fitContent();
      viewportState.userDetached = false;
      viewportState.exploringPast = false;
    } else if (preserveRange) {
      let restored = false;
      if (priorVisibleRange && Number.isFinite(priorVisibleRange.from) && Number.isFinite(priorVisibleRange.to)) {
        try {
          timeScaleApi.setVisibleRange(priorVisibleRange);
          restored = true;
        } catch (_) {
          restored = false;
        }
      }
      if (!restored && priorLogicalRange && Number.isFinite(priorLogicalRange.from) && Number.isFinite(priorLogicalRange.to)) {
        try {
          timeScaleApi.setVisibleLogicalRange(priorLogicalRange);
        } catch (_) {
          // ignore invalid range restoration on sparse payloads
        }
      }
    }

    const providerRaw = String(data.meta?.source || "").toLowerCase();
    const providerExplicit = String(data.meta?.source_label || "").trim();
    const provider = providerExplicit
      || (providerRaw.startsWith("naver") ? "네이버 금융" : providerRaw.includes("hybrid") ? "야후+네이버" : "야후 파이낸스");
    const providerLatency = providerRaw.includes("live") ? "실시간" : null;
    const quoteTimeRaw = String(data.meta?.quote_time_utc || "").trim();
    let quoteTimeLabel = "";
    if (providerLatency && quoteTimeRaw) {
      const quoteDate = new Date(quoteTimeRaw);
      if (!Number.isNaN(quoteDate.getTime())) {
        quoteTimeLabel = ` · ${quoteDate.toLocaleTimeString("ko-KR", { hour12: false })} 업데이트`;
      }
    }
    const sourceLabel = title || data.label || data.symbol || data.yahoo_symbol || data.tv_symbol || "차트";
    const usedInterval = normalizeLocalChartInterval(data.interval);
    const usedRange = String(data.range || "").trim().toLowerCase();
    if (usedRange && usedRange !== String(localChartRange || "").trim().toLowerCase()) {
      setLocalChartRange(usedRange);
    }
    setLocalChartTitle(sourceLabel);
    setLocalChartMeta(
      `${localChartIntervalLabel(usedInterval)} 봉 · ${localChartRangeLabel(usedRange)} · ${provider}${providerLatency ? ` (${providerLatency})` : ""}${quoteTimeLabel}`,
    );
    setChartRenderer("local");

    if (fitContent) {
      window.requestAnimationFrame(() => {
        syncLocalChartSize(true);
        window.setTimeout(() => {
          syncLocalChartSize(true);
        }, 100);
      });
    }
    return true;
  }, [ensureLocalChart, localChartRange, theme, syncLocalChartSize]);

  const renderSymbolLocalChart = useCallback(async (
    tvSymbol,
    title,
    intervalValue = localChartInterval,
    options = {},
  ) => {
    const interval = normalizeLocalChartInterval(intervalValue);
    const fallbackRange = localChartRangeByInterval(interval);
    const rangeValue = String(options.range || localChartRange || fallbackRange).trim().toLowerCase() || fallbackRange;
    const data = await api(
      `/api/chart/candles?query=${encodeURIComponent(tvSymbol)}&interval=${encodeURIComponent(interval)}&range=${encodeURIComponent(rangeValue)}`,
    );
    const source = title || data.yahoo_symbol || tvSymbol;
    return renderLocalChartFromPayload(data, { title: source, fitContent: options.fitContent !== false });
  }, [localChartInterval, localChartRange, renderLocalChartFromPayload]);

  const renderKrLocalChart = useCallback(async (
    resolved,
    intervalValue = localChartInterval,
    options = {},
  ) => {
    if (options.fitContent !== false) {
      localChartViewportStateRef.current.userDetached = false;
      localChartViewportStateRef.current.historyExhausted = false;
      localChartViewportStateRef.current.backfillBusy = false;
      localChartViewportStateRef.current.lastBackfillTriggeredAt = 0;
      localChartViewportStateRef.current.exploringPast = false;
      setLocalChartRange(localChartRangeByInterval(intervalValue));
    }
    const source = localChartTitleFromTvSymbol(resolved.tv_symbol);
    const rendered = await renderSymbolLocalChart(resolved.tv_symbol, source, intervalValue, options);
    if (rendered) {
      localChartContextRef.current = {
        kind: "symbol",
        tvSymbol: resolved.tv_symbol,
        title: source,
      };
    }
    return rendered;
  }, [localChartInterval, renderSymbolLocalChart]);

  const renderIndicatorLocalChart = useCallback(async (
    item,
    intervalValue = localChartInterval,
    options = {},
  ) => {
    if (options.fitContent !== false) {
      localChartViewportStateRef.current.userDetached = false;
      localChartViewportStateRef.current.historyExhausted = false;
      localChartViewportStateRef.current.backfillBusy = false;
      localChartViewportStateRef.current.lastBackfillTriggeredAt = 0;
      localChartViewportStateRef.current.exploringPast = false;
      setLocalChartRange(localChartRangeByInterval(intervalValue));
    }
    const indicatorId = String(item?.id || "").trim().toLowerCase();
    if (!indicatorId) return false;
    const interval = normalizeLocalChartInterval(intervalValue);
    const fallbackRange = localChartRangeByInterval(interval);
    const rangeValue = String(options.range || localChartRange || fallbackRange).trim().toLowerCase() || fallbackRange;
    const data = await api(
      `/api/market-indicators/${encodeURIComponent(indicatorId)}/candles?interval=${encodeURIComponent(interval)}&range=${encodeURIComponent(rangeValue)}`,
    );
    const title = String(item?.label || data.label || indicatorId).trim();
    const rendered = renderLocalChartFromPayload(data, { title, fitContent: options.fitContent !== false });
    if (rendered) {
      localChartContextRef.current = {
        kind: "indicator",
        indicatorId,
        tvSymbol: String(macroIndicatorChartQuery(item) || "").trim().toUpperCase(),
        title,
      };
    }
    return rendered;
  }, [localChartInterval, localChartRange, renderLocalChartFromPayload]);

  const requestLocalChartBackfill = useCallback(async () => {
    if (activeNav !== "workspace" || chartRenderer !== "local") return;
    const state = localChartViewportStateRef.current;
    if (state.backfillBusy || state.historyExhausted) return;

    const context = localChartContextRef.current;
    if (!context) return;

    const interval = normalizeLocalChartInterval(localChartInterval);
    const currentRange = String(localChartRange || state.loadedRange || localChartRangeByInterval(interval)).trim().toLowerCase();
    const nextRange = localChartNextRange(interval, currentRange);
    if (!nextRange || nextRange === currentRange) {
      state.historyExhausted = true;
      return;
    }

    state.backfillBusy = true;
    const prevFirst = Number(state.firstTime || 0);
    const prevLength = Number(state.lastLength || 0);

    try {
      let data = null;
      if (context.kind === "indicator" && context.indicatorId) {
        data = await api(
          `/api/market-indicators/${encodeURIComponent(context.indicatorId)}`
          + `/candles?interval=${encodeURIComponent(interval)}&range=${encodeURIComponent(nextRange)}`,
        );
      } else if (context.kind === "symbol" && context.tvSymbol) {
        data = await api(
          `/api/chart/candles?query=${encodeURIComponent(context.tvSymbol)}`
          + `&interval=${encodeURIComponent(interval)}&range=${encodeURIComponent(nextRange)}`,
        );
      }
      if (!data) return;

      const rendered = renderLocalChartFromPayload(data, {
        title: context.title || localChartTitle,
        fitContent: false,
      });
      if (!rendered) {
        state.historyExhausted = true;
        return;
      }

      const nextFirst = Number((data.candles || [])[0]?.time || 0);
      const nextLength = Number((data.candles || []).length || 0);
      const usedRange = String(data.range || nextRange).trim().toLowerCase();
      if (usedRange) {
        setLocalChartRange(usedRange);
      }
      const expanded = (nextFirst > 0 && prevFirst > 0 && nextFirst < prevFirst) || nextLength > prevLength;
      if (!expanded) {
        state.historyExhausted = true;
      }
    } catch (err) {
      log(`과거 구간 로드 실패: ${err.message}`);
    } finally {
      state.backfillBusy = false;
    }
  }, [activeNav, chartRenderer, localChartInterval, localChartRange, localChartTitle, log, renderLocalChartFromPayload]);

  useEffect(() => {
    localChartBackfillHandlerRef.current = () => {
      void requestLocalChartBackfill();
    };
    return () => {
      localChartBackfillHandlerRef.current = null;
    };
  }, [requestLocalChartBackfill]);

  useEffect(() => {
    if (activeNav !== "workspace" || chartRenderer !== "local") return undefined;

    const timerId = window.setInterval(() => {
      const chartApi = localChartRef.current?.chart;
      const context = localChartContextRef.current;
      if (!chartApi || !context) return;

      const state = localChartViewportStateRef.current;
      const timeScaleApi = chartApi.timeScale?.();
      if (!timeScaleApi || typeof timeScaleApi.getVisibleLogicalRange !== "function") return;

      const range = timeScaleApi.getVisibleLogicalRange();
      if (!range || !Number.isFinite(range.from) || !Number.isFinite(range.to)) return;

      const lastLength = Number(state.lastLength || 0);
      if (lastLength > 0) {
        const latestLogicalIndex = lastLength - 1;
        const nearRightEdge = range.to >= latestLogicalIndex - 0.75;
        state.userDetached = !nearRightEdge;
        const distanceFromRight = latestLogicalIndex - Number(range.to || 0);
        state.exploringPast = distanceFromRight >= LOCAL_CHART_BACKFILL_PAST_BARS_THRESHOLD;
      }

      if (!state.userDetached || state.backfillBusy || state.historyExhausted) return;
      if (!state.exploringPast) return;

      const now = Date.now();
      if (now - Number(state.lastBackfillTriggeredAt || 0) < LOCAL_CHART_LEFT_BACKFILL_COOLDOWN_MS) return;
      state.lastBackfillTriggeredAt = now;

      if (typeof localChartBackfillHandlerRef.current === "function") {
        localChartBackfillHandlerRef.current();
      }
    }, 700);

    return () => {
      window.clearInterval(timerId);
    };
  }, [activeNav, chartRenderer, localChartInterval]);

  useEffect(() => {
    if (activeNav !== "workspace" || chartRenderer !== "local") return undefined;
    const viewportEl = localChartViewportRef.current;
    if (!viewportEl) return undefined;

    const startDrag = (x, y) => {
      localChartPointerRef.current.downX = Number(x);
      localChartPointerRef.current.downY = Number(y);
      localChartPointerRef.current.active = true;
    };

    const handlePointerDown = (ev) => {
      startDrag(ev.clientX, ev.clientY);
    };

    const handleMouseDown = (ev) => {
      startDrag(ev.clientX, ev.clientY);
    };

    const handlePointerUp = (ev) => {
      if (!localChartPointerRef.current.active) return;
      const downX = Number(localChartPointerRef.current.downX);
      const downY = Number(localChartPointerRef.current.downY);
      localChartPointerRef.current.downX = null;
      localChartPointerRef.current.downY = null;
      localChartPointerRef.current.active = false;
      if (!Number.isFinite(downX) || !Number.isFinite(downY)) return;

      const upX = Number(ev?.clientX);
      const upY = Number(ev?.clientY);
      const movedX = Number.isFinite(upX) ? Math.abs(upX - downX) : 0;
      const movedY = Number.isFinite(upY) ? Math.abs(upY - downY) : 0;
      if (movedX < 16 && movedY < 16) return;

      const state = localChartViewportStateRef.current;
      if (state.backfillBusy || state.historyExhausted) return;

      const now = Date.now();
      if (now - Number(state.lastBackfillTriggeredAt || 0) < LOCAL_CHART_LEFT_BACKFILL_COOLDOWN_MS) return;
      state.lastBackfillTriggeredAt = now;
      state.userDetached = true;
      state.exploringPast = true;
      if (typeof localChartBackfillHandlerRef.current === "function") {
        localChartBackfillHandlerRef.current();
      }
    };

    viewportEl.addEventListener("pointerdown", handlePointerDown, { passive: true });
    viewportEl.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, true);
    window.addEventListener("mouseup", handlePointerUp, true);
    window.addEventListener("touchend", handlePointerUp, true);
    return () => {
      viewportEl.removeEventListener("pointerdown", handlePointerDown);
      viewportEl.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("pointerup", handlePointerUp, true);
      window.removeEventListener("mouseup", handlePointerUp, true);
      window.removeEventListener("touchend", handlePointerUp, true);
    };
  }, [activeNav, chartRenderer, localChartInterval]);

  const resolveSymbol = useCallback(async (query) => {
    const normalized = resolveKrQueryAlias(query);
    return api(`/api/chart/resolve?query=${encodeURIComponent(normalized)}`);
  }, []);

  const setChartSymbol = useCallback(async (query, { silent = false } = {}) => {
    const resolved = await resolveSymbol(query);
    const symbolTitle = localChartTitleFromTvSymbol(resolved.tv_symbol);

    setCurrentSymbol(resolved.tv_symbol);
    setSymbolInput(resolved.tv_symbol);
    setOpenTradingViewUrl(resolved.chart_url);

    let renderedLocal = false;
    if (isKrTvSymbol(resolved.tv_symbol)) {
      try {
        renderedLocal = await renderKrLocalChart(resolved, localChartInterval);
      } catch (err) {
        log(`KR 차트 로딩 실패, TradingView로 전환: ${err.message}`);
      }
    }

    if (!renderedLocal) {
      setChartRenderer("tv");
      setTvBaseWidgetUrl(resolved.widget_url);
      setTvWidgetUrl(withThemeWidgetUrl(resolved.widget_url, theme));
      localChartContextRef.current = null;
      setLocalChartTitle(symbolTitle);
    }

    chartReadyRef.current = true;
    if (!silent) {
      log(`차트 변경: ${resolved.tv_symbol}`);
    }
  }, [resolveSymbol, renderKrLocalChart, theme, log, localChartInterval]);

  const loadOverview = useCallback(async () => {
    const data = await api("/api/overview");
    setOverview(data);
  }, []);

  const loadPortfolio = useCallback(async () => {
    const data = await api("/api/portfolio");
    setPortfolio(data);

    if (!chartReadyRef.current) {
      const bootstrap = DEFAULT_BOOTSTRAP_INDICATOR;
      const tvSymbol = macroIndicatorChartQuery(bootstrap);
      setCurrentSymbol(tvSymbol);
      setSymbolInput(tvSymbol);
      setOpenTradingViewUrl(tvChartUrl(tvSymbol));
      setLocalChartTitle(bootstrap.label);

      let renderedLocal = false;
      try {
        renderedLocal = await renderIndicatorLocalChart(bootstrap, localChartInterval);
      } catch (err) {
        log(`초기 달러 환율 차트 로딩 실패: ${err.message}`);
      }

      if (!renderedLocal) {
        await setChartSymbol(tvSymbol, { silent: true });
      } else {
        chartReadyRef.current = true;
      }
    }
  }, [setChartSymbol, renderIndicatorLocalChart, localChartInterval, log]);

  const refreshAll = useCallback(async () => {
    await loadOverview();
    await loadPortfolio();
    await loadReports();
    await loadMarketIndicators();
  }, [loadOverview, loadPortfolio, loadReports, loadMarketIndicators]);

  useEffect(() => {
    let cancelled = false;
    refreshAll()
      .then(() => {
        if (!cancelled) {
          log("Ryong Investment 마켓 스테이션 준비 완료");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          log(`초기화 실패: ${err.message}`);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [refreshAll, log]);

  useEffect(() => {
    const id = window.setInterval(async () => {
      try {
        await loadOverview();
        await loadPortfolio();
      } catch (_) {
        // keep interval silent
      }
    }, OVERVIEW_PORTFOLIO_POLL_MS);
    return () => window.clearInterval(id);
  }, [loadOverview, loadPortfolio]);

  useEffect(() => {
    if ((typeof window.WebSocket !== "function" && !window.EventSource)
      || activeNav !== "workspace"
      || chartRenderer !== "local") {
      chartStreamActiveRef.current = false;
      return undefined;
    }

    const context = localChartContextRef.current;
    if (!context) {
      chartStreamActiveRef.current = false;
      return undefined;
    }

    const params = new URLSearchParams({
      interval: normalizeLocalChartInterval(localChartInterval),
      range: String(localChartRange || localChartRangeByInterval(localChartInterval)).trim().toLowerCase(),
    });
    if (context.kind === "indicator" && context.indicatorId) {
      params.set("indicator_id", String(context.indicatorId));
    } else if (context.kind === "symbol" && context.tvSymbol) {
      params.set("query", String(context.tvSymbol));
    } else {
      chartStreamActiveRef.current = false;
      return undefined;
    }

    const channelQuery = params.toString();
    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const stop = connectRealtimeFeed({
      wsUrl: `${wsProtocol}://${window.location.host}/api/chart/ws?${channelQuery}`,
      sseUrl: `/api/chart/stream?${channelQuery}`,
      wsRetryMs: 1800,
      sseRetryMs: 2400,
      openTimeoutMs: 2600,
      onActiveChange: (active) => {
        chartStreamActiveRef.current = Boolean(active);
      },
      onMessage: (raw) => {
        try {
          const data = JSON.parse(String(raw || "{}"));
          if (data?.ok !== true || !Array.isArray(data?.candles)) return;
          void renderLocalChartFromPayload(data, {
            title: context.title || localChartTitle,
            fitContent: false,
          });
        } catch (_) {
          // ignore malformed event chunks
        }
      },
    });

    return () => {
      stop();
      chartStreamActiveRef.current = false;
    };
  }, [activeNav, chartRenderer, localChartInterval, localChartRange, currentSymbol, renderLocalChartFromPayload, localChartTitle]);

  useEffect(() => {
    if (activeNav !== "workspace" || chartRenderer !== "local") return undefined;

    const refreshMs = localChartRefreshIntervalMs(localChartInterval);
    let stopped = false;

    const refresh = async () => {
      if (stopped || localChartRefreshBusyRef.current || chartStreamActiveRef.current) return;
      const context = localChartContextRef.current;
      if (!context) return;

      localChartRefreshBusyRef.current = true;
      try {
        if (context.kind === "indicator") {
          await renderIndicatorLocalChart(
            {
              id: context.indicatorId,
              label: context.title,
              tv_symbol: context.tvSymbol,
            },
            localChartInterval,
            { fitContent: false },
          );
        } else if (context.kind === "symbol") {
          await renderSymbolLocalChart(context.tvSymbol, context.title, localChartInterval, { fitContent: false });
        }
      } catch (err) {
        log(`실시간 차트 갱신 실패: ${err.message}`);
      } finally {
        localChartRefreshBusyRef.current = false;
      }
    };

    const timerId = window.setInterval(() => {
      void refresh();
    }, refreshMs);

    return () => {
      stopped = true;
      window.clearInterval(timerId);
    };
  }, [activeNav, chartRenderer, localChartInterval, renderIndicatorLocalChart, renderSymbolLocalChart, log]);

  const appShellClassName = sidebarCollapsedEffective ? "app-shell sidebar-collapsed" : "app-shell";
  const handleChangeNav = useCallback((nav) => {
    setActiveNav(normalizeNav(nav));
  }, []);

  const handleRefreshAll = useCallback(async () => {
    await refreshAll();
    log("수동 새로고침 완료");
  }, [refreshAll, log]);

  const handleSubmitSymbol = useCallback(async (ev) => {
    ev.preventDefault();
    const query = symbolInput.trim();
    if (!query) return;
    try {
      setActiveNav("workspace");
      await setChartSymbol(query);
    } catch (err) {
      log(`검색 실패: ${err.message}`);
    }
  }, [symbolInput, setChartSymbol, log]);

  const handleQuickSymbol = useCallback(async (symbol, row) => {
    const query = row?.tv_symbol || symbol;
    try {
      setActiveNav("workspace");
      await setChartSymbol(query);
    } catch (err) {
      log(`심볼 로딩 실패: ${err.message}`);
    }
  }, [setChartSymbol, log]);

  const handlePositionSymbol = useCallback(async (row) => {
    try {
      setActiveNav("workspace");
      await setChartSymbol(toTvSymbol(row.market, row.symbol));
    } catch (err) {
      log(`포지션 심볼 로딩 실패: ${err.message}`);
    }
  }, [setChartSymbol, log]);

  const handleMacroIndicatorSelect = useCallback(async (item) => {
    const query = macroIndicatorChartQuery(item);
    const tvSymbol = String(query || "").trim().toUpperCase();
    if (!tvSymbol) return;

    setActiveNav("workspace");
    setCurrentSymbol(tvSymbol);
    setSymbolInput(tvSymbol);
    setOpenTradingViewUrl(tvChartUrl(tvSymbol));
    setLocalChartTitle(String(item?.label || localChartTitleFromTvSymbol(tvSymbol)).trim() || "차트");

    let renderedLocal = false;
    try {
      renderedLocal = await renderIndicatorLocalChart(item);
    } catch (err) {
      log(`지표 로컬 차트 로딩 실패, TradingView로 전환: ${err.message}`);
    }

    if (!renderedLocal) {
      const widgetBase = buildTvWidgetUrl(tvSymbol);
      setChartRenderer("tv");
      setTvBaseWidgetUrl(widgetBase);
      setTvWidgetUrl(withThemeWidgetUrl(widgetBase, theme));
      localChartContextRef.current = null;
    }

    chartReadyRef.current = true;
    log(`차트 변경: ${tvSymbol}`);
  }, [theme, renderIndicatorLocalChart, log]);

  const handleChangeLocalChartInterval = useCallback(async (nextInterval) => {
    const interval = normalizeLocalChartInterval(nextInterval);
    setLocalChartInterval(interval);
    setLocalChartRange(localChartRangeByInterval(interval));
    localChartViewportStateRef.current.historyExhausted = false;
    localChartViewportStateRef.current.backfillBusy = false;
    localChartViewportStateRef.current.lastBackfillTriggeredAt = 0;
    localChartViewportStateRef.current.exploringPast = false;

    if (chartRenderer !== "local") return;
    const context = localChartContextRef.current;
    if (!context) return;

    setLocalChartMeta("데이터 로딩 중...");
    try {
      if (context.kind === "indicator") {
        await renderIndicatorLocalChart(
          {
            id: context.indicatorId,
            label: context.title,
            tv_symbol: context.tvSymbol,
          },
          interval,
        );
      } else if (context.kind === "symbol") {
        const rendered = await renderSymbolLocalChart(context.tvSymbol, context.title, interval);
        if (!rendered) {
          throw new Error("로컬 차트 렌더링 실패");
        }
      }
    } catch (err) {
      log(`차트 주기 변경 실패: ${err.message}`);
    }
  }, [chartRenderer, renderIndicatorLocalChart, renderSymbolLocalChart, log]);

  const handleReloadReport = useCallback(async () => {
    if (!selectedReport) return;
    await loadReport(selectedReport);
    log(`보고서 불러옴: ${selectedReport}`);
  }, [selectedReport, loadReport, log]);

  const portfolioTotals = portfolio?.totals || {};
  const positions = portfolio?.positions || [];
  const recentFills = portfolio?.recent_fills || [];
  const agentExposure = portfolio?.agent_exposure || [];
  const quickSymbols = portfolio?.quick_symbols || [];

  return (
    <>
      <TopBar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        onRefreshAll={handleRefreshAll}
        sidebarCollapsed={sidebarCollapsedEffective}
        onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
      />

      <div className="macro-strip-shell">
        <span className={`macro-edge left ${canScrollMacroPrev ? "active" : ""}`} aria-hidden="true" />
        <button
          type="button"
          className={`macro-scroll-btn left ${canScrollMacroPrev ? "active" : ""}`}
          aria-label="왼쪽으로 스크롤"
          onClick={() => scrollMacroBy(-1)}
          disabled={!canScrollMacroPrev}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <div className="macro-strip" id="macroStrip" ref={macroStripRef}>
          <MacroStrip
            items={marketIndicators}
            loading={marketIndicatorsBooting || marketIndicatorsSkeletonDemo}
            onSelectItem={handleMacroIndicatorSelect}
          />
        </div>
        <span className={`macro-edge right ${canScrollMacroNext ? "active" : ""}`} aria-hidden="true" />
        <button
          type="button"
          className={`macro-scroll-btn right ${canScrollMacroNext ? "active" : ""}`}
          aria-label="오른쪽으로 스크롤"
          onClick={() => scrollMacroBy(1)}
          disabled={!canScrollMacroNext}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <main className={appShellClassName}>
        <SidebarNav activeNav={activeNav} onChangeNav={handleChangeNav} />

        <section className="content-shell">
          <WorkspaceView
            active={activeNav === "workspace"}
            symbolInput={symbolInput}
            onChangeSymbolInput={setSymbolInput}
            onSubmitSymbol={handleSubmitSymbol}
            currentSymbol={currentSymbol}
            openTradingViewUrl={openTradingViewUrl}
            tvWidgetUrl={tvWidgetUrl}
            chartRenderer={chartRenderer}
            localChartTitle={localChartTitle}
            localChartMeta={localChartMeta}
            localChartInterval={localChartInterval}
            localChartIntervalOptions={LOCAL_CHART_INTERVAL_OPTIONS}
            onChangeLocalChartInterval={handleChangeLocalChartInterval}
            localChartCanvasRef={localChartCanvasRef}
            localChartViewportRef={localChartViewportRef}
            quickSymbols={quickSymbols}
            onClickQuickSymbol={handleQuickSymbol}
            overview={overview}
            portfolioTotals={portfolioTotals}
            positions={positions}
            onClickPositionSymbol={handlePositionSymbol}
          />

          <PositionsView
            active={activeNav === "positions"}
            positions={positions}
            recentFills={recentFills}
            agentExposure={agentExposure}
            onClickPositionSymbol={handlePositionSymbol}
          />

          <ReportsView
            active={activeNav === "reports"}
            reports={reports}
            selectedReport={selectedReport}
            reportContent={reportContent}
            operationLog={operationLog}
            onChangeReport={changeReport}
            onReloadReport={handleReloadReport}
          />
        </section>
      </main>

      <MobileTabBar activeNav={activeNav} onChangeNav={handleChangeNav} />
    </>
  );
}
