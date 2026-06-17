"use client";

import { useState, useRef, useEffect } from "react";

type CreatePollFormProps = {
  onCreated: () => void;
  onCancel: () => void;
};

export default function CreatePollForm({
  onCreated,
  onCancel,
}: CreatePollFormProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Auto-focus the last added input
  useEffect(() => {
    if (options.length > 2) {
      lastInputRef.current?.focus();
    }
  }, [options.length]);

  function addOption() {
    if (options.length >= 4) return;
    setOptions((prev) => [...prev, ""]);
  }

  function removeOption(idx: number) {
    if (options.length <= 2) return;
    setOptions((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateOption(idx: number, value: string) {
    setOptions((prev) => prev.map((o, i) => (i === idx ? value : o)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedQuestion = question.trim();
    const trimmedOptions = options.map((o) => o.trim()).filter((o) => o !== "");

    if (!trimmedQuestion) {
      setError("Please enter a question.");
      return;
    }
    if (trimmedOptions.length < 2) {
      setError("Please add at least 2 options.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: trimmedQuestion,
          options: trimmedOptions,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to create poll");
      }

      setQuestion("");
      setOptions(["", ""]);
      onCreated();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div ref={formRef} className="glass-card rounded-2xl p-5 sm:p-6 poll-slide-up">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <svg
              className="h-5 w-5 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create a Poll
          </h3>
          <p className="mt-0.5 text-xs text-muted">
            Ask the audience — up to 4 options
          </p>
        </div>
        <button
          onClick={onCancel}
          className="rounded-lg p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-foreground"
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Question Input */}
        <div>
          <label
            htmlFor="poll-question"
            className="mb-1.5 block text-sm font-medium text-foreground/80"
          >
            Your Question
          </label>
          <input
            id="poll-question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., Who will win the IPL this year?"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted/50 transition-all duration-200 focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
            maxLength={200}
            autoFocus
          />
        </div>

        {/* Options */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground/80">
            Options
          </label>
          <div className="space-y-2.5">
            {options.map((opt, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 poll-animate-in"
                style={{
                  animationDelay: `${idx * 50}ms`,
                }}
              >
                {/* Option number indicator */}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-semibold text-gold">
                  {String.fromCharCode(65 + idx)}
                </span>

                <input
                  ref={idx === options.length - 1 ? lastInputRef : undefined}
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted/50 transition-all duration-200 focus:border-gold/40 focus:ring-1 focus:ring-gold/20"
                  maxLength={100}
                />

                {/* Remove button — only if > 2 options */}
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(idx)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
                    aria-label={`Remove option ${idx + 1}`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add option button */}
          {options.length < 4 && (
            <button
              type="button"
              onClick={addOption}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2.5 text-sm text-muted transition-all duration-200 hover:border-gold/30 hover:text-gold hover:bg-gold/5"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Option
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400 poll-animate-in">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-xl bg-gradient-to-r from-gold to-orange px-5 py-3 text-sm font-semibold text-background transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Creating…
              </span>
            ) : (
              "Create Poll"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-muted transition-all duration-200 hover:border-white/20 hover:text-foreground disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
