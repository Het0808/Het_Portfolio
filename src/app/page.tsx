import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { BackgroundFX } from "@/components/effects/BackgroundFX";
import { CodeShowcase } from "@/components/sections/CodeShowcase";
import { ClientEffects } from "@/components/effects/ClientEffects";
import { ClientContent } from "@/components/effects/ClientContent";

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

      {/* Static Server-Rendered Background Grid & Blobs */}
      <BackgroundFX />

      {/* Global overlays & client-only ambient effects */}
      <ClientEffects />

      <Navbar />

      <main className="relative">
        <Hero />
        
        <ClientContent>
          {/* CodeShowcase is a pure Server Component */}
          <CodeShowcase />
        </ClientContent>
      </main>

      <Footer />
    </>
  );
}
