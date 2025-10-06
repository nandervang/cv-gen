import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import type { CompleteCVData } from '../types/cv.js';

/**
 * Creative CV Template - Modern, vibrant design for creative professionals
 * Features:
 * - Colorful, dynamic layout
 * - Creative typography and spacing
 * - Visual hierarchy with icons and graphics
 * - Portfolio-oriented sections
 */

export interface CreativeTemplateConfig {
  primaryColor?: string;
  accentColor?: string;
  highlightColor?: string;
  fontFamily?: string;
  layout?: 'asymmetric' | 'grid';
}

const defaultConfig: Required<CreativeTemplateConfig> = {
  primaryColor: '#ec4899', // Pink-500
  accentColor: '#8b5cf6', // Violet-500
  highlightColor: '#f59e0b', // Amber-500
  fontFamily: 'Inter',
  layout: 'asymmetric'
};

export function generateCreativeHTML(data: CompleteCVData, config: CreativeTemplateConfig = {}): string {
  const finalConfig = { 
    ...defaultConfig, 
    ...Object.fromEntries(
      Object.entries(config).filter(([, value]) => value !== undefined)
    )
  };
  const primaryColor = finalConfig.primaryColor;
  const accentColor = finalConfig.accentColor;
  const highlightColor = finalConfig.highlightColor;
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
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            overflow-x: hidden;
        }
        
        .cv-container {
            max-width: 1100px;
            margin: 0 auto;
            background: white;
            display: grid;
            grid-template-columns: 350px 1fr;
            min-height: 100vh;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            position: relative;
        }
        
        .cv-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(90deg, ${primaryColor} 0%, ${accentColor} 50%, ${highlightColor} 100%);
        }
        
        .sidebar {
            background: linear-gradient(145deg, ${primaryColor} 0%, ${accentColor} 100%);
            color: white;
            padding: 50px 35px;
            position: relative;
            overflow: hidden;
        }
        
        .sidebar::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
            animation: float 20s infinite linear;
        }
        
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(-50px, -50px) rotate(360deg); }
        }
        
        .main-content {
            padding: 50px 45px;
            position: relative;
        }
        
        .name {
            font-size: 32px;
            font-weight: 800;
            text-align: center;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 10;
        }
        
        .title {
            font-size: 18px;
            text-align: center;
            margin-bottom: 35px;
            opacity: 0.95;
            font-weight: 400;
            position: relative;
            z-index: 10;
        }
        
        .section {
            margin-bottom: 40px;
            position: relative;
            z-index: 10;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 25px;
            padding-bottom: 10px;
            position: relative;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 3px;
            background: linear-gradient(90deg, rgba(255,255,255,0.8) 0%, transparent 100%);
            border-radius: 2px;
        }
        
        .main-section-title {
            font-size: 28px;
            font-weight: 800;
            background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 30px;
            position: relative;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .main-section-title::before {
            content: '';
            position: absolute;
            left: -20px;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 40px;
            background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%);
            border-radius: 3px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            font-size: 15px;
            opacity: 0.95;
        }
        
        .contact-icon {
            width: 24px;
            height: 24px;
            margin-right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            font-size: 12px;
        }
        
        .skill-category {
            margin-bottom: 25px;
        }
        
        .skill-category-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 12px;
            opacity: 0.95;
        }
        
        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .skill-tag {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            border: 1px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
        }
        
        .project-item, .employment-item {
            margin-bottom: 40px;
            padding: 25px;
            background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
            border-left: 5px solid ${primaryColor};
            position: relative;
            overflow: hidden;
        }
        
        .project-item::before, .employment-item::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, ${accentColor}20 0%, ${primaryColor}10 100%);
            border-radius: 50%;
            transform: translate(30px, -30px);
        }
        
        .item-title {
            font-size: 22px;
            font-weight: 700;
            color: ${primaryColor};
            margin-bottom: 8px;
            position: relative;
            z-index: 2;
        }
        
        .item-subtitle {
            font-size: 18px;
            font-weight: 500;
            color: ${accentColor};
            margin-bottom: 8px;
            position: relative;
            z-index: 2;
        }
        
        .date-range {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 15px;
            font-weight: 500;
            position: relative;
            z-index: 2;
        }
        
        .description {
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 20px;
            position: relative;
            z-index: 2;
        }
        
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
            position: relative;
            z-index: 2;
        }
        
        .tech-tag {
            background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 25px;
            font-size: 13px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }
        
        .tech-tag::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
            transition: left 0.5s ease;
        }
        
        .tech-tag:hover::before {
            left: 100%;
        }
        
        .education-item, .cert-item {
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
            border-radius: 12px;
            border-left: 4px solid ${highlightColor};
        }
        
        .summary {
            font-size: 18px;
            line-height: 1.8;
            color: #4b5563;
            margin-bottom: 35px;
            text-align: justify;
            position: relative;
            padding: 25px;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
        }
        
        .summary::before {
            content: '"';
            position: absolute;
            top: -10px;
            left: 20px;
            font-size: 60px;
            color: ${primaryColor};
            opacity: 0.3;
            font-family: serif;
        }
        
        .languages-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
        }
        
        .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .language-name {
            font-weight: 600;
            font-size: 14px;
        }
        
        .language-level {
            font-size: 13px;
            opacity: 0.9;
        }
        
        @media print {
            body {
                background: white;
            }
            
            .cv-container {
                max-width: none;
                margin: 0;
                grid-template-columns: 320px 1fr;
                box-shadow: none;
            }
            
            .sidebar {
                padding: 40px 30px;
            }
            
            .main-content {
                padding: 40px 35px;
            }
            
            .sidebar::before {
                display: none;
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
                    <div class="contact-icon">✉</div>
                    <span>${data.personalInfo.email}</span>
                </div>
                ${data.personalInfo.phone ? `
                <div class="contact-item">
                    <div class="contact-icon">📱</div>
                    <span>${data.personalInfo.phone}</span>
                </div>
                ` : ''}
                ${data.personalInfo.location ? `
                <div class="contact-item">
                    <div class="contact-icon">📍</div>
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
                        <div class="skill-tags">
                            ${skillCategory.skills.map(skill => `
                                <span class="skill-tag">${skill.name}</span>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.languages && data.languages.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Språk</h2>
                <div class="languages-grid">
                    ${data.languages.map(lang => `
                        <div class="language-item">
                            <span class="language-name">${lang.language}</span>
                            <span class="language-level">${lang.proficiency}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </aside>
        
        <main class="main-content">
            ${data.summary ? `
            <div class="section">
                <h2 class="main-section-title">Profil</h2>
                <div class="summary">${data.summary.introduction}</div>
            </div>
            ` : ''}
            
            ${data.projects && data.projects.length > 0 ? `
            <div class="section">
                <h2 class="main-section-title">Projekt</h2>
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
                <h2 class="main-section-title">Erfarenhet</h2>
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

export function generateCreativeDOCX(data: CompleteCVData, config: CreativeTemplateConfig = {}): Document {
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
              size: 36,
              color: finalConfig.primaryColor.replace('#', ''),
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
              color: finalConfig.accentColor.replace('#', ''),
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
              color: finalConfig.primaryColor.replace('#', ''),
              allCaps: true,
            }),
          ],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: `📧 ${data.personalInfo.email}`,
              size: 12,
            }),
            ...(data.personalInfo.phone ? [
              new TextRun({ text: '  📱 ', size: 12 }),
              new TextRun({
                text: data.personalInfo.phone,
                size: 12,
              }),
            ] : []),
            ...(data.personalInfo.location ? [
              new TextRun({ text: '  📍 ', size: 12 }),
              new TextRun({
                text: data.personalInfo.location,
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
                text: 'PROFIL',
                bold: true,
                size: 16,
                color: finalConfig.primaryColor.replace('#', ''),
                allCaps: true,
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
                text: 'PROJEKT',
                bold: true,
                size: 16,
                color: finalConfig.primaryColor.replace('#', ''),
                allCaps: true,
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
                  color: finalConfig.primaryColor.replace('#', ''),
                }),
              ],
              spacing: { before: 120, after: 60 },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `${project.type} | ${project.period}`,
                  size: 12,
                  color: finalConfig.accentColor.replace('#', ''),
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
                    text: `🔧 ${project.technologies.join(' • ')}`,
                    size: 11,
                    color: finalConfig.highlightColor.replace('#', ''),
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
                color: finalConfig.primaryColor.replace('#', ''),
                allCaps: true,
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 },
          }),
          
          ...data.education.flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `🎓 ${edu.degree}`,
                  bold: true,
                  size: 14,
                  color: finalConfig.primaryColor.replace('#', ''),
                }),
              ],
              spacing: { before: 120, after: 60 },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.institution} | ${edu.period}`,
                  size: 12,
                  color: finalConfig.accentColor.replace('#', ''),
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