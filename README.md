# Het Patel — AI/ML Engineer Portfolio

A premium, futuristic, highly-animated portfolio for an AI/ML Engineer. Built to feel like a mix of an AI-startup landing page, a futuristic operating system, and a cinematic developer portfolio.

> Dark neon aesthetic · glassmorphism · 3D neural orb · particle network · floating AI assistant · buttery animations.

## ✨ Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** (custom neon theme, glassmorphism, glow utilities)
- **Framer Motion** — section reveals, layout animations, magnetic buttons
- **GSAP** — timeline-based animated code snippet
- **Three.js / React Three Fiber / drei** — the hero neural orb + particle cloud
- **shadcn-style UI primitives** (Button, Card, Badge) + **Radix Slot**
- **Lucide Icons**

## 🚀 Getting started

> **Prerequisite:** Node.js 18.18+ (Node 20 LTS recommended) and npm.
> This machine did not have Node installed — install it first (see below).

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# open http://localhost:3000

# 3. Production build
npm run build && npm start
```

### Installing Node (macOS)

```bash
# Recommended: nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# restart your terminal, then:
nvm install --lts
nvm use --lts

# …or with Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
```

If `npm install` ever complains about peer dependencies, run:

```bash
npm install --legacy-peer-deps
```

## 🤖 Optional: live AI assistant

The floating chatbot answers instantly from a built-in knowledge base (`src/lib/chatKnowledge.ts`) and works fully offline.

To upgrade it to **live LLM responses**, copy `.env.example` → `.env.local` and add a key:

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini   # optional
```

The `/api/chat` route (`src/app/api/chat/route.ts`) automatically uses the key when present, and gracefully falls back to the predefined answers on any error.

## 🗂️ Project structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, SEO metadata, <html> shell
│   ├── page.tsx            # composes all sections + global effects
│   ├── globals.css         # theme tokens, scrollbar, reduced-motion
│   ├── icon.svg            # favicon
│   ├── robots.ts / sitemap.ts
│   └── api/chat/route.ts   # optional OpenAI-backed chat endpoint
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, About, Skills, CodeShowcase, Projects,
│   │                       # Experience, Certifications, Terminal, Contact
│   ├── chatbot/            # AiAssistant (floating glass chat)
│   ├── three/              # NeuralOrb (R3F)
│   ├── effects/            # CustomCursor, ParticleField, MouseGlow,
│   │                       # ScrollProgress, LoadingScreen, MagneticButton,
│   │                       # BackgroundFX
│   └── ui/                 # Button, Card, Badge, SectionHeading
├── hooks/                  # useTypewriter, useCountUp, useMediaQuery
└── lib/
    ├── data.ts             # ← single source of truth for ALL content
    ├── chatKnowledge.ts    # assistant intents + matcher
    └── utils.ts            # cn() class merger
```

## ✏️ Make it yours

Almost everything is data-driven — edit **`src/lib/data.ts`**:

- `profile` — name, roles, email, bio, resume URL, availability
- `socials` — GitHub, LinkedIn, Email, LeetCode, Kaggle links
- `stats` — animated hero counters
- `skillCategories`, `projects`, `timeline`, `certifications`, `navLinks`

Then:

1. Replace `public/resume.pdf` with your real resume.
2. Swap the `HP` avatar monogram in `components/sections/About.tsx` for a `next/image`.
3. Update the assistant's answers in `src/lib/chatKnowledge.ts`.
4. Update `siteUrl` in `layout.tsx`, `robots.ts`, `sitemap.ts`.

## 🎨 Features

- Fullscreen hero with typing role animation, 3D neural orb, magnetic CTAs, animated stat counters, social links
- Floating ChatGPT-style AI assistant (typing indicator, quick replies, glass UI)
- About with orbiting tech labels + glowing journey cards
- Skills with animated progress bars per category
- GSAP animated code snippet
- Cinematic projects: filtering, spotlight hover, animated detail modal, AI architecture
- Scroll-driven glowing vertical timeline
- Certifications with cursor-driven 3D tilt
- Interactive terminal section (`help`, `whoami`, `skills`, …)
- Futuristic contact form with availability status + animated radar
- Custom cursor, scroll progress, mouse-follow glow, particle network, floating gradients, loading screen
- Fully responsive (mobile → ultrawide), SEO metadata + JSON-LD, `prefers-reduced-motion` support

## ♿ Accessibility & performance

- Respects `prefers-reduced-motion` (disables heavy canvas + animations)
- Semantic landmarks, aria-labels on icon buttons, keyboard-focusable controls
- 3D orb and particle field are client-only / lazily loaded to keep the initial bundle lean

---

Built with Next.js, Three.js, Framer Motion & GSAP.
