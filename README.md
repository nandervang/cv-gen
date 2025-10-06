# CV Generation Backend API

A comprehensive RESTful API for creating, managing, and generating professional CVs with multiple templates and formats. Built with Express, TypeScript, Supabase, and Puppeteer.

## 🚀 Features

- **RESTful API** for CV management and generation
- **Multiple CV Templates** (Frank Digital, Modern, Classic, Creative)
- **PDF Generation** using Puppeteer with high-quality output
- **Complete CV Data Structure** supporting projects, education, certifications, skills
- **Template Customization** with styling configurations
- **Multiple Output Formats** (PDF, HTML, DOCX)
- **Rate Limiting** and security middleware
- **Testing UI** for API development and testing

## 🏗️ Architecture

```
Frontend (React + Tailwind)  →  Backend API (Express)  →  Database (Supabase)
                                        ↓
                                 PDF Generation (Puppeteer)
                                        ↓
                                 File Storage (Supabase)
```

## 📖 Documentation

- **[Payload Documentation](README-PAYLOAD.md)** - Complete CV data structure and API payload format
- **[API Specification](docs/specification.md)** - Detailed API documentation
- **[Implementation Plan](specs/001-backend-api-stateless-generation/plan.md)** - Technical implementation details

## 📁 Project Structure

```
src/
├── components/              # React UI components (testing interface)
│   └── cv/
│       ├── CVManager.tsx    # Basic CV management
│       └── EnhancedCVTest.tsx # Frank Digital template testing
├── server/                  # Backend API server
│   ├── index.ts            # Main Express server
│   ├── routes/             # API route handlers
│   ├── services/           # Business logic (PDF generation)
│   ├── templates/          # CV template rendering
│   │   ├── frank-digital.ts # Frank Digital template
│   │   ├── modern.ts       # Modern template
│   │   └── mock-data.ts    # Test data
│   ├── types/              # TypeScript interfaces
│   └── lib/                # Server utilities
└── specs/                  # Technical specifications
```

## 🎨 CV Templates

### Frank Digital Template
Based on the Frank_Digital_AB_Niklas_Andervang_CV_2025.pdf example:
- **Features**: Company branding, profile image, technology tags, dotted section dividers
- **Style**: Purple accents (#6366f1), Inter font, single-column layout
- **Best for**: Consulting firms, digital agencies, modern tech companies

### Modern Template
- **Features**: Clean layout, structured sections, professional typography
- **Style**: Blue accents, minimal design, centered header
- **Best for**: Corporate environments, general business

### Classic Template
- **Features**: Traditional layout, conservative styling
- **Style**: Black and white, serif typography, formal structure
- **Best for**: Legal, academic, government positions

### Creative Template
- **Features**: Dynamic backgrounds, artistic layout, animations
- **Style**: Colorful gradients, modern typography
- **Best for**: Design, marketing, creative industries

## 🚦 Current Status

### ✅ Completed
- Enhanced CV data structure with complete template support
- Frank Digital template implementation (HTML/DOCX)
- Modern template with responsive design
- CVGenerationService supporting both simple and complete data
- EnhancedCVTest component for testing full payload
- Comprehensive payload documentation

### 🔧 In Progress
- Server startup debugging (exits immediately)
- Database migration execution
- API endpoint testing

### 📋 Next Steps
1. Debug server startup issue
2. Run database migrations
3. Test API endpoints with complete payload
4. Add DOCX generation library integration

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- Supabase account and project
- Git

### Installation

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd cv-gen
npm install
```

2. **Environment Configuration**
Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Server Configuration
PORT=3001
NODE_ENV=development

# Server-side Supabase (for API)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Database Setup**
Run these migrations in your Supabase SQL editor:
- `basic-cv-schema.sql` (already applied)
- `template-system-migration.sql` (needs to be run)

### Development

**Start API Server:**
```bash
npm run dev:api
```

**Start Frontend (separate terminal):**
```bash
npm run dev
```

**Test Enhanced CV Generation:**
1. Navigate to the Enhanced CV Test component
2. Use Frank Digital mock data (pre-filled)
3. Generate PDF, HTML, or DOCX
4. Download and review output

## 📚 API Documentation

### CV Data Structures

#### Simple CV Data (Basic Generation)
```typescript
{
  "name": "John Doe",
  "title": "Software Developer",
  "template": "modern",
  "format": "pdf"
}
```

#### Complete CV Data (Enhanced Generation)
```typescript
{
  "personalInfo": {
    "name": "Niklas Andervang",
    "title": "Senior front-end/fullstack utvecklare",
    "email": "niklas@example.se",
    "phone": "+46 70 123 45 67"
  },
  "summary": {
    "introduction": "Professional introduction...",
    "highlights": ["Key achievement 1", "Key achievement 2"],
    "specialties": ["React", "TypeScript", "WCAG"]
  },
  "projects": [
    {
      "period": "2024 - pågående",
      "type": "Frontend utvecklare",
      "title": "AI Project",
      "description": "Project description...",
      "technologies": ["React", "TypeScript", "Docker"]
    }
  ],
  "template": "frank-digital",
  "format": "pdf"
}
```

See **[README-PAYLOAD.md](README-PAYLOAD.md)** for complete data structure documentation.

### Base URL
```
http://localhost:3001/api
```

### Key Endpoints

#### Enhanced CV Generation
```http
POST /api/generate/complete
Content-Type: application/json

# Complete CV data payload (see README-PAYLOAD.md)
```

#### Simple CV Generation
```http
POST /api/generate
Content-Type: application/json

# Simple CV data payload
```

#### Templates
```http
GET /api/templates           # List available templates
```

### Response Format
```json
{
  "success": true,
  "data": {
    "fileUrl": "data:application/pdf;base64,JVBERi0xLjQ...",
    "format": "pdf",
    "template": "frank-digital",
    "generatedAt": "2025-10-04T10:30:00Z"
  },
  "timestamp": "2025-10-04T10:30:00Z"
}
```

## 🐛 Known Issues

1. **Server Startup**: Server logs successful startup but exits immediately
   - All code compiles correctly
   - Likely async initialization or module resolution issue

2. **Database**: Template migration not yet executed
   - Need to run `template-system-migration.sql`

## 🔧 Troubleshooting

### Server Won't Start
1. Check if port 3001 is available
2. Verify environment variables are set
3. Check for TypeScript compilation errors
4. Ensure all dependencies are installed

### Database Connection Issues
1. Verify Supabase URL and keys
2. Check network connectivity
3. Ensure RLS policies are correctly set

## 📝 Development Notes

- **TypeScript**: Strict mode enabled with comprehensive type definitions
- **Templates**: Frank Digital template based on real-world CV example
- **PDF Generation**: Uses Puppeteer with A4 format, print-optimized styling
- **Data Structure**: Supports complete professional profiles with projects, education, skills
- **Testing**: EnhancedCVTest component with Frank Digital mock data

## 🚀 Deployment

Ready for deployment to:
- Vercel/Netlify (Frontend)
- Railway/Render (Backend API)
- Supabase (Database + Storage)

## 📄 License

MIT License - see LICENSE file for details.
