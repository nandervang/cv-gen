# CV Generation Backend API

A comprehensive RESTful API for creating, managing, and generating professional CVs with multiple templates and formats. Built with Express, TypeScript, Supabase, and Puppeteer.

## 🚀 Features

- **RESTful API** for CV management and generation
- **Multiple CV Templates** (Modern, Classic, Creative, Technical)
- **PDF Generation** using Puppeteer with high-quality output
- **Template Customization** with styling configurations
- **File Storage** via Supabase Storage
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

## 📁 Project Structure

```
src/
├── components/              # React UI components (testing interface)
├── server/                  # Backend API server
│   ├── index.ts            # Main Express server
│   ├── routes/             # API route handlers
│   ├── services/           # Business logic (PDF generation)
│   ├── api/                # Server-side API classes
│   └── lib/                # Server utilities
├── api/                    # Client-side API classes
├── lib/                    # Shared utilities
└── templates/              # CV template components
```

## 🚦 Current Status

### ✅ Completed
- Express API server with all routes
- CV Generation Service with Puppeteer
- Database schema and migrations
- Template system architecture
- Server-side Supabase integration
- Rate limiting and security middleware

### 🔧 In Progress
- Server startup debugging (exits immediately)
- Database migration execution
- API endpoint testing

### 📋 Next Steps
1. Debug server startup issue
2. Run database migrations
3. Test API endpoints
4. Update frontend to use API

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

**Full Stack (both together):**
```bash
npm run dev:full
```

## 📚 API Documentation

### Authentication
Currently using Supabase anonymous access. Production should implement proper auth.

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### Health Check
```http
GET /health
```

#### CV Management
```http
GET    /api/cvs              # List all CVs
POST   /api/cvs              # Create new CV
GET    /api/cvs/:id          # Get specific CV
PUT    /api/cvs/:id          # Update CV
DELETE /api/cvs/:id          # Delete CV
```

#### Templates
```http
GET /api/templates           # List available templates
GET /api/templates/:id       # Get specific template
GET /api/templates/type/:type # Get templates by type
```

#### CV Generation
```http
POST /api/generate           # Generate CV file (PDF/HTML)
POST /api/generate/preview   # Generate preview HTML
GET  /api/generate/:id       # Get generation status
```

### Response Format
```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed",
  "timestamp": "2025-10-02T10:30:00Z"
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

- **TypeScript**: Strict mode enabled
- **Linting**: ESLint configuration
- **PDF Generation**: Uses Puppeteer with A4 format
- **File Storage**: Supabase Storage bucket 'cv-files'
- **Rate Limiting**: 100 requests/15min, 10 generations/5min

## 🚀 Deployment

Ready for deployment to:
- Vercel/Netlify (Frontend)
- Railway/Render (Backend API)
- Supabase (Database + Storage)

## 📄 License

MIT License - see LICENSE file for details.