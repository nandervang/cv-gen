# CV Generation Backend API Documentation

## Overview

A production-ready **backend API** for professional CV generation built with Node.js/Express and TypeScript. Designed primarily for integration with external consultant management systems, featuring the **Andervang Consulting** template with Apple-inspired design.

## System Architecture

### **Primary: Backend API (Express + TypeScript - Port 3001)**
- **Stateless API Design**: No database dependencies for CV generation
- **Multi-Format Export**: HTML, PDF (via Puppeteer), DOCX with consistent styling
- **Featured Template**: Andervang Consulting with Apple-inspired design system
- **Template System**: Professional templates with extensive customization
- **Batch Processing**: Parallel generation for multiple formats/templates
- **Enterprise Security**: API key authentication, CORS, rate limiting
- **Type Safety**: Full TypeScript implementation with comprehensive interfaces

### **Secondary: Testing Frontend (React + Vite - Port 5173)**  
- **Development Purpose**: API validation and backend testing interface only
- **Template Preview**: Visual validation of CV generation capabilities
- **API Testing**: Comprehensive testing UI for all endpoints
- **Not for Production**: External applications handle user interfaces

## Quick Start

### Development Setup

```bash
# Install dependencies
npm install

# Start both servers (recommended)
npm run dev:full

# Or start individually
npm run dev:api    # Backend only (port 3001)
npm run dev        # Frontend only (port 5173)
```

### Production Build

```bash
# Build both frontend and API
npm run build
npm run build:api

# Start production servers
npm run start      # Frontend
npm run start:api  # Backend
```

## API Endpoints

### Base URL
```
Development: http://localhost:3001/api
Production: https://your-domain.com/api
```

### Authentication
All API requests require the `X-API-Key` header:
```
X-API-Key: dev-api-key-12345
```

### Available Endpoints

#### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "CV Generation API is running",
  "timestamp": "2025-10-06T09:22:52.872Z",
  "version": "1.0.0",
  "status": {
    "server": "healthy",
    "puppeteer": "ready",
    "templates": "loaded"
  }
}
```

#### 2. List Templates
```http
GET /api/templates
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "frank-digital",
      "name": "Frank Digital",
      "description": "Professional template based on Frank Digital AB style",
      "type": "corporate",
      "industryFocus": "Digital Agencies & Tech Companies",
      "features": ["Clean layout", "Skills matrix", "Project showcase"],
      "isPremium": false,
      "previewUrl": "/previews/frank-digital.jpg"
    }
  ]
}
```

#### 3. Generate CV
```http
POST /api/generate/complete
```

**Request Body:**
```json
{
  "personalInfo": {
    "name": "John Doe",
    "title": "Senior Developer",
    "email": "john@example.com",
    "phone": "+46 70 123 45 67",
    "location": "Stockholm, Sweden"
  },
  "summary": {
    "introduction": "Experienced developer with 5+ years...",
    "keyStrengths": ["React", "Node.js", "TypeScript"]
  },
  "experience": [
    {
      "company": "Tech Company",
      "position": "Senior Developer",
      "period": "2020-2025",
      "description": "Led development of...",
      "technologies": ["React", "Node.js"],
      "achievements": ["Improved performance by 40%"]
    }
  ],
  "template": "frank-digital",
  "format": "pdf"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "fileUrl": "https://storage.supabase.co/..../cv.pdf",
    "format": "pdf",
    "template": "frank-digital",
    "generatedAt": "2025-10-06T09:30:00.000Z"
  }
}
```

#### 4. Template Customization
```http
POST /api/customization/preview
```

**Request Body:**
```json
{
  "templateId": "modern",
  "customization": {
    "colorScheme": "blue-professional",
    "fontFamily": "inter",
    "fontSize": "medium",
    "spacing": "normal",
    "customColors": {
      "primaryColor": "#2563eb",
      "accentColor": "#1d4ed8"
    }
  }
}
```

#### 5. Batch Generation - All Formats
```http
POST /api/batch/formats
```

**Request Body:** (Same as generate/complete but without format field)
```json
{
  "personalInfo": { ... },
  "template": "frank-digital"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "template": "frank-digital",
    "results": {
      "html": {
        "success": true,
        "fileUrl": "https://..../cv.html",
        "generatedAt": "2025-10-06T09:30:00.000Z"
      },
      "pdf": {
        "success": true,
        "fileUrl": "https://..../cv.pdf",
        "generatedAt": "2025-10-06T09:30:01.000Z"
      },
      "docx": {
        "success": true,
        "fileUrl": "https://..../cv.docx",
        "generatedAt": "2025-10-06T09:30:02.000Z"
      }
    },
    "summary": {
      "total": 3,
      "successful": 3,
      "failed": 0
    }
  }
}
```

#### 6. Batch Generation - All Templates & Formats
```http
POST /api/batch/comprehensive
```

**Response:** Returns results for all 4 templates × 3 formats (12 combinations)

## Available Templates

### 1. **Andervang Consulting** ⭐ **Featured**
- **ID**: `andervang-consulting`
- **Type**: Professional Consulting 
- **Design**: Apple-inspired with clean, modern aesthetics
- **Color System**: Dark blue primary (#003D82) with vibrant orange accents (#FF6B35)
- **Best For**: Consulting professionals, senior roles, modern businesses
- **Key Features**:
  - Distinctive orange gradient employment sections
  - Interactive hover effects and visual hierarchy
  - WCAG AA compliant accessibility
  - Optimized content density with excellent readability
  - Section dividers and professional polish

### 2. Modern Professional
- **ID**: `modern`
- **Type**: Tech/Minimalist
- **Best For**: Tech professionals, startups, developers
- **Features**: Modern typography, clean sections, tech focus

### 3. Classic Executive  
- **ID**: `classic`
- **Type**: Traditional/Executive
- **Best For**: Senior positions, traditional industries
- **Features**: Professional layout, executive summary, formal style

### 4. Creative Portfolio
- **ID**: `creative` 
- **Type**: Creative/Design
- **Best For**: Designers, creative professionals
- **Features**: Visual elements, portfolio sections, creative layout

## Customization Options

### Color Schemes
- `blue-professional`, `green-tech`, `purple-creative`, `red-dynamic`
- `orange-warm`, `teal-modern`, `indigo-corporate`, `pink-creative`
- `gray-minimal`, `emerald-fresh`, `amber-energetic`, `rose-elegant`

### Font Families
- `inter`, `roboto`, `open-sans`, `lato`, `georgia`, `times`

### Font Sizes
- `small`, `medium`, `large`

### Spacing
- `compact`, `normal`, `relaxed`

## Data Model

### Complete CV Data Structure
```typescript
interface CompleteCVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    location?: string;
    linkedIn?: string;
    github?: string;
    website?: string;
  };
  summary: {
    introduction: string;
    keyStrengths?: string[];
    careerObjective?: string;
  };
  experience?: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
    technologies?: string[];
    achievements?: string[];
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    field: string;
    period: string;
    gpa?: string;
  }>;
  skills?: Array<{
    category: string;
    items: string[];
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }>;
  languages?: Array<{
    language: string;
    proficiency: string;
  }>;
  template: string;
  format: 'html' | 'pdf' | 'docx';
}
```

## Rate Limiting

### Development Limits
- **General API**: 1000 requests per 15 minutes
- **Generation Endpoints**: 50 requests per 1 minute

### Production Recommendations
- **General API**: 100 requests per 15 minutes
- **Generation Endpoints**: 10 requests per 5 minutes

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  },
  "timestamp": "2025-10-06T09:30:00.000Z"
}
```

