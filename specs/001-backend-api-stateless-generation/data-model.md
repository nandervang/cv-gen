# Data Model: Simple CV Generation

## Core Data Structures

### CVData Payload (Request)
```typescript
interface SimpleCVData {
  name: string;           // Required: Person's full name
  title: string;          // Required: Professional title/position
  template?: string;      // Optional: Template ID (defaults to 'modern')
  format?: 'pdf' | 'docx' | 'html'; // Optional: Output format (defaults to 'pdf')
}
```

### Template Configuration
```typescript
interface CVTemplate {
  id: string;             // Template identifier ('modern', 'classic', 'creative')
  name: string;           // Display name
  description: string;    // Template description
  previewUrl?: string;    // Optional preview image URL
}
```

### Generation Response
```typescript
interface GenerationResponse {
  success: boolean;
  data?: {
    fileUrl: string;      // Direct download URL for generated file
    format: string;       // Actual format generated
    template: string;     // Template used
    generatedAt: string;  // ISO timestamp
  };
  error?: {
    code: string;         // Error code for client handling
    message: string;      // Human-readable error message
  };
  timestamp: string;      // Response timestamp
}
```

### Template Catalog Response
```typescript
interface TemplateListResponse {
  success: boolean;
  data?: CVTemplate[];
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}
```

## Validation Rules

### Input Validation
- `name`: Required, 1-100 characters, no special characters except spaces, hyphens, apostrophes
- `title`: Required, 1-200 characters, professional title format
- `template`: Optional, must match available template IDs
- `format`: Optional, must be 'pdf', 'docx', or 'html'

### Output Constraints
- PDF files: Maximum 2MB, A4 format
- DOCX files: Maximum 1MB, standard document format
- HTML files: Self-contained with inline CSS, maximum 500KB

## Static Templates

### Available Templates
1. **Modern**: Clean, minimal design with accent colors
2. **Classic**: Traditional professional layout, black and white
3. **Creative**: Colorful design for creative professionals

### Template Structure
Each template includes:
- Header section (name, title)
- Styling configuration (colors, fonts, spacing)
- Layout structure (single column, clean typography)
- Responsive design principles

## Error Handling

### Validation Errors (400)
- `MISSING_NAME`: Name field is required
- `MISSING_TITLE`: Title field is required
- `INVALID_TEMPLATE`: Template ID not found
- `INVALID_FORMAT`: Unsupported output format

### Generation Errors (500)
- `PDF_GENERATION_FAILED`: Puppeteer PDF creation error
- `DOCX_GENERATION_FAILED`: Document creation error
- `HTML_GENERATION_FAILED`: Template rendering error

### Service Errors (503)
- `SERVICE_UNAVAILABLE`: PDF generation service temporarily down
- `RESOURCE_EXHAUSTED`: Too many concurrent requests

This minimal data model focuses on the core requirement: generating professional CVs from basic payload data with multiple output formats.