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
    return Response.json({ error: message }, { status: 500 });
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

    const poll = await createPoll(question, options, createdBy);
    return Response.json({ poll }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
