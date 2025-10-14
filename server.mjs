import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { cvGenerationService } from './src/server/services/CVGenerationService.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'CV Generation API'
  });
});

// Templates endpoint
app.get('/api/templates', (req, res) => {
  const templates = [
    {
      id: 'andervang-consulting',
      name: 'Andervang Consulting',
      description: 'Professional template with Apple-inspired design and orange accent colors',
      category: 'professional',
      features: ['PDF Export', 'HTML Export', 'Professional Layout', 'Orange Accents'],
      preview: '/images/templates/andervang-consulting-preview.jpg'
    }
  ];
  
  res.json(templates);
});

// CV Generation endpoint
app.post('/api/generate-cv', async (req, res) => {
  try {
    console.log('Generating real CV with data:', req.body);
    
    const { templateId = 'andervang-consulting', format = 'pdf' } = req.body;
    const cvData = req.body;
    
    if (!cvData || !cvData.personalInfo) {
      return res.status(400).json({
        success: false,
        error: 'Invalid CV data provided'
      });
    }

    const result = await cvGenerationService.generateCV(cvData, templateId, format);
    
    if (!result.success) {
      return res.status(500).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('CV generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Test CV Generation endpoint
app.post('/api/test-cv', async (req, res) => {
  try {
    console.log('Testing CV generation...');
    const result = await cvGenerationService.testGeneration();
    res.json(result);
  } catch (error) {
    console.error('Test CV generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Test generation failed',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/api/health`);
  console.log(`Templates: http://localhost:${port}/api/templates`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  await cvGenerationService.cleanup();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  await cvGenerationService.cleanup();
  process.exit(0);
});
