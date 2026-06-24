import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { CodeShowcase } from "@/components/sections/CodeShowcase";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Terminal } from "@/components/sections/Terminal";
import { Contact } from "@/components/sections/Contact";

import { AiAssistant } from "@/components/chatbot/AiAssistant";
import { BackgroundFX } from "@/components/effects/BackgroundFX";
import { ParticleField } from "@/components/effects/ParticleField";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { LoadingScreen } from "@/components/effects/LoadingScreen";

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

      {/* Global ambient effects (fixed, behind content) */}
      <BackgroundFX />
      <ParticleField />
      <MouseGlow />

      {/* Overlays */}
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />

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

      {/* Floating AI chatbot */}
      <AiAssistant />
    </>
  );
}
