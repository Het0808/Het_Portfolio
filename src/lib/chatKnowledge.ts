/**
 * Knowledge base for Het Patel's AI Portfolio Assistant.
 *
 * This is a STRICTLY GROUNDED assistant: every answer is derived from the
 * portfolio data in `data.ts`. Nothing here is invented. When a question has
 * no matching fact, the assistant returns `notFoundAnswer` instead of guessing.
 *
 * The same facts power the optional OpenAI route (see `systemContext`), which
 * is instructed to follow the identical grounding rules.
 */
import {
  profile,
  projects,
  skillCategories,
  certifications,
  timeline,
  type TimelineItem,
} from "./data";

export type Intent = {
  id: string;
  keywords: string[];
  suggestion: string; // shown as a quick-reply chip
  answer: string;
};

/* ---- Data-derived summaries (single source of truth = data.ts) ---------- */

const skillSummary = skillCategories
  .map((c) => `${c.category}: ${c.skills.map((s) => s.name).join(", ")}`)
  .join(" • ");

const projectSummary = projects
  .map((p) => `${p.title} (${p.category}) — ${p.tagline}`)
  .join("\n");

const internships = timeline.filter((t) => t.type === "Internship");
const educationItems = timeline.filter((t) => t.type === "Education");

// "Undergraduate Degree" is a placeholder (no institution name on record), so
// we omit it rather than presenting a placeholder as a real college name.
const fmtEntry = (t: TimelineItem) =>
  t.org && t.org !== "Undergraduate Degree"
    ? `${t.title} at ${t.org} (${t.period})`
    : `${t.title} (${t.period})`;

const experienceSummary = internships.map(fmtEntry).join("; ");
const educationSummary = educationItems.map(fmtEntry).join("; ");

/* ---- Intents ------------------------------------------------------------ */

export const intents: Intent[] = [
  {
    id: "about",
    keywords: ["who is het", "who is he", "who's het", "tell me about het", "about het", "introduce", "yourself", "summary", "background", "bio"],
    suggestion: "Tell me about Het",
    answer: `Het Patel is an AI/ML Engineer focused on GenAI and LLMs. ${profile.bio} He's currently ${profile.availability.toLowerCase()}.`,
  },
  {
    id: "projects",
    keywords: ["project", "projects", "built", "portfolio", "made"],
    suggestion: "What projects has he built?",
    answer: `Het has built ${projects.length} featured AI & ML projects:\n\n${projectSummary}\n\nAsk me about any one for its architecture and tech stack.`,
  },
  {
    id: "ai-projects",
    keywords: ["ai project", "ml project", "genai project", "show ai", "llm project", "rag", "agent"],
    suggestion: "Show AI/ML projects",
    answer: `Het's strongest AI/ML work: the AI Voice Hiring Assistant (LangGraph voice agent), AlphaMind (Autonomous Multi-Agent Investment Research Analyst), and the NCERT RAG System (hybrid retrieval + citations). All are production-grade with evaluation harnesses.`,
  },
  {
    id: "skills",
    keywords: ["skill", "skills", "good at", "expertise", "strength"],
    suggestion: "What are his skills?",
    answer: `Het's skills, by area —\n\n${skillSummary}`,
  },
  {
    id: "stack",
    keywords: ["tech stack", "stack", "tools", "technologies", "framework", "uses", "language"],
    suggestion: "What tech stack does he use?",
    answer: `Het works with Python, PyTorch, TensorFlow and Scikit-learn for ML/DS; LangChain, LangGraph, RAG and Prompt Engineering for GenAI and agents; Docker, Azure, AWS and GitHub Actions for cloud; and SQL & Excel for data.`,
  },
  {
    id: "experience",
    keywords: ["experience", "internship", "intern", "work experience", "job", "role", "company", "analyst", "tripearltech", "career naksha"],
    suggestion: "Experience",
    answer: `Het's professional experience: ${experienceSummary}. His Tripearltech internship focused on Microsoft Dynamics 365 Business Central, and at Career Naksha he worked as a Data Analyst.`,
  },
  {
    id: "education",
    keywords: ["education", "degree", "graduation", "college", "university", "study", "studied", "b.tech", "btech", "pg", "iit", "academic", "qualification"],
    suggestion: "Education",
    answer: `Het's education: ${educationSummary}.`,
  },
  {
    id: "contact",
    keywords: ["contact", "reach", "email", "hire", "get in touch", "connect", "linkedin", "github", "codechef"],
    suggestion: "Contact information",
    answer: `You can reach Het by email at ${profile.email}, or connect via LinkedIn, GitHub and CodeChef (links are in the hero and footer). He's ${profile.availability.toLowerCase()}.`,
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "download"],
    suggestion: "Resume",
    answer: `You can download Het's resume from the "Download Resume" button in the hero section, or here: ${profile.resumeUrl}`,
  },
  {
    id: "certifications",
    keywords: ["certification", "certificate", "certified", "credential", "nism", "irdai", "anthropic", "mcp"],
    suggestion: "Certifications",
    answer: `Het holds ${certifications.length} certifications: ${certifications
      .map((c) => `${c.name} (${c.issuer}, ${c.year})`)
      .join("; ")}.`,
  },
];

