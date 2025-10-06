import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// Import your existing routes
import { cvRoutes } from '../../src/server/routes/cvRoutes.js';
import { templateRoutes } from '../../src/server/routes/templateRoutes.js';
import { generateRoutes } from '../../src/server/routes/generateRoutes.js';
import { customizationRoutes } from '../../src/server/routes/customizationRoutes.js';

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for PDF generation
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://andervang-cv.netlify.app',
    /\.netlify\.app$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
}));

// Rate limiting (more lenient for serverless)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // More generous for serverless
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP, please try again later.'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API key validation
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validKeys = [
    process.env.CV_API_KEY,
    process.env.VITE_CV_API_KEY,
    'dev-api-key-12345' // Development fallback
  ].filter(Boolean);

  if (!apiKey || !validKeys.includes(apiKey)) {
    return res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Valid API key required'
      }
    });
  }
  next();
};

// Apply API key validation to protected routes
app.use('/api', validateApiKey);

// Routes
app.use('/api/cvs', cvRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/customization', customizationRoutes);
app.use('/api', generateRoutes);

// Error handling
app.use((error, req, res, _next) => {
  console.error('API Error:', error);
  
  const statusCode = error.statusCode || error.status || 500;
  const message = error.message || 'Internal server error';
  
  res.status(statusCode).json({
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.originalUrl} not found`
    }
  });
});

// Export for Netlify Functions
export const handler = serverless(app);