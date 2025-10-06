import { Router } from 'express'

const router = Router()

// Static template definitions
const templates = [
  {
    id: 'frank-digital',
    name: 'Frank Digital',
    description: 'Professional consultant template with purple accents and comprehensive project showcase',
    type: 'frank-digital',
    industryFocus: 'Consulting, Technology, Software Development',
    features: ['Single column layout', 'Technology tags', 'Project timeline', 'Professional styling', 'Purple accent colors'],
    isPremium: false,
    previewUrl: '/templates/frank-digital/preview.png'
  },
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, minimalist design with left sidebar and modern typography',
    type: 'modern',
    industryFocus: 'Technology, Design, Consulting',
    features: ['Sidebar layout', 'Modern typography', 'Blue color scheme', 'Professional styling', 'Clean spacing'],
    isPremium: false,
    previewUrl: '/templates/modern/preview.png'
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    description: 'Traditional professional format with formal typography and table layouts',
    type: 'classic',
    industryFocus: 'Finance, Legal, Corporate',
    features: ['Traditional layout', 'Serif typography', 'Table structure', 'Conservative styling', 'Formal presentation'],
    isPremium: false,
    previewUrl: '/templates/classic/preview.png'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Dynamic design with vibrant colors and creative elements for artistic professionals',
    type: 'creative',
    industryFocus: 'Creative, Media, Marketing, Design',
    features: ['Asymmetric layout', 'Vibrant colors', 'Creative elements', 'Gradient backgrounds', 'Animated effects'],
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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch templates';
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: errorMessage
      },
      timestamp: new Date().toISOString()
    })
  }
})

export { router as templateRoutes }