/**
 * Lightweight keyword-overlap matcher — no dependencies, instant.
 *
 * Scoring is by matched-keyword length so longer, more specific phrases
 * (e.g. "work experience") outrank short generic ones. The generic "about"
 * intent is treated as a LAST RESORT so questions like
 * "tell me about Het's certifications" route to `certifications`, not `about`.
 */
export function matchIntent(message: string): Intent | null {
  const text = message.toLowerCase();
  let best: { intent: Intent; score: number } | null = null;
  let aboutMatch: { intent: Intent; score: number } | null = null;

  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (text.includes(kw)) score += kw.length;
    }
    if (score === 0) continue;

    if (intent.id === "about") {
      aboutMatch = { intent, score };
      continue; // never let "about" override a specific topic
    }
    if (!best || score > best.score) best = { intent, score };
  }

  return (best ?? aboutMatch)?.intent ?? null;
}

/** Returned verbatim when nothing in the portfolio matches the question. */
export const notFoundAnswer = `I couldn't find that information in Het Patel's portfolio. You can ask me about his projects, skills, tech stack, experience, education, certifications, resume, or how to get in touch.`;

/** Back-compat alias (used by the chat UI / API as the no-match reply). */
export const fallbackAnswer = notFoundAnswer;

export const greeting = `👋 Hi! I'm Het's AI portfolio assistant. Ask me about his projects, skills, experience, education, or certifications.`;

/* ---- System prompt for the optional OpenAI route ------------------------ */

export const systemContext = `You are Het Patel's AI Portfolio Assistant — a factual portfolio assistant, NOT a general chatbot.

RULES (follow strictly):
- Answer ONLY using the KNOWLEDGE BASE below. Never invent, assume, guess, or use outside knowledge.
- If the answer is not in the knowledge base, reply EXACTLY: "I couldn't find that information in Het Patel's portfolio."
- Never guess Het's college name, CGPA, age, exact location, phone number, or anything not stated below.
- When discussing skills, mention ONLY the technologies listed below.
- Refer to him as "Het". Keep answers concise, clear and professional.

KNOWLEDGE BASE
Name: ${profile.name}
Role: AI/ML Engineer (GenAI & LLMs)
Bio: ${profile.bio}
Availability: ${profile.availability}
Email: ${profile.email}
Education: ${educationSummary}
Experience: ${experienceSummary}
Skills: ${skillSummary}
Projects:\n${projectSummary}
Certifications: ${certifications.map((c) => `${c.name} (${c.issuer}, ${c.year})`).join("; ")}`;
