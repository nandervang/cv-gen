import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found - using mock client for development')
}

// Create singleton client to avoid multiple instances
let supabaseClient: SupabaseClient | null = null

export const supabase = supabaseUrl && supabaseAnonKey 
  ? (supabaseClient ??= createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // Disable session persistence to avoid conflicts
        autoRefreshToken: false
      }
    }))
  : null as any // Mock client for development without Supabase

// Database types for CV system
export interface CVProfile {
  id: string
  user_id: string
  title: string
  created_at: string
  updated_at: string
}

export interface CVTemplate {
  id: string
  name: string
  description?: string
  template_type: 'modern' | 'classic' | 'creative' | 'technical'
  industry_focus?: string
  layout_structure: object
  styling_config: object
  sections_config: object
  is_premium: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CVContentSection {
  id: string
  cv_profile_id: string
  section_type: 'personal_info' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages' | 'references'
  section_title?: string
  content: object
  display_order: number
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface CVGeneration {
  id: string
  cv_profile_id: string
  template_id?: string
  generation_config: object
  content_data: object
  output_format: 'pdf' | 'html' | 'docx' | 'json'
  file_url?: string
  generation_status: 'pending' | 'processing' | 'completed' | 'failed'
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