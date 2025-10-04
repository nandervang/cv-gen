import { Router } from 'express'
import { ServerTemplateAPI } from '../api/templateAPI'

const router = Router()

// GET /api/templates - List all templates
router.get('/', async (_req, res) => {
  try {
    const result = await ServerTemplateAPI.getTemplates()
    
    res.status(result.status).json({
      success: result.status < 400,
      data: result.data,
      error: result.error ? { message: result.error } : undefined,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Failed to fetch templates' },
      timestamp: new Date().toISOString()
    })
  }
})

// GET /api/templates/:id - Get specific template
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await ServerTemplateAPI.getTemplate(id)
    
    res.status(result.status).json({
      success: result.status < 400,
      data: result.data,
      error: result.error ? { message: result.error } : undefined,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Failed to fetch template' },
      timestamp: new Date().toISOString()
    })
  }
})

// GET /api/templates/type/:type - Get templates by type
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params as { type: 'modern' | 'classic' | 'creative' | 'technical' }
    
    if (!['modern', 'classic', 'creative', 'technical'].includes(type)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid template type' },
        timestamp: new Date().toISOString()
      })
    }
    
    const result = await ServerTemplateAPI.getTemplatesByType(type)
    
    res.status(result.status).json({
      success: result.status < 400,
      data: result.data,
      error: result.error ? { message: result.error } : undefined,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Failed to fetch templates by type' },
      timestamp: new Date().toISOString()
    })
  }
})

export { router as templateRoutes }