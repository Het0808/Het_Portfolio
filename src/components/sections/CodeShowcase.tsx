"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * GSAP-powered animated code snippet (bonus). The lines stagger in and a
 * cursor blinks — a small "how I build" vignette. GSAP is used here (rather
 * than Framer Motion) to showcase the timeline-based animation approach.
 */
const code: { text: string; cls: string }[] = [
  { text: "from langchain.agents import create_agent", cls: "text-neon-violet" },
  { text: "from rag import retriever, reranker", cls: "text-neon-violet" },
  { text: "", cls: "" },
  { text: "agent = create_agent(", cls: "text-neon-cyan" },
  { text: "    model=\"gpt-4o\",", cls: "text-white/70" },
  { text: "    tools=[retriever, reranker],", cls: "text-white/70" },
  { text: "    system=\"You build intelligent systems.\",", cls: "text-emerald-300/80" },
  { text: ")", cls: "text-neon-cyan" },
  { text: "", cls: "" },
  { text: "result = agent.run(\"Ship something brilliant.\")", cls: "text-white/80" },
  { text: "# => 🚀 deployed to production", cls: "text-white/40" },
];

export function CodeShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current) return;
    const lines = containerRef.current.querySelectorAll("[data-line]");

    // Animate only when the snippet scrolls into view (cheap IO trigger).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.fromTo(
          lines,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          }
        );
        io.disconnect();
      },
      { threshold: 0.3 }
    );
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div
          ref={containerRef}
          className="overflow-hidden rounded-2xl border border-white/15 bg-[#0a0b18]/90 shadow-glow-soft backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
            <span className="ml-2 font-mono text-xs text-white/50">agent.py</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
            {code.map((line, i) => (
              <div key={i} data-line className={line.cls || "text-white/70"}>
                <span className="mr-4 select-none text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {line.text || " "}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </section>
  );
}
