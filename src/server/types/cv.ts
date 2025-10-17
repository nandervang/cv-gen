// Simple CV Data for basic generation
export interface SimpleCVData {
  name: string;           // Required: Person's full name
  title: string;          // Required: Professional title/position
  template?: string;      // Optional: Template ID (defaults to 'modern')
  format?: 'pdf' | 'docx' | 'html'; // Optional: Output format (defaults to 'pdf')
}

// Extended CV Data with additional fields for Andervang Consulting
export interface ExtendedCVData extends CompleteCVData {
  company?: string;                  // "Andervang Consulting"
  
  // Override courses to support extended format
  courses?: {
    name: string;                    // "Course name"
    provider?: string;               // "Course provider" (legacy support)
    institution?: string;            // "Institution" (new format)
    completionDate?: string;         // "2023-08-15" (legacy support)  
    year?: string;                   // "2023-08-15" (new format)
    duration?: string;               // "40 hours"
    credentialId?: string;           // "FM-2023-ARP-001"
    url?: string;                    // Certificate URL
    description?: string;            // Additional details
  }[];

  // Closing section
  closing?: {
    statement?: string;              // "Tack för att du tog dig tid att läsa mitt CV..."
    text?: string;                   // Legacy support
    signature?: string;              // Signature if needed
    date?: string;                   // Date if needed
    location?: string;               // "Stockholm, Sverige"
    contact?: {                      // Legacy contact format
      email: string;
      phone: string;
      location: string;
      company: string;
    };
  };
}

// Enhanced CV Data Structure for comprehensive CV generation
export interface CompleteCVData {
  // Company/Organization (Required for consultant manager)
  company?: string;                  // "Frank Digital AB"

  // Basic Information (Required)
  personalInfo: {
    name: string;                    // "Niklas Andervang"
    title: string;                   // "Senior front-end/fullstack utvecklare & tillgänglighetsexpert"
    email: string;                   // "niklas.andervang@frankdigital.se"
    phone?: string;                  // "+46702441323"
    location?: string;               // "Stockholm, Sverige"
    linkedIn?: string;               // LinkedIn profile URL
    github?: string;                 // GitHub profile URL
    website?: string;                // Personal website URL
    profileImage?: string;           // Base64 encoded image or URL
  };

  // Professional Summary
  summary: {
    introduction: string;            // Main introduction paragraph
    highlights: string[];            // Key professional highlights/bullet points
    keyStrengths?: string[];         // Alternative to highlights
    specialties?: string[];          // Special focus areas ["React", "TypeScript", etc.]
  };

  // Career Objective (separate from summary)
  careerObjective?: string;          // Career objective statement

  // Role/Skills Highlights
  roles?: {
    name: string;                    // "Frontend Specialist"
    description?: string;            // Role description
    responsibilities: string[];      // ["React", "TypeScript", "CSS", etc.]
  }[];

  // Projects and Experience
  projects?: {
    period: string;                  // "nov. 2024 - pågående"
    type: string;                    // "Front-end / Fullstack utvecklare"
    title: string;                   // "Cisco"
    description: string;             // Project description
    technologies: string[];          // ["CICD", "Docker", "TypeScript", etc.]
    achievements?: string[];         // Key achievements or deliverables
    url?: string;                    // Project URL/website
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
    issuer: string;                  // "IAAP"
    description?: string;            // "Credential ID: CPACC-2022-NA-001"
  }[];

  // Courses and continuing education
  courses?: {
    name: string;                    // "Advanced React Performance Optimization"
    institution?: string;            // "Frontend Masters"
    year?: string;                   // "2023-08-15"
    description?: string;            // "8 hours"
  }[];

  // Competencies with Levels (supports both consultant manager and internal formats)
  competencies?: {
    category: string;                // "Expert inom området", "Mycket hög kompetens", "Hög kompetens"
    skills?: {                       // Internal format
      name: string;                  // "CSS", "HTML", etc.
      level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    }[];
    items?: string[];                // Consultant manager format - simple string array
  }[];

  // Enhanced Competency Categories with Experience
  competencyCategories?: {
    category: string;                // "Frontend Development", "Backend Development"
    skills: {
      name: string;                  // "React", "Node.js"
      level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
      yearsOfExperience?: number;    // Years of experience with this skill
    }[];
  }[];

  // Languages
  languages?: {
    language: string;                // "Svenska", "Engelska"
    proficiency: string;             // "Modersmål", "Flytande"
  }[];

  // Template Settings
  templateSettings?: {
    template?: string;               // Template identifier
    theme?: string;                  // Color theme
    showPhoto?: boolean;             // Whether to show profile photo
    showReferences?: boolean;        // Whether to show references
    language?: string;               // Language setting ("en", "sv")
    fontSize?: string;               // Font size setting
    margins?: string;                // Margin setting
    colorScheme?: string;            // Color scheme identifier
  };

  // Template and Format Options
  template?: 'frank-digital' | 'andervang-consulting' | 'modern' | 'classic' | 'creative' | 'technical';
  format?: 'pdf' | 'docx' | 'html';
  
  // Styling Options
  styling?: {
    primaryColor?: string;           // Hex color for accents
    accentColor?: string;           // Secondary color  
    highlightColor?: string;        // Highlight color for creative templates
    fontFamily?: string;            // Font preference
    fontSize?: 'small' | 'medium' | 'large';  // Font size preference
    spacing?: 'compact' | 'normal' | 'relaxed';  // Content spacing
    layout?: 'single-column' | 'two-column' | 'sidebar-left' | 'asymmetric';
    colorScheme?: string;           // Predefined color scheme ID
  };
}

export interface CVGenerationRequest extends SimpleCVData {
  templateId: string;
  format: 'pdf' | 'docx' | 'html';
}

export interface CVGenerationResult {
  success: boolean;
  data?: string | {
    fileUrl?: string;
    format?: string;
    template?: string;
    generatedAt?: string;
    filename?: string;
    size?: number;
  }; // Download URL, base64 data URL, or structured data
  error?: string;
  metadata?: {
    templateId: string;
    format: string;
    generatedAt: string;
    filename?: string;
    size?: number;
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