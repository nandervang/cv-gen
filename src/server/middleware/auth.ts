import type { Request, Response, NextFunction } from 'express'

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  // In development, we'll be more lenient with API key requirements
  const isDevelopment = process.env.NODE_ENV !== 'production'
  const expectedApiKey = process.env.CV_API_KEY || 'dev-api-key-12345'
  const providedApiKey = req.headers['x-api-key']

  if (isDevelopment && !providedApiKey) {
    // In development, allow requests without API key
    console.log('⚠️ API request without key (allowed in development)')
    return next()
  }

  if (!providedApiKey) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'MISSING_API_KEY',
        message: 'API key is required. Provide it in the X-API-Key header.'
      },
      timestamp: new Date().toISOString()
    })
  }

  if (providedApiKey !== expectedApiKey) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_API_KEY',
        message: 'Invalid API key provided.'
      },
      timestamp: new Date().toISOString()
    })
  }

  next()
}