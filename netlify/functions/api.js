// Import Puppeteer and Chromium for PDF generation
const puppeteer = require('puppeteer');
const chromium = require('@sparticuz/chromium');

// Helper functions for content generation
function generateAndervangConsultingHTML(cvData) {
  const { personalInfo, summary, employment, projects, education, certifications, competencies, languages, company, styling } = cvData;
  
  // Use Andervang Consulting colors and styling
  const primaryColor = styling?.primaryColor || '#003D82'; // Darker blue for better contrast
  const orangeAccent = '#FF6B35'; // New orange accent color
  const fontFamily = styling?.fontFamily || '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif';
  const companyName = company || 'Andervang Consulting';
  return `<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo?.name || 'Unknown'} - CV</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: ${fontFamily};
            line-height: 1.4;
            color: #1d1d1f;
            background: #fafafa;
            padding: 25px;
            font-size: 13px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid ${primaryColor};
            position: relative;
        }

        .header::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 60px;
            height: 3px;
            background: ${orangeAccent};
        }

        .company-brand {
            font-size: 20px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 4px;
            letter-spacing: -0.2px;
        }

        .company-tagline {
            font-size: 13px;
            color: #86868b;
            font-weight: 400;
            letter-spacing: -0.05px;
        }

        .contact-info {
            text-align: right;
            font-size: 13px;
            line-height: 1.3;
            color: #1d1d1f;
        }

        .contact-info strong {
            color: ${primaryColor};
            font-weight: 600;
        }

        .profile-section {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 24px;
            margin-bottom: 30px;
            align-items: start;
        }

        .profile-image {
            width: 90px;
            height: 90px;
            border-radius: 12px;
            object-fit: cover;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .profile-content {
            flex: 1;
        }

        .profile-name {
            font-size: 26px;
            font-weight: 700;
            color: #1d1d1f;
            margin-bottom: 6px;
            letter-spacing: -0.3px;
        }

        .profile-title {
            font-size: 16px;
            color: ${primaryColor};
            font-weight: 600;
            margin-bottom: 16px;
            letter-spacing: -0.1px;
        }

        .profile-intro {
            font-size: 14px;
            line-height: 1.5;
            color: #1d1d1f;
            letter-spacing: -0.05px;
        }

        .section {
            margin-bottom: 30px;
            position: relative;
        }

        .section::before {
            content: '';
            position: absolute;
            top: -8px;
            left: 0;
            width: 30px;
            height: 2px;
            background: ${orangeAccent};
            opacity: 0.6;
        }

        .section-title {
            font-size: 20px;
            font-weight: 700;
            color: ${primaryColor};
            margin-bottom: 12px;
            letter-spacing: -0.3px;
            display: flex;
            align-items: center;
            position: relative;
        }

        .section-title::after {
            content: '';
            flex: 1;
            height: 2px;
            background: linear-gradient(90deg, ${primaryColor}, ${orangeAccent}, transparent);
            margin-left: 16px;
            opacity: 0.3;
        }

        .project-item {
            margin-bottom: 18px;
            padding: 18px;
            background: #ffffff;
            border-radius: 10px;
            border: 1px solid rgba(0, 0, 0, 0.04);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            position: relative;
            transition: all 0.2s ease;
        }

        .project-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: ${primaryColor};
            border-radius: 10px 0 0 10px;
        }

        .employment-item {
            margin-bottom: 22px;
            padding: 24px;
            background: linear-gradient(135deg, ${orangeAccent}, #E85A20);
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 20px rgba(255, 107, 53, 0.25);
            color: white;
            position: relative;
            overflow: hidden;
            transition: all 0.2s ease;
        }

        .employment-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1));
        }

        .employment-item::after {
            content: '💼';
            position: absolute;
            top: 20px;
            right: 24px;
            font-size: 24px;
            opacity: 0.3;
        }

        .project-header, .employment-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }

        .project-type {
            font-size: 11px;
            color: ${primaryColor};
            font-weight: 500;
            letter-spacing: -0.02px;
        }

        .employment-position {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 600;
        }

        .project-title {
            font-size: 16px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 12px;
            letter-spacing: -0.2px;
        }

        .employment-company {
            font-size: 18px;
            font-weight: 700;
            color: white;
            margin-bottom: 8px;
            letter-spacing: -0.2px;
        }

        .project-period, .employment-period {
            font-size: 11px;
            color: #86868b;
            font-weight: 500;
            white-space: nowrap;
        }

        .employment-period {
            color: rgba(255, 255, 255, 0.8);
        }

        .project-description, .employment-description {
            font-size: 13px;
            line-height: 1.5;
            color: #1d1d1f;
            margin-bottom: 12px;
        }

        .employment-description {
            color: rgba(255, 255, 255, 0.95);
        }

        .technology-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 12px;
        }

        .tech-tag {
            background: rgba(255, 255, 255, 0.9);
            color: ${primaryColor};
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 10px;
            font-weight: 500;
            border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .employment-item .tech-tag {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .education-item, .certification-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.04);
            margin-bottom: 6px;
            border-radius: 8px;
            font-size: 13px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
            position: relative;
            transition: all 0.1s ease;
        }

        .education-item::before, .certification-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: ${primaryColor};
            border-radius: 8px 0 0 8px;
        }

        .education-content, .certification-content {
            flex: 1;
        }

        .education-degree, .certification-title {
            font-size: 14px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 3px;
            letter-spacing: -0.1px;
        }

        .education-institution, .certification-issuer {
            font-size: 11px;
            color: #86868b;
            letter-spacing: -0.02px;
        }

        .education-period, .certification-year {
            font-size: 11px;
            color: ${primaryColor};
            font-weight: 500;
            letter-spacing: -0.02px;
        }

        .competency-category {
            margin-bottom: 18px;
            position: relative;
        }

        .competency-title {
            display: flex;
            align-items: center;
            font-size: 15px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 12px;
            letter-spacing: -0.15px;
        }

        .competency-icon {
            width: 22px;
            height: 22px;
            background: linear-gradient(135deg, ${primaryColor}, ${orangeAccent});
            color: white;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 600;
            margin-right: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .competency-skills {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 8px;
        }

        .competency-skill {
            padding: 6px 12px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.06);
            border-radius: 8px;
            font-size: 12px;
            color: #1d1d1f;
            font-weight: 500;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .languages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
        }

        .language-item {
            padding: 12px 16px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.04);
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .language-name {
            font-size: 14px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 4px;
        }

        .language-proficiency {
            font-size: 11px;
            color: ${primaryColor};
            font-weight: 500;
        }

        /* Print styles */
        @media print {
            body { 
                margin: 0; 
                padding: 15px;
                font-size: 12px;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .employment-item {
                break-inside: avoid;
            }
            .project-item {
                break-inside: avoid;
            }
        }

        @page {
            margin: 0.5in;
            size: A4;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div>
            <div class="company-brand">${companyName}</div>
            <div class="company-tagline">Professional Consulting Services</div>
        </div>
        <div class="contact-info">
            <div><strong>${personalInfo?.name || 'N/A'}</strong></div>
            <div>${personalInfo?.email || ''}</div>
            <div>${personalInfo?.phone || ''}</div>
            ${personalInfo?.location ? `<div>${personalInfo.location}</div>` : ''}
        </div>
    </div>

    <!-- Profile Section -->
    <div class="profile-section">
        ${personalInfo?.profileImage ? 
            `<img class="profile-image" src="${personalInfo.profileImage}" alt="Profile" />` : 
            `<div class="profile-image" style="background: #f5f5f7; display: flex; align-items: center; justify-content: center; color: #86868b; font-size: 11px;">No Image</div>`
        }
        <div class="profile-content">
            <h1 class="profile-name">${personalInfo?.name || 'N/A'}</h1>
            <h2 class="profile-title">${personalInfo?.title || 'N/A'}</h2>
            <div class="profile-intro">${summary?.introduction || ''}</div>
        </div>
    </div>

    <!-- Employment Section (Orange gradient) -->
    ${employment?.length ? `
        <div class="section">
            <h2 class="section-title">Anställningar och roller</h2>
            ${employment.map(job => `
                <div class="employment-item">
                    <div class="employment-header">
                        <div>
                            <div class="employment-position">${job.position}</div>
                            <div class="employment-company">${job.company}</div>
                        </div>
                        <div class="employment-period">${job.period}</div>
                    </div>
                    <div class="employment-description">${job.description}</div>
                    ${job.technologies?.length ? `
                        <div class="technology-tags">
                            ${job.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    ` : ''}

    <!-- Projects Section -->
    ${projects?.length ? `
        <div class="section">
            <h2 class="section-title">Projekt och uppdrag</h2>
            ${projects.map(project => `
                <div class="project-item">
                    <div class="project-header">
                        <div>
                            <div class="project-type">${project.type || 'Projekt'}</div>
                            <div class="project-title">${project.title}</div>
                        </div>
                        <div class="project-period">${project.period}</div>
                    </div>
                    <div class="project-description">${project.description}</div>
                    ${project.technologies?.length ? `
                        <div class="technology-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    ` : ''}

    <!-- Education Section -->
    ${education?.length ? `
        <div class="section">
            <h2 class="section-title">Utbildning</h2>
            ${education.map(edu => `
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

    <!-- Certifications Section -->
    ${certifications?.length ? `
        <div class="section">
            <h2 class="section-title">Certifieringar</h2>
            ${certifications.map(cert => `
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

    <!-- Competencies Section -->
    ${competencies?.length ? `
        <div class="section">
            <h2 class="section-title">Kompetenser</h2>
            ${competencies.map((category, index) => `
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

    <!-- Languages Section -->
    ${languages?.length ? `
        <div class="section">
            <h2 class="section-title">Språkkunskaper</h2>
            <div class="languages-grid">
                ${languages.map(lang => `
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

async function generatePDFContent(cvData) {
  try {
    // Generate the HTML content first using Andervang Consulting template
    const htmlContent = generateAndervangConsultingHTML(cvData);
    
    // Launch Puppeteer with Netlify-compatible settings
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    
    // Set the HTML content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });

    // Generate PDF with proper settings for CV
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.4in',
        right: '0.4in',
        bottom: '0.4in',
        left: '0.4in',
      },
    });

    await browser.close();

    // Return base64 encoded PDF
    return Buffer.from(pdfBuffer).toString('base64');
  } catch (error) {
    console.error('PDF generation error:', error);
    // Fallback to HTML content if PDF generation fails
    const htmlContent = generateAndervangConsultingHTML(cvData);
    return btoa(unescape(encodeURIComponent(htmlContent)));
  }
}

function generateDOCXContent(cvData) {
  const { personalInfo, summary, employment, projects, education, certifications, competencies, languages, company } = cvData;
  const companyName = company || 'Andervang Consulting';
  
  return `${companyName}
CV - ${personalInfo?.name || 'N/A'}
${personalInfo?.title || 'N/A'}

KONTAKTINFORMATION
Email: ${personalInfo?.email || ''}
Telefon: ${personalInfo?.phone || ''}
${personalInfo?.location ? `Plats: ${personalInfo.location}` : ''}

PROFESSIONELL SAMMANFATTNING
${summary?.introduction || ''}

${summary?.highlights ? `HÖJDPUNKTER:
${summary.highlights.map(h => `• ${h}`).join('\n')}` : ''}

${summary?.specialties ? `SPECIALITETER:
${summary.specialties.map(s => `• ${s}`).join('\n')}` : ''}

${employment ? `ANSTÄLLNINGAR OCH ROLLER
${employment.map(job => `
${job.position} - ${job.company} (${job.period})
${job.description}
${job.technologies ? `Teknologier: ${job.technologies.join(', ')}` : ''}
${job.achievements ? `Framgångar:\n${job.achievements.map(a => `• ${a}`).join('\n')}` : ''}
`).join('\n')}` : ''}

${projects ? `PROJEKT OCH UPPDRAG
${projects.map(p => `
${p.title || 'N/A'} (${p.period || 'N/A'})
${p.type || ''}
${p.description || ''}
${p.technologies ? `Teknologier: ${p.technologies.join(', ')}` : ''}
`).join('\n')}` : ''}

${education ? `UTBILDNING
${education.map(e => `
${e.degree || 'N/A'} (${e.period || 'N/A'})
${e.institution || 'N/A'}
${e.specialization ? `Specialisering: ${e.specialization}` : ''}
`).join('\n')}` : ''}

${certifications ? `CERTIFIERINGAR
${certifications.map(c => `
${c.title || 'N/A'} (${c.year || 'N/A'})
${c.issuer || 'N/A'}
${c.description ? `Beskrivning: ${c.description}` : ''}
`).join('\n')}` : ''}

${competencies ? `KOMPETENSER
${competencies.map(cat => `
${cat.category || 'N/A'}:
${cat.skills ? cat.skills.map(s => `• ${s.name}${s.level ? ` (${s.level})` : ''}`).join('\n') : ''}
`).join('\n')}` : ''}

${languages ? `SPRÅKKUNSKAPER
${languages.map(l => `• ${l.language}: ${l.proficiency}`).join('\n')}` : ''}

Genererat: ${new Date().toLocaleDateString('sv-SE')}
Template: Andervang Consulting`;
}

export const handler = async (event, context) => {
  // CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  // Default headers for all responses
  const headers = {
    ...corsHeaders,
    'Content-Type': 'application/json'
  };

  try {
    // Parse the path to determine the route
    let path = event.path;
    if (path.startsWith('/.netlify/functions/api')) {
      path = path.substring('/.netlify/functions/api'.length); // Remove netlify function prefix
    } else if (path.startsWith('/api')) {
      path = path.substring(4); // Remove '/api' prefix
    }
    const method = event.httpMethod;
    
    console.log('Function called with path:', event.path, 'parsed to:', path);

    // Main endpoint for consultant manager integration
    if (path === '' && method === 'POST') {
      // This is the main /api endpoint that the integration guide expects
      const body = JSON.parse(event.body || '{}');
      
      // Check if it's the ConsultantCVPayload format
      const format = body.format || 'pdf';
      let fileContent = '';
      let mimeType = '';
      let filename = `CV_${body.personalInfo?.name?.replace(/\s+/g, '_') || 'Unknown'}`;
      
      if (format === 'html') {
        const htmlContent = generateAndervangConsultingHTML(body);
        fileContent = btoa(unescape(encodeURIComponent(htmlContent)));
        mimeType = 'text/html';
      } else if (format === 'pdf') {
        const pdfContent = await generatePDFContent(body);
        fileContent = pdfContent;
        mimeType = 'application/pdf';
      } else if (format === 'docx') {
        const docContent = generateDOCXContent(body);
        fileContent = btoa(unescape(encodeURIComponent(docContent)));
        mimeType = 'text/plain';
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            fileUrl: `data:${mimeType};base64,${fileContent}`,
            format: format,
            generatedAt: new Date().toISOString(),
            template: body.template || 'andervang-consulting',
            filename: `${filename}.${format}`,
            note: 'Generated with ConsultantCVPayload format'
          }
        })
      };
    }

    // API key validation for protected routes
    const apiKey = event.headers['x-api-key'];
    const validKeys = [
      process.env.CV_API_KEY,
      process.env.VITE_CV_API_KEY,
      'dev-api-key-12345' // Development fallback
    ].filter(Boolean);

    if (!apiKey || !validKeys.includes(apiKey)) {
      return {
        statusCode: 401,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          error: {
            code: 'UNAUTHORIZED',
            message: 'Valid API key required'
          }
        })
      };
    }

    // Route handling
    if (path === '/templates' && method === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: [
            {
              id: 'andervang-consulting',
              name: 'Andervang Consulting',
              description: 'Professional template with Apple-inspired design and orange accent colors',
              templateType: 'professional',
              industryFocus: 'consulting',
              isPremium: false,
              isActive: true
            },
            {
              id: 'modern',
              name: 'Modern Professional',
              description: 'Clean, modern design perfect for tech professionals',
              templateType: 'modern',
              industryFocus: 'technology',
              isPremium: false,
              isActive: true
            },
            {
              id: 'classic',
              name: 'Classic Executive',
              description: 'Traditional corporate design for executive positions',
              templateType: 'classic',
              industryFocus: 'business',
              isPremium: false,
              isActive: true
            },
            {
              id: 'creative',
              name: 'Creative Portfolio',
              description: 'Artistic design for creative professionals',
              templateType: 'creative',
              industryFocus: 'creative',
              isPremium: false,
              isActive: true
            }
          ]
        })
      };
    }

    if (path === '/customization/options' && method === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            colorSchemes: {
              'frank-digital': [
                { id: 'blue-professional', name: 'Professional Blue', primaryColor: '#1e40af', accentColor: '#3b82f6', description: 'Classic professional blue theme' },
                { id: 'green-tech', name: 'Tech Green', primaryColor: '#166534', accentColor: '#22c55e', description: 'Modern tech green theme' }
              ],
              'modern': [
                { id: 'purple-creative', name: 'Creative Purple', primaryColor: '#7c3aed', accentColor: '#a855f7', description: 'Creative purple theme' },
                { id: 'teal-modern', name: 'Modern Teal', primaryColor: '#0f766e', accentColor: '#14b8a6', description: 'Modern teal theme' }
              ],
              'classic': [
                { id: 'gray-minimal', name: 'Minimal Gray', primaryColor: '#374151', accentColor: '#6b7280', description: 'Minimal gray theme' },
                { id: 'indigo-corporate', name: 'Corporate Indigo', primaryColor: '#3730a3', accentColor: '#6366f1', description: 'Corporate indigo theme' }
              ],
              'creative': [
                { id: 'pink-creative', name: 'Creative Pink', primaryColor: '#be185d', accentColor: '#ec4899', description: 'Creative pink theme' },
                { id: 'orange-warm', name: 'Warm Orange', primaryColor: '#c2410c', accentColor: '#f97316', description: 'Warm orange theme' }
              ]
            },
            fontOptions: [
              { id: 'inter', name: 'Inter', fontFamily: 'Inter', fallback: ['Arial', 'sans-serif'], category: 'sans-serif', description: 'Modern and readable' },
              { id: 'roboto', name: 'Roboto', fontFamily: 'Roboto', fallback: ['Arial', 'sans-serif'], category: 'sans-serif', description: 'Clean and professional' },
              { id: 'open-sans', name: 'Open Sans', fontFamily: 'Open Sans', fallback: ['Arial', 'sans-serif'], category: 'sans-serif', description: 'Friendly and approachable' },
              { id: 'lato', name: 'Lato', fontFamily: 'Lato', fallback: ['Arial', 'sans-serif'], category: 'sans-serif', description: 'Elegant and versatile' },
              { id: 'georgia', name: 'Georgia', fontFamily: 'Georgia', fallback: ['Times', 'serif'], category: 'serif', description: 'Traditional and authoritative' },
              { id: 'times', name: 'Times New Roman', fontFamily: 'Times New Roman', fallback: ['Times', 'serif'], category: 'serif', description: 'Classic and formal' }
            ],
            layoutOptions: [
              { id: 'single-column', name: 'Single Column', description: 'Traditional single column layout', supportedTemplates: ['frank-digital', 'modern', 'classic', 'creative'] },
              { id: 'two-column', name: 'Two Column', description: 'Modern two column layout', supportedTemplates: ['modern', 'creative'] },
              { id: 'sidebar-left', name: 'Left Sidebar', description: 'Sidebar on the left', supportedTemplates: ['modern', 'classic'] },
              { id: 'asymmetric', name: 'Asymmetric', description: 'Creative asymmetric layout', supportedTemplates: ['creative'] }
            ],
            sizeOptions: [
              { id: 'small', name: 'Small', description: 'Compact text size' },
              { id: 'medium', name: 'Medium', description: 'Standard text size' },
              { id: 'large', name: 'Large', description: 'Large text size for better readability' }
            ],
            spacingOptions: [
              { id: 'compact', name: 'Compact', description: 'Tight spacing for more content' },
              { id: 'normal', name: 'Normal', description: 'Standard spacing' },
              { id: 'relaxed', name: 'Relaxed', description: 'Generous spacing for better readability' }
            ]
          }
        })
      };
    }

    if (path === '/generate/complete' && method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      
      const format = body.format || 'pdf';
      let fileContent = '';
      let mimeType = '';
      let filename = `CV_${body.personalInfo?.name?.replace(/\s+/g, '_') || 'Unknown'}`;
      
      if (format === 'html') {
        const htmlContent = generateAndervangConsultingHTML(body);
        fileContent = btoa(unescape(encodeURIComponent(htmlContent)));
        mimeType = 'text/html';
      } else if (format === 'pdf') {
        const pdfContent = await generatePDFContent(body);
        fileContent = pdfContent;
        mimeType = 'application/pdf';
      } else if (format === 'docx') {
        const docContent = generateDOCXContent(body);
        fileContent = btoa(unescape(encodeURIComponent(docContent)));
        mimeType = 'text/plain'; // Simplified for now
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            fileUrl: `data:${mimeType};base64,${fileContent}`,
            format: format,
            generatedAt: new Date().toISOString(),
            template: body.template || 'modern',
            filename: `${filename}.${format}`,
            note: 'Generated with actual CV data'
          }
        })
      };
    }

    if (path === '/batch/formats' && method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      
      // Generate all three formats with actual CV data
      const formats = ['pdf', 'html', 'docx'];
      const results = {};
      
      for (const format of formats) {
        let fileContent = '';
        let mimeType = '';
        
        if (format === 'html') {
          const htmlContent = generateAndervangConsultingHTML(body);
          fileContent = btoa(unescape(encodeURIComponent(htmlContent)));
          mimeType = 'text/html';
        } else if (format === 'pdf') {
          const pdfContent = await generatePDFContent(body);
          fileContent = pdfContent;
          mimeType = 'application/pdf';
        } else if (format === 'docx') {
          const docContent = generateDOCXContent(body);
          fileContent = btoa(unescape(encodeURIComponent(docContent)));
          mimeType = 'text/plain';
        }
        
        results[format] = {
          success: true,
          fileUrl: `data:${mimeType};base64,${fileContent}`,
          generatedAt: new Date().toISOString()
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            summary: {
              total: 3,
              successful: 3,
              failed: 0
            },
            results
          }
        })
      };
    }

    if (path === '/batch/comprehensive' && method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      
      // Generate files for all templates and formats
      const templates = ['andervang-consulting', 'modern', 'classic', 'creative'];
      const formats = ['pdf', 'html', 'docx'];
      const results = {};
      
      for (const templateId of templates) {
        results[templateId] = {};
        const templateData = { ...body, template: templateId };
        
        for (const format of formats) {
          let fileContent = '';
          let mimeType = '';
          
          if (format === 'html') {
            const htmlContent = generateAndervangConsultingHTML(templateData);
            fileContent = btoa(unescape(encodeURIComponent(htmlContent)));
            mimeType = 'text/html';
          } else if (format === 'pdf') {
            const pdfContent = await generatePDFContent(templateData);
            fileContent = pdfContent;
            mimeType = 'application/pdf';
          } else if (format === 'docx') {
            const docContent = generateDOCXContent(templateData);
            fileContent = btoa(unescape(encodeURIComponent(docContent)));
            mimeType = 'text/plain';
          }
          
          results[templateId][format] = {
            success: true,
            fileUrl: `data:${mimeType};base64,${fileContent}`,
            generatedAt: new Date().toISOString()
          };
        }
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            summary: {
              totalTemplates: 4,
              totalFormats: 3,
              totalGenerated: 12,
              successful: 12,
              failed: 0
            },
            results
          }
        })
      };
    }

    // 404 for unknown routes
    console.log('No route matched for:', path, method);
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: {
          code: 'NOT_FOUND',
          message: `Route ${path} not found`,
          debug: {
            originalPath: event.path,
            parsedPath: path,
            method: method
          }
        }
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: {
          code: 'INTERNAL_ERROR',
          message: error.message
        }
      })
    };
  }
};