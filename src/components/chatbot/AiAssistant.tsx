"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import {
  intents,
  matchIntent,
  fallbackAnswer,
  greeting,
} from "@/lib/chatKnowledge";

type Message = { role: "user" | "assistant"; content: string };

const quickReplies = intents.slice(0, 6).map((i) => i.suggestion);

/**
 * Floating ChatGPT-style assistant. Answers instantly from the local
 * knowledge base, and transparently upgrades to a live LLM if the optional
 * /api/chat route has an OPENAI_API_KEY configured.
 */
export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: greeting },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setInput("");
    setTyping(true);

    // Local instant answer (also the offline fallback)
    const local = matchIntent(trimmed)?.answer ?? fallbackAnswer;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = (await res.json()) as { reply?: string };
      const reply = data.reply || local;

      // Small delay so the typing indicator reads naturally
      await new Promise((r) => setTimeout(r, 450));
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      await new Promise((r) => setTimeout(r, 450));
      setMessages((m) => [...m, { role: "assistant", content: local }]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {/* Floating launcher — HIGHLIGHTED: an animated "Ask my AI" label pill
          and an expanding pulse ring draw the eye to the chatbot. */}
      <div className="fixed bottom-5 right-5 z-[120] flex items-center gap-3">
        {/* Attention label (only while the chat is closed) */}
        <AnimatePresence>
          {!open && (
            <motion.button
              key="label"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.9 }}
              transition={{ delay: 0.4 }}
              className="hidden items-center gap-1.5 rounded-full border border-neon-violet/40 bg-[#0a0b18]/90 px-4 py-2 text-sm font-medium text-white shadow-glow-soft backdrop-blur-md sm:flex"
            >
              <Sparkles className="h-4 w-4 text-neon-cyan" />
              Ask my AI
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Open AI assistant"
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-neon-gradient bg-[length:200%_auto] shadow-glow-purple animate-gradient-x"
        >
          {/* Expanding pulse ring for extra prominence */}
          {!open && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-neon-cyan/60"
                animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
              />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-neon-cyan" />
              </span>
            </>
          )}

          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="h-7 w-7 text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Bot className="h-7 w-7 text-white" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-24 right-5 z-[120] flex h-[32rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#0a0b18]/90 shadow-glow-soft backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-neon-gradient">
                <Sparkles className="h-4 w-4 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0a0b18] bg-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Het&apos;s AI Assistant</p>
                <p className="text-[11px] text-green-400">● online · ask me anything</p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm ${
                      m.role === "user"
                        ? "rounded-br-sm bg-neon-violet/80 text-white"
                        : "rounded-bl-sm border border-white/10 bg-white/5 text-white/90"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-neon-cyan"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Het..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-neon-violet/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon-gradient text-white transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
