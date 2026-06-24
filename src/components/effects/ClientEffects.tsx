"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LoadingScreen } from "./LoadingScreen";

const ParticleField = dynamic(() => import("./ParticleField").then((mod) => mod.ParticleField), { ssr: false });
const MouseGlow = dynamic(() => import("./MouseGlow").then((mod) => mod.MouseGlow), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor").then((mod) => mod.CustomCursor), { ssr: false });
const ScrollProgress = dynamic(() => import("./ScrollProgress").then((mod) => mod.ScrollProgress), { ssr: false });
const AiAssistant = dynamic(() => import("../chatbot/AiAssistant").then((mod) => mod.AiAssistant), { ssr: false });

export function ClientEffects() {
  const [loadInteractive, setLoadInteractive] = useState(false);
  const [loadDeferred, setLoadDeferred] = useState(false);

  useEffect(() => {
    // Stage 1: Load lightweight interactive helpers (e.g. scroll indicator)
    const timer1 = setTimeout(() => {
      setLoadInteractive(true);
    }, 400);

    // Stage 2: Load heavy components on first explicit human interaction OR after 4 seconds fallback
    const loadHeavy = () => {
      setLoadDeferred((prev) => {
        if (prev) return prev;
        cleanup();
        return true;
      });
    };

    const timer2 = setTimeout(loadHeavy, 4000);

    const cleanup = () => {
      clearTimeout(timer2);
      window.removeEventListener("scroll", loadHeavy);
      window.removeEventListener("mousemove", loadHeavy);
      window.removeEventListener("touchstart", loadHeavy);
      window.removeEventListener("click", loadHeavy);
      window.removeEventListener("focusin", loadHeavy);
    };

    window.addEventListener("scroll", loadHeavy, { passive: true });
    window.addEventListener("mousemove", loadHeavy, { passive: true });
    window.addEventListener("touchstart", loadHeavy, { passive: true });
    window.addEventListener("click", loadHeavy, { passive: true });
    window.addEventListener("focusin", loadHeavy, { passive: true });

    return () => {
      clearTimeout(timer1);
      cleanup();
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      
      {loadInteractive && <ScrollProgress />}
      
      {loadDeferred && (
        <>
          <ParticleField />
          <MouseGlow />
          <CustomCursor />
          <AiAssistant />
        </>
      )}
    </>
  );
}
