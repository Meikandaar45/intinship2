import { GoogleGenAI } from "@google/genai";
import { getDynamicCricketAnswer } from "@/lib/cricguru";

export async function POST(req: Request) {
  let userMessage = "";
  try {
    const json = await req.json();
    userMessage = (json.message || "").trim();

    if (!userMessage) {
      return Response.json({
        reply: "Please ask any cricket question! For example: *'Who won IPL 2024?'*, *'18 is whose jersey number?'*, or *'Who has hit the most sixes?'*.",
        thought: "No query provided. Promoted sample cricket questions."
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== "placeholder_key" && apiKey.length > 10) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are CricGuru AI, a premium, knowledgeable, and enthusiastic expert on the Indian Premier League (IPL) and world cricket.
Answer the user's cricket question accurately, passionately, and informatively (2-4 sentences). Format key player names, teams, and stats in bold Markdown.
User question: "${userMessage}"`;

        // Try gemini-2.0-flash or gemini-1.5-flash
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: systemPrompt,
        });

        const reply = response.text?.trim();
        if (reply) {
          const thought = `CricGuru processed "${userMessage}" via Gemini AI.\n- Parsed query intent and cricket entities.\n- Generated live AI response.`;
          return Response.json({ reply, thought });
        }
      } catch (geminiErr: any) {
        console.warn("[Gemini API fallback to local intelligence engine]:", geminiErr.message);
      }
    }

    // High-performance dynamic cricket intelligence engine
    const dynamicResponse = getDynamicCricketAnswer(userMessage);
    return Response.json(dynamicResponse);
  } catch (err: unknown) {
    const dynamicResponse = getDynamicCricketAnswer(userMessage || "IPL cricket");
    return Response.json(dynamicResponse);
  }
}
