"use client";

import { useState, useEffect, useCallback } from "react";
import { getVoterId } from "@/lib/voter";
import { getStoredUser } from "@/lib/auth";

export type PollOption = {
  id: string;
  option_text: string;
  vote_count: number;
  percentage?: number;
};

export type Poll = {
  id: string;
  question: string;
  created_by: string | null;
  created_at: string;
  is_active: boolean;
  poll_options: PollOption[];
};

export default function PollCard({ poll }: { poll: Poll }) {
  const [options, setOptions] = useState<PollOption[]>(poll.poll_options || []);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [animateResults, setAnimateResults] = useState(false);

  // Sync options when parent poll updates via live updates
  useEffect(() => {
    if (poll.poll_options && poll.poll_options.length > 0) {
      setOptions(poll.poll_options);
      const total = poll.poll_options.reduce((s, o) => s + (o.vote_count || 0), 0);
      setTotalVotes(total);
    }
  }, [poll.poll_options]);

  // Check if already voted on mount
  useEffect(() => {
    const votedOption = localStorage.getItem(`poll_voted_${poll.id}`);
    if (votedOption) {
      setHasVoted(true);
      setSelectedOptionId(votedOption);
      setShowResults(true);
      const total = (poll.poll_options || []).reduce((s, o) => s + (o.vote_count || 0), 0);
      setTotalVotes(total);
      requestAnimationFrame(() => {
        setTimeout(() => setAnimateResults(true), 50);
      });
    }
  }, [poll.id, poll.poll_options]);

  const getPercentage = useCallback(
    (voteCount: number) => {
      if (totalVotes === 0) return 0;
      return Math.round((voteCount / totalVotes) * 100);
    },
    [totalVotes]
  );

  async function handleVote(optionId: string) {
    if (hasVoted || isVoting) return;

    setIsVoting(true);
    setSelectedOptionId(optionId);

    const user = getStoredUser();
    const voterId = user?.id || getVoterId();

    try {
      const res = await fetch(`/api/polls/${poll.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId, voterId }),
      });

      if (res.status === 409) {
        // Already voted — fetch results
        const resultsRes = await fetch(`/api/polls/${poll.id}/results`);
        const resultsData = await resultsRes.json();
        const rawOpts: PollOption[] = resultsData.results?.options || resultsData.options || [];
        setOptions(rawOpts);
        const total = resultsData.results?.total_votes ?? resultsData.totalVotes ?? rawOpts.reduce((s: number, o: any) => s + (o.vote_count || 0), 0);
        setTotalVotes(total);
        localStorage.setItem(`poll_voted_${poll.id}`, optionId);
        setHasVoted(true);
        setShowResults(true);
        setTimeout(() => setAnimateResults(true), 50);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        const rawOpts: PollOption[] = data.results?.options || (Array.isArray(data.results) ? data.results : options);
        setOptions(rawOpts);
        const total = data.results?.total_votes ?? rawOpts.reduce((s: number, o: any) => s + (o.vote_count || 0), 0);
        setTotalVotes(total);
        localStorage.setItem(`poll_voted_${poll.id}`, optionId);
        setHasVoted(true);
        setShowResults(true);
        setTimeout(() => setAnimateResults(true), 50);
      }
    } catch {
      setSelectedOptionId(null);
    } finally {
      setIsVoting(false);
    }
  }

  // Format relative time
  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  const maxVotes = Math.max(...options.map((o) => o.vote_count), 1);

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 poll-animate-in">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug text-foreground">
            {poll.question}
          </h3>
          <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-2.5 py-1 text-xs font-medium text-gold">
            <svg
              className="h-3 w-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Poll
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted">
          {poll.created_by && (
            <>
              <span>{poll.created_by}</span>
              <span className="opacity-40">·</span>
            </>
          )}
          <span>{timeAgo(poll.created_at)}</span>
          {showResults && (
            <>
              <span className="opacity-40">·</span>
              <span className="text-gold/80">
                {totalVotes} vote{totalVotes !== 1 ? "s" : ""}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Options / Results */}
      <div className="space-y-2.5">
        {showResults
          ? // ── Results View ──
            options.map((option, idx) => {
              const pct = getPercentage(option.vote_count);
              const isSelected = option.id === selectedOptionId;
              const isLeading = option.vote_count === maxVotes && option.vote_count > 0;

              return (
                <div
                  key={option.id}
                  className={`poll-result-bar ${isSelected ? "poll-option-selected poll-vote-pulse" : ""}`}
                  style={{
                    animationDelay: `${idx * 80}ms`,
                  }}
                >
                  {/* Background fill bar */}
                  <div
                    className={`poll-progress-bar ${animateResults ? "poll-bar-animate" : ""}`}
                    style={{
                      width: animateResults ? `${pct}%` : "0%",
                      transitionDelay: `${idx * 100}ms`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isSelected && (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20">
                          <svg
                            className="h-3 w-3 text-gold"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                      )}
                      <span
                        className={`text-sm font-medium truncate ${
                          isLeading ? "text-gold" : "text-foreground"
                        }`}
                      >
                        {option.option_text}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted tabular-nums">
                        {option.vote_count}
                      </span>
                      <span
                        className={`text-sm font-semibold tabular-nums ${
                          isLeading ? "text-gold" : "text-foreground/70"
                        }`}
                      >
                        {pct}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          : // ── Voting View ──
            options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleVote(option.id)}
                disabled={isVoting}
                className={`poll-option-btn ${
                  selectedOptionId === option.id
                    ? "poll-option-selected"
                    : ""
                } ${isVoting ? "opacity-60 cursor-wait" : ""}`}
                style={{
                  animationDelay: `${idx * 60}ms`,
                  animation: `pollFadeIn 0.35s cubic-bezier(0.4,0,0.2,1) ${idx * 60}ms both`,
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20">
                    {selectedOptionId === option.id && isVoting && (
                      <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                    )}
                  </span>
                  <span>{option.option_text}</span>
                </span>
              </button>
            ))}
      </div>

      {/* Footer hint */}
      {!showResults && !isVoting && (
        <p className="mt-3 text-center text-xs text-muted/60">
          Tap an option to vote
        </p>
      )}
    </div>
  );
}
