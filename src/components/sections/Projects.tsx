"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X, Cpu, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  projects,
  projectFilters,
  type Project,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const accentGlow: Record<Project["accent"], string> = {
  cyan: "group-hover:shadow-glow-cyan group-hover:border-neon-cyan/50",
  blue: "group-hover:shadow-glow-blue group-hover:border-neon-blue/50",
  purple: "group-hover:shadow-glow-purple group-hover:border-neon-violet/50",
  pink: "group-hover:shadow-glow-purple group-hover:border-neon-pink/50",
};

const accentGrad: Record<Project["accent"], string> = {
  cyan: "from-neon-cyan/30 to-transparent",
  blue: "from-neon-blue/30 to-transparent",
  purple: "from-neon-violet/30 to-transparent",
  pink: "from-neon-pink/30 to-transparent",
};

/** Spotlight-hover project card that opens a detailed modal. */
function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  // Track cursor for the radial spotlight effect
  const [pos, setPos] = useState({ x: 50, y: 50 });

  return (
    <motion.button
      layout
      onClick={onOpen}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className={cn(
        // fixed responsive basis so cards wrap and stay centered as a group
        "group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 sm:w-[340px]",
        accentGlow[project.accent]
      )}
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at ${pos.x}% ${pos.y}%, rgba(139,92,246,0.18), transparent 65%)`,
        }}
      />

      {/* Animated preview band */}
      <div
        className={cn(
          "relative mb-5 flex h-32 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br",
          accentGrad[project.accent]
        )}
      >
        <div className="absolute inset-0 bg-grid-overlay bg-grid opacity-30" />
        <Cpu className="h-12 w-12 text-white/70 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
        <div className="absolute -inset-x-10 top-0 h-full w-1/3 -skew-x-12 bg-white/10 opacity-0 blur-xl transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
      </div>

      <div className="relative flex items-center justify-between gap-2">
        <Badge className="border-white/10 text-white/70">{project.category}</Badge>
        {project.featured && (
          <Badge className="border-neon-violet/30 text-neon-violet">
            <Sparkles className="mr-1 h-3 w-3" /> Featured
          </Badge>
        )}
      </div>

      <h3 className="relative mt-3 text-lg font-semibold text-white">
        {project.title}
      </h3>
      <p className="relative mt-1.5 text-sm text-white/55">{project.tagline}</p>

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/60"
          >
            {t}
          </span>
        ))}
      </div>

      <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-neon-cyan">
        View case study <ArrowUpRight className="h-4 w-4" />
      </span>
    </motion.button>
  );
}

/** Detailed modal with architecture, features and links. */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0a0b18]/95 p-7 shadow-glow-soft backdrop-blur-2xl sm:p-9"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <Badge className="border-neon-violet/30 text-neon-cyan">
          {project.category}
        </Badge>
        <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-2 text-white/60">{project.description}</p>

        <div className="mt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-neon-cyan">
            Key Features
          </h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-violet" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-neon-cyan">
            <Cpu className="h-4 w-4" /> AI Architecture
          </h4>
          <p className="mt-2 font-mono text-sm leading-relaxed text-white/70">
            {project.architecture}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              Live Demo <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="glass">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" /> Source Code
            </a>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// Featured Work"
          title="Projects that ship intelligence"
          subtitle="Production-grade GenAI, agents, NLP and ML systems — click any card for the full case study."
        />

        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm transition-colors",
                filter === f ? "text-white" : "text-white/55 hover:text-white"
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-neon-gradient bg-[length:200%_auto] animate-gradient-x"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>

        {/* CENTERED: flex-wrap + justify-center keeps the cards centered for
            ANY count — including when a filter leaves only 1–2 cards, which a
            plain CSS grid would left-align. align-items:stretch (default) keeps
            equal heights within each row. */}
        <motion.div
          layout
          className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
