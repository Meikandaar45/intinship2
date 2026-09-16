import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getQuestionsPage, searchQuestions } from "@/lib/questions";

const PAGE_SIZE = 10;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();

    if (q) {
      const questions = await searchQuestions(q, PAGE_SIZE);
      return Response.json({ questions, hasMore: false });
    }

    const offset = Number(searchParams.get("offset") ?? 0);
    const { questions, hasMore } = await getQuestionsPage(offset, PAGE_SIZE);
    return Response.json({ questions, hasMore });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[API /questions GET]", message);
    return Response.json({ questions: [], hasMore: false, error: message }, { status: 200 });
  }
}

export async function POST(req: Request) {
  let bodyStr = "";
  let authorStr = "Anonymous";
  
  try {
    const json = await req.json();
    bodyStr = json.body;
    authorStr = json.author || "Anonymous";

    if (!isSupabaseConfigured()) {
      return Response.json({
        id: crypto.randomUUID(),
        body: bodyStr,
        author: authorStr,
        created_at: new Date().toISOString(),
      });
    }

    const { data, error } = await supabase
      .from("questions")
      .insert({ body: bodyStr, author: authorStr })
      .select()
      .single();

    if (error) {
      console.error("[API /questions POST]", error.message);
      return Response.json({
        id: crypto.randomUUID(),
        body: bodyStr,
        author: authorStr,
        created_at: new Date().toISOString(),
      });
    }
    
    return Response.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[API /questions POST Exception]", message);
    return Response.json({
      id: crypto.randomUUID(),
      body: bodyStr || "Error",
      author: authorStr,
      created_at: new Date().toISOString(),
    });
  }
}
