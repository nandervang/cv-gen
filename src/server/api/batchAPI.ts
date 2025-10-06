import type { Request, Response } from 'express';
import { cvGenerationService } from '../services/CVGenerationService.js';
import type { CompleteCVData } from '../types/cv.js';

/**
 * Generate CV in all formats for testing
 */
export const generateAllFormats = async (req: Request, res: Response) => {
  try {
    const cvData = req.body as CompleteCVData;

    // Basic validation
    if (!cvData.personalInfo?.name || !cvData.personalInfo?.title) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'personalInfo.name and personalInfo.title are required'
        },
        timestamp: new Date().toISOString()
      });
    }

    const template = cvData.template || 'modern';
    const formats = ['html', 'pdf', 'docx'] as const;
    
    interface FormatResult {
      success: boolean;
      fileUrl?: string;
      error?: string;
      generatedAt?: string;
    }
    
    const results: Record<string, FormatResult> = {};

    // Generate CV in each format
    for (const format of formats) {
      try {
        const formatData: CompleteCVData = {
          ...cvData,
          template,
          format
        };

        const fileUrl = await cvGenerationService.generateCompleteCV(formatData);

        results[format] = {
          success: true,
          fileUrl,
          generatedAt: new Date().toISOString()
        };
      } catch (error) {
        console.error(`Error generating ${format} format:`, error);
        results[format] = {
          success: false,
          error: error instanceof Error ? error.message : `Failed to generate ${format}`
        };
      }
    }

    const successCount = Object.values(results).filter(r => r.success).length;

    res.json({
      success: successCount > 0,
      data: {
        template,
        results,
        summary: {
          total: formats.length,
          successful: successCount,
          failed: formats.length - successCount
        }
      },
      message: `Generated CV in ${successCount}/${formats.length} formats`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Batch format generation error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'BATCH_FORMAT_ERROR',
        message: error instanceof Error ? error.message : 'Failed to generate multiple formats'
      },
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Generate all templates in all formats (comprehensive test)
 */
export const generateAllTemplatesAllFormats = async (req: Request, res: Response) => {
  try {
    const cvData = req.body as CompleteCVData;

    // Basic validation
    if (!cvData.personalInfo?.name || !cvData.personalInfo?.title) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'personalInfo.name and personalInfo.title are required'
        },
        timestamp: new Date().toISOString()
      });
    }

    const templates = ['frank-digital', 'modern', 'classic', 'creative'] as const;
    const formats = ['html', 'pdf', 'docx'] as const;
    
    interface ComprehensiveResult {
      success: boolean;
      fileUrl?: string;
      error?: string;
      generatedAt?: string;
    }
    
    const results: Record<string, Record<string, ComprehensiveResult>> = {};

    // Generate each template in each format
    for (const template of templates) {
      results[template] = {};
      
      for (const format of formats) {
        try {
          const generationData: CompleteCVData = {
            ...cvData,
            template,
            format
          };

          const fileUrl = await cvGenerationService.generateCompleteCV(generationData);

          results[template][format] = {
            success: true,
            fileUrl,
            generatedAt: new Date().toISOString()
          };
        } catch (error) {
          console.error(`Error generating ${template} template in ${format} format:`, error);
          results[template][format] = {
            success: false,
            error: error instanceof Error ? error.message : `Failed to generate ${template}/${format}`
          };
        }
      }
    }

    // Calculate statistics
    let totalAttempts = 0;
    let successfulAttempts = 0;

    for (const template of templates) {
      for (const format of formats) {
        totalAttempts++;
        if (results[template][format].success) {
          successfulAttempts++;
        }
      }
    }

    res.json({
      success: successfulAttempts > 0,
      data: {
        results,
        summary: {
          totalCombinations: totalAttempts,
          successful: successfulAttempts,
          failed: totalAttempts - successfulAttempts,
          successRate: ((successfulAttempts / totalAttempts) * 100).toFixed(1) + '%',
          templates: templates.length,
          formats: formats.length
        }
      },
      message: `Generated ${successfulAttempts}/${totalAttempts} template/format combinations`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Comprehensive generation error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'COMPREHENSIVE_GENERATION_ERROR',
        message: error instanceof Error ? error.message : 'Failed to generate comprehensive test'
      },
      timestamp: new Date().toISOString()
    });
  }
};