"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { useTypewriter } from "@/hooks/useTypewriter";
import { profile, socials } from "@/lib/data";

// The 3D orb is client-only and heavy → load it lazily without SSR.
const NeuralOrb = dynamic(() => import("@/components/three/NeuralOrb"), {
  ssr: false,
});

/** Domain positioning chips shown below the headline. */
const domainTags = [
  "AI/ML Engineer",
  "GenAI",
  "Agentic AI",
  "RAG Systems",
  "ML Ops",
];

export function Hero() {
  const role = useTypewriter(profile.roles);
  const [showOrb, setShowOrb] = useState(false);

  useEffect(() => {
    const handleInteract = () => {
      setShowOrb(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", handleInteract);
      window.removeEventListener("mousemove", handleInteract);
      window.removeEventListener("touchstart", handleInteract);
      window.removeEventListener("click", handleInteract);
      window.removeEventListener("focusin", handleInteract);
    };

    window.addEventListener("scroll", handleInteract, { passive: true });
    window.addEventListener("mousemove", handleInteract, { passive: true });
    window.addEventListener("touchstart", handleInteract, { passive: true });
    window.addEventListener("click", handleInteract, { passive: true });
    window.addEventListener("focusin", handleInteract, { passive: true });

    // Load after 1 second automatically to start 3D animations
    const timer = setTimeout(handleInteract, 1000);

    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* 3D orb area — sits on the right on desktop, behind text on mobile */}
      <div className="absolute inset-y-0 right-0 h-full w-full opacity-70 lg:w-1/2 lg:opacity-100 flex items-center justify-center">
        {/* Instant lightweight SVG wireframe fallback (Server-rendered, displays instantly) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
            showOrb ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <svg
            viewBox="0 0 400 400"
            className="h-80 w-80 animate-pulse-glow"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#05060f" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Glowing background */}
            <circle cx="200" cy="200" r="100" fill="url(#innerGlow)" />
            <circle cx="200" cy="200" r="60" fill="url(#innerGlow)" opacity="0.8" />
            <circle cx="200" cy="200" r="150" fill="url(#cyanGlow)" opacity="0.15" />

            {/* Core wireframe */}
            <circle cx="200" cy="200" r="45" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6" />
            
            {/* Geodesic wireframe connections */}
            <g stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.65" fill="none">
              <polygon points="200,90 295,145 295,255 200,310 105,255 105,145" />
              <polygon points="200,90 200,165 145,200 105,145" />
              <polygon points="200,90 200,165 255,200 295,145" />
              <polygon points="200,310 200,235 145,200 105,255" />
              <polygon points="200,310 200,235 255,200 295,255" />
              <line x1="200" y1="165" x2="145" y2="200" />
              <line x1="200" y1="165" x2="255" y2="200" />
              <line x1="200" y1="235" x2="145" y2="200" />
              <line x1="200" y1="235" x2="255" y2="200" />
              <line x1="145" y1="200" x2="255" y2="200" />
              <line x1="105" y1="145" x2="145" y2="200" />
              <line x1="295" y1="145" x2="255" y2="200" />
              <line x1="105" y1="255" x2="145" y2="200" />
              <line x1="295" y1="255" x2="255" y2="200" />
            </g>

            {/* Sphere vertices */}
            <g fill="#22d3ee">
              <circle cx="200" cy="90" r="4.5" className="animate-pulse" />
              <circle cx="295" cy="145" r="4.5" />
              <circle cx="295" cy="255" r="4.5" />
              <circle cx="200" cy="310" r="4.5" />
              <circle cx="105" cy="255" r="4.5" />
              <circle cx="105" cy="145" r="4.5" />
              <circle cx="200" cy="165" r="5" fill="#a855f7" />
              <circle cx="200" cy="235" r="5" fill="#a855f7" />
              <circle cx="145" cy="200" r="5" />
              <circle cx="255" cy="200" r="5" />
            </g>

            {/* Tiny outer particles */}
            <g fill="#3b82f6" opacity="0.6">
              <circle cx="120" cy="100" r="2" />
              <circle cx="280" cy="80" r="1.5" />
              <circle cx="310" cy="180" r="2.5" />
              <circle cx="90" cy="210" r="2" />
              <circle cx="150" cy="300" r="1.5" />
              <circle cx="250" cy="320" r="2" />
            </g>
          </svg>
        </div>

        {/* 3D Canvas wrapper */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            showOrb ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {showOrb && <NeuralOrb />}
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="border-green-400/30 bg-green-400/10 text-green-400">
              <span className="relative mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Available for AI/ML roles & internships
            </Badge>
          </motion.div>

          {/* Value-proposition headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            I Build{" "}
            <span className="bg-neon-gradient bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
              Intelligent AI Systems
            </span>
          </motion.h1>

          {/* Name + typing role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-4"
          >
            <p className="text-xl font-semibold text-white/90 sm:text-2xl">
              {profile.name}
            </p>
            <p className="mt-1.5 h-7 text-base font-medium text-white/70 sm:text-lg">
              <span className="text-neon-cyan">{role}</span>
              <span className="ml-1 inline-block w-[2px] animate-blink bg-neon-cyan align-middle">
                &nbsp;
              </span>
            </p>
          </motion.div>

          {/* Domain positioning tags */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {domainTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="rounded-full border border-neon-violet/25 bg-neon-violet/10 px-3 py-1 text-xs font-medium text-neon-violet"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-5 max-w-xl text-pretty text-base text-white/60 lg:mx-0"
          >
            {profile.bio}
          </motion.p>

          {/* CTAs — clear hierarchy: primary → secondary → tertiary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <MagneticButton>
              <Button asChild size="lg">
                <a href="#projects">
                  <Sparkles className="h-4 w-4" /> View Projects <ArrowRight className="h-4 w-4" />
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

          {/* Social icons */}
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
