import type { Request, Response } from 'express';
import { generateSampleCVData, generateLightweightSampleData } from '../utils/sampleData.js';
import { cvGenerationService } from '../services/CVGenerationService.js';
import type { CompleteCVData } from '../types/cv.js';

/**
 * Generate template preview with sample data
 */
export const generateTemplatePreview = async (req: Request, res: Response) => {
  try {
    const { templateId, format = 'html', lightweight = false, customization } = req.body;

    // Validate template
    const validTemplates = ['frank-digital', 'modern', 'classic', 'creative'];
    if (!validTemplates.includes(templateId)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_TEMPLATE',
          message: `Template '${templateId}' not found`
        },
        timestamp: new Date().toISOString()
      });
    }

    // Validate format
    const validFormats = ['html', 'pdf', 'docx'];
    if (!validFormats.includes(format)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_FORMAT',
          message: `Format '${format}' not supported`
        },
        timestamp: new Date().toISOString()
      });
    }

    // Generate sample data
    const sampleData = lightweight 
      ? generateLightweightSampleData() 
      : generateSampleCVData();

    // Prepare CV data for generation
    const cvData: CompleteCVData = {
      ...sampleData as CompleteCVData,
      template: templateId,
      format: format as 'html' | 'pdf' | 'docx'
    };

    // Apply customization if provided
    if (customization) {
      cvData.styling = {
        primaryColor: customization.customColors?.primaryColor,
        accentColor: customization.customColors?.accentColor,
        highlightColor: customization.customColors?.highlightColor,
        fontFamily: customization.fontFamily,
        fontSize: customization.fontSize,
        spacing: customization.spacing,
        layout: customization.layout,
        colorScheme: customization.colorScheme
      };

      // Filter out undefined values
      cvData.styling = Object.fromEntries(
        Object.entries(cvData.styling).filter(([, value]) => value !== undefined)
      ) as typeof cvData.styling;
    }

    // Generate preview
    const fileUrl = await cvGenerationService.generateCompleteCV(cvData);

    res.json({
      success: true,
      data: {
        fileUrl,
        templateId,
        format,
        lightweight,
        customization: customization || null,
        generatedAt: new Date().toISOString()
      },
      message: 'Template preview generated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Template preview generation error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'PREVIEW_GENERATION_ERROR',
        message: error instanceof Error ? error.message : 'Failed to generate template preview'
      },
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Generate previews for all templates
 */
export const generateAllTemplatePreviews = async (req: Request, res: Response) => {
  try {
    const { format = 'html', lightweight = true } = req.body;

    const templates = ['frank-digital', 'modern', 'classic', 'creative'] as const;
    
    interface PreviewResult {
      success: boolean;
      fileUrl?: string;
      generatedAt?: string;
      error?: string;
    }
    
    const previews: Record<string, PreviewResult> = {};

    // Generate preview for each template
    for (const templateId of templates) {
      try {
        const sampleData = lightweight 
          ? generateLightweightSampleData() 
          : generateSampleCVData();

        const cvData: CompleteCVData = {
          ...sampleData as CompleteCVData,
          template: templateId,
          format: format as 'html' | 'pdf' | 'docx'
        };

        const fileUrl = await cvGenerationService.generateCompleteCV(cvData);

        previews[templateId] = {
          success: true,
          fileUrl,
          generatedAt: new Date().toISOString()
        };
      } catch (error) {
        previews[templateId] = {
          success: false,
          error: error instanceof Error ? error.message : 'Generation failed'
        };
      }
    }

    res.json({
      success: true,
      data: {
        previews,
        format,
        lightweight,
        templatesCount: templates.length,
        successCount: Object.values(previews).filter((p: PreviewResult) => p.success).length
      },
      message: 'Batch template previews generated',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Batch preview generation error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'BATCH_PREVIEW_ERROR',
        message: error instanceof Error ? error.message : 'Failed to generate batch previews'
      },
      timestamp: new Date().toISOString()
    });
  }
};