-- CV Generation System - Basic Schema Migration
-- Run this script in your Supabase SQL editor

-- Create CV profiles table (simplified for MVP)
CREATE TABLE IF NOT EXISTS cv_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_cv_profiles_user_id ON cv_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_cv_profiles_created_at ON cv_profiles(created_at);

-- Enable Row Level Security
ALTER TABLE cv_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (idempotent migration)
DROP POLICY IF EXISTS "Users can view their own CV profiles" ON cv_profiles;
DROP POLICY IF EXISTS "Users can create their own CV profiles" ON cv_profiles;
DROP POLICY IF EXISTS "Users can update their own CV profiles" ON cv_profiles;
DROP POLICY IF EXISTS "Users can delete their own CV profiles" ON cv_profiles;

-- RLS policies for cv_profiles
CREATE POLICY "Users can view their own CV profiles" ON cv_profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own CV profiles" ON cv_profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own CV profiles" ON cv_profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own CV profiles" ON cv_profiles
  FOR DELETE USING (user_id = auth.uid());

-- Create trigger for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_cv_profiles_updated_at ON cv_profiles;

CREATE TRIGGER update_cv_profiles_updated_at
  BEFORE UPDATE ON cv_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON cv_profiles TO authenticated;

-- Success message
DO $$ 
BEGIN 
  RAISE NOTICE 'CV Generation System - Basic schema migration completed successfully!';
  RAISE NOTICE 'Table created: cv_profiles';
  RAISE NOTICE 'Ready for MVP CV creation with titles';
END $$;