import { getPollResults, getPollById } from "@/lib/polls";

/**
 * GET /api/polls/[id]/results — get poll results with vote counts & percentages.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pollId } = await params;

    // Verify the poll exists
    const poll = await getPollById(pollId);
    if (!poll) {
      return Response.json({ error: "Poll not found" }, { status: 404 });
    }

    const results = await getPollResults(pollId);
    return Response.json({ results });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
