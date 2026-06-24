import { NextResponse } from "next/server";
import {
  matchIntent,
  fallbackAnswer,
  notFoundAnswer,
  systemContext,
} from "@/lib/chatKnowledge";

/**
 * Chat endpoint for the AI Assistant.
 *
 * Behaviour:
 *  - Always returns an instant, accurate answer from the local knowledge base.
 *  - If OPENAI_API_KEY is set, it instead asks the model (grounded with the
 *    system context) for a richer, conversational reply — falling back to the
 *    local answer on any error. This keeps the site fully functional offline
 *    while leaving a clean upgrade path.
 */
export async function POST(req: Request) {
  let message = "";
  try {
    const body = await req.json();
    message = String(body?.message ?? "");
  } catch {
    return NextResponse.json({ reply: fallbackAnswer });
  }

  const localAnswer = matchIntent(message)?.answer ?? fallbackAnswer;
  const apiKey = process.env.OPENAI_API_KEY;

  // No key configured → serve the predefined intelligent response.
  if (!apiKey) {
    return NextResponse.json({ reply: localAnswer });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.5,
        max_tokens: 220,
        messages: [
          { role: "system", content: systemContext },
          {
            role: "system",
            content: `Stay strictly within the knowledge base. If the question is not answered there, reply EXACTLY: "${notFoundAnswer}" Do not add information that is not in the knowledge base.`,
          },
          { role: "user", content: message },
        ],
      }),
    });

    if (!res.ok) throw new Error(`OpenAI ${res.status}`);
    const data = await res.json();
    const reply: string =
      data?.choices?.[0]?.message?.content?.trim() || localAnswer;

    return NextResponse.json({ reply });
  } catch {
    // Network/key/model failure → graceful fallback.
    return NextResponse.json({ reply: localAnswer });
  }
}
