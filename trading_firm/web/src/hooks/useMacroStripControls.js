import { useCallback, useEffect, useState } from "react";

import { TEMP_MACRO_SKELETON_MS } from "../lib/appCoreConfig";

export function useMacroStripControls({
  macroStripRef,
  marketIndicators,
  marketIndicatorsBooting,
  marketIndicatorsSkeletonDemo,
  setMarketIndicatorsSkeletonDemo,
}) {
  const [canScrollMacroPrev, setCanScrollMacroPrev] = useState(false);
  const [canScrollMacroNext, setCanScrollMacroNext] = useState(false);

  const updateMacroScrollState = useCallback(() => {
    const el = macroStripRef.current;
    if (!el) {
      setCanScrollMacroPrev(false);
      setCanScrollMacroNext(false);
      return;
    }
    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const left = el.scrollLeft;
    setCanScrollMacroPrev(left > 2);
    setCanScrollMacroNext(left < maxScrollLeft - 2);
  }, [macroStripRef]);

  useEffect(() => {
    const el = macroStripRef.current;
    if (!el) return undefined;

    const onDragStart = (ev) => {
      ev.preventDefault();
    };
    updateMacroScrollState();
    const onScroll = () => updateMacroScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("dragstart", onDragStart);

    let observer = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => updateMacroScrollState());
      observer.observe(el);
    }

    const onResize = () => updateMacroScrollState();
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("dragstart", onDragStart);
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener("resize", onResize);
    };
  }, [macroStripRef, updateMacroScrollState]);

  useEffect(() => {
    const el = macroStripRef.current;
    if (!el) return undefined;

    const pinToLeft = () => {
      el.scrollTo({ left: 0, top: 0, behavior: "auto" });
      updateMacroScrollState();
    };

    pinToLeft();
    const raf1 = window.requestAnimationFrame(pinToLeft);
    const raf2 = window.requestAnimationFrame(() => {
      pinToLeft();
    });
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, [macroStripRef, marketIndicatorsBooting, marketIndicatorsSkeletonDemo, updateMacroScrollState]);

  useEffect(() => {
    updateMacroScrollState();
  }, [marketIndicators, marketIndicatorsBooting, marketIndicatorsSkeletonDemo, updateMacroScrollState]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setMarketIndicatorsSkeletonDemo(false);
    }, TEMP_MACRO_SKELETON_MS);
    return () => {
      window.clearTimeout(timerId);
    };
  }, [setMarketIndicatorsSkeletonDemo]);

  const scrollMacroBy = useCallback((direction) => {
    const el = macroStripRef.current;
    if (!el) return;
    const distance = Math.max(180, Math.round(el.clientWidth * 0.72));
    el.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
    window.setTimeout(() => {
      updateMacroScrollState();
    }, 260);
  }, [macroStripRef, updateMacroScrollState]);

  return {
    canScrollMacroPrev,
    canScrollMacroNext,
    scrollMacroBy,
  };
}
