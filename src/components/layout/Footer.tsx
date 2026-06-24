"use client";

import { motion } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";
import { socials, profile, navLinks } from "@/lib/data";

/** Animated futuristic footer with an AI quote, links and social glow. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#05060f]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-64 w-2/3 rounded-full bg-neon-violet/20 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center text-2xl font-semibold leading-snug text-white sm:text-3xl"
        >
          “The best way to predict the future is to{" "}
          <span className="bg-neon-gradient bg-clip-text text-transparent">
            build it with intelligence
          </span>
          .”
        </motion.blockquote>

        <div className="mt-12 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-10 md:flex-row md:items-start">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-2 text-lg font-bold text-white md:justify-start">
              <Sparkles className="h-5 w-5 text-neon-cyan" />
              Het<span className="text-neon-violet">.</span>AI
            </div>
            <p className="mt-2 max-w-xs text-sm text-white/50">
              {profile.tagline}
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/60 transition-colors hover:text-neon-cyan"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/70 transition-all hover:-translate-y-1 hover:border-neon-cyan/60 hover:text-neon-cyan hover:shadow-glow-cyan"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with Next.js,
            Three.js & Framer Motion.
          </p>
          <a
            href="#home"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
