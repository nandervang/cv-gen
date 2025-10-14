import { Router } from 'express'
import type { Request, Response } from 'express'
import { cvGenerationService } from '../services/CVGenerationService.js'
import type { ExtendedCVData } from '../types/cv.js'

export const generateRoutes = Router()

generateRoutes.post('/', async (req: Request, res: Response) => {
  try {
    console.log('🎯 CV generation request received')
    console.log('Request body keys:', Object.keys(req.body))
    
    const { templateId = 'andervang-consulting', format = 'pdf', ...cvData } = req.body
    
    if (!cvData.personalInfo || !cvData.personalInfo.name) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_CV_DATA',
          message: 'Invalid CV data: personalInfo.name is required'
        },
        timestamp: new Date().toISOString()
      })
    }

    console.log(`�� Generating CV: template=${templateId}, format=${format}`)
    console.log('CV Data preview:', {
      name: cvData.personalInfo?.name,
      title: cvData.personalInfo?.title,
      company: cvData.company,
      hasEmployment: !!cvData.employment,
      hasProjects: !!cvData.projects
    })

    const result = await cvGenerationService.generateCV(
      cvData as ExtendedCVData,
      templateId,
      format
    )

    if (!result.success) {
      console.error('❌ CV generation failed:', result.error)
      return res.status(500).json({
        success: false,
        error: {
          code: 'GENERATION_FAILED',
          message: result.error || 'CV generation failed'
        },
        timestamp: new Date().toISOString()
      })
    }

    console.log('✅ CV generated successfully')
    res.json({
      success: true,
      data: result.data,
      metadata: result.metadata,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Generation endpoint error:', error)
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      timestamp: new Date().toISOString()
    })
  }
})

generateRoutes.post('/test', async (_req: Request, res: Response) => {
  try {
    console.log('🧪 Test CV generation requested')
    // Remove call to non-existent method
    // const result = await cvGenerationService.testGeneration()
    
    res.json({
      success: true,
      message: 'Test endpoint - generation service available'.data,
      metadata: result.metadata,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Test generation error:', error)
    res.status(500).json({
      success: false,
      error: {
        code: 'TEST_GENERATION_FAILED',
        message: error instanceof Error ? error.message : 'Test generation failed'
      },
      timestamp: new Date().toISOString()
    })
  }
})
