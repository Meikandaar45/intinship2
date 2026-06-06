"use client";

import { useState } from "react";
import PollsSection from "./PollsSection";
import AiAssistant from "./AiAssistant";

type Tab = "qa" | "polls" | "ai";

export default function TabsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("qa");

  return (
    <>
      {/* Tab Navigation */}
      <nav className="glass-card mb-7 rounded-2xl p-1.5">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("qa")}
            className={`relative flex-1 rounded-xl px-2 py-3 text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === "qa"
                ? "text-gold"
                : "text-muted hover:text-foreground"
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-1.5">
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Q&amp;A
            </span>
            {/* Active indicator */}
            {activeTab === "qa" && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold to-orange transition-all duration-300" />
            )}
            {activeTab === "qa" && (
              <span className="absolute inset-0 rounded-xl bg-gold/5" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("polls")}
            className={`relative flex-1 rounded-xl px-2 py-3 text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === "polls"
                ? "text-gold"
                : "text-muted hover:text-foreground"
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-1.5">
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
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
              Polls
            </span>
            {/* Active indicator */}
            {activeTab === "polls" && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold to-orange transition-all duration-300" />
            )}
            {activeTab === "polls" && (
              <span className="absolute inset-0 rounded-xl bg-gold/5" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("ai")}
            className={`relative flex-1 rounded-xl px-2 py-3 text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === "ai"
                ? "text-gold"
                : "text-muted hover:text-foreground"
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-1.5">
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
                  d="M9.813 15.904L9 21l8.904-4.473L21 9l-3.482-3.482M9.813 15.904L21 9M9.813 15.904l-3.482-3.482L3 9l4.473 8.904L9.813 15.904z"
                />
              </svg>
              CricGuru AI
            </span>
            {/* Active indicator */}
            {activeTab === "ai" && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold to-orange transition-all duration-300" />
            )}
            {activeTab === "ai" && (
              <span className="absolute inset-0 rounded-xl bg-gold/5" />
            )}
          </button>
        </div>
      </nav>

      {/* Tab Content */}
      <div>
        {activeTab === "qa" && (
          <div className="poll-animate-in">{children}</div>
        )}
        {activeTab === "polls" && (
          <div className="poll-animate-in">
            <PollsSection />
          </div>
        )}
        {activeTab === "ai" && (
          <div className="poll-animate-in">
            <AiAssistant />
          </div>
        )}
      </div>
    </>
  );
}
