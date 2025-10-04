import { serverSupabase, type CVTemplate } from '../lib/supabase'

// API Response types
export interface APIResponse<T> {
  data?: T
  error?: string
  status: number
}

// Server-side Template API class
export class ServerTemplateAPI {
  /**
   * GET /api/templates - Fetch all available templates
   */
  static async getTemplates(): Promise<APIResponse<CVTemplate[]>> {
    try {
      const { data, error } = await serverSupabase
        .from('cv_templates')
        .select('*')
        .eq('is_active', true)
        .order('template_type', { ascending: true })

      if (error) throw error

      return { data: data || [], status: 200 }
    } catch (error: any) {
      console.error('Error fetching templates:', error)
      return { error: error.message || 'Failed to fetch templates', status: 500 }
    }
  }

  /**
   * GET /api/templates/:id - Fetch a specific template by ID
   */
  static async getTemplate(id: string): Promise<APIResponse<CVTemplate>> {
    try {
      const { data, error } = await serverSupabase
        .from('cv_templates')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return { error: 'Template not found', status: 404 }
        }
        throw error
      }

      return { data, status: 200 }
    } catch (error: any) {
      console.error('Error fetching template:', error)
      return { error: error.message || 'Failed to fetch template', status: 500 }
    }
  }

  /**
   * GET /api/templates/type/:type - Fetch templates by type
   */
  static async getTemplatesByType(type: CVTemplate['template_type']): Promise<APIResponse<CVTemplate[]>> {
    try {
      const { data, error } = await serverSupabase
        .from('cv_templates')
        .select('*')
        .eq('template_type', type)
        .eq('is_active', true)
        .order('name', { ascending: true })

      if (error) throw error

      return { data: data || [], status: 200 }
    } catch (error: any) {
      console.error('Error fetching templates by type:', error)
      return { error: error.message || 'Failed to fetch templates', status: 500 }
    }
  }
}