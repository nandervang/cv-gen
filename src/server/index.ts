import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { cvRoutes } from './routes/cvRoutes'
import { templateRoutes } from './routes/templateRoutes'
import { generateRoutes } from './routes/generateRoutes'

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false // Allow inline styles for generated CVs
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    }
  }
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
    }
  }
})

// Middleware
app.use(cors())
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(limiter)

// Health check
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'CV Generation API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// API Routes
app.use('/api/cvs', cvRoutes)
app.use('/api/templates', templateRoutes)
app.use('/api/generate', generateLimiter, generateRoutes)

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('API Error:', err)
  
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    },
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Endpoint ${req.originalUrl} not found`
    },
    timestamp: new Date().toISOString()
  })
})

export function startAPIServer() {
  return new Promise<void>((resolve) => {
    app.listen(PORT, () => {
      console.log(`🚀 CV Generation API server running on port ${PORT}`)
      console.log(`📖 Health check: http://localhost:${PORT}/health`)
      console.log(`🎯 API Base URL: http://localhost:${PORT}/api`)
      resolve()
    })
  })
}

export { app }

// Start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startAPIServer().catch((error) => {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  })
}