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
    // Netlify passes the full path including /api/ prefix
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
      
      // Generate HTML content from the CV data
      const generateHTML = (cvData, template, styling = {}) => {
        const { personalInfo, summary, projects, employment, education, certifications, competencies, languages } = cvData;
        
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - ${personalInfo?.name || 'Unknown'}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; margin: -20px -20px 30px -20px; }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .header h2 { font-size: 1.2em; font-weight: normal; opacity: 0.9; }
        .contact { margin-top: 15px; }
        .contact span { margin-right: 20px; }
        .section { margin-bottom: 30px; }
        .section h3 { color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; margin-bottom: 15px; }
        .summary-intro { font-size: 1.1em; margin-bottom: 15px; }
        .highlights, .specialties { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0; }
        .highlight-item, .specialty-item { background: #f8fafc; padding: 10px; border-left: 4px solid #3b82f6; }
        .project, .employment-item, .education-item, .cert-item { margin-bottom: 20px; padding: 15px; background: #f8fafc; border-radius: 5px; }
        .project-header, .employment-header, .education-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px; }
        .project-title, .employment-title, .education-title { font-weight: bold; color: #1e40af; }
        .period { color: #666; font-size: 0.9em; }
        .tech-tags { margin-top: 10px; }
        .tech-tag { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 3px 8px; margin: 2px; border-radius: 12px; font-size: 0.8em; }
        .competencies { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
        .competency-category { background: #f8fafc; padding: 15px; border-radius: 5px; }
        .competency-title { font-weight: bold; color: #1e40af; margin-bottom: 10px; }
        .skills { display: flex; flex-wrap: wrap; gap: 5px; }
        .skill { background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 8px; font-size: 0.8em; }
        .languages { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
        .language { background: #f8fafc; padding: 10px; border-radius: 5px; }
        .template-${template} .header { background: linear-gradient(135deg, ${styling.primaryColor || '#1e40af'}, ${styling.accentColor || '#3b82f6'}); }
    </style>
</head>
<body class="template-${template}">
    <div class="header">
        <h1>${personalInfo?.name || 'N/A'}</h1>
        <h2>${personalInfo?.title || 'N/A'}</h2>
        <div class="contact">
            ${personalInfo?.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
            ${personalInfo?.phone ? `<span>📞 ${personalInfo.phone}</span>` : ''}
            ${personalInfo?.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
        </div>
    </div>

    ${summary ? `
    <div class="section">
        <h3>Professionell Sammanfattning</h3>
        <div class="summary-intro">${summary.introduction || ''}</div>
        ${summary.highlights ? `
        <div class="highlights">
            ${summary.highlights.map(highlight => `<div class="highlight-item">${highlight}</div>`).join('')}
        </div>` : ''}
        ${summary.specialties ? `
        <h4>Specialiteter:</h4>
        <div class="specialties">
            ${summary.specialties.map(specialty => `<div class="specialty-item">${specialty}</div>`).join('')}
        </div>` : ''}
    </div>` : ''}

    ${projects && projects.length > 0 ? `
    <div class="section">
        <h3>Projekt & Uppdrag</h3>
        ${projects.map(project => `
        <div class="project">
            <div class="project-header">
                <div>
                    <div class="project-title">${project.title || 'N/A'}</div>
                    <div style="font-style: italic; color: #666;">${project.type || ''}</div>
                </div>
                <div class="period">${project.period || ''}</div>
            </div>
            <div>${project.description || ''}</div>
            ${project.technologies ? `
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>` : ''}
        </div>`).join('')}
    </div>` : ''}

    ${employment && employment.length > 0 ? `
    <div class="section">
        <h3>Anställningshistorik</h3>
        ${employment.map(job => `
        <div class="employment-item">
            <div class="employment-header">
                <div>
                    <div class="employment-title">${job.position || 'N/A'}</div>
                    <div style="font-weight: bold;">${job.company || ''}</div>
                </div>
                <div class="period">${job.period || ''}</div>
            </div>
            <div>${job.description || ''}</div>
            ${job.technologies ? `
            <div class="tech-tags">
                ${job.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>` : ''}
        </div>`).join('')}
    </div>` : ''}

    ${education && education.length > 0 ? `
    <div class="section">
        <h3>Utbildning</h3>
        ${education.map(edu => `
        <div class="education-item">
            <div class="education-header">
                <div>
                    <div class="education-title">${edu.degree || 'N/A'}</div>
                    <div>${edu.institution || ''}</div>
                </div>
                <div class="period">${edu.period || ''}</div>
            </div>
            ${edu.specialization ? `<div>${edu.specialization}</div>` : ''}
        </div>`).join('')}
    </div>` : ''}

    ${certifications && certifications.length > 0 ? `
    <div class="section">
        <h3>Certifieringar</h3>
        ${certifications.map(cert => `
        <div class="cert-item">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <div style="font-weight: bold;">${cert.title || 'N/A'}</div>
                    <div>${cert.issuer || ''}</div>
                </div>
                <div class="period">${cert.year || ''}</div>
            </div>
            ${cert.description ? `<div style="margin-top: 5px;">${cert.description}</div>` : ''}
        </div>`).join('')}
    </div>` : ''}

    ${competencies && competencies.length > 0 ? `
    <div class="section">
        <h3>Kompetenser</h3>
        <div class="competencies">
            ${competencies.map(comp => `
            <div class="competency-category">
                <div class="competency-title">${comp.category || 'N/A'}</div>
                <div class="skills">
                    ${comp.skills ? comp.skills.map(skill => `<span class="skill">${typeof skill === 'string' ? skill : skill.name}</span>`).join('') : ''}
                </div>
            </div>`).join('')}
        </div>
    </div>` : ''}

    ${languages && languages.length > 0 ? `
    <div class="section">
        <h3>Språk</h3>
        <div class="languages">
            ${languages.map(lang => `
            <div class="language">
                <strong>${lang.language || 'N/A'}</strong>: ${lang.proficiency || 'N/A'}
            </div>`).join('')}
        </div>
    </div>` : ''}

    <div style="margin-top: 40px; text-align: center; color: #666; font-size: 0.9em;">
        Genererat ${new Date().toLocaleDateString('sv-SE')} • Template: ${template}
    </div>
</body>
</html>`;
      };

      const htmlContent = generateHTML(body, body.template || 'modern', body.styling || {});
      
      // For now, return the HTML as base64. In a real implementation, you'd use Puppeteer to convert to PDF
      const format = body.format || 'pdf';
      let fileContent = '';
      let mimeType = '';
      
      if (format === 'html') {
        fileContent = btoa(unescape(encodeURIComponent(htmlContent)));
        mimeType = 'text/html';
      } else if (format === 'pdf') {
        // TODO: Use Puppeteer to convert HTML to PDF
        // For now, return the HTML content
        fileContent = btoa(unescape(encodeURIComponent(htmlContent)));
        mimeType = 'text/html'; // Will be PDF when Puppeteer is implemented
      } else if (format === 'docx') {
        // Simple text version for DOCX
        const textContent = `${body.personalInfo?.name || 'N/A'}\n${body.personalInfo?.title || 'N/A'}\n\nGenererat: ${new Date().toLocaleString()}`;
        fileContent = btoa(textContent);
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
            template: body.template || 'modern',
            note: format === 'pdf' ? 'HTML version - PDF generation with Puppeteer coming soon' : 'Generated with actual CV data'
          }
        })
      };
    }

    if (path === '/batch/formats' && method === 'POST') {
      // Generate mock files as base64 data URLs
      const mockPdfContent = 'JVBERi0xLjQKJcOkw7zDtsKwCjIgMCBvYmoKPDwKL0xlbmd0aCA2OQAKL0ZpbHRlciBbL0FTQ0lJODVEZWNvZGVdCj4+CnN0cmVhbQpCVDA9QkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCCmVuZHN0cmVhbQplbmRvYmoKCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCA0IDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgMiAwIFIKPj4KZW5kb2JqCgo0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFJdCi9Db3VudCAxCj4+CmVuZG9iagoKNSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgNCAwIFIKPj4KZW5kb2JqCgp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYKMDAwMDAwMDAwOSAwMDAwMCBuCjAwMDAwMDAxMDcgMDAwMDAgbgowMDAwMDAwMTU4IDAwMDAwIG4KMDAwMDAwMDIxNiAwMDAwMCBuCjAwMDAwMDAyNzMgMDAwMDAgbgp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgNSAwIFIKPj4Kc3RhcnR4cmVmCjMyMgolJUVPRgo=';
      const htmlContent = btoa('<!DOCTYPE html><html><head><title>Batch CV</title></head><body><h1>Demo Batch CV</h1><p>Generated: ' + new Date().toLocaleString() + '</p></body></html>');
      const docxContent = btoa('Demo Batch CV\nGenerated: ' + new Date().toLocaleString());
      
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
            results: {
              pdf: {
                success: true,
                fileUrl: `data:application/pdf;base64,${mockPdfContent}`,
                generatedAt: new Date().toISOString()
              },
              html: {
                success: true,
                fileUrl: `data:text/html;base64,${htmlContent}`,
                generatedAt: new Date().toISOString()
              },
              docx: {
                success: true,
                fileUrl: `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${docxContent}`,
                generatedAt: new Date().toISOString()
              }
            }
          }
        })
      };
    }

    if (path === '/batch/comprehensive' && method === 'POST') {
      // Generate mock files as base64 data URLs for each template
      const mockPdfContent = 'JVBERi0xLjQKJcOkw7zDtsKwCjIgMCBvYmoKPDwKL0xlbmd0aCA2OQAKL0ZpbHRlciBbL0FTQ0lJODVEZWNvZGVdCj4+CnN0cmVhbQpCVDA9QkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCCmVuZHN0cmVhbQplbmRvYmoKCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCA0IDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgMiAwIFIKPj4KZW5kb2JqCgo0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFJdCi9Db3VudCAxCj4+CmVuZG9iagoKNSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgNCAwIFIKPj4KZW5kb2JqCgp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYKMDAwMDAwMDAwOSAwMDAwMCBuCjAwMDAwMDAxMDcgMDAwMDAgbgowMDAwMDAwMTU4IDAwMDAwIG4KMDAwMDAwMDIxNiAwMDAwMCBuCjAwMDAwMDAyNzMgMDAwMDAgbgp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgNSAwIFIKPj4Kc3RhcnR4cmVmCjMyMgolJUVPRgo=';
      
      const generateFileUrls = (templateName) => ({
        pdf: { success: true, fileUrl: `data:application/pdf;base64,${mockPdfContent}` },
        html: { success: true, fileUrl: `data:text/html;base64,${btoa(`<!DOCTYPE html><html><head><title>${templateName} CV</title></head><body><h1>Demo ${templateName} CV</h1><p>Generated: ${new Date().toLocaleString()}</p></body></html>`)}` },
        docx: { success: true, fileUrl: `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${btoa(`Demo ${templateName} CV\nGenerated: ${new Date().toLocaleString()}`)}` }
      });
      
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
            results: {
              'frank-digital': generateFileUrls('Frank Digital'),
              modern: generateFileUrls('Modern'),
              classic: generateFileUrls('Classic'),
              creative: generateFileUrls('Creative')
            }
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