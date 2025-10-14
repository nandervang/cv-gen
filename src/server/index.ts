import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { cvGenerationService } from './services/CVGenerationService.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.get('/health', (_req: express.Request, res: express.Response) => {
  res.json({
    success: true,
    message: 'CV Generation API is running',
    timestamp: new Date().toISOString()
  })
})

app.get('/api/templates', (_req: express.Request, res: express.Response) => {
  const templates = [
    {
      id: 'andervang-consulting',
      name: 'Andervang Consulting',
      description: 'Professional template with Apple-inspired design and orange accent colors',
      category: 'professional',
      features: ['PDF Export', 'HTML Export', 'Professional Layout', 'Orange Accents']
    }
  ]
  
  res.json({
    success: true,
    data: templates,
    count: templates.length
  })
})

// Download endpoint for generated files
app.get('/api/download/:filename', (req: express.Request, res: express.Response) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../downloads', filename);
    
    // Security: Only allow PDF files and prevent directory traversal
    if (!filename.endsWith('.pdf') || filename.includes('..')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid file request'
      });
    }

    res.download(filepath, filename, (err: Error | null) => {
      if (err) {
        console.error('Download error:', err);
        res.status(404).json({
          success: false,
          error: 'File not found'
        });
      }
    });
  } catch (error) {
    console.error('Download endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Download failed'
    });
  }
})

// Test endpoint with full CV data - now uses frontend data!
app.post('/api/generate-real', async (req: express.Request, res: express.Response) => {
  try {
    console.log('🎯 Generating CV with uploaded data...')
    
    const format = req.body.format || 'pdf';
    const templateId = req.body.template || 'andervang-consulting';
    
    // Use the CV data sent from frontend (including uploaded image!)
    const cvData = {
      ...req.body, // This includes all the data from the frontend
      template: templateId,
      format: format
    };

    // Log image upload status
    const hasProfileImage = !!cvData.personalInfo?.profileImage;
    const imageSize = hasProfileImage ? 
      `${(cvData.personalInfo.profileImage.length / 1024).toFixed(1)} KB` : 
      'No image';
    
    console.log('📊 CV Data received:', {
      name: cvData.personalInfo?.name,
      hasProfileImage,
      imageSize,
      template: templateId,
      format: format
    });
    
    // If requesting PDF, generate and send directly as download
    if (format === 'pdf') {
      await cvGenerationService.generatePDFDirectWithData(res, cvData, templateId);
      return; // Response already sent by generatePDFDirectWithData
    }
    
    console.log('🎨 Generating CV with user data...')
    const result = await cvGenerationService.generateCV(cvData, templateId, format)
    
    res.json(result)
  } catch (error) {
    console.error('❌ CV generation error:', error)
    res.status(500).json({
      success: false,
      error: 'CV generation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

app.post('/api/generate', async (req: express.Request, res: express.Response) => {
  try {
    console.log('🎯 CV generation request received')
    const { templateId = 'andervang-consulting', format = 'pdf', ...cvData } = req.body
    
    if (!cvData.personalInfo?.name) {
      return res.status(400).json({
        success: false,
        error: 'Invalid CV data: personalInfo.name is required'
      })
    }

    console.log(`🎨 Generating CV: template=${templateId}, format=${format}`)
    const result = await cvGenerationService.generateCV(cvData, templateId, format)
    
    res.json(result)
  } catch (error) {
    console.error('❌ Generation error:', error)
    res.status(500).json({
      success: false,
      error: 'CV generation failed'
    })
  }
})

const server = app.listen(PORT, () => {
  console.log('🚀 CV Generation API server running on port', PORT)
  console.log('📖 Health check: http://localhost:' + PORT + '/health')
  console.log('🎯 Templates: http://localhost:' + PORT + '/api/templates')
})

// Handle server errors
server.on('error', (error: Error) => {
  console.error('❌ Server error:', error)
})

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...')
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Server terminated')
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})
