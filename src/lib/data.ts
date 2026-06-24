/**
 * Single source of truth for all portfolio content.
 * Editing this file updates the entire site — every section reads from here.
 */
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Het Patel",
  firstName: "Het",
  roles: [
    "AI/ML Engineer",
    "GenAI Developer",
    "LLM Engineer",
    "NLP Engineer",
    "Building Intelligent Systems",
  ],
  tagline: "AI/ML Engineer | GenAI | Agentic AI | RAG | ML Systems",
  email: "work.hetpatel2002@gmail.com",
  location: "India · Open to Remote",
  availability: "Open to AI/ML internships and opportunities",
  resumeUrl: "/resume.pdf",
  bio: "I ship production-grade AI — RAG pipelines, multi-agent systems, and fine-tuned LLMs that solve real business problems. From research prototype to deployed product, I build intelligent systems that are fast, reliable, and impactful.",
};

/* ------------------------------------------------------------------ */
/* Social links                                                        */
/* ------------------------------------------------------------------ */

export type Social = {
  label: string;
  href: string;
  icon: LucideIcon;
  handle: string;
};

export const socials: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/Het0808",
    icon: Github,
    handle: "Het0808",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/het-patel-460b8a24b/",
    icon: Linkedin,
    handle: "het-patel",
  },
  {
    label: "CodeChef",
    href: "https://www.codechef.com/users/caa_iitg_019",
    icon: Code2,
    handle: "caa_iitg_019",
  },
  {
    label: "Email",
    href: "mailto:work.hetpatel2002@gmail.com",
    icon: Mail,
    handle: "work.hetpatel2002@gmail.com",
  },
];


/* ------------------------------------------------------------------ */
/* About — journey timeline                                            */
/* ------------------------------------------------------------------ */

