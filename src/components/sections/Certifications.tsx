"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, type Certification } from "@/lib/data";

/** Certification card with a cursor-driven 3D tilt + real issuer logo. */
function TiltCard({ cert, index }: { cert: Certification; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 15,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-neon-violet/40 hover:shadow-glow-soft [transform-style:preserve-3d] sm:w-[300px]"
    >
      {/* Real issuer logo on a clean white tile so any logo (incl. dark marks)
          stays crisp and consistent against the dark theme. */}
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2 shadow-glow-soft"
        style={{ transform: "translateZ(40px)" }}
      >
        <Image
          src={cert.logo}
          alt={`${cert.issuer} logo`}
          width={44}
          height={44}
          className="h-full w-full object-contain"
        />
      </div>
      <h3
        className="font-semibold text-white"
        style={{ transform: "translateZ(30px)" }}
      >
        {cert.name}
      </h3>
      <p className="mt-1 text-sm text-white/55">{cert.issuer}</p>
      <span className="mt-3 inline-block rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-neon-cyan">
        {cert.year}
      </span>
    </motion.div>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// Credentials"
          title="Certifications"
          subtitle="Verified credentials across finance, insurance and AI."
        />

        {/* CENTERED flex-wrap — all three fit one centered row on desktop and
            wrap cleanly (still centered) on smaller screens. */}
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-5">
          {certifications.map((c, i) => (
            <TiltCard key={c.name} cert={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
