"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const DURATION_MS = 1600;

/**
 * First-load progress bar. Shows the 0→100% counter + filling bar only on the
 * first visit of a browser session (gated on sessionStorage), then dispatches
 * "loader:done" so the home Reveal can hand off into its slow-emerge. Skipped on
 * later same-session navigations/refreshes and under prefers-reduced-motion (it
 * resolves instantly so content is immediately visible).
 */
export default function Loader() {
  const [pct, setPct] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const alreadyShown = sessionStorage.getItem("loaderShown") === "1";

    const done = () => {
      sessionStorage.setItem("loaderShown", "1");
      window.dispatchEvent(new Event("loader:done"));
    };

    if (reduced || alreadyShown) {
      done();
      return;
    }

    let rafId = 0;
    const start = performance.now();
    // All state updates happen inside the rAF callback (not synchronously in the
    // effect body), so the overlay shows from the first frame and grows to 100%.
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      setActive(true);
      setPct(Math.round(t * 100));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setActive(false);
        done();
      }
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="loader-inner">
            <span className="loader-pct">{pct}%</span>
            <div className="loader-bar">
              <div
                className="loader-bar-fill"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
