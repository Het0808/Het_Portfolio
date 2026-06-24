"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { useTypewriter } from "@/hooks/useTypewriter";
import { profile, socials } from "@/lib/data";

// The 3D orb is client-only and heavy → load it lazily without SSR.
const NeuralOrb = dynamic(() => import("@/components/three/NeuralOrb"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 animate-pulse-glow rounded-full bg-neon-violet/20 blur-2xl" />
    </div>
  ),
});

export function Hero() {
  const role = useTypewriter(profile.roles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* 3D orb — sits on the right on desktop, behind text on mobile */}
      <div className="absolute inset-y-0 right-0 h-full w-full opacity-70 lg:w-1/2 lg:opacity-100">
        <NeuralOrb />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="border-neon-cyan/30 text-neon-cyan">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-400" />
              Available for AI/ML roles & internships
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="bg-neon-gradient bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
              Het Patel
            </span>
          </motion.h1>

          {/* Typing role line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 h-8 text-lg font-medium text-white/80 sm:text-2xl"
          >
            <span className="text-neon-cyan">{role}</span>
            <span className="ml-1 inline-block w-[2px] animate-blink bg-neon-cyan align-middle">
              &nbsp;
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-5 max-w-xl text-pretty text-base text-white/55 lg:mx-0"
          >
            {profile.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <MagneticButton>
              <Button asChild size="lg">
                <a href="#projects">
                  View Projects <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild size="lg" variant="glass">
                <a href={profile.resumeUrl} download>
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild size="lg" variant="outline">
                <a href="#contact">
                  <Mail className="h-4 w-4" /> Contact Me
                </a>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Social icons — HIGHLIGHTED: larger tap targets, gradient ring,
              always-on glow and a label so they grab attention immediately. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-col items-center gap-3 lg:items-start"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan/80">
              Let&apos;s connect
            </span>
            <div className="flex items-center gap-3.5">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  whileHover={{ y: -5, scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.08, type: "spring", stiffness: 300 }}
                  className="group relative rounded-2xl bg-neon-gradient bg-[length:200%_auto] p-[2px] shadow-glow-purple animate-gradient-x"
                >
                  {/* inner surface keeps the gradient as a glowing ring */}
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a0b18] text-white transition-colors duration-300 group-hover:bg-transparent">
                    <s.icon className="h-5 w-5" />
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>


      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-1.5 w-1.5 rounded-full bg-neon-cyan"
          />
        </div>
      </motion.div>
    </section>
  );
}
