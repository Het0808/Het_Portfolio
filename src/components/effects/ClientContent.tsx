"use client";

import dynamic from "next/dynamic";
import { LazySection } from "./LazySection";

const About = dynamic(() => import("../sections/About").then((mod) => mod.About), { ssr: false });
const Skills = dynamic(() => import("../sections/Skills").then((mod) => mod.Skills), { ssr: false });
const Projects = dynamic(() => import("../sections/Projects").then((mod) => mod.Projects), { ssr: false });
const Experience = dynamic(() => import("../sections/Experience").then((mod) => mod.Experience), { ssr: false });
const Certifications = dynamic(() => import("../sections/Certifications").then((mod) => mod.Certifications), { ssr: false });
const Terminal = dynamic(() => import("../sections/Terminal").then((mod) => mod.Terminal), { ssr: false });
const Contact = dynamic(() => import("../sections/Contact").then((mod) => mod.Contact), { ssr: false });

/**
 * Host client component for dynamic imports with `ssr: false` and LazySection wrapping.
 * Receives Server Components (like CodeShowcase) as children to maintain server-rendering advantages.
 */
export function ClientContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LazySection height="500px">
        <About />
      </LazySection>
      
      <LazySection height="450px">
        <Skills />
      </LazySection>
      
      {/* CodeShowcase Server Component */}
      {children}
      
      <LazySection height="600px">
        <Projects />
      </LazySection>
      
      <LazySection height="500px">
        <Experience />
      </LazySection>
      
      <LazySection height="400px">
        <Certifications />
      </LazySection>
      
      <LazySection height="350px">
        <Terminal />
      </LazySection>
      
      <LazySection height="500px">
        <Contact />
      </LazySection>
    </>
  );
}
