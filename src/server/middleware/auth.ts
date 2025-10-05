import type { Request, Response, NextFunction } from 'express'

// Extend Express Request interface to include apiKey
declare global {
  namespace Express {
    interface Request {
      apiKey?: string
    }
  }
}

// Environment-based API key configuration
const API_KEY = process.env.CV_API_KEY || 'dev-api-key-12345'

export interface AuthRequest extends Request {
  apiKey: string
}

/**
 * API Key Authentication Middleware
 * Validates X-API-Key header for protected routes
 */
export function apiKeyAuth(req: Request, res: Response, next: NextFunction): void {
  const apiKey = req.header('X-API-Key')

  if (!apiKey) {
    res.status(401).json({
      success: false,
      error: {
        code: 'MISSING_API_KEY',
        message: 'API key is required'
      },
      timestamp: new Date().toISOString()
    })
    return
  }

  if (apiKey !== API_KEY) {
    res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_API_KEY',
        message: 'Invalid API key'
      },
      timestamp: new Date().toISOString()
    })
    return
  }

  // Store API key in request for rate limiting and logging
  req.apiKey = apiKey
  next()
}

/**
 * Optional API Key Authentication
 * For endpoints that can work with or without authentication
 */
export function optionalApiKeyAuth(req: Request, _res: Response, next: NextFunction): void {
  const apiKey = req.header('X-API-Key')
  
  if (apiKey) {
    if (apiKey === API_KEY) {
      req.apiKey = apiKey
    }
    // Continue regardless of validity for optional auth
  }
  
  next()
}