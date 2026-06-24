import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ClientEffects } from "@/components/effects/ClientEffects";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/sections/About").then((mod) => mod.About));
const Skills = dynamic(() => import("@/components/sections/Skills").then((mod) => mod.Skills));
const CodeShowcase = dynamic(() => import("@/components/sections/CodeShowcase").then((mod) => mod.CodeShowcase));
const Projects = dynamic(() => import("@/components/sections/Projects").then((mod) => mod.Projects));
const Experience = dynamic(() => import("@/components/sections/Experience").then((mod) => mod.Experience));
const Certifications = dynamic(() => import("@/components/sections/Certifications").then((mod) => mod.Certifications));
const Terminal = dynamic(() => import("@/components/sections/Terminal").then((mod) => mod.Terminal));
const Contact = dynamic(() => import("@/components/sections/Contact").then((mod) => mod.Contact));

import { profile } from "@/lib/data";

/** JSON-LD structured data for rich search results. */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "AI/ML Engineer",
    email: profile.email,
    description: profile.bio,
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "Large Language Models",
      "NLP",
      "RAG",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />

      {/* Global overlays & client-only ambient effects */}
      <ClientEffects />

      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <CodeShowcase />
        <Projects />
        <Experience />
        <Certifications />
        <Terminal />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
