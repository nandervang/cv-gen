import puppeteer from 'puppeteer';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import type { SimpleCVData } from '../types/cv';

// HTML escaping function for security
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Template-specific HTML generation
function generateModernHTML(data: SimpleCVData): string {
  const safeName = escapeHtml(data.name);
  const safeTitle = escapeHtml(data.title);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Professional CV for ${safeName}, ${safeTitle}">
    <title>CV - ${safeName}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .cv-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
        }
        .name {
            font-size: 3em;
            font-weight: 300;
            margin: 0;
            letter-spacing: 2px;
        }
        .title {
            font-size: 1.4em;
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-weight: 300;
        }
        .content {
            padding: 40px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 1.5em;
            color: #667eea;
            margin-bottom: 15px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <div class="header">
            <h1 class="name">${safeName}</h1>
            <p class="title">${safeTitle}</p>
        </div>
        <div class="content">
            <div class="section">
                <h2 class="section-title">Professional Profile</h2>
                <p>This CV was generated using the modern template. Additional sections and content can be added through the full CV management system.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}

function generateClassicHTML(data: SimpleCVData): string {
  const safeName = escapeHtml(data.name);
  const safeTitle = escapeHtml(data.title);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - ${safeName}</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            color: #000;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            background: #f9f9f9;
        }
        .cv-container {
            background: white;
            padding: 60px;
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            border-bottom: 3px double #000;
            padding-bottom: 30px;
            margin-bottom: 40px;
        }
        .name {
            font-size: 2.5em;
            font-weight: bold;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 3px;
        }
        .title {
            font-size: 1.2em;
            margin: 15px 0 0 0;
            font-style: italic;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 1.3em;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 15px;
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <div class="header">
            <h1 class="name">${safeName}</h1>
            <p class="title">${safeTitle}</p>
        </div>
        <div class="section">
            <h2 class="section-title">Professional Summary</h2>
            <p>This CV was generated using the classic template. A traditional and professional presentation suitable for conservative industries and formal applications.</p>
        </div>
    </div>
</body>
</html>`;
}

function generateCreativeHTML(data: SimpleCVData): string {
  const safeName = escapeHtml(data.name);
  const safeTitle = escapeHtml(data.title);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - ${safeName}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            min-height: 100vh;
            padding: 20px;
        }
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .cv-container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 50px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.03) 10px,
                rgba(255,255,255,0.03) 20px
            );
            animation: move 20s linear infinite;
        }
        @keyframes move {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .name {
            font-size: 3.5em;
            font-weight: 300;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            position: relative;
            z-index: 1;
        }
        .title {
            font-size: 1.4em;
            margin: 15px 0 0 0;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        .content {
            padding: 40px;
        }
        .section {
            margin-bottom: 30px;
            padding: 20px;
            border-radius: 10px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        }
        .section-title {
            font-size: 1.6em;
            color: #667eea;
            margin-bottom: 15px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <div class="header">
            <h1 class="name">${safeName}</h1>
            <p class="title">${safeTitle}</p>
        </div>
        <div class="content">
            <div class="section">
                <h2 class="section-title">Creative Profile</h2>
                <p>This CV showcases a creative and dynamic approach, perfect for design, marketing, and innovative industries. The animated background and modern styling reflect creativity and attention to detail.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}

// PDF generation using Puppeteer
async function generatePDF(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });
    
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

// DOCX generation using docx library
async function generateDOCX(data: SimpleCVData): Promise<Buffer> {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: data.name,
              bold: true,
              size: 32,
            }),
          ],
          heading: HeadingLevel.TITLE,
          spacing: {
            after: 200,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: data.title,
              italics: true,
              size: 24,
            }),
          ],
          spacing: {
            after: 400,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Professional Summary",
              bold: true,
              size: 20,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: {
            before: 200,
            after: 200,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "This CV was generated using the CV Generation API. Additional sections and detailed content can be added through the full CV management system.",
            }),
          ],
          spacing: {
            after: 200,
          },
        }),
      ],
    }],
  });

  return await Packer.toBuffer(doc);
}

// Main generation service
export class CVGenerationService {
  async generateCV(data: SimpleCVData, templateId: string, format: 'pdf' | 'docx' | 'html'): Promise<string> {
    try {
      // Generate HTML based on template
      let html: string;
      switch (templateId) {
        case 'modern':
          html = generateModernHTML(data);
          break;
        case 'classic':
          html = generateClassicHTML(data);
          break;
        case 'creative':
          html = generateCreativeHTML(data);
          break;
        default:
          html = generateModernHTML(data); // Default fallback
      }

      // Return based on format
      switch (format) {
        case 'html':
          return `data:text/html;base64,${Buffer.from(html).toString('base64')}`;
        
        case 'pdf':
          const pdfBuffer = await generatePDF(html);
          return `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;
        
        case 'docx':
          const docxBuffer = await generateDOCX(data);
          return `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${docxBuffer.toString('base64')}`;
        
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
    } catch (error) {
      console.error('CV generation error:', error);
      throw new Error(`Failed to generate CV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const cvGenerationService = new CVGenerationService();