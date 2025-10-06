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
    const path = event.path.replace('/.netlify/functions/api', '');
    const method = event.httpMethod;
    
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
            colorSchemes: [
              'blue-professional', 'green-tech', 'purple-creative', 'red-dynamic',
              'orange-warm', 'teal-modern', 'indigo-corporate', 'pink-creative',
              'gray-minimal', 'emerald-fresh', 'amber-energetic', 'rose-elegant'
            ],
            fontFamilies: ['inter', 'roboto', 'open-sans', 'lato', 'georgia', 'times'],
            fontSizes: ['small', 'medium', 'large'],
            spacings: ['compact', 'normal', 'relaxed']
          }
        })
      };
    }

    if (path === '/generate/complete' && method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            fileUrl: 'https://example.com/mock-cv.pdf',
            format: 'pdf',
            generatedAt: new Date().toISOString(),
            template: body.template || 'modern'
          }
        })
      };
    }

    if (path === '/batch/formats' && method === 'POST') {
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
                fileUrl: 'https://example.com/mock-cv.pdf',
                generatedAt: new Date().toISOString()
              },
              html: {
                success: true,
                fileUrl: 'https://example.com/mock-cv.html',
                generatedAt: new Date().toISOString()
              },
              docx: {
                success: true,
                fileUrl: 'https://example.com/mock-cv.docx',
                generatedAt: new Date().toISOString()
              }
            }
          }
        })
      };
    }

    if (path === '/batch/comprehensive' && method === 'POST') {
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
              'frank-digital': {
                pdf: { success: true, fileUrl: 'https://example.com/frank-digital.pdf' },
                html: { success: true, fileUrl: 'https://example.com/frank-digital.html' },
                docx: { success: true, fileUrl: 'https://example.com/frank-digital.docx' }
              },
              modern: {
                pdf: { success: true, fileUrl: 'https://example.com/modern.pdf' },
                html: { success: true, fileUrl: 'https://example.com/modern.html' },
                docx: { success: true, fileUrl: 'https://example.com/modern.docx' }
              },
              classic: {
                pdf: { success: true, fileUrl: 'https://example.com/classic.pdf' },
                html: { success: true, fileUrl: 'https://example.com/classic.html' },
                docx: { success: true, fileUrl: 'https://example.com/classic.docx' }
              },
              creative: {
                pdf: { success: true, fileUrl: 'https://example.com/creative.pdf' },
                html: { success: true, fileUrl: 'https://example.com/creative.html' },
                docx: { success: true, fileUrl: 'https://example.com/creative.docx' }
              }
            }
          }
        })
      };
    }

    // 404 for unknown routes
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: {
          code: 'NOT_FOUND',
          message: `Route ${path} not found`
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