import { useMemo } from "react";

import { useAnimatedNumber } from "../hooks/useAnimatedNumber";
import {
  fmtIndicatorPrice,
  fmtIndicatorPriceFromValue,
  fmtSignedFixed,
  macroBadgeClass,
  sparklineGeometry,
  sparklineGradient,
} from "../lib/dashboardUtils";

function AnimatedIndicatorNumber({ item, field }) {
  const sourceValue = field === "change_pct_abs" ? Number(item?.change_pct) : Number(item?.[field]);
  const value = sourceValue;
  const animated = useAnimatedNumber(value, 760);

  if (!Number.isFinite(value)) {
    return field === "price" ? "-" : "";
  }
  if (field === "price") {
    return fmtIndicatorPriceFromValue(item, animated);
  }
  if (field === "change") {
    return fmtSignedFixed(animated, 2);
  }
  if (field === "change_pct") {
    return `${fmtSignedFixed(animated, 2)}%`;
  }
  if (field === "change_pct_abs") {
    return `${Math.abs(animated).toFixed(2)}%`;
  }
  return String(animated);
}

function MacroCard({ item, index, onSelectItem }) {
  const direction = String(item?.direction || "flat");
  const tone = direction === "up" ? "up" : direction === "down" ? "down" : "flat";
  const hasChange = Number.isFinite(Number(item?.change)) && Number.isFinite(Number(item?.change_pct));
  const changeIcon = tone === "up" ? "▲" : tone === "down" ? "▼" : "•";
  const interactive = typeof onSelectItem === "function";

  const geometry = useMemo(() => sparklineGeometry(item?.sparkline || []), [item?.sparkline]);
  const grad = useMemo(() => sparklineGradient(tone), [tone]);
  const gradId = useMemo(
    () => `macroGrad-${String(item?.id || index).replace(/[^A-Za-z0-9_-]/g, "")}-${index}`,
    [item?.id, index],
  );
  const statusLabel = String(item?.session_label || "").trim();
  const statusClass = macroBadgeClass(item?.session_status);
  const handleActivate = () => {
    if (!interactive) return;
    onSelectItem(item);
  };
  const handleKeyDown = (ev) => {
    if (!interactive) return;
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      onSelectItem(item);
    }
  };

  return (
    <article
      className={`macro-card ${tone}${interactive ? " interactive" : ""}`}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? handleActivate : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      aria-label={interactive ? `${String(item?.label || "")} 차트 보기` : undefined}
    >
      <div className="macro-spark">
        <svg viewBox="0 0 112 34" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={grad.top} />
              <stop offset="100%" stopColor={grad.bottom} />
            </linearGradient>
          </defs>
          <path className="macro-area" d={geometry.areaPath} fill={`url(#${gradId})`} />
          <path className="macro-line" d={geometry.linePath} />
        </svg>
      </div>
      <div className="macro-main">
        <div className="macro-head">
          <span className="macro-label">{String(item?.label || "-")}</span>
          {statusLabel ? (
            <span className={`macro-badge ${statusClass}`}>{statusLabel}</span>
          ) : null}
        </div>
        <strong className="macro-price">
          <span className="macro-num macro-price-num" data-indicator-id={item?.id || ""} data-field="price">
            {Number.isFinite(Number(item?.price)) ? <AnimatedIndicatorNumber item={item} field="price" /> : fmtIndicatorPrice(item)}
          </span>
        </strong>
        {hasChange ? (
          <p className="macro-change">
            <span className="macro-num macro-change-value" data-indicator-id={item?.id || ""} data-field="change">
              <AnimatedIndicatorNumber item={item} field="change" />
            </span>
            <span className={`macro-change-pill ${tone}`}>
              <span className="macro-change-pill-icon" aria-hidden="true">
                {changeIcon}
              </span>
              <span className="macro-num macro-change-pct" data-indicator-id={item?.id || ""} data-field="change_pct">
                <AnimatedIndicatorNumber item={item} field="change_pct_abs" />
              </span>
            </span>
          </p>
        ) : (
          <p className="macro-change macro-change-empty">변동 정보 없음</p>
        )}
      </div>
    </article>
  );
}

function MacroSkeletonCard({ index }) {
  return (
    <article className="macro-card macro-card-skeleton" aria-hidden="true" data-skeleton-index={index}>
      <div className="macro-spark">
        <div className="macro-skel macro-skel-spark" />
      </div>
      <div className="macro-main">
        <div className="macro-head">
          <span className="macro-skel macro-skel-label" />
          <span className="macro-skel macro-skel-badge" />
        </div>
        <div className="macro-skel macro-skel-price" />
        <div className="macro-skel macro-skel-change" />
      </div>
    </article>
  );
}

const SKELETON_CARD_COUNT = 8;

export function MacroStrip({ items, loading = false, onSelectItem }) {
  if (loading && !items?.length) {
    return (
      <>
        {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
          <MacroSkeletonCard key={`macro-skeleton-${index}`} index={index} />
        ))}
      </>
    );
  }

  if (!items?.length) {
    return <div className="macro-empty">핵심 지표를 불러오지 못했습니다.</div>;
  }

  return (
    <>
      {items.map((item, index) => (
        <MacroCard
          key={item?.id || `${item?.label || "item"}-${index}`}
          item={item}
          index={index}
          onSelectItem={onSelectItem}
        />
      ))}
    </>
  );
}
