"use client";

import { motion } from "framer-motion";

/**
 * Layered ambient background: a subtle grid overlay plus slow floating
 * gradient blobs. Sits behind all content (fixed, -z-20).
 */
export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Grid overlay with a soft radial mask so it fades at the edges */}
      <div
        className="absolute inset-0 bg-grid-overlay bg-grid opacity-[0.35]"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
        }}
      />

      {/* Floating gradient blobs */}
      <motion.div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-neon-violet/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-2/3 h-80 w-80 rounded-full bg-neon-cyan/15 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-72 w-72 rounded-full bg-neon-blue/10 blur-[120px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />
    </div>
  );
}
