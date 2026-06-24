"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { profile, socials } from "@/lib/data";

/**
 * Futuristic contact section — glowing form inputs, availability status, an
 * animated "radar" location panel and social links.
 * The form is wired with client validation; swap the submit handler for your
 * email service (Resend, Formspree, EmailJS, etc.).
 */
export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo behaviour: open the user's mail client with a prefilled message.
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const field =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all focus:border-neon-violet/60 focus:outline-none focus:ring-2 focus:ring-neon-violet/30";

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// Get In Touch"
          title="Let's build something intelligent"
          subtitle={profile.availability}
        />

        {/* CENTERED: mx-auto + max-w-6xl centers the contact block on the page. */}
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">
          {/* Info / availability / radar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <GlassCard className="h-full p-7">
              {/* Availability */}
              <div className="flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-medium text-green-400 w-fit">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                </span>
                Available for new opportunities
              </div>
              <p className="mt-2 text-xs text-white/45">Typically responds within 24 hours</p>

              <div className="mt-6 space-y-4 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-white/70 transition-colors hover:text-neon-cyan"
                >
                  <span className="rounded-lg border border-white/10 bg-white/5 p-2">
                    <Mail className="h-4 w-4" />
                  </span>
                  {profile.email}
                </a>
                <div className="flex items-center gap-3 text-white/70">
                  <span className="rounded-lg border border-white/10 bg-white/5 p-2">
                    <MapPin className="h-4 w-4" />
                  </span>
                  {profile.location}
                </div>
              </div>

              {/* Animated radar "map" */}
              <div className="relative mt-7 flex h-44 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-grid-overlay bg-grid">
                <div className="absolute h-32 w-32 rounded-full border border-neon-cyan/30" />
                <div className="absolute h-20 w-20 rounded-full border border-neon-cyan/40" />
                <div className="absolute h-2.5 w-2.5 rounded-full bg-neon-cyan shadow-glow-cyan" />
                <motion.div
                  className="absolute h-32 w-32 origin-bottom-left"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(34,211,238,0.35), transparent 60deg)",
                    borderRadius: "9999px",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />
                <span className="absolute bottom-3 left-3 font-mono text-[11px] text-neon-cyan/70">
                  ◉ online · responds within 24h
                </span>
              </div>

              {/* Socials */}
              <div className="mt-6 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/70 transition-all hover:-translate-y-1 hover:border-neon-cyan/60 hover:text-neon-cyan"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <GlassCard className="p-7">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm text-white/70">
                      Name
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Jane Recruiter"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm text-white/70">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="jane@company.com"
                      className={field}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-white/70">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Tell me about the role or project..."
                    className={`${field} resize-none`}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  {sent ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Opening your mail app…
                    </>
                  ) : (
                    <>
                      Send Message <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
