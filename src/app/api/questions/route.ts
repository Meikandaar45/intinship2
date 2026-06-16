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
  try {
    const { body, author } = await req.json();

    if (!isSupabaseConfigured()) {
      // Return a mock response when Supabase isn't available
      return Response.json({
        id: crypto.randomUUID(),
        body,
        author: author || "Anonymous",
        created_at: new Date().toISOString(),
      });
    }

    const { data, error } = await supabase
      .from("questions")
      .insert({ body, author })
      .select()
      .single();

    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
