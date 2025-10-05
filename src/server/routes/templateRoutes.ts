import { Router } from 'express'

const router = Router()

// Static template definitions
const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, minimalist design with modern typography and layout',
    type: 'modern',
    industryFocus: 'Technology, Design, Consulting',
    features: ['Clean layout', 'Modern typography', 'Color accent', 'Professional styling'],
    isPremium: false,
    previewUrl: '/templates/modern/preview.png'
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    description: 'Traditional professional format suitable for corporate environments',
    type: 'classic',
    industryFocus: 'Finance, Legal, Corporate',
    features: ['Traditional layout', 'Conservative styling', 'Professional fonts', 'Formal structure'],
    isPremium: false,
    previewUrl: '/templates/classic/preview.png'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Dynamic design with creative elements for artistic professionals',
    type: 'creative',
    industryFocus: 'Creative, Media, Marketing',
    features: ['Creative layout', 'Visual elements', 'Unique typography', 'Artistic styling'],
    isPremium: false,
    previewUrl: '/templates/creative/preview.png'
  }
]

// GET /api/templates - List all available templates
router.get('/', async (_req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: templates,
      message: 'Templates retrieved successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message || 'Failed to fetch templates'
      },
      timestamp: new Date().toISOString()
    })
  }
})

export { router as templateRoutes }