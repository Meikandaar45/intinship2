-- IPL Fan Quest Database Schema
-- Run this in your Supabase SQL Editor.

-- Drop existing tables if they exist
drop table if exists ipl_achievements cascade;
drop table if exists ipl_stats cascade;
drop table if exists ipl_profiles cascade;
drop table if exists ipl_questions cascade;

-- 1. Profiles Table
create table ipl_profiles (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  avatar text default 'cric-avatar-1',
  points integer default 0,
  xp integer default 0,
  level_name text default 'Rookie',
  streak integer default 0,
  created_at timestamptz default now()
);

-- 2. Questions Table
create table ipl_questions (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  options text[] not null, -- Array of 4 options
  answer text not null,     -- Must match one of the options exactly
  points integer default 10,
  category text not null,   -- e.g. 'History', 'Records', 'Players'
  type text default 'multiple-choice' -- 'multiple-choice', 'true-false', 'timed'
);

-- 3. Achievements / Badges Table
create table ipl_achievements (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references ipl_profiles(id) on delete cascade,
  badge_id text not null,
  unlocked_at timestamptz default now(),
  unique (profile_id, badge_id)
);

-- 4. Statistics Table
create table ipl_stats (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references ipl_profiles(id) on delete cascade unique,
  quizzes_played integer default 0,
  correct_answers integer default 0,
  wrong_answers integer default 0,
  highest_score integer default 0,
  current_streak integer default 0,
  best_streak integer default 0
);

-- Index for leaderboard performance
create index ipl_profiles_points_idx on ipl_profiles (points desc);

-- Seed some initial sample questions (the full set of 100+ is in the code's fallback for robust operation)
insert into ipl_questions (body, options, answer, points, category, type) values
('Which team has won the most IPL titles (as of 2025)?', array['Chennai Super Kings', 'Mumbai Indians', 'Kolkata Knight Riders', 'Both CSK and MI'], 'Both CSK and MI', 10, 'Teams', 'multiple-choice'),
('Who scored the highest individual score in IPL history (175*)?', array['Virat Kohli', 'Chris Gayle', 'Rohit Sharma', 'AB de Villiers'], 'Chris Gayle', 10, 'Records', 'multiple-choice'),
('What is the Orange Cap awarded for in the IPL?', array['Most Wickets', 'Best Captain', 'Highest Run Scorer', 'Best Fielder'], 'Highest Run Scorer', 10, 'IPL Awards', 'multiple-choice'),
('What is the Purple Cap awarded for in the IPL?', array['Highest Run Scorer', 'Most Wickets', 'Best Captain', 'Best Fielder'], 'Most Wickets', 10, 'IPL Awards', 'multiple-choice'),
('Who was the captain of Rajasthan Royals when they won the inaugural IPL in 2008?', array['Shane Warne', 'Rahul Dravid', 'Graeme Smith', 'MS Dhoni'], 'Shane Warne', 10, 'Captains', 'multiple-choice'),
('True or False: Virat Kohli has played for only one IPL franchise since 2008.', array['True', 'False'], 'True', 10, 'IPL History', 'true-false'),
('True or False: Kolkata Knight Riders won their third IPL title in 2024.', array['True', 'False'], 'True', 10, 'Finals', 'true-false'),
('Which stadium is known as the home ground of Royal Challengers Bengaluru?', array['Wankhede Stadium', 'M. Chinnaswamy Stadium', 'Eden Gardens', 'Narendra Modi Stadium'], 'M. Chinnaswamy Stadium', 10, 'Stadiums', 'multiple-choice');

-- ============================================================
-- Polling Feature Tables
-- ============================================================

-- 5. Polls Table
create table polls (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  created_by text,
  created_at timestamptz default now(),
  expires_at timestamptz,
  is_active boolean default true
);

-- 6. Poll Options Table
create table poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid references polls(id) on delete cascade,
  option_text text not null,
  vote_count integer default 0
);

-- 7. Poll Votes Table
create table poll_votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid references polls(id) on delete cascade,
  option_id uuid references poll_options(id) on delete cascade,
  voter_id text not null,
  voted_at timestamptz default now(),
  unique (poll_id, voter_id)
);

-- Index for efficient active-polls queries
create index polls_active_created_idx on polls (is_active, created_at desc);
