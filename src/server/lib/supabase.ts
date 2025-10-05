import { createClient } from '@supabase/supabase-js'

// Server-side Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://eloldmdciulxzwsnlvci.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2xkbWRjaXVseHp3c25sdmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMDkxMDYsImV4cCI6MjA2MDU4NTEwNn0.gh9vAFWK_kmkpYYC5NOgi4rs4lSQY7KhMs6UqPuX5nI'

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables for server')
}

export const serverSupabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

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