import { createClient } from '@supabase/supabase-js'

// For server-side usage, use process.env instead of import.meta.env
const supabaseUrl = typeof window === 'undefined' 
  ? process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  : import.meta.env.VITE_SUPABASE_URL

const supabaseAnonKey = typeof window === 'undefined'
  ? process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY  
  : import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
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

// Additional exports for consistency
export type { User } from '@supabase/supabase-js'