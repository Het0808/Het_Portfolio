"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TerminalSquare } from "lucide-react";

/**
 * Terminal-style command section (bonus). Visitors can type a few commands
 * (help, whoami, skills, projects, contact, clear) for a playful, OS-like feel.
 */
const banner = "het@ai-portfolio:~$ welcome — type 'help' to explore";

const commands: Record<string, string> = {
  help: "available: whoami · skills · projects · stack · contact · clear",
  whoami:
    "Het Patel — AI/ML Engineer focused on GenAI, LLMs, RAG and multi-agent systems.",
  skills:
    "Python · PyTorch · LangChain · LangGraph · RAG · FastAPI · Next.js · Docker · Azure",
  projects:
    "AI Voice Hiring Assistant · NCERT RAG · AutoWorth AI · AlphaMind",
  stack: "py · torch · transformers · langgraph · fastapi · next · tailwind · docker",
  contact: "het.patel@example.com — open to AI/ML internships & opportunities 🚀",
};

type Line = { cmd: string; out: string };

export function Terminal() {
  const [history, setHistory] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    const out = commands[cmd] ?? `command not found: ${cmd} — try 'help'`;
    setHistory((h) => [...h, { cmd: raw, out }]);
  };

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-white/15 bg-[#0a0b18]/90 shadow-glow-soft backdrop-blur-xl"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
            <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-white/50">
              <TerminalSquare className="h-3.5 w-3.5" /> bash — het.ai
            </span>
          </div>

          {/* Body */}
          <div
            ref={bodyRef}
            className="h-64 space-y-2 overflow-y-auto p-4 font-mono text-sm"
          >
            <p className="text-neon-cyan/80">{banner}</p>
            {history.map((line, i) => (
              <div key={i}>
                <p className="text-white/80">
                  <span className="text-neon-violet">het@ai</span>
                  <span className="text-white/40">:~$</span> {line.cmd}
                </p>
                <p className="text-white/60">{line.out}</p>
              </div>
            ))}

            {/* Prompt */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
                setInput("");
              }}
              className="flex items-center gap-2"
            >
              <span className="text-neon-violet">het@ai</span>
              <span className="text-white/40">:~$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
                className="flex-1 bg-transparent text-white caret-neon-cyan focus:outline-none"
              />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
