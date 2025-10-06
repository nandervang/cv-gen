import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import type { CompleteCVData } from '../types/cv.js';

/**
 * Modern CV Template - Clean, minimalist design with left sidebar
 * Features:
 * - Left sidebar with contact info and skills
 * - Main content area with experience and education
 * - Clean typography with primary color accent
 * - Professional spacing and layout
 */

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

// Helper function to safely convert hex colors for DOCX
function safeColorConvert(color: string | undefined): string {
  if (!color) return defaultConfig.primaryColor.replace('#', '');
  return color.replace('#', '');
}

export function generateModernHTML(data: CompleteCVData, config: ModernTemplateConfig = {}): string {
  const finalConfig = { 
    ...defaultConfig, 
    ...Object.fromEntries(
      Object.entries(config).filter(([, value]) => value !== undefined)
    )
  };
  const primaryColor = finalConfig.primaryColor;
  const accentColor = finalConfig.accentColor;
  const fontFamily = finalConfig.fontFamily;

  return `
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name} - CV</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: '${fontFamily}', sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
        }
        
        .cv-container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            display: grid;
            grid-template-columns: 300px 1fr;
            min-height: 100vh;
        }
        
        .sidebar {
            background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%);
            color: white;
            padding: 40px 30px;
        }
        
        .main-content {
            padding: 40px;
        }
        
        .name {
            font-size: 28px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 10px;
        }
        
        .title {
            font-size: 16px;
            text-align: center;
            margin-bottom: 30px;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .section {
            margin-bottom: 35px;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            padding-bottom: 8px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .main-section-title {
            font-size: 24px;
            font-weight: 700;
            color: ${primaryColor};
            margin-bottom: 25px;
            padding-bottom: 10px;
            border-bottom: 3px solid ${primaryColor};
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-size: 14px;
        }
        
        .contact-icon {
            width: 20px;
            margin-right: 12px;
            opacity: 0.8;
        }
        
        .skill-category {
            margin-bottom: 20px;
        }
        
        .skill-category-title {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
            opacity: 0.9;
        }
        
        .skill-list {
            list-style: none;
        }
        
        .skill-item {
            font-size: 13px;
            margin-bottom: 6px;
            padding-left: 15px;
            position: relative;
        }
        
        .skill-item:before {
            content: '•';
            position: absolute;
            left: 0;
            opacity: 0.7;
        }
        
        .project-item, .employment-item {
            margin-bottom: 35px;
            padding-bottom: 25px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .project-item:last-child, .employment-item:last-child {
            border-bottom: none;
        }
        
        .item-title {
            font-size: 20px;
            font-weight: 600;
            color: ${primaryColor};
            margin-bottom: 5px;
        }
        
        .item-subtitle {
            font-size: 16px;
            font-weight: 500;
            color: ${accentColor};
            margin-bottom: 5px;
        }
        
        .date-range {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 15px;
        }
        
        .description {
            font-size: 15px;
            line-height: 1.7;
            margin-bottom: 15px;
        }
        
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        
        .tech-tag {
            background: ${primaryColor};
            color: white;
            padding: 4px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .education-item, .cert-item {
            margin-bottom: 25px;
        }
        
        .summary {
            font-size: 16px;
            line-height: 1.8;
            color: #4b5563;
            margin-bottom: 30px;
            text-align: justify;
        }
        
        @media print {
            .cv-container {
                max-width: none;
                margin: 0;
                grid-template-columns: 280px 1fr;
            }
            
            .sidebar {
                padding: 30px 25px;
            }
            
            .main-content {
                padding: 30px;
            }
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <aside class="sidebar">
            <div class="section">
                <h1 class="name">${data.personalInfo.name}</h1>
                <p class="title">${data.personalInfo.title}</p>
            </div>
            
            <div class="section">
                <h2 class="section-title">Kontakt</h2>
                <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <span>${data.personalInfo.email}</span>
                </div>
                ${data.personalInfo.phone ? `
                <div class="contact-item">
                    <span class="contact-icon">📱</span>
                    <span>${data.personalInfo.phone}</span>
                </div>
                ` : ''}
                ${data.personalInfo.location ? `
                <div class="contact-item">
                    <span class="contact-icon">📍</span>
                    <span>${data.personalInfo.location}</span>
                </div>
                ` : ''}
            </div>
            
            ${data.competencies && data.competencies.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Kompetenser</h2>
                ${data.competencies.map(skillCategory => `
                    <div class="skill-category">
                        <h3 class="skill-category-title">${skillCategory.category}</h3>
                        <ul class="skill-list">
                            ${skillCategory.skills.map(skill => `
                                <li class="skill-item">${skill.name}</li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.languages && data.languages.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Språk</h2>
                <ul class="skill-list">
                    ${data.languages.map(lang => `
                        <li class="skill-item">${lang.language} - ${lang.proficiency}</li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}
        </aside>
        
        <main class="main-content">
            ${data.summary ? `
            <div class="section">
                <h2 class="main-section-title">Professionell Sammanfattning</h2>
                <p class="summary">${data.summary.introduction}</p>
                ${data.summary.highlights && data.summary.highlights.length > 0 ? `
                    <ul class="skill-list">
                        ${data.summary.highlights.map(highlight => `
                            <li class="skill-item">${highlight}</li>
                        `).join('')}
                    </ul>
                ` : ''}
            </div>
            ` : ''}
            
            ${data.projects && data.projects.length > 0 ? `
            <div class="section">
                <h2 class="main-section-title">Projekt och Uppdrag</h2>
                ${data.projects.map(project => `
                    <div class="project-item">
                        <h3 class="item-title">${project.title}</h3>
                        <p class="item-subtitle">${project.type}</p>
                        <p class="date-range">${project.period}</p>
                        <p class="description">${project.description}</p>
                        ${project.technologies && project.technologies.length > 0 ? `
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `
                                    <span class="tech-tag">${tech}</span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.employment && data.employment.length > 0 ? `
            <div class="section">
                <h2 class="main-section-title">Anställningshistorik</h2>
                ${data.employment.map(job => `
                    <div class="employment-item">
                        <h3 class="item-title">${job.position}</h3>
                        <p class="item-subtitle">${job.company}</p>
                        <p class="date-range">${job.period}</p>
                        <p class="description">${job.description}</p>
                        ${job.technologies && job.technologies.length > 0 ? `
                            <div class="tech-tags">
                                ${job.technologies.map(tech => `
                                    <span class="tech-tag">${tech}</span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.education && data.education.length > 0 ? `
            <div class="section">
                <h2 class="main-section-title">Utbildning</h2>
                ${data.education.map(edu => `
                    <div class="education-item">
                        <h3 class="item-title">${edu.degree}</h3>
                        <p class="item-subtitle">${edu.institution}</p>
                        <p class="date-range">${edu.period}</p>
                        ${edu.specialization ? `<p class="description">${edu.specialization}</p>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.certifications && data.certifications.length > 0 ? `
            <div class="section">
                <h2 class="main-section-title">Certifieringar</h2>
                ${data.certifications.map(cert => `
                    <div class="cert-item">
                        <h3 class="item-title">${cert.title}</h3>
                        <p class="item-subtitle">${cert.issuer}</p>
                        <p class="date-range">${cert.year}</p>
                        ${cert.description ? `<p class="description">${cert.description}</p>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </main>
    </div>
</body>
</html>
  `;
}

export function generateModernDOCX(data: CompleteCVData, config: ModernTemplateConfig = {}): Document {
  const finalConfig = { 
    ...defaultConfig, 
    ...Object.fromEntries(
      Object.entries(config).filter(([, value]) => value !== undefined)
    )
  };
  
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
              color: safeColorConvert(finalConfig.primaryColor),
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: data.personalInfo.title || '',
              size: 20,
              color: safeColorConvert(finalConfig.accentColor),
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
        }),
        
        // Contact Information
        new Paragraph({
          children: [
            new TextRun({
              text: 'KONTAKT',
              bold: true,
              size: 16,
              color: safeColorConvert(finalConfig.primaryColor),
            }),
          ],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: `Email: ${data.personalInfo.email}`,
              size: 12,
            }),
            ...(data.personalInfo.phone ? [
              new TextRun({ text: ' | ', size: 12 }),
              new TextRun({
                text: `Telefon: ${data.personalInfo.phone}`,
                size: 12,
              }),
            ] : []),
            ...(data.personalInfo.location ? [
              new TextRun({ text: ' | ', size: 12 }),
              new TextRun({
                text: `Plats: ${data.personalInfo.location}`,
                size: 12,
              }),
            ] : []),
          ],
          spacing: { after: 240 },
        }),
        
        // Professional Summary
        ...(data.summary ? [
          new Paragraph({
            children: [
              new TextRun({
                text: 'PROFESSIONELL SAMMANFATTNING',
                bold: true,
                size: 16,
                color: safeColorConvert(finalConfig.primaryColor),
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: data.summary.introduction,
                size: 12,
              }),
            ],
            spacing: { after: 240 },
          }),
        ] : []),
        
        // Projects
        ...(data.projects && data.projects.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: 'PROJEKT OCH UPPDRAG',
                bold: true,
                size: 16,
                color: safeColorConvert(finalConfig.primaryColor),
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 },
          }),
          
          ...data.projects.flatMap(project => [
            new Paragraph({
              children: [
                new TextRun({
                  text: project.title,
                  bold: true,
                  size: 14,
                  color: safeColorConvert(finalConfig.primaryColor),
                }),
              ],
              spacing: { before: 120, after: 60 },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `${project.type} | ${project.period}`,
                  size: 12,
                  color: safeColorConvert(finalConfig.accentColor),
                }),
              ],
              spacing: { after: 120 },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: project.description,
                  size: 12,
                }),
              ],
              spacing: { after: 120 },
            }),
            
            ...(project.technologies && project.technologies.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Teknologier: ${project.technologies.join(', ')}`,
                    size: 11,
                    italics: true,
                  }),
                ],
                spacing: { after: 120 },
              }),
            ] : []),
          ]),
        ] : []),
        
        // Education
        ...(data.education && data.education.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: 'UTBILDNING',
                bold: true,
                size: 16,
                color: safeColorConvert(finalConfig.primaryColor),
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 },
          }),
          
          ...data.education.flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.degree,
                  bold: true,
                  size: 14,
                  color: safeColorConvert(finalConfig.primaryColor),
                }),
              ],
              spacing: { before: 120, after: 60 },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.institution} | ${edu.period}`,
                  size: 12,
                  color: safeColorConvert(finalConfig.accentColor),
                }),
              ],
              spacing: { after: 120 },
            }),
          ]),
        ] : []),
      ],
    }],
  });
  
  return doc;
}