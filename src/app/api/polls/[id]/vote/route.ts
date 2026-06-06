import { votePoll, getPollById } from "@/lib/polls";

/**
 * POST /api/polls/[id]/vote — cast a vote on a poll.
 * Body: { optionId: string, voterId: string }
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pollId } = await params;
    const body = await req.json();
    const { optionId, voterId } = body;

    // Validate required fields
    if (!optionId || typeof optionId !== "string") {
      return Response.json(
        { error: "optionId is required and must be a string" },
        { status: 400 }
      );
    }
    if (!voterId || typeof voterId !== "string") {
      return Response.json(
        { error: "voterId is required and must be a string" },
        { status: 400 }
      );
    }

    // Verify the poll exists
    const poll = await getPollById(pollId);
    if (!poll) {
      return Response.json({ error: "Poll not found" }, { status: 404 });
    }
    if (!poll.is_active) {
      return Response.json({ error: "Poll is no longer active" }, { status: 410 });
    }

    // Verify the option belongs to this poll
    const validOption = poll.poll_options?.some((o) => o.id === optionId);
    if (!validOption) {
      return Response.json(
        { error: "optionId does not belong to this poll" },
        { status: 400 }
      );
    }

    const results = await votePoll(pollId, optionId, voterId);
    return Response.json({ results });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    // Handle duplicate-vote error
    if (message === "DUPLICATE_VOTE") {
      return Response.json(
        { error: "You have already voted on this poll" },
        { status: 409 }
      );
    }

    return Response.json({ error: message }, { status: 500 });
  }
}
