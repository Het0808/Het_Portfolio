import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

/* Fonts — modern sans for body, Space Grotesk for display, mono for terminals */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://hetpatel.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — AI/ML Engineer & GenAI Developer`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Het Patel is an AI/ML Engineer specializing in GenAI, LLMs, RAG and multi-agent systems. Explore projects, skills and experience. Open to AI/ML internships and opportunities.",
  keywords: [
    "Het Patel",
    "AI Engineer",
    "Machine Learning Engineer",
    "GenAI Developer",
    "LLM Engineer",
    "NLP Engineer",
    "Full Stack AI Engineer",
    "RAG",
    "LangChain",
    "Portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — AI/ML Engineer & GenAI Developer`,
    description:
      "Premium portfolio of an AI/ML Engineer building intelligent systems with GenAI, LLMs and multi-agent architectures.",
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI/ML Engineer`,
    description:
      "AI/ML Engineer building intelligent systems with GenAI, LLMs and RAG.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable} ${jetbrains.variable} dark`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
