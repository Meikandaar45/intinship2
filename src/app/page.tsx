import QuestionsList from "./questions-list";
import { getQuestionsPage } from "@/lib/questions";
import TabsWrapper from "@/components/TabsWrapper";

// Render on every request (don't cache/prerender) so new questions show up.
export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

// Server component — runs only on the server, awaits the data, renders to HTML.
export default async function Page() {
  let questions: { id: string; body: string; author: string; votes: number }[] = [];
  let hasMore = false;

  try {
    const result = await getQuestionsPage(0, PAGE_SIZE);
    questions = result.questions;
    hasMore = result.hasMore;
  } catch (err) {
    console.error("[Page] Failed to load questions:", err);
    // Page will render with empty questions — the UI handles this gracefully
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10 sm:py-14">
      <header className="mb-7">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          Live now
        </span>
        <h1 className="text-3xl font-semibold tracking-tight">IPL Fan Zone</h1>
        <p className="mt-1.5 text-sm text-muted">
          Ask questions, vote on polls, and join the conversation.
        </p>
      </header>
      <TabsWrapper>
        <QuestionsList initialQuestions={questions} initialHasMore={hasMore} />
      </TabsWrapper>
    </main>
  );
}