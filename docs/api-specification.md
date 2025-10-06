# CV Generation API Specification

## Version: 1.0.0

### Base Information
- **Base URL**: `http://localhost:3001` (development) / `https://your-domain.com` (production)
- **Authentication**: API Key via `X-API-Key` header
- **Content Type**: `application/json`
- **Rate Limiting**: Yes (see sections below)

---

## Authentication

All API requests require authentication via API key in the request header:

```http
X-API-Key: your-api-key-here
```

**Development API Key**: `dev-api-key-12345`

---

## Rate Limiting

### Development Limits
- **General API**: 1000 requests per 15 minutes
- **Generation Endpoints**: 50 requests per 1 minute

### Headers
Rate limit information is included in response headers:
- `X-RateLimit-Limit`: Request limit per window
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Time when the rate limit resets

---

## Endpoints

### 1. Health Check

**Endpoint**: `GET /health`

**Description**: Check API server health and status

**Parameters**: None

**Response**:
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

---

### 2. List Available Templates

**Endpoint**: `GET /api/templates`

**Description**: Retrieve all available CV templates with their metadata

**Parameters**: None

**Response**:
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
      "features": [
        "Clean layout",
        "Skills matrix",
        "Project showcase"
      ],
      "isPremium": false,
      "previewUrl": "/previews/frank-digital.jpg"
    },
    {
      "id": "modern",
      "name": "Modern Professional",
      "description": "Clean, modern design for tech professionals",
      "type": "modern",
      "industryFocus": "Technology & Startups",
      "features": [
        "Modern typography",
        "Clean sections",
        "Tech focus"
      ],
      "isPremium": false,
      "previewUrl": "/previews/modern.jpg"
    }
  ],
  "timestamp": "2025-10-06T09:30:00.000Z"
}
```

---

### 3. Generate CV

**Endpoint**: `POST /api/generate/complete`

**Description**: Generate a CV in the specified format using provided data

**Request Body**:
```json
{
  "personalInfo": {
    "name": "John Doe",
    "title": "Senior Developer",
    "email": "john@example.com",
    "phone": "+46 70 123 45 67",
    "location": "Stockholm, Sweden",
    "linkedIn": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "website": "https://johndoe.dev"
  },
  "summary": {
    "introduction": "Experienced developer with 5+ years in full-stack development...",
    "keyStrengths": ["React", "Node.js", "TypeScript", "AWS"],
    "careerObjective": "Seeking senior technical leadership roles..."
  },
  "experience": [
    {
      "company": "Tech Company AB",
      "position": "Senior Developer",
      "period": "2020-2025",
      "description": "Led development of scalable web applications...",
      "technologies": ["React", "Node.js", "PostgreSQL"],
      "achievements": [
        "Improved application performance by 40%",
        "Led team of 5 developers"
      ]
    }
  ],
  "education": [
    {
      "institution": "Royal Institute of Technology",
      "degree": "Master of Science",
      "field": "Computer Science",
      "period": "2016-2018",
      "gpa": "3.8/4.0"
    }
  ],
  "skills": [
    {
      "category": "Programming Languages",
      "items": ["JavaScript", "TypeScript", "Python", "Java"]
    },
    {
      "category": "Frameworks & Libraries",
      "items": ["React", "Node.js", "Express", "Django"]
    }
  ],
  "projects": [
    {
      "name": "E-commerce Platform",
      "description": "Full-stack e-commerce solution with React and Node.js",
      "technologies": ["React", "Node.js", "MongoDB"],
      "url": "https://github.com/johndoe/ecommerce"
    }
  ],
  "certifications": [
    {
      "name": "AWS Certified Developer",
      "issuer": "Amazon Web Services",
      "date": "2024",
      "credentialId": "AWS-DEV-123456"
    }
  ],
  "languages": [
    {
      "language": "English",
      "proficiency": "Native"
    },
    {
      "language": "Swedish",
      "proficiency": "Professional"
    }
  ],
  "template": "frank-digital",
  "format": "pdf"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "fileUrl": "https://storage.supabase.co/object/sign/cv-files/generated-cv-123.pdf?token=...",
    "format": "pdf",
    "template": "frank-digital",
    "generatedAt": "2025-10-06T09:30:00.000Z"
  },
  "timestamp": "2025-10-06T09:30:00.000Z"
}
```

---

### 4. Template Customization Preview

**Endpoint**: `POST /api/customization/preview`

**Description**: Generate a preview with template customizations

**Request Body**:
```json
{
  "templateId": "modern",
  "customization": {
    "templateId": "modern",
    "colorScheme": "blue-professional",
    "fontFamily": "inter",
    "fontSize": "medium",
    "spacing": "normal",
    "customColors": {
      "primaryColor": "#2563eb",
      "accentColor": "#1d4ed8",
      "highlightColor": "#3b82f6"
    }
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "previewUrl": "https://storage.supabase.co/object/sign/cv-files/preview-123.html?token=...",
    "templateId": "modern",
    "customization": { /* applied customization */ },
    "generatedAt": "2025-10-06T09:30:00.000Z"
  },
  "timestamp": "2025-10-06T09:30:00.000Z"
}
```

---

### 5. Batch Generation - All Formats

**Endpoint**: `POST /api/batch/formats`

**Description**: Generate CV in all available formats (HTML, PDF, DOCX)

**Request Body**: (Same as Generate CV but without `format` field)
```json
{
  "personalInfo": { /* ... */ },
  "summary": { /* ... */ },
  "experience": [ /* ... */ ],
  "template": "frank-digital"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "template": "frank-digital",
    "results": {
      "html": {
        "success": true,
        "fileUrl": "https://storage.supabase.co/object/sign/cv-files/cv-123.html?token=...",
        "generatedAt": "2025-10-06T09:30:00.000Z"
      },
      "pdf": {
        "success": true,
        "fileUrl": "https://storage.supabase.co/object/sign/cv-files/cv-123.pdf?token=...",
        "generatedAt": "2025-10-06T09:30:01.000Z"
      },
      "docx": {
        "success": true,
        "fileUrl": "https://storage.supabase.co/object/sign/cv-files/cv-123.docx?token=...",
        "generatedAt": "2025-10-06T09:30:02.000Z"
      }
    },
    "summary": {
      "total": 3,
      "successful": 3,
      "failed": 0
    }
  },
  "message": "Generated CV in 3/3 formats",
  "timestamp": "2025-10-06T09:30:00.000Z"
}
```

---

### 6. Batch Generation - All Templates & Formats

**Endpoint**: `POST /api/batch/comprehensive`

**Description**: Generate CV using all templates in all formats (12 combinations)

**Request Body**: (Same as Generate CV but without `template` and `format` fields)
```json
{
  "personalInfo": { /* ... */ },
  "summary": { /* ... */ },
  "experience": [ /* ... */ ]
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "results": {
      "frank-digital": {
        "html": {
          "success": true,
          "fileUrl": "https://storage.supabase.co/object/sign/cv-files/frank-digital-cv.html?token=...",
          "generatedAt": "2025-10-06T09:30:00.000Z"
        },
        "pdf": {
          "success": true,
          "fileUrl": "https://storage.supabase.co/object/sign/cv-files/frank-digital-cv.pdf?token=...",
          "generatedAt": "2025-10-06T09:30:01.000Z"
        },
        "docx": {
          "success": true,
          "fileUrl": "https://storage.supabase.co/object/sign/cv-files/frank-digital-cv.docx?token=...",
          "generatedAt": "2025-10-06T09:30:02.000Z"
        }
      },
      "modern": {
        /* ... similar structure for modern template ... */
      },
      "classic": {
        /* ... similar structure for classic template ... */
      },
      "creative": {
        /* ... similar structure for creative template ... */
      }
    },
    "summary": {
      "totalCombinations": 12,
      "successful": 12,
      "failed": 0,
      "successRate": "100%"
    }
  },
  "message": "Generated CVs in 12/12 template-format combinations",
  "timestamp": "2025-10-06T09:30:00.000Z"
}
```

---

### 7. Template Preview Generation

**Endpoint**: `POST /api/preview/template`

**Description**: Generate preview for a single template with sample data

**Request Body**:
```json
{
  "templateId": "frank-digital",
  "lightweight": true,
  "format": "html"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "previewUrl": "https://storage.supabase.co/object/sign/cv-files/preview-frank-digital.html?token=...",
    "templateId": "frank-digital",
    "format": "html",
    "lightweight": true,
    "generatedAt": "2025-10-06T09:30:00.000Z"
  },
  "timestamp": "2025-10-06T09:30:00.000Z"
}
```

---

### 8. Batch Template Previews

**Endpoint**: `POST /api/preview/batch`

**Description**: Generate previews for all templates

**Request Body**:
```json
{
  "format": "html",
  "lightweight": true
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "previews": {
      "frank-digital": {
        "success": true,
        "previewUrl": "https://storage.supabase.co/object/sign/cv-files/preview-frank-digital.html?token=..."
      },
      "modern": {
        "success": true,
        "previewUrl": "https://storage.supabase.co/object/sign/cv-files/preview-modern.html?token=..."
      },
      "classic": {
        "success": true,
        "previewUrl": "https://storage.supabase.co/object/sign/cv-files/preview-classic.html?token=..."
      },
      "creative": {
        "success": true,
        "previewUrl": "https://storage.supabase.co/object/sign/cv-files/preview-creative.html?token=..."
      }
    },
    "format": "html",
    "lightweight": true,
    "templatesCount": 4,
    "successCount": 4
  },
  "message": "Batch template previews generated",
  "timestamp": "2025-10-06T09:30:00.000Z"
}
```

---

## Data Types

### PersonalInfo
```typescript
interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
}
```

### Summary
```typescript
interface Summary {
  introduction: string;
  keyStrengths?: string[];
  careerObjective?: string;
}
```

### Experience
```typescript
interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies?: string[];
  achievements?: string[];
}
```

### Education
```typescript
interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  gpa?: string;
}
```

### Skill
```typescript
interface Skill {
  category: string;
  items: string[];
}
```

### Project
```typescript
interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}
```

### Certification
```typescript
interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}
```

### Language
```typescript
interface Language {
  language: string;
  proficiency: string;
}
```

### TemplateCustomization
```typescript
interface TemplateCustomization {
  templateId: string;
  colorScheme?: string;
  fontFamily?: string;
  fontSize?: 'small' | 'medium' | 'large';
  spacing?: 'compact' | 'normal' | 'relaxed';
  layout?: string;
  customColors?: {
    primaryColor?: string;
    accentColor?: string;
    highlightColor?: string;
  };
}
```

---

## Error Responses

All errors follow this structure:

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

### Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `INVALID_API_KEY` | Missing or invalid API key | 401 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `VALIDATION_ERROR` | Invalid request data | 400 |
| `TEMPLATE_NOT_FOUND` | Invalid template ID | 404 |
| `FORMAT_NOT_SUPPORTED` | Invalid format specified | 400 |
| `GENERATION_ERROR` | PDF/DOCX generation failed | 500 |
| `PUPPETEER_ERROR` | Browser automation error | 500 |
| `STORAGE_ERROR` | File storage error | 500 |
| `INTERNAL_SERVER_ERROR` | Unexpected server error | 500 |

---

## Available Options

### Templates
- `frank-digital` - Professional corporate style
- `modern` - Clean modern design for tech professionals
- `classic` - Traditional executive format
- `creative` - Creative design for design professionals

### Formats
- `html` - Web-viewable HTML format
- `pdf` - Portable Document Format
- `docx` - Microsoft Word document

### Color Schemes
- `blue-professional`, `green-tech`, `purple-creative`, `red-dynamic`
- `orange-warm`, `teal-modern`, `indigo-corporate`, `pink-creative`
- `gray-minimal`, `emerald-fresh`, `amber-energetic`, `rose-elegant`

### Font Families
- `inter`, `roboto`, `open-sans`, `lato`, `georgia`, `times`

### Font Sizes
- `small`, `medium`, `large`

### Spacing Options
- `compact`, `normal`, `relaxed`

---

## Usage Examples

### Basic CV Generation
```bash
curl -X POST http://localhost:3001/api/generate/complete \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-api-key-12345" \
  -d '{
    "personalInfo": {
      "name": "John Doe",
      "title": "Developer",
      "email": "john@example.com"
    },
    "summary": {
      "introduction": "Experienced developer"
    },
    "template": "frank-digital",
    "format": "pdf"
  }'
```

### Batch Format Generation
```bash
curl -X POST http://localhost:3001/api/batch/formats \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-api-key-12345" \
  -d '{
    "personalInfo": {
      "name": "John Doe",
      "title": "Developer",
      "email": "john@example.com"
    },
    "template": "modern"
  }'
```

### Template Preview
```bash
curl -X POST http://localhost:3001/api/preview/template \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-api-key-12345" \
  -d '{
    "templateId": "frank-digital",
    "format": "html",
    "lightweight": true
  }'
```

---

## Performance Considerations

- **CV Generation**: Typically completes in 3-8 seconds
- **Batch Operations**: Allow 20-60 seconds for completion
- **File Storage**: Generated files are accessible for 24 hours
- **Concurrent Requests**: Recommended maximum of 5 concurrent generations

---

## Security Notes

- Always use HTTPS in production
- Store API keys securely
- Validate file URLs before downloading
- Monitor API usage for unusual patterns
- Implement proper CORS configuration for web applications