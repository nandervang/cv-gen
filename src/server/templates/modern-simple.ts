import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import type { CompleteCVData } from '../types/cv.js';

export interface ModernTemplateConfig {
  primaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
  layout?: 'sidebar' | 'stacked';
}

const defaultConfig: Required<ModernTemplateConfig> = {
  primaryColor: '#2563eb', // Blue-600
  accentColor: '#64748b', // Slate-500
  fontFamily: 'Calibri',
  layout: 'sidebar'
};

export function generateModernHTML(data: CompleteCVData, config: ModernTemplateConfig = {}): string {
  return `
<!DOCTYPE html>
<html>
<head><title>Test CV</title></head>
<body>
    <h1>${data.personalInfo.name}</h1>
    <h2>${data.personalInfo.title}</h2>
    <p>This is a test template</p>
</body>
</html>
  `;
}

export function generateModernDOCX(data: CompleteCVData, config: ModernTemplateConfig = {}): Document {
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 720,
            right: 720,
            bottom: 720,
            left: 720,
          },
        },
      },
      children: [
        // Header with name and title
        new Paragraph({
          children: [
            new TextRun({
              text: data.personalInfo.name,
              bold: true,
              size: 32,
              color: '2563eb',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: data.personalInfo.title,
              size: 24,
              color: '64748b',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
        }),
        
        // Contact Information
        new Paragraph({
          children: [
            new TextRun({
              text: "Contact Information",
              bold: true,
              size: 20,
              color: '2563eb',
            }),
          ],
          spacing: { before: 240, after: 120 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: `Email: ${data.personalInfo.email}`,
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),
        
        ...(data.personalInfo.phone ? [
          new Paragraph({
            children: [
              new TextRun({
                text: `Phone: ${data.personalInfo.phone}`,
                size: 20,
              }),
            ],
            spacing: { after: 60 },
          }),
        ] : []),
        
        ...(data.personalInfo.location ? [
          new Paragraph({
            children: [
              new TextRun({
                text: `Location: ${data.personalInfo.location}`,
                size: 20,
              }),
            ],
            spacing: { after: 60 },
          }),
        ] : []),
        
        // Summary section
        ...(data.summary ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "Summary",
                bold: true,
                size: 20,
                color: '2563eb',
              }),
            ],
            spacing: { before: 240, after: 120 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: data.summary.introduction,
                size: 20,
              }),
            ],
            spacing: { after: 120 },
          }),
        ] : []),
      ],
    }],
  });

  return doc;
}