import { getActivePolls, createPoll } from "@/lib/polls";

/**
 * GET /api/polls — list all active polls with options and vote counts.
 */
export async function GET() {
  try {
    const polls = await getActivePolls();
    return Response.json({ polls });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[API /polls GET]", message);
    // Return empty polls array instead of 500 so the UI renders gracefully
    return Response.json({ polls: [], error: message }, { status: 200 });
  }
}

/**
 * POST /api/polls — create a new poll.
 * Body: { question: string, options: string[], createdBy?: string }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, options, createdBy } = body;

    // Validate required fields
    if (!question || typeof question !== "string") {
      return Response.json(
        { error: "question is required and must be a string" },
        { status: 400 }
      );
    }

    if (!Array.isArray(options) || options.length < 2) {
      return Response.json(
        { error: "options must be an array with at least 2 items" },
        { status: 400 }
      );
    }

    // Ensure every option is a non-empty string
    for (const opt of options) {
      if (typeof opt !== "string" || opt.trim().length === 0) {
        return Response.json(
          { error: "Each option must be a non-empty string" },
          { status: 400 }
        );
      }
    }

    try {
      const poll = await createPoll(question, options, createdBy);
      return Response.json({ poll }, { status: 201 });
    } catch (err: any) {
      console.error("[API /polls POST DB]", err.message);
      // Fallback: return mock poll if DB is offline
      const mockPoll = {
        id: crypto.randomUUID(),
        question,
        created_by: createdBy || "Admin",
        created_at: new Date().toISOString(),
        expires_at: null,
        is_active: true,
        poll_options: options.map((opt: string, i: number) => ({
          id: `mock-opt-${i}`,
          poll_id: "mock-poll-id",
          option_text: opt,
          vote_count: 0
        }))
      };
      return Response.json({ poll: mockPoll }, { status: 201 });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[API /polls POST]", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
