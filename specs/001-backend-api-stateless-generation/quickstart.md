# Quickstart: Simple CV Generation

## Overview
This quickstart demonstrates the core functionality of generating professional CVs from minimal payload data (name + title) with support for multiple output formats.

## Prerequisites
- Node.js 18+
- API server running on port 3001
- API key configured

## Basic Usage

### 1. Health Check
Verify the service is running:
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "success": true,
  "message": "CV Generation API is running",
  "timestamp": "2025-10-04T12:00:00Z",
  "version": "1.0.0"
}
```

### 2. Get Available Templates
List available CV templates:
```bash
curl -H "X-API-Key: your-api-key" \
     http://localhost:3001/api/templates
```

Expected response:
```json
{
  "success": true,
  "data": [
    {
      "id": "modern",
      "name": "Modern Professional",
      "description": "Clean, minimal design with accent colors",
      "previewUrl": null
    },
    {
      "id": "classic", 
      "name": "Classic Professional",
      "description": "Traditional professional layout, black and white",
      "previewUrl": null
    },
    {
      "id": "creative",
      "name": "Creative Professional", 
      "description": "Colorful design for creative professionals",
      "previewUrl": null
    }
  ],
  "timestamp": "2025-10-04T12:00:00Z"
}
```

### 3. Generate Simple CV (PDF)
Create a basic CV with name and title:
```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -H "X-API-Key: your-api-key" \
     -d '{
       "name": "John Doe",
       "title": "Senior Software Engineer"
     }' \
     http://localhost:3001/api/generate
```

Expected response:
```json
{
  "success": true,
  "data": {
    "fileUrl": "data:application/pdf;base64,JVBERi0xLjQ...",
    "format": "pdf",
    "template": "modern",
    "generatedAt": "2025-10-04T12:00:00Z"
  },
  "timestamp": "2025-10-04T12:00:00Z"
}
```

### 4. Generate CV with Specific Template and Format
Generate a creative template in DOCX format:
```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -H "X-API-Key: your-api-key" \
     -d '{
       "name": "Jane Smith",
       "title": "UX Designer",
       "template": "creative",
       "format": "docx"
     }' \
     http://localhost:3001/api/generate
```

### 5. Generate HTML Version
Generate CV as self-contained HTML:
```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -H "X-API-Key: your-api-key" \
     -d '{
       "name": "Alice Johnson",
       "title": "Product Manager",
       "template": "classic",
       "format": "html"
     }' \
     http://localhost:3001/api/generate
```

## Error Handling Examples

### Missing Required Fields
```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -H "X-API-Key: your-api-key" \
     -d '{
       "title": "Software Engineer"
     }' \
     http://localhost:3001/api/generate
```

Response:
```json
{
  "success": false,
  "error": {
    "code": "MISSING_NAME",
    "message": "Name field is required"
  },
  "timestamp": "2025-10-04T12:00:00Z"
}
```

### Invalid Template
```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -H "X-API-Key: your-api-key" \
     -d '{
       "name": "John Doe",
       "title": "Engineer", 
       "template": "invalid-template"
     }' \
     http://localhost:3001/api/generate
```

Response:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_TEMPLATE",
    "message": "Template 'invalid-template' not found"
  },
  "timestamp": "2025-10-04T12:00:00Z"
}
```

## File Handling

### PDF Files
- Base64 encoded in response `fileUrl` field
- Can be decoded and saved directly
- A4 format, optimized for printing

### DOCX Files  
- Base64 encoded Microsoft Word format
- Compatible with Word, Google Docs, etc.
- Editable format for further customization

### HTML Files
- Self-contained with inline CSS
- Can be displayed in browser directly
- Good for web preview or email sharing

## Performance Expectations
- Template listing: <100ms
- PDF generation: <5 seconds
- DOCX generation: <3 seconds  
- HTML generation: <1 second

## Rate Limits
- Template endpoints: 100 requests per 15 minutes
- Generation endpoints: 10 requests per 5 minutes
- Per API key tracking

This quickstart covers the essential functionality for simple CV generation. The system is designed to be stateless and focused on core document generation capabilities.