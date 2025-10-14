import { Router } from 'express'
import type { Request, Response } from 'express'

export const templateRoutes = Router()

templateRoutes.get('/', (_req: Request, res: Response) => {
  try {
    const templates = [
      {
        id: 'andervang-consulting',
        name: 'Andervang Consulting',
        description: 'Professional template with Apple-inspired design and orange accent colors',
        category: 'professional',
        industry: 'consulting',
        features: [
          'PDF Export',
          'HTML Export', 
          'Professional Layout',
          'Orange Accent Colors',
          'Apple-inspired Typography',
          'Employment Sections with Gradients'
        ],
        preview: '/images/templates/andervang-consulting-preview.jpg',
        colors: {
          primary: '#003D82',
          accent: '#FF6B35',
          text: '#333333',
          background: '#FFFFFF'
        },
        supported_formats: ['pdf', 'html'],
        styling_options: {
          font_families: ['SF Pro Display', 'Helvetica Neue', 'Arial'],
          layouts: ['single-column'],
          color_schemes: ['default', 'blue-orange']
        }
      }
    ]

    res.json({
      success: true,
      data: templates,
      count: templates.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching templates:', error)
    res.status(500).json({
      success: false,
      error: {
        code: 'TEMPLATE_FETCH_ERROR',
        message: 'Failed to fetch templates'
      },
      timestamp: new Date().toISOString()
    })
  }
})
