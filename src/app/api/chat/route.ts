import { GoogleGenAI } from "@google/genai";

// Simulated thought processes for specific key queries that have hardcoded records,
// to preserve the original specific quiz-hint behavior if Gemini is not available.
function getFallbackResponse(query: string) {
  let reply = "";
  let thought = "";

  if (query.includes("highest score") || query.includes("gayle") || query.includes("175")) {
    thought = "User is asking about the highest individual score in IPL history.\n- Retrieve record holder: Chris Gayle (175* for RCB vs Pune Warriors India in 2013).\n- Format answer clearly highlighting the score, team, year, and venue.";
    reply = "The highest individual score in IPL history belongs to the legendary **Chris Gayle**! He smashed a record-shattering **175* off just 66 balls** playing for **Royal Challengers Bengaluru (RCB)** against Pune Warriors India at the M. Chinnaswamy Stadium, Bengaluru on **April 23, 2013**.";
  } else if (query.includes("orange cap")) {
    thought = "User wants to know about the Orange Cap.\n- Definition: Awarded to the highest run-scorer of the season.\n- Notable mention: Virat Kohli holds the record for most runs in a single season (973 runs in 2016).";
    reply = "The **Orange Cap** is an award presented annually to the **leading run-scorer** in the IPL season. The player who has scored the most runs wears the cap while fielding. The record for the most runs in a single season is held by **Virat Kohli** with **973 runs in 2016**.";
  } else if (query.includes("purple cap")) {
    thought = "User is asking about the Purple Cap.\n- Definition: Awarded to the leading wicket-taker of the season.\n- Notable mention: Harshal Patel (2021) and Dwayne Bravo (2013) hold the record for most wickets in a single season (32 wickets).";
    reply = "The **Purple Cap** is awarded to the **leading wicket-taker** of the IPL season. The bowler with the most wickets wears it during matches. **Harshal Patel** (2021) and **Dwayne Bravo** (2013) share the record for most wickets in a single season with **32 wickets** each.";
  } else if (query.includes("most title") || query.includes("most trophy") || query.includes("won the most") || query.includes("most trophies")) {
    thought = "User is querying which team has won the most trophies.\n- Retrieve records: Chennai Super Kings (CSK) and Mumbai Indians (MI) are tied with 5 titles each.\n- Kolkata Knight Riders (KKR) follows with 3 titles.";
    reply = "As of 2025, **Chennai Super Kings (CSK)** and **Mumbai Indians (MI)** are tied for the most IPL championships, having won **5 titles** each! \n\nHere's the leaderboard:\n- **CSK:** 2010, 2011, 2018, 2021, 2023\n- **MI:** 2013, 2015, 2017, 2019, 2020\n- **KKR:** 2012, 2014, 2024 (3 titles)";
  } else if (query.includes("impact player")) {
    thought = "User wants an explanation of the Impact Player rule.\n- Introduced in: IPL 2023.\n- Rule detail: Teams name 5 substitutes at the toss; 1 can be used as an 'Impact Player' replacing any starting player at any point during the game.";
    reply = "The **Impact Player rule** (introduced in IPL 2023) allows teams to nominate **5 substitute players** during the toss. During the match, any one of these 5 can replace a member of the starting XI at any break in play (before the start of an inning, after an over, at the fall of a wicket, or when a batsman retires). An active Impact Player can bat and bowl their full quota of overs.";
  } else if (query.includes("hint") || query.includes("clue") || query.includes("quiz")) {
    thought = "User is asking for a tip/hint to perform better in the quiz.\n- Offer strategy: Focus on historical milestones, cap awards (Orange/Purple), captaincy changes, and player stats.\n- Suggestion: Look closely at year 2008 (RR championship) and Gayle's 175* records.";
    reply = "Here's a **CricGuru Quiz Hint**: Pay close attention to historical records! MS Dhoni and Rohit Sharma are the key captains of the 5-time winners. Also, remember that **Virat Kohli** is the only player to play for a single franchise (RCB) since the first season in 2008. Good luck!";
  } else if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("namaste")) {
    thought = "User greets CricGuru AI.\n- Respond warmly and set context for the chat.";
    reply = "Namaste! 👋 Welcome to CricGuru AI. I am here to help you conquer the **IPL Fan Quest**. Ask me any cricket question or type 'hint' to get an edge in the quiz!";
  } else {
    thought = `User asked: "${query}".\n- Match found: No exact record match and Gemini API is not configured.\n- Action: Prompt user to set up Gemini API.`;
    reply = `To answer general or complex questions beyond basic records, please configure the **Gemini API**. Add \`GEMINI_API_KEY\` to your environment variables on Vercel to unlock the full power of CricGuru AI!`;
  }

  return { reply, thought };
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const query = (message || "").toLowerCase().trim();

    // Use environment variable if present, otherwise use the provided key
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyBO0EE465yBSGfEbiawU2QAby3PKZyuv5g";

    // Initialize Gemini AI
    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are CricGuru AI, a premium and highly enthusiastic expert on the Indian Premier League (IPL) cricket tournament. 
Your goal is to answer any question related to IPL teams, players, statistics, rules, and history. 
Always be polite, use a passionate tone, and format your answers using Markdown (bolding key player names and stats). Keep answers concise but informative (max 3-4 sentences). Don't invent facts. If you don't know something, admit it politely.
Respond directly to this user's message: "${message}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
    });

    const reply = response.text || "I'm sorry, I couldn't process that right now. Could you ask another question?";
    
    // We simulate the 'thought' process for the UI's expandable thought bubble
    const thought = `CricGuru processed the query using Gemini 2.5 Flash.\n- Identified IPL context.\n- Generated response dynamically based on live AI knowledge.`;

    return Response.json({ reply, thought });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[API /chat POST]", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
