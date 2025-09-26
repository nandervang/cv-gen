-- Wiki System Database Schema Migration
-- Run this script in your Supabase SQL editor

-- Create wiki categories table
CREATE TABLE IF NOT EXISTS wiki_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(20) DEFAULT '#6366f1',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create wiki articles table
CREATE TABLE IF NOT EXISTS wiki_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content JSONB NOT NULL, -- Tiptap JSON content
  category VARCHAR(100) DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published BOOLEAN DEFAULT false,
  slug VARCHAR(500) NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_wiki_articles_category ON wiki_articles(category);
CREATE INDEX IF NOT EXISTS idx_wiki_articles_published ON wiki_articles(published);
CREATE INDEX IF NOT EXISTS idx_wiki_articles_slug ON wiki_articles(slug);
CREATE INDEX IF NOT EXISTS idx_wiki_articles_author ON wiki_articles(author_id);
CREATE INDEX IF NOT EXISTS idx_wiki_articles_tags ON wiki_articles USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_wiki_articles_content ON wiki_articles USING GIN(content);

-- Create full-text search index
CREATE INDEX IF NOT EXISTS idx_wiki_articles_search 
ON wiki_articles USING GIN(to_tsvector('english', title || ' ' || coalesce(content->>'content', '')));

-- Enable Row Level Security
ALTER TABLE wiki_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE wiki_articles ENABLE ROW LEVEL SECURITY;

-- RLS policies for wiki_categories (public read)
CREATE POLICY "Anyone can view categories" ON wiki_categories
  FOR SELECT USING (true);

-- RLS policies for wiki_articles
CREATE POLICY "Anyone can view published articles" ON wiki_articles
  FOR SELECT USING (published = true);

CREATE POLICY "Authors can view their own articles" ON wiki_articles
  FOR SELECT USING (author_id = auth.uid());

CREATE POLICY "Authenticated users can create articles" ON wiki_articles
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND author_id = auth.uid());

CREATE POLICY "Authors can update their own articles" ON wiki_articles
  FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Authors can delete their own articles" ON wiki_articles
  FOR DELETE USING (author_id = auth.uid());

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_wiki_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_wiki_articles_updated_at
  BEFORE UPDATE ON wiki_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_wiki_updated_at();

-- Create function to increment article views
CREATE OR REPLACE FUNCTION increment_article_views(article_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE wiki_articles 
  SET views = views + 1 
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert default categories
INSERT INTO wiki_categories (name, description, color) VALUES
('General', 'General documentation and information', '#6366f1'),
('Tutorial', 'Step-by-step tutorials and guides', '#10b981'),
('Guide', 'How-to guides and best practices', '#f59e0b'),
('Reference', 'API documentation and references', '#8b5cf6'),
('Troubleshooting', 'Problem solving and FAQ', '#ef4444')
ON CONFLICT DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON wiki_categories TO authenticated;
GRANT ALL ON wiki_articles TO authenticated;
GRANT EXECUTE ON FUNCTION increment_article_views TO authenticated;

-- Success message
DO $$ 
BEGIN 
  RAISE NOTICE 'Wiki System migration completed successfully!';
  RAISE NOTICE 'Tables created: wiki_categories, wiki_articles';
  RAISE NOTICE 'Full-text search enabled for article content';
  RAISE NOTICE 'Default categories: General, Tutorial, Guide, Reference, Troubleshooting';
END $$;