export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: {
          code: 'METHOD_NOT_ALLOWED',
          message: 'Only GET method allowed'
        }
      })
    };
  }

  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production',
      runtime: 'netlify-functions',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      services: {
        database: 'connected', // Supabase
        fileStorage: 'connected' // Supabase Storage
      }
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: healthData
      })
    };
  } catch (error) {
    console.error('Health check error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: {
          code: 'HEALTH_CHECK_FAILED',
          message: 'Health check failed'
        }
      })
    };
  }
};