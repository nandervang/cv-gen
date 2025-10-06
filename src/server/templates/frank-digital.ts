import type { CompleteCVData } from '../types/cv.js';
import { Document, Paragraph, TextRun, AlignmentType } from 'docx';

/**
 * Frank Digital CV Template
 * Based on the Frank_Digital_AB_Niklas_Andervang_CV_2025.pdf design
 * Features: Single column, purple accents, professional layout, technology tags
 */

export function generateFrankDigitalHTML(data: CompleteCVData): string {
  const primaryColor = data.styling?.primaryColor || '#6366f1';
  const fontFamily = data.styling?.fontFamily || 'Inter, system-ui, sans-serif';

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
            font-family: ${fontFamily};
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: white;
        }

        .header {
            text-align: right;
            margin-bottom: 40px;
            position: relative;
        }

        .company-brand {
            font-size: 48px;
            font-weight: 300;
            color: #333;
            margin-bottom: 20px;
        }

        .contact-info {
            font-size: 14px;
            color: #666;
            line-height: 1.4;
        }

        .profile-section {
            display: flex;
            align-items: flex-start;
            gap: 30px;
            margin-bottom: 40px;
        }

        .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            flex-shrink: 0;
        }

        .profile-content {
            flex: 1;
        }

        .profile-name {
            font-size: 36px;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
        }

        .profile-title {
            font-size: 18px;
            color: ${primaryColor};
            margin-bottom: 20px;
            font-weight: 500;
        }

        .profile-intro {
            font-size: 14px;
            line-height: 1.6;
            color: #555;
            margin-bottom: 20px;
        }

        .section {
            margin-bottom: 40px;
        }

        .section-title {
            font-size: 24px;
            color: ${primaryColor};
            margin-bottom: 20px;
            padding-bottom: 8px;
            border-bottom: 3px dotted ${primaryColor};
            font-weight: 600;
        }

        .roles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .role-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid ${primaryColor};
        }

        .role-title {
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
        }

        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .skill-tag {
            background: ${primaryColor};
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
        }

        .project-item {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }

        .project-item:last-child {
            border-bottom: none;
        }

        .project-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
        }

        .project-period {
            font-size: 14px;
            color: #666;
            white-space: nowrap;
            margin-left: 20px;
        }

        .project-type {
            font-size: 14px;
            color: ${primaryColor};
            font-weight: 500;
            margin-bottom: 5px;
        }

        .project-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
        }

        .project-description {
            font-size: 14px;
            line-height: 1.6;
            color: #555;
            margin-bottom: 15px;
        }

        .technology-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }

        .tech-tag {
            background: #f1f5f9;
            color: ${primaryColor};
            padding: 3px 10px;
            border-radius: 16px;
            font-size: 11px;
            font-weight: 500;
            border: 1px solid #e2e8f0;
        }

        .education-item, .certification-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #f0f0f0;
        }

        .education-content, .certification-content {
            flex: 1;
        }

        .education-degree, .certification-title {
            font-weight: 600;
            color: #333;
            margin-bottom: 4px;
        }

        .education-institution, .certification-issuer {
            font-size: 14px;
            color: #666;
        }

        .education-period, .certification-year {
            font-size: 14px;
            color: #666;
            white-space: nowrap;
            margin-left: 20px;
        }

        .competency-category {
            margin-bottom: 25px;
        }

        .competency-title {
            font-size: 16px;
            font-weight: 600;
            color: #333;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .competency-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: ${primaryColor};
            color: white;
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .competency-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .competency-skill {
            background: #f8f9fa;
            color: #333;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            border: 1px solid #e9ecef;
        }

        .languages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }

        .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8f9fa;
            padding: 15px 20px;
            border-radius: 8px;
        }

        .language-name {
            font-weight: 600;
            color: #333;
        }

        .language-proficiency {
            font-size: 14px;
            color: #666;
        }

        @media print {
            body {
                padding: 20px;
                font-size: 12px;
            }
            
            .section {
                margin-bottom: 25px;
            }
            
            .project-item {
                margin-bottom: 20px;
                page-break-inside: avoid;
            }
        }

        @page {
            size: A4;
            margin: 20mm;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-brand">Frank fam.</div>
        <div class="contact-info">
            ${data.personalInfo.name}<br>
            ${data.personalInfo.email}<br>
            ${data.personalInfo.phone || ''}
        </div>
    </div>

    <div class="profile-section">
        ${data.personalInfo.profileImage ? 
            `<img src="${data.personalInfo.profileImage}" alt="${data.personalInfo.name}" class="profile-image">` : 
            ''
        }
        <div class="profile-content">
            <h1 class="profile-name">${data.personalInfo.name}</h1>
            <div class="profile-title">${data.personalInfo.title}</div>
            <div class="profile-intro">${data.summary.introduction}</div>
            ${data.summary.specialties ? `
                <div class="skills-list">
                    ${data.summary.specialties.map(specialty => 
                        `<span class="skill-tag">${specialty}</span>`
                    ).join('')}
                </div>
            ` : ''}
        </div>
    </div>

    ${data.roles && data.roles.length > 0 ? `
        <div class="section">
            <h2 class="section-title">${data.personalInfo.name}</h2>
            <div class="roles-grid">
                ${data.roles.map(role => `
                    <div class="role-card">
                        <div class="role-title">${role.title}</div>
                        <div class="skills-list">
                            ${role.skills.map(skill => 
                                `<span class="skill-tag">${skill}</span>`
                            ).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : ''}

    ${data.projects && data.projects.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Projekt och uppdrag</h2>
            ${data.projects.map(project => `
                <div class="project-item">
                    <div class="project-header">
                        <div>
                            <div class="project-type">${project.type}</div>
                            <div class="project-title">${project.title}</div>
                        </div>
                        <div class="project-period">${project.period}</div>
                    </div>
                    <div class="project-description">${project.description}</div>
                    ${project.technologies && project.technologies.length > 0 ? `
                        <div class="technology-tags">
                            ${project.technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    ` : ''}

    ${data.education && data.education.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Utbildning</h2>
            ${data.education.map(edu => `
                <div class="education-item">
                    <div class="education-content">
                        <div class="education-degree">${edu.degree}</div>
                        <div class="education-institution">${edu.institution}</div>
                    </div>
                    <div class="education-period">${edu.period}</div>
                </div>
            `).join('')}
        </div>
    ` : ''}

    ${data.certifications && data.certifications.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Kurser och certifieringar</h2>
            ${data.certifications.map(cert => `
                <div class="certification-item">
                    <div class="certification-content">
                        <div class="certification-title">${cert.title}</div>
                        <div class="certification-issuer">${cert.issuer}</div>
                    </div>
                    <div class="certification-year">${cert.year}</div>
                </div>
            `).join('')}
        </div>
    ` : ''}

    ${data.competencies && data.competencies.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Kompetenser</h2>
            ${data.competencies.map((category, index) => `
                <div class="competency-category">
                    <div class="competency-title">
                        <div class="competency-icon">${index + 1}</div>
                        ${category.category}
                    </div>
                    <div class="competency-skills">
                        ${category.skills.map(skill => 
                            `<span class="competency-skill">${skill.name}</span>`
                        ).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    ` : ''}

    ${data.languages && data.languages.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Språkkunskaper</h2>
            <div class="languages-grid">
                ${data.languages.map(lang => `
                    <div class="language-item">
                        <div class="language-name">${lang.language}</div>
                        <div class="language-proficiency">${lang.proficiency}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : ''}
</body>
</html>`;
}

export function generateFrankDigitalDOCX(data: CompleteCVData): Document {
  const primaryColor = data.styling?.primaryColor || '#6366f1';
  
  // Convert hex color to RGB for DOCX
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 99, g: 102, b: 241 }; // default purple
  };
  
  const primaryRgb = hexToRgb(primaryColor);
  
  const children = [];
  
  // Header - Frank fam.
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Frank fam.",
          size: 48,
          font: "Arial",
          color: "333333"
        })
      ],
      alignment: AlignmentType.RIGHT,
      spacing: { after: 400 }
    })
  );
  
  // Contact Info
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `${data.personalInfo.name}\n${data.personalInfo.email}\n${data.personalInfo.phone || ''}`,
          size: 20,
          font: "Arial"
        })
      ],
      alignment: AlignmentType.RIGHT,
      spacing: { after: 600 }
    })
  );
  
  // Name and Title
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.personalInfo.name,
          size: 36,
          bold: true,
          font: "Arial"
        })
      ],
      spacing: { after: 200 }
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.personalInfo.title,
          size: 18,
          color: `${primaryRgb.r.toString(16).padStart(2, '0')}${primaryRgb.g.toString(16).padStart(2, '0')}${primaryRgb.b.toString(16).padStart(2, '0')}`,
          font: "Arial"
        })
      ],
      spacing: { after: 400 }
    })
  );
  
  // Summary
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.summary.introduction,
          size: 20,
          font: "Arial"
        })
      ],
      spacing: { after: 400 }
    })
  );
  
  // Specialties
  if (data.summary.specialties && data.summary.specialties.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "SPECIALITETER",
            size: 24,
            bold: true,
            color: `${primaryRgb.r.toString(16).padStart(2, '0')}${primaryRgb.g.toString(16).padStart(2, '0')}${primaryRgb.b.toString(16).padStart(2, '0')}`,
            font: "Arial"
          })
        ],
        spacing: { after: 200 }
      })
    );
    
    data.summary.specialties.forEach(specialty => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `• ${specialty}`,
              size: 20,
              font: "Arial"
            })
          ],
          spacing: { after: 100 }
        })
      );
    });
    
    children.push(new Paragraph({ spacing: { after: 400 } }));
  }
  
  // Projects
  if (data.projects && data.projects.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "PROJEKT OCH UPPDRAG",
            size: 24,
            bold: true,
            color: `${primaryRgb.r.toString(16).padStart(2, '0')}${primaryRgb.g.toString(16).padStart(2, '0')}${primaryRgb.b.toString(16).padStart(2, '0')}`,
            font: "Arial"
          })
        ],
        spacing: { after: 300 }
      })
    );
    
    data.projects.forEach(project => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${project.period} | ${project.type}`,
              size: 18,
              color: `${primaryRgb.r.toString(16).padStart(2, '0')}${primaryRgb.g.toString(16).padStart(2, '0')}${primaryRgb.b.toString(16).padStart(2, '0')}`,
              font: "Arial"
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: project.title,
              size: 20,
              bold: true,
              font: "Arial"
            })
          ],
          spacing: { after: 200 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: project.description,
              size: 18,
              font: "Arial"
            })
          ],
          spacing: { after: 200 }
        })
      );
      
      if (project.technologies && project.technologies.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Teknologier: ${project.technologies.join(', ')}`,
                size: 16,
                italics: true,
                font: "Arial"
              })
            ],
            spacing: { after: 300 }
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
            text: "UTBILDNING",
            size: 24,
            bold: true,
            color: `${primaryRgb.r.toString(16).padStart(2, '0')}${primaryRgb.g.toString(16).padStart(2, '0')}${primaryRgb.b.toString(16).padStart(2, '0')}`,
            font: "Arial"
          })
        ],
        spacing: { after: 300 }
      })
    );
    
    data.education.forEach(edu => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.period,
              size: 16,
              color: "666666",
              font: "Arial"
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree,
              size: 18,
              bold: true,
              font: "Arial"
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: edu.institution,
              size: 16,
              font: "Arial"
            })
          ],
          spacing: { after: 300 }
        })
      );
    });
  }
  
  // Certifications
  if (data.certifications && data.certifications.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "KURSER OCH CERTIFIERINGAR",
            size: 24,
            bold: true,
            color: `${primaryRgb.r.toString(16).padStart(2, '0')}${primaryRgb.g.toString(16).padStart(2, '0')}${primaryRgb.b.toString(16).padStart(2, '0')}`,
            font: "Arial"
          })
        ],
        spacing: { after: 300 }
      })
    );
    
    data.certifications.forEach(cert => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${cert.year} - ${cert.title}`,
              size: 18,
              bold: true,
              font: "Arial"
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: cert.issuer,
              size: 16,
              font: "Arial"
            })
          ],
          spacing: { after: 200 }
        })
      );
    });
  }
  
  // Competencies
  if (data.competencies && data.competencies.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "KOMPETENSER",
            size: 24,
            bold: true,
            color: `${primaryRgb.r.toString(16).padStart(2, '0')}${primaryRgb.g.toString(16).padStart(2, '0')}${primaryRgb.b.toString(16).padStart(2, '0')}`,
            font: "Arial"
          })
        ],
        spacing: { after: 300 }
      })
    );
    
    data.competencies.forEach(category => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: category.category,
              size: 18,
              bold: true,
              font: "Arial"
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: category.skills.map(skill => skill.name).join(', '),
              size: 16,
              font: "Arial"
            })
          ],
          spacing: { after: 300 }
        })
      );
    });
  }
  
  // Languages
  if (data.languages && data.languages.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "SPRÅKKUNSKAPER",
            size: 24,
            bold: true,
            color: `${primaryRgb.r.toString(16).padStart(2, '0')}${primaryRgb.g.toString(16).padStart(2, '0')}${primaryRgb.b.toString(16).padStart(2, '0')}`,
            font: "Arial"
          })
        ],
        spacing: { after: 300 }
      })
    );
    
    data.languages.forEach(lang => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${lang.language}: ${lang.proficiency}`,
              size: 18,
              font: "Arial"
            })
          ],
          spacing: { after: 100 }
        })
      );
    });
  }
  
  return new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });
}