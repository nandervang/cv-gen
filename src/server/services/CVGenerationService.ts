import type { SimpleCVData, CompleteCVData } from '../types/cv.js';
import { generatePDF } from '../lib/pdf-generator.js';
import { generateFrankDigitalHTML, generateFrankDigitalDOCX } from '../templates/frank-digital.js'
import { generateModernHTML, generateModernDOCX, type ModernTemplateConfig } from '../templates/modern.js'
import { generateClassicHTML, generateClassicDOCX, type ClassicTemplateConfig } from '../templates/classic.js'
import { generateCreativeHTML, generateCreativeDOCX, type CreativeTemplateConfig } from '../templates/creative.js'
import { Packer, Document } from 'docx';

type TemplateConfig = ModernTemplateConfig | ClassicTemplateConfig | CreativeTemplateConfig;

interface StylingConfig {
  primaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
  layout?: string;
}

export class CVGenerationService {
  async generateCompleteCV(data: CompleteCVData): Promise<string> {
    console.log('DEBUG: CVGenerationService.generateCompleteCV called');
    console.log('DEBUG: data received:', JSON.stringify(data, null, 2));
    
    try {
      const format = data.format || 'pdf';
      const template = data.template || 'frank-digital';
      
      console.log('DEBUG: format:', format, 'template:', template);
      
      const templateConfig = this.getTemplateConfig(template, data.styling);
      console.log('DEBUG: templateConfig:', templateConfig);
      
      switch (format) {
        case 'html': {
          let html: string;
          
          console.log('DEBUG: Starting HTML generation for template:', template);
          
          switch (template) {
            case 'modern':
              console.log('DEBUG: About to call generateModernHTML');
              html = generateModernHTML(data, templateConfig as ModernTemplateConfig);
              console.log('DEBUG: generateModernHTML completed');
              break;
            case 'classic':
              html = generateClassicHTML(data, templateConfig as ClassicTemplateConfig);
              break;
            case 'creative':
              html = generateCreativeHTML(data, templateConfig as CreativeTemplateConfig);
              break;
            case 'frank-digital':
            default:
              html = generateFrankDigitalHTML(data);
              break;
          }
          
          console.log('DEBUG: About to create base64 string');
          const base64Html = Buffer.from(html).toString('base64');
          console.log('DEBUG: Base64 conversion completed');
          
          return `data:text/html;base64,${base64Html}`;
        }
        case 'pdf': {
          let html: string;
          
          switch (template) {
            case 'modern':
              html = generateModernHTML(data, templateConfig as ModernTemplateConfig);
              break;
            case 'classic':
              html = generateClassicHTML(data, templateConfig as ClassicTemplateConfig);
              break;
            case 'creative':
              html = generateCreativeHTML(data, templateConfig as CreativeTemplateConfig);
              break;
            case 'frank-digital':
            default:
              html = generateFrankDigitalHTML(data);
              break;
          }
          
          const pdfBuffer = await generatePDF(html);
          return `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;
        }
        case 'docx': {
          let docxDocument: Document;
          
          switch (template) {
            case 'modern':
              docxDocument = generateModernDOCX(data, templateConfig as ModernTemplateConfig);
              break;
            case 'classic':
              docxDocument = generateClassicDOCX(data, templateConfig as ClassicTemplateConfig);
              break;
            case 'creative':
              docxDocument = generateCreativeDOCX(data, templateConfig as CreativeTemplateConfig);
              break;
            case 'frank-digital':
            default:
              docxDocument = generateFrankDigitalDOCX(data);
              break;
          }
          
          try {
            const docxBuffer = await Packer.toBuffer(docxDocument);
            return `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${docxBuffer.toString('base64')}`;
          } catch (error) {
            console.error('DOCX packing error:', error);
            const fallbackBuffer = Buffer.from('Error generating DOCX document', 'utf-8');
            return `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${fallbackBuffer.toString('base64')}`;
          }
        }
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
    } catch (error) {
      console.error('Complete CV generation error:', error);
      throw new Error(`Failed to generate complete CV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  private getTemplateConfig(template: string, styling?: StylingConfig): TemplateConfig | Record<string, unknown> {
    // Don't pass undefined values to avoid template errors
    const baseConfig: Record<string, string> = {};
    
    if (styling?.primaryColor) {
      baseConfig.primaryColor = styling.primaryColor;
    }
    if (styling?.accentColor) {
      baseConfig.accentColor = styling.accentColor;
    }
    if (styling?.fontFamily) {
      baseConfig.fontFamily = styling.fontFamily;
    }
    
    switch (template) {
      case 'modern':
        return {
          ...baseConfig,
          layout: 'sidebar' as const
        } as ModernTemplateConfig;
      case 'classic':
        return {
          ...baseConfig,
          layout: 'traditional' as const
        } as ClassicTemplateConfig;
      case 'creative':
        return {
          ...baseConfig,
          layout: 'asymmetric' as const
        } as CreativeTemplateConfig;
      default:
        return baseConfig;
    }
  }
}

export const cvGenerationService = new CVGenerationService();
