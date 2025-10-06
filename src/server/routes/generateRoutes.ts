import { Router } from 'express'
import { validateCVData } from '../middleware/validation'
import { cvGenerationService } from '../services/CVGenerationService.js'
import type { CompleteCVData } from '../types/cv.js'

const router = Router()

// Handle method checking first
router.use('/', (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: `Method ${req.method} not allowed. Only POST is supported.`
      },
      timestamp: new Date().toISOString()
    })
  }
  next()
})

// POST /api/generate - Generate CV file from simple payload
router.post('/', validateCVData, async (req, res) => {
  console.log('Generate route hit with body:', req.body)
  try {
    const { name, title, format = 'pdf', template = 'modern' } = req.body
    
    // Create a simplified CompleteCVData object for basic generation
    const cvData = {
      personalInfo: {
        name,
        title,
        email: '',
        phone: ''
      },
      summary: {
        introduction: `Professional ${title}`,
        highlights: []
      },
      template,
      format
    }
    
    const fileUrl = await cvGenerationService.generateCompleteCV(cvData)
    
    res.status(200).json({
      success: true,
      data: {
        fileUrl,
        format,
        template,
        generatedAt: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Generation error:', error)
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message || 'Failed to generate CV'
      },
      timestamp: new Date().toISOString()
    })
  }
})

// POST /api/generate/complete - Generate CV file from complete payload
router.post('/complete', async (req, res) => {
  console.log('Complete generate route hit with body keys:', Object.keys(req.body))
  try {
    const cvData = req.body as CompleteCVData
    
    // Basic validation for required fields
    if (!cvData.personalInfo?.name || !cvData.personalInfo?.title) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'personalInfo.name and personalInfo.title are required'
        },
        timestamp: new Date().toISOString()
      })
    }
    
    const fileUrl = await cvGenerationService.generateCompleteCV(cvData)
    
    res.status(200).json({
      success: true,
      data: {
        fileUrl,
        format: cvData.format || 'pdf',
        template: cvData.template || 'frank-digital',
        generatedAt: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Complete generation error:', error)
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message || 'Failed to generate complete CV'
      },
      timestamp: new Date().toISOString()
    })
  }
})

export { router as generateRoutes }