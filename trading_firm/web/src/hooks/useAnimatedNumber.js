import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(target, durationMs = 760) {
  const targetNumber = Number(target);
  const initial = Number.isFinite(targetNumber) ? targetNumber : Number.NaN;
  const [display, setDisplay] = useState(initial);
  const previousRef = useRef(initial);
  const rafRef = useRef(0);

  useEffect(() => {
    const next = Number(target);
    if (!Number.isFinite(next)) {
      previousRef.current = Number.NaN;
      setDisplay(Number.NaN);
      return;
    }

    const prev = previousRef.current;
    previousRef.current = next;

    if (!Number.isFinite(prev) || Math.abs(prev - next) < 1e-9) {
      setDisplay(next);
      return;
    }

    const start = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(p);
      const current = prev + (next - prev) * eased;
      setDisplay(current);
      if (p < 1) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, durationMs]);

  return display;
}
