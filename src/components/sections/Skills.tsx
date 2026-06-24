"use client";

import { motion } from "framer-motion";
import { Brain, LineChart, Cloud } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/card";
import { skillCategories, type SkillCategory } from "@/lib/data";

// One icon per category, in order: AI, ML / DS, Cloud.
const categoryIcons = [Brain, LineChart, Cloud];

const accentText: Record<SkillCategory["accent"], string> = {
  cyan: "text-neon-cyan",
  blue: "text-neon-blue",
  purple: "text-neon-violet",
  pink: "text-neon-pink",
};

const accentHover: Record<SkillCategory["accent"], string> = {
  cyan: "hover:border-neon-cyan/50 hover:shadow-glow-cyan",
  blue: "hover:border-neon-blue/50 hover:shadow-glow-blue",
  purple: "hover:border-neon-violet/50 hover:shadow-glow-purple",
  pink: "hover:border-neon-pink/50 hover:shadow-glow-purple",
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// Tech Arsenal"
          title="Skills & technologies"
          subtitle="A full-stack AI toolkit — from research and modeling to shipping production systems."
        />

        {/* CENTERED: flex-wrap + justify-center keeps the three cards centered
            at every breakpoint (3 across on desktop, wrapping below). */}
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6">
          {skillCategories.map((cat, i) => {
            const Icon = categoryIcons[i % categoryIcons.length];
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="w-full sm:w-[340px]"
              >
                <GlassCard glow className="h-full p-6 sm:p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className={`rounded-xl border border-white/10 bg-white/5 p-2.5 ${accentText[cat.accent]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {cat.category}
                    </h3>
                  </div>

                  {/* Gradient separator */}
                  <div className="mb-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Skills shown as clean chips — no percentages / progress bars. */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((s, j) => (
                      <motion.span
                        key={s.name}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.3, delay: j * 0.04 }}
                        className={`rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:text-white ${accentHover[cat.accent]}`}
                      >
                        {s.name}
                      </motion.span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
