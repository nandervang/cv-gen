import { Router } from 'express'
import { validateCVData } from '../middleware/validation'
import { cvGenerationService } from '../services/cvGenerationService'

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
    
    const fileUrl = await cvGenerationService.generateCV(
      { name, title },
      template,
      format
    )
    
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

export { router as generateRoutes }