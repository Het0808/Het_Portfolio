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

/**
 * Animated code snippet component.
 * Converted to a Server Component using CSS keyframe animations for high performance.
 * This completely removes the GSAP library dependency.
 */
export function CodeShowcase() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div
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
              <div
                key={i}
                className={`${line.cls || "text-white/70"} opacity-0 animate-code-line`}
                style={{
                  animationDelay: `${i * 0.08}s`,
                  animationFillMode: "forwards",
                }}
              >
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
