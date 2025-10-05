import { serverSupabase, type CVProfile } from '../lib/supabase'

// API Response types
export interface APIResponse<T> {
  data?: T
  error?: string
  status: number
}

export interface CreateCVRequest {
  title: string
}

export interface UpdateCVRequest {
  title?: string
}

// Server-side CV API class
export class ServerCVAPI {
  /**
   * GET /api/cvs - Fetch all CVs for the authenticated user
   */
  static async getCVs(): Promise<APIResponse<CVProfile[]>> {
    try {
      const { data, error } = await serverSupabase
        .from('cv_profiles')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) throw error

      return { data: data || [], status: 200 }
    } catch (error: any) {
      console.error('Error fetching CVs:', error)
      return { error: error.message || 'Failed to fetch CVs', status: 500 }
    }
  }

  /**
   * GET /api/cvs/:id - Fetch a specific CV by ID
   */
  static async getCV(id: string): Promise<APIResponse<CVProfile>> {
    try {
      const { data, error } = await serverSupabase
        .from('cv_profiles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return { error: 'CV not found', status: 404 }
        }
        throw error
      }

      return { data, status: 200 }
    } catch (error: any) {
      console.error('Error fetching CV:', error)
      return { error: error.message || 'Failed to fetch CV', status: 500 }
    }
  }

  /**
   * POST /api/cvs - Create a new CV
   */
  static async createCV(request: CreateCVRequest, userId: string): Promise<APIResponse<CVProfile>> {
    try {
      if (!request.title?.trim()) {
        return { error: 'Title is required', status: 400 }
      }

      const { data, error } = await serverSupabase
        .from('cv_profiles')
        .insert({
          title: request.title.trim(),
          user_id: userId
        })
        .select()
        .single()

      if (error) throw error

      return { data, status: 201 }
    } catch (error: any) {
      console.error('Error creating CV:', error)
      return { error: error.message || 'Failed to create CV', status: 500 }
    }
  }

  /**
   * PUT /api/cvs/:id - Update an existing CV
   */
  static async updateCV(id: string, request: UpdateCVRequest): Promise<APIResponse<CVProfile>> {
    try {
      if (request.title !== undefined && !request.title?.trim()) {
        return { error: 'Title cannot be empty', status: 400 }
      }

      const updateData: Partial<CVProfile> = {}
      if (request.title !== undefined) {
        updateData.title = request.title.trim()
      }

      if (Object.keys(updateData).length === 0) {
        return { error: 'No valid fields to update', status: 400 }
      }

      const { data, error } = await serverSupabase
        .from('cv_profiles')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return { error: 'CV not found', status: 404 }
        }
        throw error
      }

      return { data, status: 200 }
    } catch (error: any) {
      console.error('Error updating CV:', error)
      return { error: error.message || 'Failed to update CV', status: 500 }
    }
  }

  /**
   * DELETE /api/cvs/:id - Delete a CV
   */
  static async deleteCV(id: string): Promise<APIResponse<null>> {
    try {
      const { error } = await serverSupabase
        .from('cv_profiles')
        .delete()
        .eq('id', id)

      if (error) throw error

      return { data: null, status: 200 }
    } catch (error: any) {
      console.error('Error deleting CV:', error)
      return { error: error.message || 'Failed to delete CV', status: 500 }
    }
  }
}