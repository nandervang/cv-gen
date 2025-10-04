import { Router } from 'express'
import { CVGenerationService } from '../services/CVGenerationService'

const router = Router()
const generationService = new CVGenerationService()

// POST /api/generate - Generate CV file
router.post('/', async (req, res) => {
  try {
    const { cvId, templateId, format = 'pdf', options = {} } = req.body
    
    if (!cvId || !templateId) {
      return res.status(400).json({
        success: false,
        error: { message: 'CV ID and Template ID are required' },
        timestamp: new Date().toISOString()
      })
    }
    
    if (!['pdf', 'html', 'docx'].includes(format)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid format. Supported: pdf, html, docx' },
        timestamp: new Date().toISOString()
      })
    }
    
    const result = await generationService.generateCV({
      cvId,
      templateId,
      format,
      options
    })
    
    res.status(201).json({
      success: true,
      data: result,
      message: 'CV generation started successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Generation error:', error)
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Failed to generate CV' },
      timestamp: new Date().toISOString()
    })
  }
})

// POST /api/generate/preview - Generate preview HTML
router.post('/preview', async (req, res) => {
  try {
    const { cvId, templateId, options = {} } = req.body
    
    if (!cvId || !templateId) {
      return res.status(400).json({
        success: false,
        error: { message: 'CV ID and Template ID are required' },
        timestamp: new Date().toISOString()
      })
    }
    
    const html = await generationService.generatePreview({
      cvId,
      templateId,
      options
    })
    
    res.status(200).json({
      success: true,
      data: { html },
      message: 'Preview generated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Preview generation error:', error)
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Failed to generate preview' },
      timestamp: new Date().toISOString()
    })
  }
})

// GET /api/generate/:id - Get generation status
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await generationService.getGenerationStatus(id)
    
    if (!result) {
      return res.status(404).json({
        success: false,
        error: { message: 'Generation not found' },
        timestamp: new Date().toISOString()
      })
    }
    
    res.status(200).json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Failed to get generation status' },
      timestamp: new Date().toISOString()
    })
  }
})

export { router as generateRoutes }