import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for CV system
export interface CVProfile {
  id: string
  user_id: string
  title: string
  created_at: string
  updated_at: string
}

// Database types for wiki system
export interface WikiArticle {
  id: string
  title: string
  content: object // Tiptap JSON content
  category: string
  tags: string[]
  author_id: string
  created_at: string
  updated_at: string
  published: boolean
  slug: string
  views: number
  likes: number
}

export interface WikiCategory {
  id: string
  name: string
  description: string
  color: string
  created_at: string
}