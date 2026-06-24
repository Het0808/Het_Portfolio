"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Brain, Workflow, Server, Cpu } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/card";
import { aboutHighlights, profile } from "@/lib/data";

// Icons map 1:1 to the expertise cards:
// GenAI & LLMs → Brain, AI Agents → Workflow, MLOps → Server, Problem Solving → Cpu.
const icons = [Brain, Workflow, Server, Cpu];

/**
 * About section: an "image reveal" framed avatar surrounded by orbiting tech
 * labels, paired with glowing journey cards.
 */
export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// About Me"
          title="Engineering intelligence into products"
          subtitle="My journey, focus and what drives me as an AI/ML engineer."
        />

        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Orbiting avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm"
          >
            {/* Ambient glow behind the photo */}
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-neon-violet/20 blur-3xl" />

            {/*
              PHOTO PLACEMENT — the About section is the canonical "this is me"
              spot. The full uploaded portrait is shown large at its original
              3:4 aspect ratio (object-cover on a matching 3:4 frame shows the
              whole image with no cropping), inside a glowing gradient ring.
            */}
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-neon-gradient p-[3px] shadow-glow-purple"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] bg-[#0a0b18]">
                <Image
                  src="/het-portrait.jpg"
                  alt="Het Patel"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 24rem"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Narrative + cards */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-lg leading-relaxed text-white/70"
            >
              I&apos;m an AI/ML engineer obsessed with{" "}
              <span className="text-neon-cyan">GenAI and LLMs</span> — building
              retrieval-augmented systems, multi-agent pipelines, and fine-tuned
              models that solve real problems. {profile.bio}
            </motion.p>

            {/* Expertise cards — equal heights via h-full + grid stretch.
                GenAI → Agentic AI → Production Deployment → Problem Solving. */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {aboutHighlights.map((h, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="h-full"
                  >
                    <GlassCard
                      glow
                      className="group relative h-full overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1.5"
                    >
                      {/* Hover glow sheen + brighter border */}
                      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-neon-cyan/0 to-neon-violet/0 opacity-0 transition-all duration-500 group-hover:from-neon-cyan/[0.08] group-hover:to-neon-violet/[0.10] group-hover:opacity-100" />

                      <div className="relative">
                        <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-white/5 p-3 text-neon-cyan shadow-glow-soft transition-all duration-300 group-hover:border-neon-cyan/50 group-hover:shadow-glow-cyan">
                          <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h3 className="text-base font-semibold text-white">
                          {h.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/60">
                          {h.body}
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
