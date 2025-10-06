import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { apiKeyAuth } from './middleware/auth'
import { templateRoutes } from './routes/templateRoutes'
import { generateRoutes } from './routes/generateRoutes'

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false // Allow inline styles for generated CVs
}))

// CORS configuration for external frontend access
app.use(cors({
  origin: process.env.CORS_ORIGIN || true, // Allow all origins in development
  credentials: false, // No cookies needed for stateless API
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-API-Key']
}))

// Logging middleware
app.use(morgan('combined'))

// Body parsing middleware
app.use(express.json({ limit: '1mb' })) // Smaller limit for simple payloads
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

// Rate limiting for general API access
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    },
    timestamp: new Date().toISOString()
  },
  standardHeaders: true,
  legacyHeaders: false
})

// Stricter rate limiting for generation endpoints
const generateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // limit each IP to 10 generations per 5 minutes
  message: {
    success: false,
    error: {
      code: 'GENERATION_RATE_LIMIT',
      message: 'Too many generation requests, please try again later'
    },
    timestamp: new Date().toISOString()
  },
  standardHeaders: true,
  legacyHeaders: false
})

// Apply general rate limiting to all routes
app.use(generalLimiter)

// Health check endpoint (no authentication required)
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'CV Generation API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    status: {
      server: 'healthy',
      puppeteer: 'ready',
      templates: 'loaded'
    }
  })
})

// API Routes with authentication
app.use('/api/templates', apiKeyAuth, templateRoutes)
app.use('/api/generate', apiKeyAuth, generateLimiter, (req, _res, next) => {
  console.log('DEBUG: /api/generate route hit:', { method: req.method, body: req.body })
  next()
}, generateRoutes)

// Global error handling middleware
app.use((err: Error & { status?: number; code?: string }, _req: express.Request, res: express.Response) => {
  console.error('API Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString()
  })
  
  // Don't expose internal errors in production
  const isProduction = process.env.NODE_ENV === 'production'
  
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: isProduction && !err.status ? 'An unexpected error occurred' : err.message
    },
    timestamp: new Date().toISOString()
  })
})

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Endpoint ${req.method} ${req.originalUrl} not found`
    },
    timestamp: new Date().toISOString()
  })
})

export function startAPIServer() {
  return new Promise<void>((resolve) => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 CV Generation API server running on port ${PORT}`)
      console.log(`📖 Health check: http://localhost:${PORT}/health`)
      console.log(`🎯 API Base URL: http://localhost:${PORT}/api`)
      console.log(`🔑 API Key: ${process.env.CV_API_KEY || 'dev-api-key-12345'}`)
      console.log(`📋 Available endpoints:`)
      console.log(`   GET  /api/templates - List available CV templates`)
      console.log(`   POST /api/generate  - Generate CV from payload`)
      resolve()
    })
    
    // Keep server running until explicitly stopped
    return server
  })
}

export { app }

// Only start the server if we're not in test mode
const isTest = process.env.NODE_ENV === 'test'

// Start the server if this file is run directly and not in test mode
if (!isTest) {
  console.log('🔧 Starting stateless CV generation server...')
  
  // Keep the process alive and handle graceful shutdown
  startAPIServer()
    .then(() => {
      console.log('✅ Server started successfully')
    })
    .catch((error) => {
      console.error('❌ Failed to start server:', error)
      process.exit(1)
    })
  
  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM signal, shutting down gracefully...')
    process.exit(0)
  })
  
  process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT signal, shutting down gracefully...')
    process.exit(0)
  })
}