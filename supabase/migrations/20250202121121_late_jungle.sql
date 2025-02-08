/*
  # Initial Schema Setup

  1. New Tables
    - `movies`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `poster_url` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key)

  2. Security
    - Enable RLS on `movies` table
    - Add policies for authenticated users to:
      - Read all movies
      - Create their own movies
*/

CREATE TABLE IF NOT EXISTS movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  poster_url text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all movies"
  ON movies
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own movies"
  ON movies
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);