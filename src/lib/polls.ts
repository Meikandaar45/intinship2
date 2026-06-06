import { supabase } from "@/lib/supabase";

// ── Types ────────────────────────────────────────────────────

export interface PollOption {
  id: string;
  poll_id: string;
  option_text: string;
  vote_count: number;
}

export interface Poll {
  id: string;
  question: string;
  created_by: string | null;
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
  poll_options?: PollOption[];
}

export interface PollResultOption extends PollOption {
  percentage: number;
}

export interface PollResults {
  poll_id: string;
  question: string;
  total_votes: number;
  options: PollResultOption[];
}

// ── Queries ──────────────────────────────────────────────────

/**
 * Fetch all active polls with their options and vote counts.
 */
export async function getActivePolls(): Promise<Poll[]> {
  const { data, error } = await supabase
    .from("polls")
    .select("*, poll_options(*)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to fetch active polls: ${error.message}`);
  return data as Poll[];
}

/**
 * Fetch a single poll by ID with its options.
 */
export async function getPollById(id: string): Promise<Poll | null> {
  const { data, error } = await supabase
    .from("polls")
    .select("*, poll_options(*)")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw new Error(`Failed to fetch poll: ${error.message}`);
  }
  return data as Poll;
}

/**
 * Create a new poll with its options.
 */
export async function createPoll(
  question: string,
  options: string[],
  createdBy?: string
): Promise<Poll> {
  // 1. Insert the poll row
  const { data: poll, error: pollError } = await supabase
    .from("polls")
    .insert({ question, created_by: createdBy ?? null })
    .select()
    .single();

  if (pollError) throw new Error(`Failed to create poll: ${pollError.message}`);

  // 2. Insert options linked to the new poll
  const optionRows = options.map((text) => ({
    poll_id: poll.id,
    option_text: text,
  }));

  const { data: pollOptions, error: optError } = await supabase
    .from("poll_options")
    .insert(optionRows)
    .select();

  if (optError) throw new Error(`Failed to create poll options: ${optError.message}`);

  return { ...poll, poll_options: pollOptions } as Poll;
}

/**
 * Vote on a poll. Inserts a vote record and increments the option's
 * vote_count. Returns updated results or throws on duplicate vote.
 */
export async function votePoll(
  pollId: string,
  optionId: string,
  voterId: string
): Promise<PollResults> {
  // 1. Insert into poll_votes (unique constraint catches duplicates)
  const { error: voteError } = await supabase
    .from("poll_votes")
    .insert({ poll_id: pollId, option_id: optionId, voter_id: voterId });

  if (voteError) {
    // Unique-constraint violation → duplicate vote
    if (voteError.code === "23505") {
      throw new Error("DUPLICATE_VOTE");
    }
    throw new Error(`Failed to record vote: ${voteError.message}`);
  }

  // 2. Increment vote_count via RPC-style: read-then-write
  //    (Supabase JS v2 doesn't have .increment(), so we do it manually)
  const { data: option, error: fetchErr } = await supabase
    .from("poll_options")
    .select("vote_count")
    .eq("id", optionId)
    .single();

  if (fetchErr) throw new Error(`Failed to fetch option: ${fetchErr.message}`);

  const { error: updateErr } = await supabase
    .from("poll_options")
    .update({ vote_count: (option.vote_count ?? 0) + 1 })
    .eq("id", optionId);

  if (updateErr) throw new Error(`Failed to update vote count: ${updateErr.message}`);

  // 3. Return fresh results
  return getPollResults(pollId);
}

/**
 * Get poll results: options with vote counts and percentages.
 */
export async function getPollResults(pollId: string): Promise<PollResults> {
  const { data: poll, error: pollErr } = await supabase
    .from("polls")
    .select("id, question")
    .eq("id", pollId)
    .single();

  if (pollErr) throw new Error(`Failed to fetch poll: ${pollErr.message}`);

  const { data: options, error: optErr } = await supabase
    .from("poll_options")
    .select("*")
    .eq("poll_id", pollId);

  if (optErr) throw new Error(`Failed to fetch poll options: ${optErr.message}`);

  const totalVotes = (options as PollOption[]).reduce(
    (sum, o) => sum + (o.vote_count ?? 0),
    0
  );

  const resultsOptions: PollResultOption[] = (options as PollOption[]).map((o) => ({
    ...o,
    percentage: totalVotes > 0 ? Math.round((o.vote_count / totalVotes) * 10000) / 100 : 0,
  }));

  return {
    poll_id: poll.id,
    question: poll.question,
    total_votes: totalVotes,
    options: resultsOptions,
  };
}
