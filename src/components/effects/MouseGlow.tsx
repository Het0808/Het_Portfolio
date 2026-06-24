"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/** A large soft radial glow that follows the cursor across the page. */
export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - 300}px, ${
        e.clientY - 300
      }px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[600px] w-[600px] rounded-full opacity-40 blur-[120px] transition-transform duration-200 ease-out"
      style={{
        background:
          "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(34,211,238,0.18) 45%, transparent 70%)",
      }}
    />
  );
}
