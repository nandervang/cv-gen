# CV Generation Backend API Specification

## Overview

The CV Generation Backend API is a comprehensive RESTful service for creating, managing, and generating professional CVs with multiple templates and formats. The system includes a minimal React UI for testing and development.

## Current Implementation Status (October 2025)

### ✅ **COMPLETED COMPONENTS**

#### Backend Infrastructure
- **Express API Server**: Complete with middleware, error handling, rate limiting
- **Database Schema**: Templates, content sections, generation tracking tables
- **CV Generation Service**: Puppeteer-based PDF generation with HTML templates
- **Server APIs**: Dedicated server-side Supabase clients and API classes
- **Route Handlers**: Complete CRUD operations for CVs and templates
- **Template System**: 4 template types with styling configurations

#### Files Created
```
src/server/
├── index.ts                     # Main Express server
├── routes/
│   ├── cvRoutes.ts             # CV CRUD endpoints
│   ├── templateRoutes.ts       # Template management
│   └── generateRoutes.ts       # CV generation endpoints
├── services/
│   └── CVGenerationService.ts  # Puppeteer PDF generation
├── api/
│   ├── cvAPI.ts               # Server-side CV operations
│   └── templateAPI.ts         # Server-side template operations
└── lib/
    └── supabase.ts           # Server Supabase configuration
```

#### Database Migrations Ready
- `template-system-migration.sql` - Creates template tables and default templates
- `basic-cv-schema.sql` - Basic CV profile structure (already applied)

### 🔧 **KNOWN ISSUES TO RESOLVE**

1. **Server Startup Issue**: Server logs successful startup but exits immediately
   - Likely module resolution or async initialization problem
   - All code is syntactically correct and compiles

2. **Database Migration Needed**: Template tables not yet created in Supabase
   - Need to run `template-system-migration.sql` in Supabase SQL editor

### 🎯 **NEXT SESSION TASKS**

1. **Debug Server Startup** (Priority 1)
   - Investigate why server exits after logging successful startup
   - Check for unhandled promises or module loading issues
   - Verify port availability and process lifecycle

2. **Database Setup** (Priority 2)
   - Execute `template-system-migration.sql` in Supabase
   - Verify template data is inserted correctly
   - Test Supabase connectivity from server

3. **API Testing** (Priority 3)
   - Test all endpoints with curl/Postman
   - Verify CV generation functionality
   - Test PDF generation pipeline

4. **Frontend Integration** (Priority 4)
   - Update React components to use API endpoints
   - Replace direct Supabase calls with API calls
   - Test full stack integration

## Architecture

### Backend API
- **Framework**: Node.js with Express/Fastify (embedded in Vite)
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth via API keys
- **CV Generation**: Puppeteer/Playwright for PDF generation
- **Template Engine**: React components rendering to HTML/CSS
- **File Storage**: Supabase Storage for generated files

### Testing UI
- **Framework**: React with TypeScript (minimal for testing)
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS
- **Purpose**: Test API endpoints and preview generated CVs

### CV Generation Stack
- **HTML/CSS**: Modern responsive layouts with CSS Grid/Flexbox
- **PDF Generation**: Puppeteer for high-quality PDF output
- **Template System**: React-based templates with stunning designs
- **Export Formats**: PDF, HTML, DOCX (via conversion)

## API Endpoints

### CV Management
```
GET    /api/cvs              # List all CVs for user
POST   /api/cvs              # Create new CV
GET    /api/cvs/:id          # Get specific CV
PUT    /api/cvs/:id          # Update CV content
DELETE /api/cvs/:id          # Delete CV
```

### Template Management
```
GET    /api/templates        # List available templates
GET    /api/templates/:id    # Get specific template
GET    /api/templates/type/:type  # Get templates by type
```

### CV Generation
```
POST   /api/generate         # Generate CV file
GET    /api/generate/:id     # Get generation status
GET    /api/files/:id        # Download generated file
POST   /api/preview          # Generate preview HTML
```

### Content Sections
```
GET    /api/cvs/:id/sections # Get CV sections
POST   /api/cvs/:id/sections # Add section to CV
PUT    /api/sections/:id     # Update section
DELETE /api/sections/:id     # Delete section
```

## Response Formats

### Standard API Response
```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully",
  "timestamp": "2025-10-02T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {...}
  },
  "timestamp": "2025-10-02T10:30:00Z"
}
```

### Data Models

#### CV Profile
```typescript
interface CVProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  summary?: string;
  created_at: Date;
  updated_at: Date;
}
```

#### CV Template
```typescript
interface CVTemplate {
  id: string;
  name: string;
  description?: string;
  template_type: 'modern' | 'classic' | 'creative' | 'technical';
  industry_focus?: string;
  layout_structure: object;
  styling_config: object;
  sections_config: object;
  is_premium: boolean;
  is_active: boolean;
}
```

#### CV Generation
```typescript
interface CVGeneration {
  id: string;
  cv_profile_id: string;
  template_id: string;
  generation_config: object;
  content_data: object;
  output_format: 'pdf' | 'html' | 'docx' | 'json';
  file_url?: string;
  generation_status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: Date;
}
```

## User Stories

### As a User
1. I want to create multiple CV versions for different job applications
2. I want to choose from professional templates that match my industry
3. I want to edit my CV content with a rich text editor
4. I want to track changes and revert to previous versions
5. I want to export my CV as PDF or DOCX files
6. I want my data to be securely stored and accessible

### As a Developer
1. I want clear API endpoints for all CV operations
2. I want type-safe data models and interfaces
3. I want comprehensive documentation for integration
4. I want scalable architecture that can handle growth

## Implementation Phases

### Phase 1: Core Infrastructure ✅ COMPLETED
- [x] Database schema and migrations
- [x] Authentication system setup  
- [x] Basic CV creation and editing
- [x] API endpoints for CRUD operations
- [x] Basic UI components
- [x] **NEW: Professional design system with shadcn/ui**
- [x] **NEW: Centralized REST API architecture**

### Phase 2: Template System
- [ ] Template data models
- [ ] Template renderer
- [ ] Basic template library
- [ ] Template customization

### Phase 3: Content Management
- [ ] Rich text editor integration
- [ ] Content validation
- [ ] Auto-save functionality
- [ ] Content versioning

### Phase 4: Generation Engine
- [ ] PDF generation
- [ ] DOCX generation
- [ ] Preview system
- [ ] Export functionality

### Phase 5: Advanced Features
- [ ] Version comparison
- [ ] Template marketplace
- [ ] Collaboration features
- [ ] Analytics and insights

## Success Metrics

- **User Engagement**: Time spent in editor, number of CV versions created
- **Template Usage**: Most popular templates, customization frequency
- **Export Success**: Successful file generations, format preferences
- **Performance**: Generation speed, API response times
- **Quality**: User satisfaction, error rates

## Security Considerations

- **Data Privacy**: Encrypt sensitive user information
- **Access Control**: Role-based permissions and RLS policies
- **File Security**: Secure file uploads and downloads
- **API Security**: Rate limiting and authentication validation

## Future Enhancements

- AI-powered content suggestions
- Integration with job boards
- Mobile applications
- Collaboration and sharing features
- Advanced analytics and insights
- Template marketplace and community features