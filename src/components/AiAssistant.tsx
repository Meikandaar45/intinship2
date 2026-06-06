"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  thought?: string;
  timestamp: Date;
};

const SUGGESTED_PROMPTS = [
  "Who scored the highest individual IPL score?",
  "What is the Impact Player rule in IPL?",
  "Which teams have won the most IPL titles?",
  "Give me an IPL trivia quiz hint!",
];

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Namaste! 🏏 I am **CricGuru AI**, your premium IPL Cricket assistant. Ask me anything about IPL history, teams, rules, players, stats, or ask for quiz hints!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendMessage(textToSend: string) {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });
      const data = await res.json();
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            sender: "bot",
            text: data.reply || "I encountered a run on the pitch. Please try asking again!",
            thought: data.thought,
            timestamp: new Date(),
          },
        ]);
      }, 800); // realistic delay for human feel
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "Oops! My connection to the stadium commentary box was interrupted. Please try again.",
          timestamp: new Date(),
        },
      ]);
    }
  }

  return (
    <div className="glass-card flex h-[550px] flex-col rounded-2xl border border-border shadow-2xl overflow-hidden poll-animate-in">
      {/* AI Header */}
      <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-gold/5 via-orange/5 to-transparent px-4 py-3.5">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-gold to-orange text-background font-bold shadow-lg shadow-gold/20">
          CG
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">CricGuru AI</h3>
          <p className="text-xs text-muted">IPL Cricket Expert &amp; Advisor</p>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] ${
              msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
            }`}
          >
            {/* Thought reasoning bubble (collapsible) */}
            {msg.thought && (
              <details className="mb-1.5 w-full rounded-lg border border-border bg-white/5 p-2 text-xs text-muted outline-none transition-all">
                <summary className="cursor-pointer select-none font-medium hover:text-gold">
                  🧠 CricGuru's Thought Process
                </summary>
                <p className="mt-1.5 whitespace-pre-line leading-relaxed italic border-t border-border/50 pt-1.5">
                  {msg.thought}
                </p>
              </details>
            )}

            {/* Main message bubble */}
            <div
              className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-gold to-orange text-background font-medium rounded-tr-none"
                  : "bg-surface border border-border text-foreground rounded-tl-none"
              }`}
            >
              {msg.text.split("\n").map((para, i) => (
                <p key={i} className={i > 0 ? "mt-2" : ""}>
                  {/* Basic inline bolding for markdown formatting */}
                  {para.split("**").map((chunk, j) =>
                    j % 2 === 1 ? <strong key={j} className="font-bold text-gold">{chunk}</strong> : chunk
                  )}
                </p>
              ))}
            </div>
            
            <span className="mt-1.5 text-[10px] text-muted">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 max-w-[85%] mr-auto">
            <div className="flex items-center gap-1 rounded-2xl bg-surface border border-border px-4 py-3.5 shadow-md">
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: "0ms" }} />
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: "150ms" }} />
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <div className="px-4 py-2 bg-black/10 border-t border-border">
          <p className="text-[11px] font-semibold text-muted mb-1.5">Suggested Questions:</p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="rounded-lg bg-surface hover:bg-white/5 border border-border px-2.5 py-1 text-xs text-muted hover:text-gold transition-all duration-200"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI Chat Input */}
      <div className="border-t border-border bg-surface/50 p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask CricGuru AI a question..."
            className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-gold/50"
            disabled={isTyping}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isTyping || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-gold to-orange text-background transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            aria-label="Send message"
          >
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
