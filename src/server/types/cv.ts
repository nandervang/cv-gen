export interface SimpleCVData {
  name: string;
  title: string;
}

export interface CVGenerationRequest extends SimpleCVData {
  templateId: string;
  format: 'pdf' | 'docx' | 'html';
}

export interface CVGenerationResult {
  success: boolean;
  data?: string; // Base64 data URL
  error?: string;
  metadata?: {
    templateId: string;
    format: string;
    generatedAt: string;
  };
}