// Helper functions for content generation
function generateHTMLContent(cvData) {
  const { personalInfo, summary, projects } = cvData;
  
  return `<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - ${personalInfo?.name || 'Unknown'}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; margin: -20px -20px 30px -20px; border-radius: 8px; }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .header h2 { font-size: 1.2em; font-weight: normal; opacity: 0.9; }
        .contact { margin-top: 15px; }
        .contact span { margin-right: 20px; }
        .section { margin-bottom: 30px; }
        .section h3 { color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; margin-bottom: 15px; }
        .project { background: #f8fafc; padding: 15px; margin-bottom: 15px; border-radius: 5px; border-left: 4px solid #3b82f6; }
        .period { color: #666; font-style: italic; }
        .tech-tag { background: #e0e7ff; color: #3730a3; padding: 2px 6px; margin: 2px; border-radius: 4px; font-size: 0.8em; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${personalInfo?.name || 'N/A'}</h1>
        <h2>${personalInfo?.title || 'N/A'}</h2>
        <div class="contact">
            ${personalInfo?.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
            ${personalInfo?.phone ? `<span>📞 ${personalInfo.phone}</span>` : ''}
        </div>
    </div>

    ${summary ? `<div class="section">
        <h3>Professionell Sammanfattning</h3>
        <p>${summary.introduction || ''}</p>
        ${summary.highlights ? `<ul>${summary.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
    </div>` : ''}

    ${projects?.length ? `<div class="section">
        <h3>Projekt</h3>
        ${projects.map(p => `<div class="project">
            <h4>${p.title || 'N/A'} <span class="period">(${p.period || 'N/A'})</span></h4>
            <p><strong>${p.type || ''}</strong></p>
            <p>${p.description || ''}</p>
            ${p.technologies ? `<div>${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>` : ''}
        </div>`).join('')}
    </div>` : ''}

    <div style="margin-top: 40px; text-align: center; color: #666; font-size: 0.9em;">
        Genererat ${new Date().toLocaleDateString('sv-SE')} • Template: ${cvData.template || 'modern'}
    </div>
</body>
</html>`;
}

function generatePDFContent(cvData) {
  const name = cvData.personalInfo?.name || 'Unknown';
  const title = cvData.personalInfo?.title || 'N/A';
  const email = cvData.personalInfo?.email || '';
  
  // Simple PDF structure with actual content
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
  /Font <<
    /F1 5 0 R
  >>
>>
>>
endobj

4 0 obj
<<
/Length 400
>>
stream
BT
/F1 18 Tf
50 720 Td
(${name}) Tj
0 -30 Td
/F1 14 Tf
(${title}) Tj
0 -25 Td
/F1 12 Tf
(${email}) Tj
0 -40 Td
(CV genererat: ${new Date().toLocaleDateString('sv-SE')}) Tj
0 -20 Td
(Template: ${cvData.template || 'modern'}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000726 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
797
%%EOF`;
  
  return btoa(pdfContent);
}

function generateDOCXContent(cvData) {
  const { personalInfo, summary, projects } = cvData;
  
  return `${personalInfo?.name || 'N/A'}
${personalInfo?.title || 'N/A'}
${personalInfo?.email || ''}
${personalInfo?.phone || ''}

PROFESSIONELL SAMMANFATTNING
${summary?.introduction || ''}

${summary?.highlights ? summary.highlights.map(h => `• ${h}`).join('\n') : ''}

PROJEKT
${projects ? projects.map(p => `
${p.title || 'N/A'} (${p.period || 'N/A'})
${p.type || ''}
${p.description || ''}
Teknologier: ${p.technologies ? p.technologies.join(', ') : 'N/A'}
`).join('\n') : ''}

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
        const pdfContent = generatePDFContent(body);
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