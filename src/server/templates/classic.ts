import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import type { CompleteCVData } from '../types/cv.js';

/**
 * Classic CV Template - Traditional, formal design
 * Features:
 * - Traditional single-column layout
 * - Formal typography with serif fonts
 * - Conservative color scheme
 * - Professional table layouts
 */

export interface ClassicTemplateConfig {
  primaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
  serifFont?: string;
}

const defaultConfig: Required<ClassicTemplateConfig> = {
  primaryColor: '#1f2937', // Gray-800
  accentColor: '#4b5563', // Gray-600
  fontFamily: 'Georgia',
  serifFont: 'Times New Roman'
};

export function generateClassicHTML(data: CompleteCVData, config: ClassicTemplateConfig = {}): string {
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
            font-family: '${fontFamily}', serif;
            line-height: 1.7;
            color: ${primaryColor};
            background: #fff;
            max-width: 800px;
            margin: 0 auto;
            padding: 60px 40px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 50px;
            padding-bottom: 30px;
            border-bottom: 3px double ${primaryColor};
        }
        
        .name {
            font-size: 36px;
            font-weight: 700;
            color: ${primaryColor};
            margin-bottom: 8px;
            font-family: '${finalConfig.serifFont}', serif;
            letter-spacing: 1px;
        }
        
        .title {
            font-size: 18px;
            color: ${accentColor};
            margin-bottom: 20px;
            font-style: italic;
            font-weight: 400;
        }
        
        .contact {
            font-size: 14px;
            color: ${accentColor};
            line-height: 1.5;
        }
        
        .contact-line {
            margin-bottom: 4px;
        }
        
        .section {
            margin-bottom: 45px;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: 700;
            color: ${primaryColor};
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-align: center;
            position: relative;
            padding-bottom: 8px;
        }
        
        .section-title:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 2px;
            background: ${primaryColor};
        }
        
        .summary {
            font-size: 16px;
            line-height: 1.8;
            color: ${primaryColor};
            text-align: justify;
            margin-bottom: 20px;
            font-style: italic;
        }
        
        .content-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        
        .content-table td {
            padding: 15px 0;
            border-bottom: 1px solid #e5e7eb;
            vertical-align: top;
        }
        
        .date-column {
            width: 150px;
            font-weight: 600;
            color: ${accentColor};
            font-size: 14px;
            text-align: right;
            padding-right: 20px;
        }
        
        .content-column {
            color: ${primaryColor};
        }
        
        .item-title {
            font-size: 18px;
            font-weight: 600;
            color: ${primaryColor};
            margin-bottom: 4px;
        }
        
        .item-subtitle {
            font-size: 16px;
            color: ${accentColor};
            margin-bottom: 8px;
            font-style: italic;
        }
        
        .description {
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 10px;
        }
        
        .tech-list {
            font-size: 13px;
            color: ${accentColor};
            font-style: italic;
        }
        
        .skills-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
        }
        
        .skill-category {
            margin-bottom: 25px;
        }
        
        .skill-category-title {
            font-size: 16px;
            font-weight: 600;
            color: ${primaryColor};
            margin-bottom: 12px;
            text-decoration: underline;
        }
        
        .skill-list {
            list-style: none;
            padding-left: 0;
        }
        
        .skill-item {
            font-size: 14px;
            margin-bottom: 6px;
            padding-left: 20px;
            position: relative;
            color: ${accentColor};
        }
        
        .skill-item:before {
            content: '•';
            position: absolute;
            left: 0;
            color: ${primaryColor};
            font-weight: bold;
        }
        
        .languages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
        }
        
        .language-item {
            text-align: center;
            padding: 15px;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
        }
        
        .language-name {
            font-weight: 600;
            color: ${primaryColor};
            margin-bottom: 5px;
        }
        
        .language-level {
            font-size: 14px;
            color: ${accentColor};
            font-style: italic;
        }
        
        @media print {
            body {
                padding: 40px 30px;
                font-size: 12px;
            }
            
            .section {
                margin-bottom: 30px;
                page-break-inside: avoid;
            }
            
            .content-table {
                margin-bottom: 20px;
            }
        }
        
        @page {
            size: A4;
            margin: 25mm;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="name">${data.personalInfo.name}</h1>
        <p class="title">${data.personalInfo.title}</p>
        <div class="contact">
            <div class="contact-line">${data.personalInfo.email}</div>
            ${data.personalInfo.phone ? `<div class="contact-line">${data.personalInfo.phone}</div>` : ''}
            ${data.personalInfo.location ? `<div class="contact-line">${data.personalInfo.location}</div>` : ''}
        </div>
    </div>

    ${data.summary ? `
    <div class="section">
        <h2 class="section-title">Professionell Sammanfattning</h2>
        <p class="summary">${data.summary.introduction}</p>
        ${data.summary.highlights && data.summary.highlights.length > 0 ? `
            <ul class="skill-list" style="margin-top: 20px;">
                ${data.summary.highlights.map(highlight => `
                    <li class="skill-item">${highlight}</li>
                `).join('')}
            </ul>
        ` : ''}
    </div>
    ` : ''}

    ${data.projects && data.projects.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Projekt och Uppdrag</h2>
        <table class="content-table">
            ${data.projects.map(project => `
                <tr>
                    <td class="date-column">${project.period}</td>
                    <td class="content-column">
                        <div class="item-title">${project.title}</div>
                        <div class="item-subtitle">${project.type}</div>
                        <div class="description">${project.description}</div>
                        ${project.technologies && project.technologies.length > 0 ? `
                            <div class="tech-list">Teknologier: ${project.technologies.join(', ')}</div>
                        ` : ''}
                    </td>
                </tr>
            `).join('')}
        </table>
    </div>
    ` : ''}

    ${data.employment && data.employment.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Anställningshistorik</h2>
        <table class="content-table">
            ${data.employment.map(job => `
                <tr>
                    <td class="date-column">${job.period}</td>
                    <td class="content-column">
                        <div class="item-title">${job.position}</div>
                        <div class="item-subtitle">${job.company}</div>
                        <div class="description">${job.description}</div>
                        ${job.technologies && job.technologies.length > 0 ? `
                            <div class="tech-list">Teknologier: ${job.technologies.join(', ')}</div>
                        ` : ''}
                    </td>
                </tr>
            `).join('')}
        </table>
    </div>
    ` : ''}

    ${data.education && data.education.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Utbildning</h2>
        <table class="content-table">
            ${data.education.map(edu => `
                <tr>
                    <td class="date-column">${edu.period}</td>
                    <td class="content-column">
                        <div class="item-title">${edu.degree}</div>
                        <div class="item-subtitle">${edu.institution}</div>
                        ${edu.specialization ? `<div class="description">${edu.specialization}</div>` : ''}
                    </td>
                </tr>
            `).join('')}
        </table>
    </div>
    ` : ''}

    ${data.certifications && data.certifications.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Certifieringar</h2>
        <table class="content-table">
            ${data.certifications.map(cert => `
                <tr>
                    <td class="date-column">${cert.year}</td>
                    <td class="content-column">
                        <div class="item-title">${cert.title}</div>
                        <div class="item-subtitle">${cert.issuer}</div>
                        ${cert.description ? `<div class="description">${cert.description}</div>` : ''}
                    </td>
                </tr>
            `).join('')}
        </table>
    </div>
    ` : ''}

    ${data.competencies && data.competencies.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Kompetenser</h2>
        <div class="skills-container">
            ${data.competencies.map(category => `
                <div class="skill-category">
                    <h3 class="skill-category-title">${category.category}</h3>
                    <ul class="skill-list">
                        ${category.skills.map(skill => `
                            <li class="skill-item">${skill.name}</li>
                        `).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    </div>
    ` : ''}

    ${data.languages && data.languages.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Språk</h2>
        <div class="languages-grid">
            ${data.languages.map(lang => `
                <div class="language-item">
                    <div class="language-name">${lang.language}</div>
                    <div class="language-level">${lang.proficiency}</div>
                </div>
            `).join('')}
        </div>
    </div>
    ` : ''}

</body>
</html>
  `;
}

export function generateClassicDOCX(data: CompleteCVData, config: ClassicTemplateConfig = {}): Document {
  const finalConfig = { 
    ...defaultConfig, 
    ...Object.fromEntries(
      Object.entries(config).filter(([, value]) => value !== undefined)
    )
  };
  
  const children: Paragraph[] = [];
  
  // Header with name and title
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.personalInfo.name,
          bold: true,
          size: 32,
          color: finalConfig.primaryColor.replace('#', ''),
          font: finalConfig.serifFont,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
    }),
    
    new Paragraph({
      children: [
        new TextRun({
          text: data.personalInfo.title || '',
          size: 18,
          color: finalConfig.accentColor.replace('#', ''),
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
    }),
    
    // Contact Information
    new Paragraph({
      children: [
        new TextRun({
          text: data.personalInfo.email,
          size: 12,
        }),
        ...(data.personalInfo.phone ? [
          new TextRun({ text: ' • ', size: 12 }),
          new TextRun({
            text: data.personalInfo.phone,
            size: 12,
          }),
        ] : []),
        ...(data.personalInfo.location ? [
          new TextRun({ text: ' • ', size: 12 }),
          new TextRun({
            text: data.personalInfo.location,
            size: 12,
          }),
        ] : []),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 360 },
    })
  );
  
  // Professional Summary
  if (data.summary) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'PROFESSIONELL SAMMANFATTNING',
            bold: true,
            size: 16,
            color: finalConfig.primaryColor.replace('#', ''),
            allCaps: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
      }),
      
      new Paragraph({
        children: [
          new TextRun({
            text: data.summary.introduction,
            size: 12,
            italics: true,
          }),
        ],
        spacing: { after: 120 },
      })
    );
    
    // Add highlights if present
    if (data.summary.highlights && data.summary.highlights.length > 0) {
      data.summary.highlights.forEach(highlight => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${highlight}`,
                size: 11,
                color: finalConfig.accentColor.replace('#', ''),
              }),
            ],
            spacing: { after: 60 },
          })
        );
      });
    }
  }
  
  // Projects
  if (data.projects && data.projects.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'PROJEKT OCH UPPDRAG',
            bold: true,
            size: 16,
            color: finalConfig.primaryColor.replace('#', ''),
            allCaps: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
      })
    );
    
    // Add projects as formatted paragraphs instead of table for better formatting
    data.projects.forEach(project => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${project.period}:  `,
              size: 12,
              bold: true,
              color: finalConfig.accentColor.replace('#', ''),
            }),
            new TextRun({
              text: project.title,
              size: 14,
              bold: true,
              color: finalConfig.primaryColor.replace('#', ''),
            }),
          ],
          spacing: { before: 120, after: 60 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: project.type,
              size: 12,
              italics: true,
              color: finalConfig.accentColor.replace('#', ''),
            }),
          ],
          spacing: { after: 60 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: project.description,
              size: 12,
            }),
          ],
          spacing: { after: 60 },
        })
      );
      
      if (project.technologies && project.technologies.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Teknologier: ${project.technologies.join(', ')}`,
                size: 11,
                italics: true,
                color: finalConfig.accentColor.replace('#', ''),
              }),
            ],
            spacing: { after: 120 },
          })
        );
      }
    });
  }
  
  // Employment
  if (data.employment && data.employment.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'ANSTÄLLNINGSHISTORIK',
            bold: true,
            size: 16,
            color: finalConfig.primaryColor.replace('#', ''),
            allCaps: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
      })
    );
    
    data.employment.forEach(job => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${job.period}:  `,
              size: 12,
              bold: true,
              color: finalConfig.accentColor.replace('#', ''),
            }),
            new TextRun({
              text: job.position,
              size: 14,
              bold: true,
              color: finalConfig.primaryColor.replace('#', ''),
            }),
          ],
          spacing: { before: 120, after: 60 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: job.company,
              size: 12,
              italics: true,
              color: finalConfig.accentColor.replace('#', ''),
            }),
          ],
          spacing: { after: 60 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: job.description,
              size: 12,
            }),
          ],
          spacing: { after: 60 },
        })
      );
      
      if (job.technologies && job.technologies.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Teknologier: ${job.technologies.join(', ')}`,
                size: 11,
                italics: true,
                color: finalConfig.accentColor.replace('#', ''),
              }),
            ],
            spacing: { after: 120 },
          })
        );
      }
    });
  }
  
  // Education
  if (data.education && data.education.length > 0) {
    children.push(
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
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
      })
    );
    
    data.education.forEach(edu => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.period}:  `,
              size: 12,
              bold: true,
              color: finalConfig.accentColor.replace('#', ''),
            }),
            new TextRun({
              text: edu.degree,
              size: 12,
              bold: true,
              color: finalConfig.primaryColor.replace('#', ''),
            }),
            new TextRun({
              text: ` - ${edu.institution}`,
              size: 12,
              italics: true,
              color: finalConfig.accentColor.replace('#', ''),
            }),
          ],
          spacing: { after: 120 },
        })
      );
      
      if (edu.specialization) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: edu.specialization,
                size: 11,
                italics: true,
              }),
            ],
            spacing: { after: 60 },
          })
        );
      }
    });
  }
  
  // Certifications
  if (data.certifications && data.certifications.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'CERTIFIERINGAR',
            bold: true,
            size: 16,
            color: finalConfig.primaryColor.replace('#', ''),
            allCaps: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
      })
    );
    
    data.certifications.forEach(cert => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${cert.year}:  `,
              size: 12,
              bold: true,
              color: finalConfig.accentColor.replace('#', ''),
            }),
            new TextRun({
              text: cert.title,
              size: 12,
              bold: true,
              color: finalConfig.primaryColor.replace('#', ''),
            }),
            new TextRun({
              text: ` - ${cert.issuer}`,
              size: 12,
              italics: true,
              color: finalConfig.accentColor.replace('#', ''),
            }),
          ],
          spacing: { after: cert.description ? 60 : 120 },
        })
      );
      
      if (cert.description) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cert.description,
                size: 11,
                italics: true,
              }),
            ],
            spacing: { after: 120 },
          })
        );
      }
    });
  }
  
  // Competencies
  if (data.competencies && data.competencies.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'KOMPETENSER',
            bold: true,
            size: 16,
            color: finalConfig.primaryColor.replace('#', ''),
            allCaps: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
      })
    );
    
    data.competencies.forEach(category => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: category.category,
              size: 14,
              bold: true,
              color: finalConfig.primaryColor.replace('#', ''),
            }),
          ],
          spacing: { before: 120, after: 60 },
        })
      );
      
      category.skills.forEach(skill => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${skill.name}`,
                size: 11,
                color: finalConfig.accentColor.replace('#', ''),
              }),
            ],
            spacing: { after: 40 },
          })
        );
      });
    });
  }
  
  // Languages
  if (data.languages && data.languages.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'SPRÅK',
            bold: true,
            size: 16,
            color: finalConfig.primaryColor.replace('#', ''),
            allCaps: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
      })
    );
    
    data.languages.forEach(lang => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${lang.language}: `,
              size: 12,
              bold: true,
              color: finalConfig.primaryColor.replace('#', ''),
            }),
            new TextRun({
              text: lang.proficiency,
              size: 12,
              italics: true,
              color: finalConfig.accentColor.replace('#', ''),
            }),
          ],
          spacing: { after: 80 },
        })
      );
    });
  }
  
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
      children,
    }],
  });
  
  return doc;
}