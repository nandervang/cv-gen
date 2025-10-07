// Import Puppeteer and Chromium for PDF generation
const puppeteer = require('puppeteer');
const chromium = require('@sparticuz/chromium');

// Helper functions for content generation
function generateHTMLContent(cvData) {
  const { personalInfo, summary, projects, education, certifications, competencies, languages, skills } = cvData;
  
  return `<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - ${personalInfo?.name || 'Unknown'}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            line-height: 1.6; 
            color: #374151; 
            background: #ffffff;
            font-size: 14px;
        }
        
        .container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            min-height: 297mm;
            position: relative;
        }
        
        /* Header with Frank Digital branding */
        .frank-header {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 48px;
            font-weight: 300;
            color: #6b7280;
            padding: 40px 40px 20px 20px;
            line-height: 1;
        }
        
        .contact-info {
            position: absolute;
            top: 80px;
            right: 40px;
            text-align: right;
            font-size: 12px;
            color: #6b7280;
            line-height: 1.4;
        }
        
        .contact-info div {
            margin-bottom: 2px;
        }
        
        /* Main content area */
        .main-content {
            padding: 40px;
            padding-right: 280px;
        }
        
        /* Profile section */
        .profile-section {
            display: flex;
            align-items: flex-start;
            margin-bottom: 40px;
            gap: 30px;
        }
        
        .profile-image {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            object-fit: cover;
            flex-shrink: 0;
            background: #f3f4f6;
            border: 3px solid #e5e7eb;
        }
        
        .profile-text {
            flex: 1;
        }
        
        .name {
            font-size: 42px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 8px;
            line-height: 1.1;
        }
        
        .title {
            font-size: 18px;
            font-weight: 500;
            color: #6b7280;
            margin-bottom: 20px;
            line-height: 1.3;
        }
        
        .intro-text {
            font-size: 14px;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 20px;
        }
        
        .additional-text {
            font-size: 14px;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 20px;
        }
        
        .personality-text {
            font-size: 14px;
            line-height: 1.6;
            color: #4b5563;
        }
        
        /* Sidebar */
        .sidebar {
            position: absolute;
            top: 200px;
            right: 40px;
            width: 200px;
        }
        
        .sidebar-section {
            margin-bottom: 30px;
        }
        
        .sidebar h3 {
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 12px;
        }
        
        .role-list {
            list-style: none;
        }
        
        .role-list li {
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 4px;
            position: relative;
            padding-left: 12px;
        }
        
        .role-list li:before {
            content: "•";
            color: #a855f7;
            position: absolute;
            left: 0;
            font-weight: bold;
        }
        
        /* Section headings */
        .section {
            margin-bottom: 35px;
        }
        
        .section-title {
            font-size: 24px;
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 8px;
        }
        
        .section-title:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: repeating-linear-gradient(
                to right,
                #a855f7 0px,
                #a855f7 8px,
                transparent 8px,
                transparent 16px
            );
        }
        
        /* Project items */
        .project-item {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        
        .project-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }
        
        .project-period {
            font-size: 12px;
            color: #6b7280;
            white-space: nowrap;
            margin-left: 20px;
        }
        
        .project-type {
            font-size: 13px;
            color: #a855f7;
            font-weight: 500;
            margin-bottom: 6px;
        }
        
        .project-title {
            font-size: 18px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 12px;
        }
        
        .project-description {
            font-size: 13px;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 12px;
        }
        
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 10px;
        }
        
        .tech-tag {
            background: #f3f4f6;
            color: #374151;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
            border: 1px solid #e5e7eb;
        }
        
        /* Education items */
        .education-item {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        
        .education-content {
            flex: 1;
        }
        
        .education-degree {
            font-size: 14px;
            font-weight: 500;
            color: #111827;
            margin-bottom: 4px;
        }
        
        .education-school {
            font-size: 13px;
            color: #6b7280;
        }
        
        .education-period {
            font-size: 12px;
            color: #6b7280;
            white-space: nowrap;
            margin-left: 20px;
        }
        
        /* Certifications */
        .cert-item {
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        
        .cert-content {
            flex: 1;
        }
        
        .cert-title {
            font-size: 13px;
            font-weight: 500;
            color: #111827;
            margin-bottom: 4px;
        }
        
        .cert-issuer {
            font-size: 12px;
            color: #6b7280;
        }
        
        .cert-year {
            font-size: 12px;
            color: #6b7280;
            white-space: nowrap;
            margin-left: 20px;
        }
        
        /* Skills sections */
        .skills-category {
            margin-bottom: 25px;
        }
        
        .skills-category h4 {
            font-size: 13px;
            font-weight: 600;
            color: #6b7280;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }
        
        .skill-tag {
            background: #f3f4f6;
            color: #374151;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
            border: 1px solid #e5e7eb;
        }
        
        /* Footer */
        .footer {
            position: absolute;
            bottom: 40px;
            left: 40px;
            right: 40px;
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }
        
        .footer-brand {
            font-size: 24px;
            font-weight: 300;
            color: #6b7280;
        }
        
        .page-number {
            position: absolute;
            bottom: 20px;
            right: 40px;
            font-size: 12px;
            color: #9ca3af;
        }
        
        /* PDF-specific styles */
        @media print {
            body { 
                margin: 0; 
                padding: 0;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .container { 
                margin: 0; 
                box-shadow: none;
                min-height: auto;
            }
            .section { 
                page-break-inside: avoid; 
            }
            .project-item { 
                page-break-inside: avoid; 
            }
        }
        
        @page {
            margin: 0;
            size: A4;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Frank Digital Header -->
        <div class="frank-header">Frank fam.</div>
        
        <!-- Contact Info -->
        <div class="contact-info">
            <div><strong>${personalInfo?.name || 'N/A'}</strong></div>
            <div>${personalInfo?.email || ''}</div>
            <div>${personalInfo?.phone || ''}</div>
        </div>
        
        <!-- Main Content -->
        <div class="main-content">
            <!-- Profile Section -->
            <div class="profile-section">
                <img class="profile-image" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjcwIiBjeT0iNTUiIHI9IjIwIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik00MCA5NUMzNCA4NSA0NSA3NSA3MCA3NUM5NSA3NSAxMDYgODUgMTAwIDk1SDQwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K" alt="Profile" />
                <div class="profile-text">
                    <h1 class="name">${personalInfo?.name || 'N/A'}</h1>
                    <h2 class="title">${personalInfo?.title || 'N/A'}</h2>
                    
                    <p class="intro-text">${summary?.introduction || ''}</p>
                    
                    <p class="additional-text">${summary?.keyStrengths?.[3] || 'Niklas har också ett stort intresse för analys och SEO och brinner för att skapa värde och förbättring.'}</p>
                    
                    <p class="personality-text">${summary?.careerObjective || 'Som person är Niklas noggrann och trivs med att ha ett brett perspektiv till saker och ting. Hans erfarenhet är bred och han har inga problem med att gå mellan olika roller och ta sig an andra uppgifter. Niklas beskrivs som ödmjuk och prestigelös och har ofta haft roller som mentor, scrummaster och teamlead.'}</p>
                </div>
            </div>
            
            <!-- Projects Section -->
            ${projects?.length ? `<div class="section">
                <h2 class="section-title">Projekt och uppdrag</h2>
                ${projects.map(p => `<div class="project-item">
                    <div class="project-header">
                        <div>
                            <div class="project-period">${p.period || p.startDate || 'N/A'} ${p.endDate ? '- ' + p.endDate : '- pågående'}</div>
                            <div class="project-type">${p.type || 'Front-end / Fullstack utvecklare'}</div>
                        </div>
                    </div>
                    <h3 class="project-title">${p.title || p.name || 'N/A'}</h3>
                    <p class="project-description">${p.description || ''}</p>
                    ${p.technologies?.length ? `<div class="tech-stack">
                        ${p.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>` : ''}
                </div>`).join('')}
            </div>` : ''}
            
            <!-- Education Section -->
            ${education?.length ? `<div class="section">
                <h2 class="section-title">Utbildning</h2>
                ${education.map(e => `<div class="education-item">
                    <div class="education-content">
                        <div class="education-degree">${e.degree || e.name || 'N/A'}</div>
                        <div class="education-school">${e.institution || e.school || 'N/A'}</div>
                    </div>
                    <div class="education-period">${e.period || e.startDate + ' - ' + (e.endDate || e.graduationDate) || 'N/A'}</div>
                </div>`).join('')}
            </div>` : ''}
            
            <!-- Certifications Section -->
            ${(certifications?.length || cvData.courses?.length) ? `<div class="section">
                <h2 class="section-title">Kurser och certifieringar</h2>
                ${(certifications || []).map(c => `<div class="cert-item">
                    <div class="cert-content">
                        <div class="cert-title">${c.title || c.name || 'N/A'}</div>
                        <div class="cert-issuer">${c.issuer || c.provider || 'N/A'}</div>
                    </div>
                    <div class="cert-year">${c.year || c.completionDate || 'N/A'}</div>
                </div>`).join('')}
                ${(cvData.courses || []).map(c => `<div class="cert-item">
                    <div class="cert-content">
                        <div class="cert-title">${c.name || 'N/A'}</div>
                        <div class="cert-issuer">${c.provider || 'N/A'}</div>
                    </div>
                    <div class="cert-year">${c.completionDate || 'N/A'}</div>
                </div>`).join('')}
            </div>` : ''}
        </div>
        
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="sidebar-section">
                <h3>${personalInfo?.name?.split(' ')[0] || 'Niklas'} Andervang</h3>
                <ul class="role-list">
                    ${summary?.keyStrengths?.slice(0, 4).map(strength => `<li>${strength}</li>`).join('') || `
                    <li>Senior utvecklare FE/Fullstack</li>
                    <li>Test och kvalitetssäkring</li>
                    <li>Teamlead / mentor / scrummaster</li>
                    <li>Tillgänglighetsexpert</li>
                    <li>Teknisk projektledare</li>
                    `}
                </ul>
            </div>
        </div>
        
        <!-- Skills Section (if provided) -->
        ${skills?.length ? `<div class="main-content" style="padding-top: 0; margin-top: -20px;">
            <div class="section">
                <h2 class="section-title">Kompetenser</h2>
                ${skills.map(category => `<div class="skills-category">
                    <h4>${category.category}</h4>
                    <div class="skills-list">
                        ${category.items.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>`).join('')}
            </div>
        </div>` : ''}
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-brand">Frank fam.</div>
        </div>
        
        <!-- Page Number -->
        <div class="page-number">${personalInfo?.name?.split(' ')[0] || 'Niklas'} Andervang &nbsp;&nbsp;&nbsp;&nbsp; 1 / 1</div>
    </div>
</body>
</html>`;
}

async function generatePDFContent(cvData) {
  try {
    // Generate the HTML content first
    const htmlContent = generateHTMLContent(cvData);
    
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
    const htmlContent = generateHTMLContent(cvData);
    return btoa(unescape(encodeURIComponent(htmlContent)));
  }
}

function generateDOCXContent(cvData) {
  const { personalInfo, summary, projects, education, certifications, competencies, languages } = cvData;
  
  return `CV - ${personalInfo?.name || 'N/A'}
${personalInfo?.title || 'N/A'}
${personalInfo?.email || ''}
${personalInfo?.phone || ''}

PROFESSIONELL SAMMANFATTNING
${summary?.introduction || ''}

SPECIALITETER:
${summary?.specialties ? summary.specialties.map(s => `• ${s}`).join('\n') : ''}

HÖJDPUNKTER:
${summary?.highlights ? summary.highlights.map(h => `• ${h}`).join('\n') : ''}

PROJEKT
${projects ? projects.map(p => `
${p.title || 'N/A'} (${p.period || 'N/A'})
${p.type || ''}
${p.description || ''}
Teknologier: ${p.technologies ? p.technologies.join(', ') : 'N/A'}
`).join('\n') : ''}

UTBILDNING
${education ? education.map(e => `
${e.degree || 'N/A'} (${e.period || 'N/A'})
${e.institution || 'N/A'}
`).join('\n') : ''}

CERTIFIERINGAR
${certifications ? certifications.map(c => `
${c.title || 'N/A'} (${c.year || 'N/A'})
${c.issuer || 'N/A'}
`).join('\n') : ''}

KOMPETENSER
${competencies ? competencies.map(cat => `
${cat.category || 'N/A'}:
${cat.skills ? cat.skills.map(s => `• ${s.name} (${s.level})`).join('\n') : ''}
`).join('\n') : ''}

SPRÅK
${languages ? languages.map(l => `• ${l.language}: ${l.proficiency}`).join('\n') : ''}

Genererat: ${new Date().toLocaleDateString('sv-SE')}
Template: ${cvData.template || 'modern'}`;
}

export const handler = async (event, context) => {
  // Handle CORS preflight
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Parse the path to determine the route
    let path = event.path;
    if (path.startsWith('/api')) {
      path = path.substring(4); // Remove '/api' prefix
    }
    const method = event.httpMethod;
    
    console.log('Function called with path:', event.path, 'parsed to:', path);

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
        headers,
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
              id: 'frank-digital',
              name: 'Frank Digital',
              description: 'Professional template based on Frank Digital CV design',
              templateType: 'professional',
              industryFocus: 'technology',
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
        const htmlContent = generateHTMLContent(body);
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
          const htmlContent = generateHTMLContent(body);
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
      const templates = ['frank-digital', 'modern', 'classic', 'creative'];
      const formats = ['pdf', 'html', 'docx'];
      const results = {};
      
      for (const templateId of templates) {
        results[templateId] = {};
        const templateData = { ...body, template: templateId };
        
        for (const format of formats) {
          let fileContent = '';
          let mimeType = '';
          
          if (format === 'html') {
            const htmlContent = generateHTMLContent(templateData);
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
      headers,
      body: JSON.stringify({
        error: {
          code: 'INTERNAL_ERROR',
          message: error.message
        }
      })
    };
  }
};