"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "./LoadingScreen";

const BackgroundFX = dynamic(() => import("./BackgroundFX").then((mod) => mod.BackgroundFX), { ssr: false });
const ParticleField = dynamic(() => import("./ParticleField").then((mod) => mod.ParticleField), { ssr: false });
const MouseGlow = dynamic(() => import("./MouseGlow").then((mod) => mod.MouseGlow), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor").then((mod) => mod.CustomCursor), { ssr: false });
const ScrollProgress = dynamic(() => import("./ScrollProgress").then((mod) => mod.ScrollProgress), { ssr: false });
const AiAssistant = dynamic(() => import("../chatbot/AiAssistant").then((mod) => mod.AiAssistant), { ssr: false });

export function ClientEffects() {
  return (
    <>
      <BackgroundFX />
      <ParticleField />
      <MouseGlow />
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <AiAssistant />
    </>
  );
}
