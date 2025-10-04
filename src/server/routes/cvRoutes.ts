import { Router } from 'express'
import { ServerCVAPI } from '../api/cvAPI'

const router = Router()

// GET /api/cvs - List all CVs for user
router.get('/', async (_req, res) => {
  try {
    const result = await ServerCVAPI.getCVs()
    
    res.status(result.status).json({
      success: result.status < 400,
      data: result.data,
      error: result.error ? { message: result.error } : undefined,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Failed to fetch CVs' },
      timestamp: new Date().toISOString()
    })
  }
})

// POST /api/cvs - Create new CV
router.post('/', async (req, res) => {
  try {
    const { title } = req.body
    
    if (!title) {
      return res.status(400).json({
        success: false,
        error: { message: 'Title is required' },
        timestamp: new Date().toISOString()
      })
    }
    
    // For now, use a dummy user ID - in production you'd get this from auth
    const userId = 'dummy-user-id'
    const result = await ServerCVAPI.createCV({ title }, userId)
    
    res.status(result.status).json({
      success: result.status < 400,
      data: result.data,
      error: result.error ? { message: result.error } : undefined,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Failed to create CV' },
      timestamp: new Date().toISOString()
    })
  }
})

// GET /api/cvs/:id - Get specific CV
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await ServerCVAPI.getCV(id)
    
    res.status(result.status).json({
      success: result.status < 400,
      data: result.data,
      error: result.error ? { message: result.error } : undefined,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Failed to fetch CV' },
      timestamp: new Date().toISOString()
    })
  }
})

// PUT /api/cvs/:id - Update CV
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title } = req.body
    
    const result = await ServerCVAPI.updateCV(id, { title })
    
    res.status(result.status).json({
      success: result.status < 400,
      data: result.data,
      error: result.error ? { message: result.error } : undefined,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Failed to update CV' },
      timestamp: new Date().toISOString()
    })
  }
})

// DELETE /api/cvs/:id - Delete CV
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await ServerCVAPI.deleteCV(id)
    
    res.status(result.status).json({
      success: result.status < 400,
      data: result.data,
      error: result.error ? { message: result.error } : undefined,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Failed to delete CV' },
      timestamp: new Date().toISOString()
    })
  }
})

export { router as cvRoutes }