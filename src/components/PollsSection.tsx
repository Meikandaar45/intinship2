"use client";

import { useState, useEffect, useCallback } from "react";
import PollCard from "./PollCard";
import CreatePollForm from "./CreatePollForm";
import type { Poll } from "./PollCard";

export default function PollsSection() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPolls = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/polls");
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      }
      setPolls(data.polls ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load polls.");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchPolls().finally(() => setIsLoading(false));
  }, [fetchPolls]);

  async function handleRefresh() {
    setIsRefreshing(true);
    await fetchPolls();
    setIsRefreshing(false);
  }

  function handlePollCreated() {
    setShowCreateForm(false);
    handleRefresh();
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowCreateForm((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
            showCreateForm
              ? "bg-white/5 text-muted border border-border hover:text-foreground"
              : "bg-gradient-to-r from-gold to-orange text-background hover:shadow-lg hover:shadow-gold/20 active:scale-[0.97]"
          }`}
        >
          {showCreateForm ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Poll
            </>
          )}
        </button>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2.5 text-sm text-muted transition-all duration-200 hover:border-gold/30 hover:text-gold disabled:opacity-50"
          aria-label="Refresh polls"
        >
          <svg
            className={`h-4 w-4 transition-transform duration-500 ${isRefreshing ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <CreatePollForm
          onCreated={handlePollCreated}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
          </div>
          <p className="mt-4 text-sm text-muted">Loading polls…</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 poll-animate-in">
          <p className="font-semibold mb-1">Database Error</p>
          <p className="opacity-90">{error}</p>
        </div>
      )}

      {/* Polls List */}
      {!isLoading && !error && polls.length > 0 && (
        <div className="space-y-4">
          {polls.map((poll, idx) => (
            <div
              key={poll.id}
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <PollCard poll={poll} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && polls.length === 0 && !showCreateForm && (
        <div className="glass-card rounded-2xl border border-dashed border-border p-10 text-center poll-animate-in">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
            <svg
              className="h-7 w-7 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-foreground">
            No polls yet
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            Be the first to create a poll and get the conversation started!
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-orange px-5 py-2.5 text-sm font-semibold text-background transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 active:scale-[0.97]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create First Poll
          </button>
        </div>
      )}
    </div>
  );
}
