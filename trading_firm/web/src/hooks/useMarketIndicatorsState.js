import { useCallback, useEffect, useRef, useState } from "react";

import {
  MARKET_INDICATOR_FALLBACK_POLL_MS,
  MARKET_INDICATOR_STREAM_STALE_MS,
} from "../lib/appCoreConfig";
import { connectRealtimeFeed } from "../lib/connectRealtimeFeed";
import { api } from "../lib/dashboardUtils";

export function useMarketIndicatorsState({ log }) {
  const [marketIndicators, setMarketIndicators] = useState([]);
  const [marketIndicatorsBooting, setMarketIndicatorsBooting] = useState(true);
  const [marketIndicatorsSkeletonDemo, setMarketIndicatorsSkeletonDemo] = useState(true);

  const indicatorStreamActiveRef = useRef(false);
  const indicatorStreamLastMessageRef = useRef(0);

  const loadMarketIndicators = useCallback(async () => {
    try {
      const data = await api("/api/market-indicators");
      setMarketIndicators(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      setMarketIndicators((prev) => (prev.length ? prev : []));
      log(`핵심 지표 수신 실패: ${err.message}`);
    } finally {
      setMarketIndicatorsBooting(false);
    }
  }, [log]);

  useEffect(() => {
    const id = window.setInterval(async () => {
      if (document.visibilityState === "hidden") return;
      const now = Date.now();
      const lastMessageAt = Number(indicatorStreamLastMessageRef.current || 0);
      const streamHealthy =
        indicatorStreamActiveRef.current
        && lastMessageAt > 0
        && now - lastMessageAt < MARKET_INDICATOR_STREAM_STALE_MS;
      if (streamHealthy) return;

      try {
        await loadMarketIndicators();
      } catch (_) {
        // keep interval silent
      }
    }, MARKET_INDICATOR_FALLBACK_POLL_MS);
    return () => window.clearInterval(id);
  }, [loadMarketIndicators]);

  useEffect(() => {
    if (typeof window.WebSocket !== "function" && !window.EventSource) return undefined;
    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const stop = connectRealtimeFeed({
      wsUrl: `${wsProtocol}://${window.location.host}/api/market-indicators/ws`,
      sseUrl: "/api/market-indicators/stream",
      wsRetryMs: 1800,
      sseRetryMs: 2400,
      openTimeoutMs: 2600,
      onOpen: (transport) => {
        indicatorStreamActiveRef.current = true;
        if (transport === "ws") {
          indicatorStreamLastMessageRef.current = Date.now();
        }
      },
      onActiveChange: (active) => {
        indicatorStreamActiveRef.current = Boolean(active);
      },
      onMessage: (raw) => {
        try {
          const data = JSON.parse(String(raw || "{}"));
          if (data?.ok === true && Array.isArray(data.items)) {
            indicatorStreamLastMessageRef.current = Date.now();
            setMarketIndicators(data.items);
            setMarketIndicatorsBooting(false);
          }
        } catch (_) {
          // ignore malformed chunks
        }
      },
    });

    return () => {
      stop();
      indicatorStreamActiveRef.current = false;
      indicatorStreamLastMessageRef.current = 0;
    };
  }, []);

  return {
    marketIndicators,
    marketIndicatorsBooting,
    marketIndicatorsSkeletonDemo,
    setMarketIndicatorsSkeletonDemo,
    loadMarketIndicators,
  };
}
