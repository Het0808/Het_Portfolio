"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LoadingScreen } from "./LoadingScreen";

const BackgroundFX = dynamic(() => import("./BackgroundFX").then((mod) => mod.BackgroundFX), { ssr: false });
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

    // Stage 2: Load heavy components on first interaction OR after a fallback timeout
    const loadHeavy = () => {
      setLoadDeferred((prev) => {
        if (prev) return prev;
        // Clean up listeners
        window.removeEventListener("scroll", loadHeavy);
        window.removeEventListener("mousemove", loadHeavy);
        window.removeEventListener("touchstart", loadHeavy);
        return true;
      });
    };

    window.addEventListener("scroll", loadHeavy, { passive: true });
    window.addEventListener("mousemove", loadHeavy, { passive: true });
    window.addEventListener("touchstart", loadHeavy, { passive: true });

    // Fallback timeout to ensure they load eventually
    const timer2 = setTimeout(loadHeavy, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("scroll", loadHeavy);
      window.removeEventListener("mousemove", loadHeavy);
      window.removeEventListener("touchstart", loadHeavy);
    };
  }, []);

  return (
    <>
      <BackgroundFX />
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
