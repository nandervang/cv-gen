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
      
      // Generate a simple PDF as base64 (mock implementation)
      const mockPdfContent = 'JVBERi0xLjQKJcOkw7zDtsKwCjIgMCBvYmoKPDwKL0xlbmd0aCA2OQAKL0ZpbHRlciBbL0FTQ0lJODVEZWNvZGVdCj4+CnN0cmVhbQpCVDA9QkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCCmVuZHN0cmVhbQplbmRvYmoKCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCA0IDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgMiAwIFIKPj4KZW5kb2JqCgo0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFJdCi9Db3VudCAxCj4+CmVuZG9iagoKNSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgNCAwIFIKPj4KZW5kb2JqCgp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYKMDAwMDAwMDAwOSAwMDAwMCBuCjAwMDAwMDAxMDcgMDAwMDAgbgowMDAwMDAwMTU4IDAwMDAwIG4KMDAwMDAwMDIxNiAwMDAwMCBuCjAwMDAwMDAyNzMgMDAwMDAgbgp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgNSAwIFIKPj4Kc3RhcnR4cmVmCjMyMgolJUVPRgo=';
      
      const format = body.format || 'pdf';
      let fileContent = '';
      let mimeType = '';
      
      if (format === 'pdf') {
        fileContent = mockPdfContent;
        mimeType = 'application/pdf';
      } else if (format === 'html') {
        const htmlContent = `<!DOCTYPE html>
<html><head><title>CV - ${body.template || 'modern'}</title></head>
<body><h1>Demo CV</h1><p>Template: ${body.template || 'modern'}</p><p>Generated: ${new Date().toLocaleString()}</p></body></html>`;
        fileContent = btoa(htmlContent);
        mimeType = 'text/html';
      } else if (format === 'docx') {
        // Simple mock DOCX (actually just a text file)
        const docContent = `Demo CV\nTemplate: ${body.template || 'modern'}\nGenerated: ${new Date().toLocaleString()}`;
        fileContent = btoa(docContent);
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
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
            note: 'Demo file generated as base64 data URL'
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