"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

const REVEAL_MS = 4500;
const FEATHER = 18;

// Slow-emerge easing: lingers in darkness, then accelerates into focus.
function slowEmerge(t: number): number {
  if (t < 0.5) return 2 * t * t * t;
  return 1 - Math.pow(-2 * t + 2, 2.4) / 2;
}

/**
 * Ports the 4.5s brightness + mask "slow-emerge" reveal from the original
 * index.html. Runs once on mount. Respects prefers-reduced-motion (instant).
 */
export default function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      el.style.filter = "none";
      el.style.opacity = "1";
      el.style.maskImage = "";
      el.style.webkitMaskImage = "";
      return;
    }

    let rafId = 0;

    const apply = (p: number) => {
      el.style.filter = `brightness(${p * p})`;
      el.style.opacity = `${0.02 + 0.98 * p}`;

      const headPct = p * (100 + FEATHER);
      const tailPct = Math.max(0, headPct - FEATHER);
      const mask =
        `linear-gradient(to bottom, #000 0%, #000 ${tailPct}%, ` +
        `rgba(0,0,0,0) ${headPct}%, rgba(0,0,0,0) 100%)`;

      el.style.webkitMaskImage = mask;
      el.style.maskImage = mask;
      el.style.webkitMaskRepeat = "no-repeat";
      el.style.maskRepeat = "no-repeat";
      el.style.webkitMaskSize = "100% 100%";
      el.style.maskSize = "100% 100%";
    };

    apply(0);
    const startT = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startT) / REVEAL_MS);
      apply(slowEmerge(t));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={ref} className="reveal-root">
      {children}
    </div>
  );
}
