/*
  # OBA LifeHub Database Schema

  ## Overview
  Complete schema for OBA LifeHub MVP - a family-focused loyalty and engagement platform.

  ## New Tables
  
  ### `profiles`
  - `id` (uuid, primary key) - References auth.users
  - `email` (text) - User email
  - `full_name` (text) - Full name
  - `role` (text) - User role: 'parent', 'child', 'senior'
  - `family_id` (uuid) - Groups family members together
  - `avatar_url` (text, nullable) - Profile picture
  - `coins_balance` (integer) - Current Green Coins balance
  - `level` (text) - Loyalty level: 'bronze', 'silver', 'gold'
  - `total_coins_earned` (integer) - Lifetime coins earned
  - `monthly_savings` (decimal) - Tracked monthly savings
  - `preferred_language` (text) - User language preference
  - `accessibility_mode` (boolean) - Enable Grandpa Mode
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `coin_transactions`
  - `id` (uuid, primary key)
  - `user_id` (uuid) - References profiles
  - `amount` (integer) - Coins added/removed (+/-)
  - `transaction_type` (text) - 'earn_purchase', 'earn_activity', 'spend_reward'
  - `description` (text) - Transaction description
  - `created_at` (timestamptz)

  ### `activities`
  - `id` (uuid, primary key)
  - `title` (text) - Activity name
  - `description` (text) - Activity details
  - `category` (text) - 'game', 'learning', 'challenge'
  - `difficulty` (text) - 'beginner', 'explorer', 'champion'
  - `coin_reward` (integer) - Coins earned for completion
  - `icon` (text) - Icon identifier
  - `active` (boolean) - Is activity available
  - `created_at` (timestamptz)

  ### `user_activities`
  - `id` (uuid, primary key)
  - `user_id` (uuid) - References profiles
  - `activity_id` (uuid) - References activities
  - `completed` (boolean) - Completion status
  - `progress` (integer) - Progress percentage (0-100)
  - `completed_at` (timestamptz, nullable)
  - `created_at` (timestamptz)

  ### `rewards`
  - `id` (uuid, primary key)
  - `title` (text) - Reward name
  - `description` (text) - Reward details
  - `coin_cost` (integer) - Cost in Green Coins
  - `icon` (text) - Icon identifier
  - `category` (text) - 'discount', 'gift', 'special'
  - `active` (boolean) - Is reward available
  - `stock` (integer, nullable) - Available quantity
  - `created_at` (timestamptz)

  ### `user_rewards`
  - `id` (uuid, primary key)
  - `user_id` (uuid) - References profiles
  - `reward_id` (uuid) - References rewards
  - `claimed_at` (timestamptz)
  - `used` (boolean) - Has reward been used
  - `used_at` (timestamptz, nullable)

  ## Security
  - RLS enabled on all tables
  - Users can only access their own data and family data
  - Public read access for activities and rewards catalog
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'parent' CHECK (role IN ('parent', 'child', 'senior')),
  family_id uuid NOT NULL,
  avatar_url text,
  coins_balance integer DEFAULT 0,
  level text DEFAULT 'bronze' CHECK (level IN ('bronze', 'silver', 'gold')),
  total_coins_earned integer DEFAULT 0,
  monthly_savings decimal(10,2) DEFAULT 0,
  preferred_language text DEFAULT 'en',
  accessibility_mode boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create coin_transactions table
CREATE TABLE IF NOT EXISTS coin_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount integer NOT NULL,
  transaction_type text NOT NULL CHECK (transaction_type IN ('earn_purchase', 'earn_activity', 'spend_reward', 'bonus')),
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('game', 'learning', 'challenge')),
  difficulty text NOT NULL DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'explorer', 'champion')),
  coin_reward integer NOT NULL DEFAULT 2,
  icon text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create user_activities table
CREATE TABLE IF NOT EXISTS user_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  activity_id uuid NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, activity_id)
);

-- Create rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  coin_cost integer NOT NULL,
  icon text NOT NULL,
  category text NOT NULL CHECK (category IN ('discount', 'gift', 'special')),
  active boolean DEFAULT true,
  stock integer,
  created_at timestamptz DEFAULT now()
);

-- Create user_rewards table
CREATE TABLE IF NOT EXISTS user_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reward_id uuid NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
  claimed_at timestamptz DEFAULT now(),
  used boolean DEFAULT false,
  used_at timestamptz
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_coin_transactions_user_id ON coin_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_coin_transactions_created_at ON coin_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_rewards_user_id ON user_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_family_id ON profiles(family_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE coin_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view family profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (family_id = (SELECT family_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for coin_transactions
CREATE POLICY "Users can view own transactions"
  ON coin_transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own transactions"
  ON coin_transactions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for activities (public read)
CREATE POLICY "Anyone can view active activities"
  ON activities FOR SELECT
  TO authenticated
  USING (active = true);

-- RLS Policies for user_activities
CREATE POLICY "Users can view own activities"
  ON user_activities FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own activities"
  ON user_activities FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own activities"
  ON user_activities FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for rewards (public read)
CREATE POLICY "Anyone can view active rewards"
  ON rewards FOR SELECT
  TO authenticated
  USING (active = true);

-- RLS Policies for user_rewards
CREATE POLICY "Users can view own rewards"
  ON user_rewards FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own rewards"
  ON user_rewards FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own rewards"
  ON user_rewards FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Function to update level based on total coins
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.total_coins_earned >= 150 THEN
    NEW.level := 'gold';
  ELSIF NEW.total_coins_earned >= 51 THEN
    NEW.level := 'silver';
  ELSE
    NEW.level := 'bronze';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_user_level
  BEFORE INSERT OR UPDATE OF total_coins_earned ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_level();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample activities
INSERT INTO activities (title, description, category, difficulty, coin_reward, icon) VALUES
  ('Pick 3 Fruits', 'Select three different fruits from the basket', 'game', 'beginner', 2, 'apple'),
  ('Match Colors', 'Find and match all the same colored items', 'game', 'beginner', 2, 'palette'),
  ('Count Objects', 'Count how many items are on the screen', 'learning', 'beginner', 3, 'calculator'),
  ('Find Shapes', 'Identify all the circles, squares, and triangles', 'learning', 'explorer', 3, 'shapes'),
  ('Memory Match', 'Remember and match the hidden cards', 'game', 'explorer', 4, 'brain'),
  ('Spell Words', 'Spell simple words using letters', 'learning', 'explorer', 4, 'book'),
  ('Math Challenge', 'Solve basic addition and subtraction', 'challenge', 'champion', 5, 'calculator'),
  ('Pattern Master', 'Complete the pattern sequence', 'challenge', 'champion', 5, 'grid')
ON CONFLICT DO NOTHING;

-- Insert sample rewards
INSERT INTO rewards (title, description, coin_cost, icon, category) VALUES
  ('Free Tea', 'Get a complimentary tea at OBA stores', 20, 'coffee', 'gift'),
  ('10% Discount', '10% off your next purchase', 50, 'ticket', 'discount'),
  ('Free Snack', 'Choose any snack from our selection', 35, 'cookie', 'gift'),
  ('Gift Pack', 'Special gift pack with assorted items', 100, 'gift', 'special'),
  ('Free Delivery', 'One free home delivery', 60, 'truck', 'special'),
  ('25% Discount', '25% off your next purchase', 120, 'ticket', 'discount'),
  ('Premium Box', 'Premium product selection box', 200, 'package', 'special')
ON CONFLICT DO NOTHING;