### Common Error Codes
- `INVALID_API_KEY`: Missing or invalid API key
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `VALIDATION_ERROR`: Invalid request data
- `TEMPLATE_NOT_FOUND`: Invalid template ID
- `GENERATION_ERROR`: PDF/DOCX generation failed
- `INTERNAL_SERVER_ERROR`: Unexpected server error

## Testing

### Contract Tests
```bash
npm run test:contract
```

### Integration Tests
```bash
npm run test:integration
```

### Watch Mode
```bash
npm run test:watch
```

## Performance

### Expected Performance
- **CV Generation**: < 5 seconds per document
- **Batch Generation**: < 30 seconds for all formats
- **API Response Time**: < 100ms for non-generation endpoints

### Optimization Tips
- Use appropriate format for use case (HTML fastest, PDF most compatible)
- Minimize data payload size for faster processing
- Use batch endpoints for multiple generations
- Implement client-side caching for templates

## Security

### API Key Management
- Development: `dev-api-key-12345`
- Production: Generate secure API keys
- Rotate keys regularly
- Use environment variables

### CORS Configuration
- Configured for development origins
- Update for production domains
- Whitelist specific origins only

### File Storage
- Generated files stored securely
- Signed URLs for access control
- Automatic cleanup policies recommended

## Deployment

### Environment Variables
```bash
# Required
NODE_ENV=production
PORT=3001
API_KEY=your-secure-api-key

# Optional (for Supabase integration)
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-key
```

### Production Checklist
- [ ] Update API keys
- [ ] Configure CORS origins
- [ ] Set production rate limits
- [ ] Enable file cleanup
- [ ] Configure monitoring
- [ ] Test all endpoints
- [ ] Load testing completed

## Support

### Troubleshooting
1. **Server won't start**: Check port 3001 availability
2. **Generation fails**: Verify Puppeteer installation
3. **Rate limiting**: Check request frequency
4. **CORS errors**: Verify origin configuration

### Monitoring
- Health endpoint: `/health`
- Error logs: Check server console
- Performance: Monitor generation times
- Rate limiting: Track request patterns