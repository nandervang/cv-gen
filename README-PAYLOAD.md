# CV Generation API - Structured Payload Documentation

## Overview

The CV Generation API supports both simple and comprehensive CV data structures for generating professional documents in PDF, HTML, and DOCX formats. This document specifies the complete payload structure based on the Frank Digital CV example.

## Table of Contents

1. [Simple CV Data Structure](#simple-cv-data-structure)
2. [Complete CV Data Structure](#complete-cv-data-structure)
3. [Template-Specific Features](#template-specific-features)
4. [Usage Examples](#usage-examples)
5. [Validation Rules](#validation-rules)
6. [Output Formats](#output-formats)

## Simple CV Data Structure

For basic CV generation with minimal data:

```typescript
interface SimpleCVData {
  name: string;           // Required: Person's full name
  title: string;          // Required: Professional title/position
  template?: string;      // Optional: Template ID (defaults to 'modern')
  format?: 'pdf' | 'docx' | 'html'; // Optional: Output format (defaults to 'pdf')
}
```

### Example:
```json
{
  "name": "John Doe",
  "title": "Senior Software Developer",
  "template": "modern",
  "format": "pdf"
}
```

## Complete CV Data Structure

For comprehensive CV generation with full professional details:

```typescript
interface CompleteCVData {
  // Basic Information (Required)
  personalInfo: {
    name: string;                    // "Niklas Andervang"
    title: string;                   // "Senior front-end/fullstack utvecklare & tillgänglighetsexpert"
    email: string;                   // "niklas.andervang@frankdigital.se"
    phone?: string;                  // "+46 70 993 17 94"
    location?: string;               // Geographic location
    profileImage?: string;           // Base64 encoded image or URL
  };

  // Professional Summary
  summary: {
    introduction: string;            // Main professional introduction
    highlights: string[];            // Key professional highlights
    specialties?: string[];          // Areas of expertise
  };

  // Role/Skills Highlights
  roles?: {
    title: string;                   // "Senior utvecklare FE/Fullstack"
    skills: string[];               // Associated skills for this role
  }[];

  // Projects and Experience
  projects?: {
    period: string;                  // "nov. 2024 - pågående"
    type: string;                    // "Front-end / Fullstack utvecklare"
    title: string;                   // "Cisco"
    description: string;             // Detailed project description
    technologies: string[];          // Technologies used
    achievements?: string[];         // Key achievements
  }[];

  // Employment History
  employment?: {
    period: string;                  // "mars 2024 - okt. 2024"
    position: string;                // Job title
    company: string;                 // Company name
    description: string;             // Role description
    technologies: string[];          // Technologies used
    achievements?: string[];         // Key achievements
  }[];

  // Education
  education?: {
    period: string;                  // "2008 - 2011"
    degree: string;                  // Degree name
    institution: string;             // Educational institution
    specialization?: string;         // Additional details
  }[];

  // Courses and Certifications
  certifications?: {
    year: string;                    // "2022"
    title: string;                   // Certification name
    issuer: string;                  // Issuing organization
    description?: string;            // Additional details
  }[];

  // Competencies with Levels
  competencies?: {
    category: string;                // "Expert inom området"
    skills: {
      name: string;                  // Skill name
      level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    }[];
  }[];

  // Languages
  languages?: {
    language: string;                // "Svenska"
    proficiency: string;             // "Modersmål"
  }[];

  // Template and Format Options
  template?: 'frank-digital' | 'modern' | 'classic' | 'creative' | 'technical';
  format?: 'pdf' | 'docx' | 'html';
  
  // Styling Options
  styling?: {
    primaryColor?: string;           // Hex color for accents
    accentColor?: string;           // Secondary color
    fontFamily?: string;            // Font preference
    layout?: 'single-column' | 'two-column';
  };
}
```

## Template-Specific Features

### Frank Digital Template
- **Design**: Professional layout with purple accents and company branding
- **Features**: Profile image, technology tags, dotted section dividers
- **Best for**: Consulting firms, digital agencies, modern tech companies

**Key styling elements:**
- Primary color: `#6366f1` (purple)
- Typography: Inter, system-ui, sans-serif
- Layout: Single column with generous whitespace
- Special elements: Technology tags, skill level indicators

### Modern Template
- **Design**: Clean, minimal layout with blue accents
- **Features**: Centered header, professional typography, structured sections
- **Best for**: Corporate environments, finance, general business

### Classic Template
- **Design**: Traditional black and white, serif typography
- **Features**: Formal layout, conservative styling
- **Best for**: Legal, academic, government positions

### Creative Template
- **Design**: Colorful gradients, modern animations, artistic layout
- **Features**: Dynamic backgrounds, creative typography
- **Best for**: Design, marketing, creative industries

## Usage Examples

### Basic Generation
```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "title": "Software Developer",
    "template": "modern",
    "format": "pdf"
  }'
```

### Complete Generation with Frank Digital Template
```bash
curl -X POST http://localhost:3001/api/generate/complete \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {
      "name": "Niklas Andervang",
      "title": "Senior front-end/fullstack utvecklare",
      "email": "niklas@example.se",
      "phone": "+46 70 123 45 67"
    },
    "summary": {
      "introduction": "Senior developer with 15 years experience...",
      "highlights": ["15 års erfarenhet", "Tillgänglighetsexpert"],
      "specialties": ["React", "TypeScript", "WCAG"]
    },
    "projects": [
      {
        "period": "2024 - pågående",
        "type": "Frontend utvecklare",
        "title": "AI Project",
        "description": "Building AI interfaces...",
        "technologies": ["React", "TypeScript", "Docker"]
      }
    ],
    "template": "frank-digital",
    "format": "pdf"
  }'
```

### JavaScript/TypeScript Usage
```typescript
import { CompleteCVData } from './types/cv';

const cvData: CompleteCVData = {
  personalInfo: {
    name: "Sarah Johnson",
    title: "UX Designer",
    email: "sarah@example.com"
  },
  summary: {
    introduction: "Creative UX designer with passion for accessibility",
    highlights: ["5 years experience", "User-centered design", "Accessibility expert"]
  },
  template: "creative",
  format: "pdf"
};

const response = await fetch('/api/generate/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(cvData)
});
```

## Validation Rules

### Required Fields
- `personalInfo.name`: 1-100 characters, letters, spaces, hyphens, apostrophes only
- `personalInfo.title`: 1-200 characters
- `personalInfo.email`: Valid email format (for complete data)

### Optional Field Constraints
- `phone`: International format recommended
- `technologies`: Array of strings, max 20 items per project
- `period`: Free text, recommend "YYYY - YYYY" or "YYYY - present" format
- `profileImage`: Base64 encoded image data or valid URL

### Styling Validation
- `primaryColor`: Valid hex color format (#RRGGBB)
- `fontFamily`: CSS font family string
- `template`: Must be one of supported template types

## Output Formats

### PDF Output
- **Format**: A4 size
- **Quality**: High-resolution, print-ready
- **Size limit**: <2MB
- **Features**: Print-optimized styling, page breaks

### HTML Output
- **Format**: Self-contained HTML with inline CSS
- **Size limit**: <500KB
- **Features**: Responsive design, web-optimized
- **Usage**: Web viewing, email sharing, further customization

### DOCX Output
- **Format**: Microsoft Word compatible
- **Size limit**: <1MB
- **Features**: Editable document, standard formatting
- **Usage**: Further editing in Word, ATS compatibility

## Response Format

### Success Response
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

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format in personalInfo.email",
    "details": {
      "field": "personalInfo.email",
      "value": "invalid-email",
      "expected": "Valid email format"
    }
  },
  "timestamp": "2025-10-04T10:30:00Z"
}
```

## Frank Digital Mock Data Example

The complete Frank Digital template mock data (based on the provided PDF) is available in the codebase as `frankDigitalMockData` and includes:

- **Personal Info**: Name, title, contact details
- **Summary**: Professional introduction and highlights
- **Projects**: 3 recent projects with technologies and descriptions
- **Education**: Academic background
- **Certifications**: 7 professional certifications
- **Competencies**: 3 skill categories with expertise levels
- **Languages**: Swedish and English proficiency

This mock data serves as a comprehensive example and can be used for testing the complete CV generation workflow.

## Integration Notes

1. **Frontend Integration**: Use the `EnhancedCVTest` component for testing the complete payload structure
2. **API Endpoints**: 
   - `/api/generate` for simple CV data
   - `/api/generate/complete` for comprehensive CV data
3. **Template Selection**: Each template optimally displays different data sections
4. **Performance**: Complete CV generation typically takes 2-5 seconds depending on content complexity

For more technical details, see the API specification and template documentation in the `/specs` directory.