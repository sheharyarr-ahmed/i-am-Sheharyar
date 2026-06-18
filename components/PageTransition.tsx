"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Fast fade/slide between routes. `initial={false}` skips the animation on the
 * very first load so the Loader + home Reveal own that moment; later route changes
 * get the quick transition. Honors prefers-reduced-motion (transforms dropped).
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ height: "100%" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
