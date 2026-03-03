import { fmtMoney } from "../lib/dashboardUtils";

export function MarketStrip({ overview, totals }) {
  const metrics = overview?.metrics || {};
  const fx = Number(totals?.usdkrw || 0);
  const fxTag = totals?.fx_stale ? "지연" : "실시간";

  const chips = [
    {
      label: "운영상태",
      value: overview?.paused ? "중지" : "정상",
      delta: overview?.paused ? "주의" : "안정",
      tone: overview?.paused ? "down" : "up",
    },
    { label: "오늘 신호", value: `${Number(metrics.signals_today || 0).toLocaleString()}건`, delta: "엔진", tone: "neutral" },
    { label: "오늘 체결", value: `${Number(metrics.fills_today || 0).toLocaleString()}건`, delta: "실행", tone: "neutral" },
    {
      label: "USD/KRW",
      value: fx > 0 ? fx.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "-",
      delta: fx > 0 ? fxTag : "미수신",
      tone: totals?.fx_stale ? "down" : "up",
    },
    {
      label: "총 자산(USD)",
      value: fmtMoney(totals?.total_usd_est, "USD"),
      delta: "실데이터",
      tone: "neutral",
    },
  ];

  return (
    <>
      {chips.map((chip) => {
        const emClass = chip.tone === "up" ? "up" : chip.tone === "down" ? "down" : "";
        return (
          <span key={chip.label} className="market-chip">
            <span>{chip.label}</span>
            <b>{chip.value}</b>
            <em className={emClass}>{chip.delta}</em>
          </span>
        );
      })}
    </>
  );
}
