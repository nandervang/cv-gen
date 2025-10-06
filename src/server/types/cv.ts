// Simple CV Data for basic generation
export interface SimpleCVData {
  name: string;           // Required: Person's full name
  title: string;          // Required: Professional title/position
  template?: string;      // Optional: Template ID (defaults to 'modern')
  format?: 'pdf' | 'docx' | 'html'; // Optional: Output format (defaults to 'pdf')
}

// Enhanced CV Data Structure for comprehensive CV generation
export interface CompleteCVData {
  // Basic Information (Required)
  personalInfo: {
    name: string;                    // "Niklas Andervang"
    title: string;                   // "Senior front-end/fullstack utvecklare & tillgänglighetsexpert"
    email: string;                   // "niklas.andervang@frankdigital.se"
    phone?: string;                  // "+46 70 993 17 94"
    location?: string;               // Location if relevant
    profileImage?: string;           // Base64 encoded image or URL
  };

  // Professional Summary
  summary: {
    introduction: string;            // Main introduction paragraph
    highlights: string[];            // Key professional highlights/bullet points
    specialties?: string[];          // Special focus areas
  };

  // Role/Skills Highlights
  roles?: {
    title: string;                   // "Senior utvecklare FE/Fullstack"
    skills: string[];               // ["Test och kvalitetssäkring", "Teamlead / mentor", etc.]
  }[];

  // Projects and Experience
  projects?: {
    period: string;                  // "nov. 2024 - pågående"
    type: string;                    // "Front-end / Fullstack utvecklare"
    title: string;                   // "Cisco"
    description: string;             // Project description
    technologies: string[];          // ["CICD", "Docker", "TypeScript", etc.]
    achievements?: string[];         // Key achievements or deliverables
  }[];

  // Employment History
  employment?: {
    period: string;                  // "mars 2024 - okt. 2024"
    position: string;                // "Front-end / Fullstack utvecklare / Tillgänglighetsexpert"
    company: string;                 // "Digitaliseringen Post och telestyrelsen PTS"
    description: string;             // Role description
    technologies: string[];          // Technologies used
    achievements?: string[];         // Key achievements
  }[];

  // Education
  education?: {
    period: string;                  // "2008 - 2011"
    degree: string;                  // "Interaktion och Design (MDA) interaktionsdesign (Kandidatexamen)"
    institution: string;             // "Blekinge Tekniska Högskola (Karlskrona)"
    specialization?: string;         // Additional details
  }[];

  // Courses and Certifications
  certifications?: {
    year: string;                    // "2022"
    title: string;                   // "Certified Professional in Accessibility Core Competencies"
    issuer: string;                  // "IAAP, CPACC"
    description?: string;            // Additional details
  }[];

  // Competencies with Levels
  competencies?: {
    category: string;                // "Expert inom området", "Mycket hög kompetens", "Hög kompetens"
    skills: {
      name: string;                  // "CSS", "HTML", etc.
      level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    }[];
  }[];

  // Languages
  languages?: {
    language: string;                // "Svenska", "Engelska"
    proficiency: string;             // "Modersmål", "Flytande"
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

// Database Models
export interface CVProfile {
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

export interface CVSection {
  id: string;
  cv_profile_id: string;
  section_type: string;
  title: string;
  content: object;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface CVGeneration {
  id: string;
  cv_profile_id: string;
  template_id: string;
  generation_config: object;
  content_data: object;
  output_format: 'pdf' | 'html' | 'docx' | 'json';
  file_url?: string;
  generation_status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: Date;
  updated_at: Date;
}