export const aboutHighlights = [
  {
    title: "GenAI & LLMs",
    body: "Production-grade RAG systems, vector databases, embeddings pipelines, fine-tuning workflows, and agentic applications powered by modern LLMs.",
  },
  {
    title: "AI Agents & Automation",
    body: "Autonomous agents with tool calling, MCP integrations, memory, planning, and multi-agent orchestration for complex business workflows.",
  },
  {
    title: "MLOps & Deployment",
    body: "Scalable AI deployments with Docker, FastAPI, Kubernetes, CI/CD, monitoring, and cloud infrastructure for reliable production systems.",
  },
  {
    title: "Problem Solving",
    body: "Turning ambiguous business problems into measurable, scalable AI solutions through system design, experimentation, and engineering execution.",
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export type SkillCategory = {
  category: string;
  accent: "cyan" | "blue" | "purple" | "pink";
  skills: { name: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "AI",
    accent: "purple",
    skills: [
      { name: "NLP" },
      { name: "Transformers" },
      { name: "RAG" },
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "LLM Fine-tuning" },
      { name: "Prompt Engineering" },
      { name: "AI Agents" },
    ],
  },
  {
    category: "ML / DS",
    accent: "cyan",
    skills: [
      { name: "Python" },
      { name: "PyTorch" },
      { name: "TensorFlow" },
      { name: "Scikit-learn" },
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "SQL" },
      { name: "Excel" },
    ],
  },
  {
    category: "Cloud",
    accent: "pink",
    skills: [
      { name: "Docker" },
      { name: "Azure" },
      { name: "AWS" },
      { name: "GitHub Actions" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string;
  title: string;
  category: "GenAI" | "NLP" | "Agents" | "MLOps" | "FinTech";
  tagline: string;
  problem: string;
  description: string;
  features: string[];
  architecture: string;
  tech: string[];
  impact: string;
  demo: string;
  github: string;
  accent: "cyan" | "blue" | "purple" | "pink";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "alphamind",
    title: "AlphaMind",
    category: "Agents",
    tagline: "Autonomous Multi-Agent Investment Research Analyst.",
    problem: "Manual financial research is slow, expensive, and doesn't scale across markets.",
    description:
      "A collaborative multi-agent framework designed to automate deep financial research, query real-time market data, and generate institutional-grade investment reports.",
    features: [
      "Multi-agent coordination using LangGraph workflow state",
      "Semantic search over financial filings via Qdrant RAG",
      "Real-time data integration with financial APIs",
      "Structured report generation using Claude/GPT-4o",
    ],
    architecture:
      "LangGraph Multi-Agent Orchestrator → Tool Calling (Financial APIs) → Qdrant Vector Store (RAG) → Markdown Report Generator.",
    tech: [
      "LangGraph",
      "LangChain",
      "OpenAI/Claude",
      "Qdrant",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "RAG",
      "Financial APIs",
      "Docker",
    ],
    impact: "Automates institutional-grade investment analysis with multi-agent coordination and RAG-powered insights.",
    demo: "#",
    github: "https://github.com/",
    accent: "purple",
    featured: true,
  },
  {
    id: "autoworth-ai",
    title: "AutoWorth AI",
    category: "MLOps",
    tagline: "Vehicle Residual Value Prediction System.",
    problem: "Vehicle valuation is opaque and inconsistent — lacking explainability for business decisions.",
    description:
      "An end-to-end machine learning system that predicts vehicle residual values with high accuracy, featuring ensemble modeling, model explainability, and full lifecycle tracking.",
    features: [
      "Ensemble prediction using XGBoost and CatBoost",
      "Model explainability with SHAP feature impact values",
      "Experiment tracking and model registry using MLflow",
      "Containerized API deployment with Docker and FastAPI",
    ],
    architecture:
      "Data Pipeline → XGBoost/CatBoost Ensemble → SHAP Explainer → MLflow Tracking → FastAPI → Streamlit UI.",
    tech: [
      "Python",
      "Scikit-Learn",
      "XGBoost",
      "CatBoost",
      "SHAP",
      "MLflow",
      "FastAPI",
      "Streamlit",
      "Docker",
    ],
    impact: "Transparent, explainable predictions with SHAP + XGBoost/CatBoost ensemble and full MLflow lifecycle tracking.",
    demo: "#",
    github: "https://github.com/",
    accent: "pink",
    featured: true,
  },
  {
    id: "voice-hiring",
    title: "AI Voice Hiring Assistant",
    category: "Agents",
    tagline: "Conversational screening that talks, listens, and scores.",
    problem: "First-round screening is expensive, time-consuming, and inconsistent across interviewers.",
    description:
      "A real-time voice agent that conducts first-round interviews — streaming speech-to-text, an LLM interviewer with memory, and automated candidate scoring with structured feedback.",
    features: [
      "Real-time STT + TTS voice loop with barge-in",
      "LLM interviewer with role-aware question planning",
      "Automated rubric scoring & summary report",
      "Recruiter dashboard with transcripts",
    ],
    architecture:
      "Whisper STT → LangGraph interviewer agent (GPT-4o) → rubric evaluator → Postgres + recruiter dashboard. Streaming over WebSockets.",
    tech: ["LangGraph", "OpenAI", "Whisper", "FastAPI", "Next.js", "PostgreSQL"],
    impact: "Automated voice interviews with structured rubric scoring and recruiter dashboards.",
    demo: "#",
    github: "https://github.com/",
    accent: "purple",
    featured: true,
  },
  {
    id: "ncert-rag",
    title: "NCERT RAG System",
    category: "GenAI",
    tagline: "Ask any textbook. Get cited, grounded answers.",
    problem: "Students can't get reliable, source-cited answers from textbooks using generic AI tools.",
    description:
      "A retrieval-augmented tutor over NCERT textbooks with hybrid search, re-ranking, and inline citations so students can trust every answer.",
    features: [
      "Hybrid (BM25 + dense) retrieval with re-ranking",
      "Inline citations back to page & chapter",
      "Streaming answers with follow-up memory",
      "Eval harness for faithfulness & recall",
    ],
    architecture:
      "Chunk + embed (bge) → Qdrant vector store → hybrid retrieval → cross-encoder re-rank → GPT-4o-mini with citation prompt.",
    tech: ["LangChain", "Qdrant", "RAG", "FastAPI", "React"],
    impact: "Grounded, source-cited Q&A with hybrid retrieval, re-ranking, and faithfulness evaluation.",
    demo: "#",
    github: "https://github.com/",
    accent: "cyan",
    featured: true,
  },
];

export const projectFilters = [
  "All",
  "GenAI",
  "Agents",
  "MLOps",
] as const;

/* ------------------------------------------------------------------ */
/* Experience / timeline                                               */
/* ------------------------------------------------------------------ */

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  type: "Internship" | "Hackathon" | "Achievement" | "Education";
  points: string[];
};

export const timeline: TimelineItem[] = [
  {
    period: "Feb 2026 — Present",
    title: "PG in AI / ML",
    org: "IIT Gandhinagar",
    type: "Education",
    points: [
      "Postgraduate program in Artificial Intelligence & Machine Learning",
      "Advancing expertise in ML, deep learning and GenAI",
    ],
  },
  {
    period: "Jun 2025 — Aug 2025",
    title: "Data Analyst",
    org: "Career Naksha",
    type: "Internship",
    points: [
      "Analyzed datasets to surface actionable insights",
      "Reporting & visualization with SQL, Excel and Python",
    ],
  },
  {
    period: "Dec 2023 — May 2024",
    title: "Software Engineer Trainee (Intern)",
    org: "Tripearltech Pvt. Ltd.",
    type: "Internship",
    points: [
      "Worked on Microsoft Dynamics 365 Business Central",
      "Customization & development as a software engineer trainee",
    ],
  },
  {
    period: "2020 — 2024",
    title: "B.Tech — Information Technology",
    org: "Dharmsinh Desai University",
    type: "Education",
    points: [
      "Foundation in software engineering, databases and systems",
      "Strong base in programming and information technology",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  accent: "cyan" | "blue" | "purple" | "pink";
  logo: string; // real issuer logo in /public/logos
};

export const certifications: Certification[] = [
  { name: "NISM Certified", issuer: "NISM", year: "2025", accent: "cyan", logo: "/logos/nism.png" },
  { name: "IRDAI Certified", issuer: "IRDAI", year: "2025", accent: "blue", logo: "/logos/irdai.png" },
  { name: "Anthropic MCP", issuer: "Anthropic", year: "2025", accent: "purple", logo: "/logos/anthropic.png" },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
