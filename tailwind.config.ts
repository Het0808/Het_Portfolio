import type { Config } from "tailwindcss";

/**
 * Tailwind theme for the futuristic AI portfolio.
 * Centralizes the neon palette, glow shadows, fonts and keyframe animations
 * so components stay declarative.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core surfaces
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        // Neon accents
        neon: {
          blue: "#3b82f6",
          cyan: "#22d3ee",
          purple: "#a855f7",
          violet: "#8b5cf6",
          pink: "#ec4899",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        "glow-blue": "0 0 20px rgba(59,130,246,0.45), 0 0 60px rgba(59,130,246,0.18)",
        "glow-cyan": "0 0 20px rgba(34,211,238,0.45), 0 0 60px rgba(34,211,238,0.18)",
        "glow-purple": "0 0 20px rgba(168,85,247,0.45), 0 0 60px rgba(168,85,247,0.18)",
        "glow-soft": "0 0 40px rgba(139,92,246,0.25)",
      },
      backgroundImage: {
        "grid-overlay":
          "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.18), transparent 60%)",
        "neon-gradient":
          "linear-gradient(110deg, #22d3ee 0%, #3b82f6 35%, #a855f7 70%, #ec4899 100%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        marquee: "marquee 32s linear infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
