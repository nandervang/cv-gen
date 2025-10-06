import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

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

// Simple mock responses for now to test connectivity
app.get('/api/templates', (req, res) => {
  res.json({
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
  });
});

app.get('/api/customization/options', (req, res) => {
  res.json({
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
  });
});

app.post('/api/generate/complete', (req, res) => {
  // Mock CV generation response
  res.json({
    success: true,
    data: {
      fileUrl: 'https://example.com/mock-cv.pdf',
      format: 'pdf',
      generatedAt: new Date().toISOString(),
      template: req.body.template || 'modern'
    }
  });
});

app.post('/api/batch/formats', (req, res) => {
  // Mock batch generation response
  res.json({
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
  });
});

app.post('/api/batch/comprehensive', (req, res) => {
  // Mock comprehensive batch response
  res.json({
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
  });
});

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