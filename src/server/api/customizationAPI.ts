import type { Request, Response } from 'express';
import { COLOR_SCHEMES, FONT_OPTIONS, LAYOUT_OPTIONS, type TemplateCustomization } from '../types/templateConfig.js';

interface PreviewConfig {
  primaryColor?: string;
  accentColor?: string;
  highlightColor?: string;
  fontFamily?: string;
  fontFallback?: string[];
  layout?: string;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'relaxed';
}

/**
 * Get available customization options for templates
 */
export const getCustomizationOptions = (_req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: {
        colorSchemes: COLOR_SCHEMES,
        fontOptions: FONT_OPTIONS,
        layoutOptions: LAYOUT_OPTIONS,
        sizeOptions: [
          { id: 'small', name: 'Small', description: 'Compact size for more content' },
          { id: 'medium', name: 'Medium', description: 'Standard readable size' },
          { id: 'large', name: 'Large', description: 'Larger text for better readability' }
        ],
        spacingOptions: [
          { id: 'compact', name: 'Compact', description: 'Tight spacing for more content' },
          { id: 'normal', name: 'Normal', description: 'Balanced spacing' },
          { id: 'relaxed', name: 'Relaxed', description: 'Generous spacing for easy reading' }
        ]
      },
      message: 'Customization options retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting customization options:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'CUSTOMIZATION_OPTIONS_ERROR',
        message: 'Failed to retrieve customization options'
      },
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Preview template with customization
 */
export const previewCustomization = (req: Request, res: Response) => {
  try {
    const { templateId, customization } = req.body as {
      templateId: string;
      customization: TemplateCustomization;
    };

    // Validate template exists
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

    // Generate preview configuration
    const previewConfig = generatePreviewConfig(templateId, customization);

    res.json({
      success: true,
      data: {
        templateId,
        customization,
        previewConfig,
        cssVariables: generateCSSVariables(previewConfig)
      },
      message: 'Preview configuration generated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating preview:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'PREVIEW_ERROR',
        message: 'Failed to generate preview configuration'
      },
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Generate configuration object from customization options
 */
function generatePreviewConfig(templateId: string, customization: TemplateCustomization): PreviewConfig {
  const config: PreviewConfig = {
    fontSize: customization.fontSize || 'medium',
    spacing: customization.spacing || 'normal'
  };

  // Apply color scheme
  if (customization.colorScheme) {
    const colorScheme = COLOR_SCHEMES[templateId]?.find(cs => cs.id === customization.colorScheme);
    if (colorScheme) {
      config.primaryColor = colorScheme.primaryColor;
      config.accentColor = colorScheme.accentColor;
      if (colorScheme.highlightColor) {
        config.highlightColor = colorScheme.highlightColor;
      }
    }
  }

  // Apply custom colors (override color scheme)
  if (customization.customColors) {
    if (customization.customColors.primaryColor) {
      config.primaryColor = customization.customColors.primaryColor;
    }
    if (customization.customColors.accentColor) {
      config.accentColor = customization.customColors.accentColor;
    }
    if (customization.customColors.highlightColor) {
      config.highlightColor = customization.customColors.highlightColor;
    }
  }

  // Apply font family
  if (customization.fontFamily) {
    const fontOption = FONT_OPTIONS.find(f => f.id === customization.fontFamily);
    if (fontOption) {
      config.fontFamily = fontOption.fontFamily;
      config.fontFallback = fontOption.fallback;
    }
  }

  // Apply layout option
  if (customization.layout) {
    const layoutOption = LAYOUT_OPTIONS.find(l => l.id === customization.layout);
    if (layoutOption && layoutOption.supportedTemplates.includes(templateId)) {
      config.layout = customization.layout;
    }
  }

  return config;
}

/**
 * Generate CSS variables for frontend preview
 */
function generateCSSVariables(config: PreviewConfig): Record<string, string> {
  const variables: Record<string, string> = {};

  if (config.primaryColor) {
    variables['--primary-color'] = config.primaryColor;
  }
  if (config.accentColor) {
    variables['--accent-color'] = config.accentColor;
  }
  if (config.highlightColor) {
    variables['--highlight-color'] = config.highlightColor;
  }
  if (config.fontFamily) {
    variables['--font-family'] = `${config.fontFamily}, ${config.fontFallback?.join(', ') || 'sans-serif'}`;
  }

  // Size-based variables
  const sizeConfigs = {
    small: { fontSize: '14px', lineHeight: '1.4' },
    medium: { fontSize: '16px', lineHeight: '1.5' },
    large: { fontSize: '18px', lineHeight: '1.6' }
  };
  
  const sizeConfig = sizeConfigs[config.fontSize];
  variables['--base-font-size'] = sizeConfig.fontSize;
  variables['--line-height'] = sizeConfig.lineHeight;

  // Spacing-based variables
  const spacingConfigs = {
    compact: { sectionGap: '1.5rem', itemGap: '0.75rem' },
    normal: { sectionGap: '2rem', itemGap: '1rem' },
    relaxed: { sectionGap: '2.5rem', itemGap: '1.25rem' }
  };
  
  const spacingConfig = spacingConfigs[config.spacing];
  variables['--section-gap'] = spacingConfig.sectionGap;
  variables['--item-gap'] = spacingConfig.itemGap;

  return variables;
}