// Core data interfaces for CV generation

export interface SimpleCVData {
  name: string
  title: string
  template?: 'modern' | 'classic' | 'creative'
  format?: 'pdf' | 'docx' | 'html'
}

export interface CVTemplate {
  id: string
  name: string
  description: string
  previewUrl?: string
}

export interface GenerationResponse {
  success: boolean
  data?: {
    fileUrl: string
    format: string
    template: string
    generatedAt: string
  }
  error?: {
    code: string
    message: string
  }
  timestamp: string
}

export interface TemplateListResponse {
  success: boolean
  data?: CVTemplate[]
  error?: {
    code: string
    message: string
  }
  timestamp: string
}

// Template function interface
export interface TemplateFunction {
  (data: SimpleCVData): string
}

// Error codes for consistent error handling
export const ErrorCodes = {
  MISSING_NAME: 'MISSING_NAME',
  MISSING_TITLE: 'MISSING_TITLE',
  INVALID_TEMPLATE: 'INVALID_TEMPLATE',
  INVALID_FORMAT: 'INVALID_FORMAT',
  PDF_GENERATION_FAILED: 'PDF_GENERATION_FAILED',
  DOCX_GENERATION_FAILED: 'DOCX_GENERATION_FAILED',
  HTML_GENERATION_FAILED: 'HTML_GENERATION_FAILED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  GENERATION_RATE_LIMIT: 'GENERATION_RATE_LIMIT'
} as const

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes]