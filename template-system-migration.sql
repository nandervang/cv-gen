-- CV Generation System - Template System Migration
-- Run this script in your Supabase SQL editor

-- Create CV templates table
CREATE TABLE IF NOT EXISTS cv_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  template_type VARCHAR(50) NOT NULL CHECK (template_type IN ('modern', 'classic', 'creative', 'technical')),
  industry_focus VARCHAR(100),
  layout_structure JSONB NOT NULL DEFAULT '{}',
  styling_config JSONB NOT NULL DEFAULT '{}',
  sections_config JSONB NOT NULL DEFAULT '{}',
  is_premium BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create CV content sections table for structured content
CREATE TABLE IF NOT EXISTS cv_content_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cv_profile_id UUID REFERENCES cv_profiles(id) ON DELETE CASCADE,
  section_type VARCHAR(50) NOT NULL CHECK (section_type IN ('personal_info', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'references')),
  section_title VARCHAR(255),
  content JSONB NOT NULL DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create CV generations table to track template applications
CREATE TABLE IF NOT EXISTS cv_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cv_profile_id UUID REFERENCES cv_profiles(id) ON DELETE CASCADE,
  template_id UUID REFERENCES cv_templates(id) ON DELETE SET NULL,
  generation_config JSONB NOT NULL DEFAULT '{}',
  content_data JSONB NOT NULL DEFAULT '{}',
  output_format VARCHAR(20) DEFAULT 'html' CHECK (output_format IN ('pdf', 'html', 'docx', 'json')),
  file_url TEXT,
  generation_status VARCHAR(20) DEFAULT 'pending' CHECK (generation_status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_cv_templates_type ON cv_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_cv_templates_active ON cv_templates(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_cv_content_sections_profile_id ON cv_content_sections(cv_profile_id);
CREATE INDEX IF NOT EXISTS idx_cv_content_sections_type ON cv_content_sections(section_type);
CREATE INDEX IF NOT EXISTS idx_cv_generations_profile_id ON cv_generations(cv_profile_id);
CREATE INDEX IF NOT EXISTS idx_cv_generations_template_id ON cv_generations(template_id);

-- Enable Row Level Security
ALTER TABLE cv_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_generations ENABLE ROW LEVEL SECURITY;

-- RLS policies for cv_templates (public read, admin write)
DROP POLICY IF EXISTS "Anyone can view active templates" ON cv_templates;
DROP POLICY IF EXISTS "Users can view all templates" ON cv_templates;

CREATE POLICY "Users can view all templates" ON cv_templates
  FOR SELECT USING (TRUE);

-- RLS policies for cv_content_sections
DROP POLICY IF EXISTS "Users can view their own content sections" ON cv_content_sections;
DROP POLICY IF EXISTS "Users can create their own content sections" ON cv_content_sections;
DROP POLICY IF EXISTS "Users can update their own content sections" ON cv_content_sections;
DROP POLICY IF EXISTS "Users can delete their own content sections" ON cv_content_sections;

CREATE POLICY "Users can view their own content sections" ON cv_content_sections
  FOR SELECT USING (cv_profile_id IN (
    SELECT id FROM cv_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create their own content sections" ON cv_content_sections
  FOR INSERT WITH CHECK (cv_profile_id IN (
    SELECT id FROM cv_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own content sections" ON cv_content_sections
  FOR UPDATE USING (cv_profile_id IN (
    SELECT id FROM cv_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own content sections" ON cv_content_sections
  FOR DELETE USING (cv_profile_id IN (
    SELECT id FROM cv_profiles WHERE user_id = auth.uid()
  ));

-- RLS policies for cv_generations
DROP POLICY IF EXISTS "Users can view their own generations" ON cv_generations;
DROP POLICY IF EXISTS "Users can create their own generations" ON cv_generations;
DROP POLICY IF EXISTS "Users can update their own generations" ON cv_generations;
DROP POLICY IF EXISTS "Users can delete their own generations" ON cv_generations;

CREATE POLICY "Users can view their own generations" ON cv_generations
  FOR SELECT USING (cv_profile_id IN (
    SELECT id FROM cv_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create their own generations" ON cv_generations
  FOR INSERT WITH CHECK (cv_profile_id IN (
    SELECT id FROM cv_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own generations" ON cv_generations
  FOR UPDATE USING (cv_profile_id IN (
    SELECT id FROM cv_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own generations" ON cv_generations
  FOR DELETE USING (cv_profile_id IN (
    SELECT id FROM cv_profiles WHERE user_id = auth.uid()
  ));

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_cv_templates_updated_at ON cv_templates;
DROP TRIGGER IF EXISTS update_cv_content_sections_updated_at ON cv_content_sections;
DROP TRIGGER IF EXISTS update_cv_generations_updated_at ON cv_generations;

CREATE TRIGGER update_cv_templates_updated_at
  BEFORE UPDATE ON cv_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cv_content_sections_updated_at
  BEFORE UPDATE ON cv_content_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cv_generations_updated_at
  BEFORE UPDATE ON cv_generations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default templates
INSERT INTO cv_templates (name, description, template_type, industry_focus, layout_structure, styling_config, sections_config) VALUES
(
  'Modern Professional',
  'A clean, contemporary design perfect for most industries',
  'modern',
  'General',
  '{"layout": "single-column", "header_style": "minimal", "section_spacing": "medium"}',
  '{"primary_color": "#2563eb", "font_family": "Inter", "font_sizes": {"heading": "24px", "subheading": "18px", "body": "14px"}}',
  '{"sections": ["personal_info", "summary", "experience", "education", "skills"], "order": ["personal_info", "summary", "experience", "education", "skills"]}'
),
(
  'Classic Executive',
  'Traditional, elegant layout for senior-level positions',
  'classic',
  'Executive/Management',
  '{"layout": "two-column", "header_style": "formal", "section_spacing": "large"}',
  '{"primary_color": "#1f2937", "font_family": "Times New Roman", "font_sizes": {"heading": "28px", "subheading": "20px", "body": "12px"}}',
  '{"sections": ["personal_info", "summary", "experience", "education", "skills", "references"], "order": ["personal_info", "summary", "experience", "education", "skills", "references"]}'
),
(
  'Creative Portfolio',
  'Vibrant, visual design for creative professionals',
  'creative',
  'Design/Creative',
  '{"layout": "mixed", "header_style": "artistic", "section_spacing": "dynamic"}',
  '{"primary_color": "#7c3aed", "secondary_color": "#f59e0b", "font_family": "Poppins", "font_sizes": {"heading": "32px", "subheading": "22px", "body": "14px"}}',
  '{"sections": ["personal_info", "summary", "projects", "experience", "skills", "education"], "order": ["personal_info", "summary", "projects", "experience", "skills", "education"]}'
),
(
  'Technical Specialist',
  'Clean, structured format for technical roles',
  'technical',
  'Technology/Engineering',
  '{"layout": "structured", "header_style": "technical", "section_spacing": "compact"}',
  '{"primary_color": "#059669", "font_family": "Source Code Pro", "font_sizes": {"heading": "26px", "subheading": "18px", "body": "13px"}}',
  '{"sections": ["personal_info", "summary", "skills", "experience", "projects", "education", "certifications"], "order": ["personal_info", "summary", "skills", "experience", "projects", "education", "certifications"]}'
)
ON CONFLICT DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON cv_templates TO authenticated;
GRANT ALL ON cv_content_sections TO authenticated;
GRANT ALL ON cv_generations TO authenticated;

-- Success message
DO $$ 
BEGIN 
  RAISE NOTICE 'CV Generation System - Template System migration completed successfully!';
  RAISE NOTICE 'Tables created: cv_templates, cv_content_sections, cv_generations';
  RAISE NOTICE 'Default templates inserted: Modern Professional, Classic Executive, Creative Portfolio, Technical Specialist';
  RAISE NOTICE 'Ready for Phase 2: Template System implementation';
END $$;