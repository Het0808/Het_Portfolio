"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Boot-sequence loading screen — a terminal-style "initialising" animation
 * that plays once on first paint, then reveals the site.
 */
const bootLines = [
  "> initializing neural core...",
  "> loading models · transformers · rag...",
  "> calibrating particle field...",
  "> system online ✓",
];

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const total = 1900;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / total, 1);
      setProgress(Math.round(p * 100));
      setLine(Math.min(bootLines.length - 1, Math.floor(p * bootLines.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);

    // Prevent scroll while loading
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#05060f]"
        >
          {/* Pulsing core */}
          <div className="relative mb-10 h-24 w-24">
            <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-neon-cyan/30 border-t-neon-cyan" />
            <div className="absolute inset-2 animate-spin-slow rounded-full border-2 border-neon-violet/30 border-b-neon-violet [animation-direction:reverse]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 animate-pulse-glow rounded-full bg-neon-gradient shadow-glow-purple" />
            </div>
          </div>

          {/* Terminal lines */}
          <div className="h-6 font-mono text-sm text-neon-cyan/90">
            {bootLines[line]}
            <span className="ml-0.5 inline-block w-2 animate-blink">▍</span>
          </div>

          {/* Progress */}
          <div className="mt-6 h-1 w-64 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-neon-gradient bg-[length:200%_auto] animate-gradient-x transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 font-mono text-xs text-white/40">{progress}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
