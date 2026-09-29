-- ============================================================
-- IPL Fan Quest: Supabase Database Migration & RLS Configuration
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/vnrpbeusqdarpewqjjcc/sql/new
-- ============================================================

-- 1. Ensure required tables exist with proper constraints and FKs
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  body text NOT NULL,
  author text DEFAULT 'Anonymous',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  voter_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (question_id, voter_id)
);

CREATE TABLE IF NOT EXISTS polls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  created_by text DEFAULT 'Anonymous',
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  is_active boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS poll_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id uuid NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  option_text text NOT NULL,
  vote_count integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS poll_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id uuid NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  option_id uuid NOT NULL REFERENCES poll_options(id) ON DELETE CASCADE,
  voter_id text NOT NULL,
  voted_at timestamptz DEFAULT now(),
  UNIQUE (poll_id, voter_id)
);

-- Indexes for high performance
CREATE INDEX IF NOT EXISTS votes_question_id_idx ON votes (question_id);
CREATE INDEX IF NOT EXISTS poll_options_poll_id_idx ON poll_options (poll_id);
CREATE INDEX IF NOT EXISTS poll_votes_poll_id_idx ON poll_votes (poll_id);
CREATE INDEX IF NOT EXISTS polls_active_created_idx ON polls (is_active, created_at DESC);
CREATE INDEX IF NOT EXISTS questions_fts_idx ON questions USING gin (to_tsvector('english', body));

-- 2. Enable Row Level Security (RLS) on all tables
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;

-- 3. Clean up existing conflicting policies if re-running
DROP POLICY IF EXISTS "Allow public read questions" ON questions;
DROP POLICY IF EXISTS "Allow insert questions" ON questions;
DROP POLICY IF EXISTS "Allow public read votes" ON votes;
DROP POLICY IF EXISTS "Allow insert votes" ON votes;
DROP POLICY IF EXISTS "Allow public read polls" ON polls;
DROP POLICY IF EXISTS "Allow insert polls" ON polls;
DROP POLICY IF EXISTS "Allow public read poll_options" ON poll_options;
DROP POLICY IF EXISTS "Allow insert poll_options" ON poll_options;
DROP POLICY IF EXISTS "Allow update poll_options" ON poll_options;
DROP POLICY IF EXISTS "Allow public read poll_votes" ON poll_votes;
DROP POLICY IF EXISTS "Allow insert poll_votes" ON poll_votes;

-- 4. Create explicit RLS policies for anonymous and authenticated users

-- questions policies
CREATE POLICY "Allow public read questions"
  ON questions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert questions"
  ON questions FOR INSERT
  TO public
  WITH CHECK (true);

-- votes policies
CREATE POLICY "Allow public read votes"
  ON votes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert votes"
  ON votes FOR INSERT
  TO public
  WITH CHECK (true);

-- polls policies
CREATE POLICY "Allow public read polls"
  ON polls FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert polls"
  ON polls FOR INSERT
  TO public
  WITH CHECK (true);

-- poll_options policies
CREATE POLICY "Allow public read poll_options"
  ON poll_options FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert poll_options"
  ON poll_options FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow update poll_options"
  ON poll_options FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- poll_votes policies
CREATE POLICY "Allow public read poll_votes"
  ON poll_votes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow insert poll_votes"
  ON poll_votes FOR INSERT
  TO public
  WITH CHECK (true);

-- 5. Enable Supabase Realtime for instant updates without manual refresh
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'questions'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE questions;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'votes'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE votes;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'polls'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE polls;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'poll_options'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE poll_options;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'poll_votes'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE poll_votes;
  END IF;
END $$;

-- 6. Set REPLICA IDENTITY FULL so Realtime payloads contain full row details
ALTER TABLE questions REPLICA IDENTITY FULL;
ALTER TABLE votes REPLICA IDENTITY FULL;
ALTER TABLE polls REPLICA IDENTITY FULL;
ALTER TABLE poll_options REPLICA IDENTITY FULL;
ALTER TABLE poll_votes REPLICA IDENTITY FULL;
