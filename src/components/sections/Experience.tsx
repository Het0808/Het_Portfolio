"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, Trophy, Award, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/card";
import { timeline, type TimelineItem } from "@/lib/data";

const typeIcon: Record<TimelineItem["type"], typeof Briefcase> = {
  Internship: Briefcase,
  Hackathon: Trophy,
  Achievement: Award,
  Education: GraduationCap,
};

const typeAccent: Record<TimelineItem["type"], { border: string; text: string; shadow: string }> = {
  Internship: { border: "border-neon-violet/50", text: "text-neon-violet", shadow: "shadow-glow-purple" },
  Hackathon: { border: "border-neon-cyan/50", text: "text-neon-cyan", shadow: "shadow-glow-cyan" },
  Achievement: { border: "border-neon-pink/50", text: "text-neon-pink", shadow: "shadow-glow-purple" },
  Education: { border: "border-neon-cyan/50", text: "text-neon-cyan", shadow: "shadow-glow-cyan" },
};

/** Vertical timeline whose neon spine fills as you scroll through it. */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// Journey"
          title="Experience & milestones"
          subtitle="My education and the internships shaping my path in AI & data."
        />

        <div ref={ref} className="relative">
          {/* Static track */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 sm:left-1/2" />
          {/* Animated glowing fill */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 top-0 h-full w-px origin-top bg-neon-gradient shadow-glow-cyan sm:left-1/2"
          />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const Icon = typeIcon[item.type];
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={`${item.title}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    left ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-4 z-10 -translate-x-1/2 sm:left-1/2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border bg-[#0a0b18] ${typeAccent[item.type].border} ${typeAccent[item.type].text} ${typeAccent[item.type].shadow}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-12 w-full sm:ml-0 sm:w-[calc(50%-2rem)] ${
                      left ? "sm:pr-10" : "sm:pl-10"
                    }`}
                  >
                    <GlassCard glow className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-neon-cyan">
                          {item.period}
                        </span>
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-wide ${typeAccent[item.type].border} ${typeAccent[item.type].text} bg-white/5`}>
                          {item.type}
                        </span>
                      </div>
                      <h3 className="mt-3 font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-neon-violet">{item.org}</p>
                      <ul className="mt-3 space-y-1.5">
                        {item.points.map((p) => (
                          <li
                            key={p}
                            className="flex items-start gap-2 text-sm text-white/60"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neon-cyan" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
