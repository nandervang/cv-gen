import { Document, Paragraph, TextRun, AlignmentType } from 'docx';
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
  const finalConfig = { ...defaultConfig, ...config };
  
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
      font-family: ${finalConfig.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 300px 1fr;
      min-height: 100vh;
      gap: 0;
    }
    
    .sidebar {
      background: linear-gradient(135deg, ${finalConfig.primaryColor}15 0%, ${finalConfig.accentColor}10 100%);
      border-right: 3px solid ${finalConfig.primaryColor};
      padding: 40px 30px;
      position: relative;
    }
    
    .sidebar::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, ${finalConfig.primaryColor}, ${finalConfig.accentColor});
    }
    
    .main-content {
      padding: 40px;
      background: #ffffff;
    }
    
    .profile-section {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 2px solid ${finalConfig.primaryColor}20;
    }
    
    .profile-image {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 0 auto 20px;
      border: 4px solid ${finalConfig.primaryColor};
      overflow: hidden;
    }
    
    .profile-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .name {
      font-size: 24px;
      font-weight: 700;
      color: ${finalConfig.primaryColor};
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    
    .title {
      font-size: 16px;
      color: ${finalConfig.accentColor};
      font-weight: 500;
      margin-bottom: 20px;
    }
    
    .contact-info {
      text-align: left;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      font-size: 14px;
    }
    
    .contact-icon {
      width: 18px;
      height: 18px;
      margin-right: 12px;
      color: ${finalConfig.primaryColor};
    }
    
    .section {
      margin-bottom: 40px;
    }
    
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: ${finalConfig.primaryColor};
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 8px;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(90deg, ${finalConfig.primaryColor}, ${finalConfig.accentColor});
      border-radius: 2px;
    }
    
    .sidebar-section-title {
      font-size: 18px;
      font-weight: 600;
      color: ${finalConfig.primaryColor};
      margin-bottom: 16px;
      margin-top: 30px;
    }
    
    .sidebar-section-title:first-child {
      margin-top: 0;
    }
    
    .summary-text {
      font-size: 16px;
      line-height: 1.7;
      margin-bottom: 20px;
      text-align: justify;
    }
    
    .highlights-list {
      list-style: none;
      margin-bottom: 20px;
    }
    
    .highlights-list li {
      position: relative;
      padding-left: 25px;
      margin-bottom: 8px;
      font-size: 15px;
      line-height: 1.5;
    }
    
    .highlights-list li::before {
      content: '▶';
      position: absolute;
      left: 0;
      color: ${finalConfig.primaryColor};
      font-size: 12px;
    }
    
    .experience-item {
      margin-bottom: 30px;
      padding-bottom: 25px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .experience-item:last-child {
      border-bottom: none;
    }
    
    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }
    
    .experience-title {
      font-size: 18px;
      font-weight: 600;
      color: ${finalConfig.primaryColor};
      margin-bottom: 4px;
    }
    
    .experience-company {
      font-size: 16px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 4px;
    }
    
    .experience-period {
      font-size: 14px;
      color: ${finalConfig.accentColor};
      font-weight: 500;
      white-space: nowrap;
    }
    
    .experience-description {
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 15px;
      text-align: justify;
    }
    
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    
    .tech-tag {
      background: ${finalConfig.primaryColor}15;
      color: ${finalConfig.primaryColor};
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
      border: 1px solid ${finalConfig.primaryColor}30;
    }
    
    .skills-category {
      margin-bottom: 25px;
    }
    
    .skills-category-title {
      font-size: 14px;
      font-weight: 600;
      color: ${finalConfig.primaryColor};
      margin-bottom: 12px;
    }
    
    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .skill-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
    }
    
    .skill-name {
      font-weight: 500;
    }
    
    .skill-level {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 10px;
      font-weight: 500;
    }
    
    .skill-expert {
      background: #10b981;
      color: white;
    }
    
    .skill-advanced {
      background: ${finalConfig.primaryColor};
      color: white;
    }
    
    .skill-intermediate {
      background: #f59e0b;
      color: white;
    }
    
    .education-item {
      margin-bottom: 20px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid ${finalConfig.primaryColor};
    }
    
    .education-degree {
      font-size: 16px;
      font-weight: 600;
      color: ${finalConfig.primaryColor};
      margin-bottom: 4px;
    }
    
    .education-institution {
      font-size: 14px;
      color: #374151;
      margin-bottom: 4px;
    }
    
    .education-period {
      font-size: 13px;
      color: ${finalConfig.accentColor};
    }
    
    .certification-item {
      margin-bottom: 15px;
      padding: 12px;
      background: linear-gradient(135deg, ${finalConfig.primaryColor}08, ${finalConfig.accentColor}05);
      border-radius: 6px;
      border: 1px solid ${finalConfig.primaryColor}20;
    }
    
    .certification-title {
      font-size: 14px;
      font-weight: 600;
      color: ${finalConfig.primaryColor};
      margin-bottom: 4px;
    }
    
    .certification-issuer {
      font-size: 13px;
      color: #374151;
      margin-bottom: 2px;
    }
    
    .certification-year {
      font-size: 12px;
      color: ${finalConfig.accentColor};
    }
    
    .language-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    .language-name {
      font-weight: 500;
    }
    
    .language-level {
      font-size: 12px;
      color: ${finalConfig.accentColor};
    }
    
    @media print {
      .container {
        max-width: none;
        margin: 0;
        grid-template-columns: 250px 1fr;
      }
      
      .sidebar {
        padding: 30px 20px;
      }
      
      .main-content {
        padding: 30px;
      }
      
      .section {
        margin-bottom: 30px;
      }
      
      .experience-item {
        margin-bottom: 20px;
        padding-bottom: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Profile Section -->
      <div class="profile-section">
        ${data.personalInfo.profileImage ? `
        <div class="profile-image">
          <img src="${data.personalInfo.profileImage}" alt="${data.personalInfo.name}">
        </div>
        ` : ''}
        <h1 class="name">${data.personalInfo.name}</h1>
        <div class="title">${data.personalInfo.title}</div>
      </div>
      
      <!-- Contact Information -->
      <div class="contact-info">
        <div class="contact-item">
          <div class="contact-icon">📧</div>
          <div>${data.personalInfo.email}</div>
        </div>
        ${data.personalInfo.phone ? `
        <div class="contact-item">
          <div class="contact-icon">📱</div>
          <div>${data.personalInfo.phone}</div>
        </div>
        ` : ''}
        ${data.personalInfo.location ? `
        <div class="contact-item">
          <div class="contact-icon">📍</div>
          <div>${data.personalInfo.location}</div>
        </div>
        ` : ''}
      </div>
      
      <!-- Skills -->
      ${data.competencies && data.competencies.length > 0 ? `
      <h3 class="sidebar-section-title">Kompetenser</h3>
      ${data.competencies.map(category => `
        <div class="skills-category">
          <div class="skills-category-title">${category.category}</div>
          <div class="skills-list">
            ${category.skills.map(skill => `
              <div class="skill-item">
                <span class="skill-name">${skill.name}</span>
                ${skill.level ? `<span class="skill-level skill-${skill.level}">${skill.level}</span>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
      ` : ''}
      
      <!-- Languages -->
      ${data.languages && data.languages.length > 0 ? `
      <h3 class="sidebar-section-title">Språk</h3>
      ${data.languages.map(lang => `
        <div class="language-item">
          <span class="language-name">${lang.language}</span>
          <span class="language-level">${lang.proficiency}</span>
        </div>
      `).join('')}
      ` : ''}
      
      <!-- Certifications -->
      ${data.certifications && data.certifications.length > 0 ? `
      <h3 class="sidebar-section-title">Certifieringar</h3>
      ${data.certifications.map(cert => `
        <div class="certification-item">
          <div class="certification-title">${cert.title}</div>
          <div class="certification-issuer">${cert.issuer}</div>
          <div class="certification-year">${cert.year}</div>
        </div>
      `).join('')}
      ` : ''}
    </div>
    
    <!-- Main Content -->
    <div class="main-content">
      <!-- Summary -->
      ${data.summary ? `
      <section class="section">
        <h2 class="section-title">Sammanfattning</h2>
        <div class="summary-text">${data.summary.introduction}</div>
        
        ${data.summary.highlights && data.summary.highlights.length > 0 ? `
        <ul class="highlights-list">
          ${data.summary.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
        </ul>
        ` : ''}
        
        ${data.summary.specialties && data.summary.specialties.length > 0 ? `
        <div>
          <strong>Specialiteter:</strong>
          <ul class="highlights-list">
            ${data.summary.specialties.map(specialty => `<li>${specialty}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
      </section>
      ` : ''}
      
      <!-- Projects Experience -->
      ${data.projects && data.projects.length > 0 ? `
      <section class="section">
        <h2 class="section-title">Projekt & Uppdrag</h2>
        ${data.projects.map(project => `
          <div class="experience-item">
            <div class="experience-header">
              <div>
                <div class="experience-title">${project.title}</div>
                <div class="experience-company">${project.type}</div>
              </div>
              <div class="experience-period">${project.period}</div>
            </div>
            <div class="experience-description">${project.description}</div>
            ${project.technologies && project.technologies.length > 0 ? `
            <div class="tech-tags">
              ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            ` : ''}
            ${project.achievements && project.achievements.length > 0 ? `
            <ul class="highlights-list" style="margin-top: 15px;">
              ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
            ` : ''}
          </div>
        `).join('')}
      </section>
      ` : ''}
      
      <!-- Employment History -->
      ${data.employment && data.employment.length > 0 ? `
      <section class="section">
        <h2 class="section-title">Anställningshistorik</h2>
        ${data.employment.map(job => `
          <div class="experience-item">
            <div class="experience-header">
              <div>
                <div class="experience-title">${job.position}</div>
                <div class="experience-company">${job.company}</div>
              </div>
              <div class="experience-period">${job.period}</div>
            </div>
            <div class="experience-description">${job.description}</div>
            ${job.technologies && job.technologies.length > 0 ? `
            <div class="tech-tags">
              ${job.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            ` : ''}
            ${job.achievements && job.achievements.length > 0 ? `
            <ul class="highlights-list" style="margin-top: 15px;">
              ${job.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
            ` : ''}
          </div>
        `).join('')}
      </section>
      ` : ''}
      
      <!-- Education -->
      ${data.education && data.education.length > 0 ? `
      <section class="section">
        <h2 class="section-title">Utbildning</h2>
        ${data.education.map(edu => `
          <div class="education-item">
            <div class="education-degree">${edu.degree}</div>
            <div class="education-institution">${edu.institution}</div>
            <div class="education-period">${edu.period}</div>
            ${edu.specialization ? `<div style="margin-top: 8px; font-size: 14px; color: #6b7280;">${edu.specialization}</div>` : ''}
          </div>
        `).join('')}
      </section>
      ` : ''}
    </div>
  </div>
</body>
</html>
  `;
}

export function generateModernDOCX(data: CompleteCVData, config: ModernTemplateConfig = {}): Document {
  const finalConfig = { ...defaultConfig, ...config };
  
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
          color: finalConfig.accentColor.replace('#', ''),
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
    })
  );
  
  // Contact Information
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "KONTAKTINFORMATION",
          bold: true,
          size: 18,
          color: finalConfig.primaryColor.replace('#', ''),
        }),
      ],
      spacing: { before: 240, after: 120 },
    }),
    
    new Paragraph({
      children: [
        new TextRun({
          text: `📧 ${data.personalInfo.email}`,
          size: 20,
        }),
      ],
      spacing: { after: 60 },
    })
  );
  
  if (data.personalInfo.phone) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `📱 ${data.personalInfo.phone}`,
            size: 20,
          }),
        ],
        spacing: { after: 60 },
      })
    );
  }
  
  if (data.personalInfo.location) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `📍 ${data.personalInfo.location}`,
            size: 20,
          }),
        ],
        spacing: { after: 60 },
      })
    );
  }
  
  // Summary section
  if (data.summary) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "SAMMANFATTNING",
            bold: true,
            size: 18,
            color: finalConfig.primaryColor.replace('#', ''),
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
      })
    );
    
    // Add highlights
    if (data.summary.highlights && data.summary.highlights.length > 0) {
      data.summary.highlights.forEach(highlight => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `▶ ${highlight}`,
                size: 18,
              }),
            ],
            spacing: { after: 60 },
          })
        );
      });
    }
  }
  
  // Projects section
  if (data.projects && data.projects.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "PROJEKT & UPPDRAG",
            bold: true,
            size: 18,
            color: finalConfig.primaryColor.replace('#', ''),
          }),
        ],
        spacing: { before: 240, after: 120 },
      })
    );
    
    data.projects.forEach(project => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: project.title,
              bold: true,
              size: 20,
              color: finalConfig.primaryColor.replace('#', ''),
            }),
            new TextRun({
              text: ` | ${project.period}`,
              size: 18,
              color: finalConfig.accentColor.replace('#', ''),
            }),
          ],
          spacing: { before: 120, after: 60 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: project.type,
              italics: true,
              size: 18,
            }),
          ],
          spacing: { after: 60 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: project.description,
              size: 18,
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
                size: 16,
                color: finalConfig.accentColor.replace('#', ''),
              }),
            ],
            spacing: { after: 60 },
          })
        );
      }
    });
  }
  
  // Education section
  if (data.education && data.education.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "UTBILDNING",
            bold: true,
            size: 18,
            color: finalConfig.primaryColor.replace('#', ''),
          }),
        ],
        spacing: { before: 240, after: 120 },
      })
    );
    
    data.education.forEach(edu => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree,
              bold: true,
              size: 18,
            }),
            new TextRun({
              text: ` | ${edu.period}`,
              size: 16,
              color: finalConfig.accentColor.replace('#', ''),
            }),
          ],
          spacing: { before: 80, after: 40 },
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: edu.institution,
              size: 16,
            }),
          ],
          spacing: { after: 60 },
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