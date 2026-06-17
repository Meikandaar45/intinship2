import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-12 sm:px-10">
      {/* Background glowing gradients */}
      <div className="absolute inset-0 z-0 bg-stadium-glow pointer-events-none" />
      
      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold shadow-[0_0_15px_rgba(251,191,36,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
          </span>
          IPL 2025 Live Experience
        </div>

        {/* Hero Title */}
        <h1 className="animate-slide-up mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Welcome to the ultimate <br />
          <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent drop-shadow-sm">
            IPL Fan Quest
          </span>
        </h1>

        {/* Description */}
        <p className="animate-slide-up mb-10 text-lg text-muted sm:text-xl md:px-16" style={{ animationDelay: "100ms" }}>
          Test your cricket knowledge, vote on live polls, and ask the CricGuru AI any IPL question. Step into the stadium and prove you are a true fan.
        </p>

        {/* Call to Action */}
        <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <Link
            href="/session"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-gold to-orange px-8 py-4 text-lg font-bold text-background transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Join Live Session
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 -z-10 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="animate-slide-up mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 text-left" style={{ animationDelay: "300ms" }}>
          <div className="glass-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-gold/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold">Live Q&A</h3>
            <p className="text-sm text-muted">Ask questions and upvote the best ones in real-time.</p>
          </div>

          <div className="glass-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-orange/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold">Interactive Polls</h3>
            <p className="text-sm text-muted">Create custom polls, cast your vote, and view dynamic percentage bars.</p>
          </div>

          <div className="glass-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-blue-400/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.904-4.473L21 9l-3.482-3.482M9.813 15.904L21 9M9.813 15.904l-3.482-3.482L3 9l4.473 8.904L9.813 15.904z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold">CricGuru AI</h3>
            <p className="text-sm text-muted">Powered by Gemini. Get instant answers to complex cricket statistics.</p>
          </div>
        </div>
      </div>
    </main>
  );
}