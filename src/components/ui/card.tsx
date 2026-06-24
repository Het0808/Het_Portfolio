import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Glassmorphism card surface used across sections.
 * `glow` adds an animated gradient border on hover.
 */
const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { glow?: boolean }
>(({ className, glow = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500",
      glow &&
        "hover:border-neon-violet/40 hover:shadow-glow-soft hover:-translate-y-1",
      className
    )}
    {...props}
  />
));
GlassCard.displayName = "GlassCard";

export { GlassCard };
