import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// ── Fallback data when Supabase is unreachable ──────────────
const FALLBACK_QUESTIONS = [
  { id: "f1", body: "Who won the first IPL title in 2008?", author: "CricFan", votes: 12 },
  { id: "f2", body: "Which player has scored the most runs in IPL history?", author: "IPLGuru", votes: 8 },
  { id: "f3", body: "What is the Orange Cap awarded for?", author: "QuizMaster", votes: 15 },
  { id: "f4", body: "Which team has won 5 IPL trophies?", author: "FanZone", votes: 6 },
  { id: "f5", body: "Who hit the highest individual score of 175* in IPL?", author: "CricLover", votes: 20 },
  { id: "f6", body: "What is the Impact Player rule introduced in IPL 2023?", author: "NewFan", votes: 4 },
  { id: "f7", body: "Which stadium is home to Royal Challengers Bengaluru?", author: "StadiumFan", votes: 3 },
  { id: "f8", body: "Who captained KKR to their 2024 title win?", author: "KKRFan", votes: 7 },
  { id: "f9", body: "Which bowler holds the Purple Cap record for most wickets in a season?", author: "BowlingFan", votes: 5 },
  { id: "f10", body: "Who was the first player to score a century in IPL history?", author: "HistoryBuff", votes: 9 },
  { id: "f11", body: "How many times has MS Dhoni led CSK to the IPL title?", author: "DhoniFan", votes: 11 },
  { id: "f12", body: "Which franchise won the IPL in their debut season in 2022?", author: "GTFan", votes: 10 },
];

export async function getQuestionsPage(offset: number, limit: number) {
  // Try Supabase first
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("id, body, author, created_at, votes(count)")
        .order("created_at", { ascending: false })
        .range(offset, offset + limit); // inclusive → asks for limit + 1 rows

      if (!error && data) {
        const rows = data.map((q: Record<string, unknown>) => ({
          id: q.id as string,
          body: q.body as string,
          author: q.author as string,
          votes: (q.votes as Array<{ count: number }>)?.[0]?.count ?? 0,
        }));

        const hasMore = rows.length > limit;
        return { questions: rows.slice(0, limit), hasMore };
      }
      // If there was an error (e.g. table doesn't exist), fall through to fallback
      console.warn("[getQuestionsPage] Supabase error, using fallback:", error?.message);
    } catch (err) {
      console.warn("[getQuestionsPage] Supabase exception, using fallback:", err);
    }
  }

  // Fallback to local data
  const slice = FALLBACK_QUESTIONS.slice(offset, offset + limit + 1);
  const hasMore = slice.length > limit;
  return { questions: slice.slice(0, limit), hasMore };
}

export async function searchQuestions(q: string, limit: number) {
  const query = q.toLowerCase();

  // Try Supabase first
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("id, body, author, created_at, votes(count)")
        .textSearch("body", q, { type: "websearch", config: "english" })
        .limit(limit);

      if (!error && data) {
        return data.map((row: Record<string, unknown>) => ({
          id: row.id as string,
          body: row.body as string,
          author: row.author as string,
          votes: (row.votes as Array<{ count: number }>)?.[0]?.count ?? 0,
        }));
      }
      console.warn("[searchQuestions] Supabase error, using fallback:", error?.message);
    } catch (err) {
      console.warn("[searchQuestions] Supabase exception, using fallback:", err);
    }
  }

  // Fallback: simple local search
  return FALLBACK_QUESTIONS
    .filter((q) => q.body.toLowerCase().includes(query))
    .slice(0, limit);
}
