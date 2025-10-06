/**
 * Template Configuration System
 * Defines customizable options for each template type
 */

export interface BaseTemplateConfig {
  primaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
  fontSize?: 'small' | 'medium' | 'large';
  spacing?: 'compact' | 'normal' | 'relaxed';
}

export interface ColorScheme {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  highlightColor?: string;
  description: string;
}

export interface FontOption {
  id: string;
  name: string;
  fontFamily: string;
  fallback: string[];
  category: 'serif' | 'sans-serif' | 'monospace';
  description: string;
}

export interface LayoutOption {
  id: string;
  name: string;
  description: string;
  supportedTemplates: string[];
}

// Color schemes for each template type
export const COLOR_SCHEMES: Record<string, ColorScheme[]> = {
  modern: [
    {
      id: 'blue-professional',
      name: 'Blue Professional',
      primaryColor: '#2563eb',
      accentColor: '#64748b',
      description: 'Classic blue professional scheme'
    },
    {
      id: 'green-tech',
      name: 'Green Tech',
      primaryColor: '#059669',
      accentColor: '#6b7280',
      description: 'Modern green for tech professionals'
    },
    {
      id: 'purple-creative',
      name: 'Purple Creative',
      primaryColor: '#7c3aed',
      accentColor: '#64748b',
      description: 'Creative purple for innovative roles'
    },
    {
      id: 'gray-minimal',
      name: 'Gray Minimal',
      primaryColor: '#374151',
      accentColor: '#6b7280',
      description: 'Minimalist gray scheme'
    }
  ],
  classic: [
    {
      id: 'traditional-gray',
      name: 'Traditional Gray',
      primaryColor: '#1f2937',
      accentColor: '#4b5563',
      description: 'Classic conservative gray'
    },
    {
      id: 'navy-executive',
      name: 'Navy Executive',
      primaryColor: '#1e40af',
      accentColor: '#475569',
      description: 'Executive navy blue'
    },
    {
      id: 'burgundy-formal',
      name: 'Burgundy Formal',
      primaryColor: '#7f1d1d',
      accentColor: '#57534e',
      description: 'Formal burgundy for senior roles'
    },
    {
      id: 'forest-professional',
      name: 'Forest Professional',
      primaryColor: '#14532d',
      accentColor: '#525252',
      description: 'Professional forest green'
    }
  ],
  creative: [
    {
      id: 'pink-vibrant',
      name: 'Pink Vibrant',
      primaryColor: '#ec4899',
      accentColor: '#8b5cf6',
      highlightColor: '#f59e0b',
      description: 'Vibrant pink for creative roles'
    },
    {
      id: 'orange-energetic',
      name: 'Orange Energetic',
      primaryColor: '#ea580c',
      accentColor: '#dc2626',
      highlightColor: '#ca8a04',
      description: 'Energetic orange scheme'
    },
    {
      id: 'teal-modern',
      name: 'Teal Modern',
      primaryColor: '#0d9488',
      accentColor: '#7c3aed',
      highlightColor: '#e11d48',
      description: 'Modern teal with purple accents'
    },
    {
      id: 'gradient-rainbow',
      name: 'Gradient Rainbow',
      primaryColor: '#8b5cf6',
      accentColor: '#ec4899',
      highlightColor: '#06b6d4',
      description: 'Rainbow gradient theme'
    }
  ]
};

// Font options
export const FONT_OPTIONS: FontOption[] = [
  {
    id: 'inter',
    name: 'Inter',
    fontFamily: 'Inter',
    fallback: ['system-ui', 'sans-serif'],
    category: 'sans-serif',
    description: 'Modern, clean sans-serif'
  },
  {
    id: 'georgia',
    name: 'Georgia',
    fontFamily: 'Georgia',
    fallback: ['Times New Roman', 'serif'],
    category: 'serif',
    description: 'Classic, readable serif'
  },
  {
    id: 'helvetica',
    name: 'Helvetica',
    fontFamily: 'Helvetica Neue',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
    category: 'sans-serif',
    description: 'Clean, professional sans-serif'
  },
  {
    id: 'times',
    name: 'Times New Roman',
    fontFamily: 'Times New Roman',
    fallback: ['Times', 'serif'],
    category: 'serif',
    description: 'Traditional, formal serif'
  },
  {
    id: 'source-sans',
    name: 'Source Sans Pro',
    fontFamily: 'Source Sans Pro',
    fallback: ['system-ui', 'sans-serif'],
    category: 'sans-serif',
    description: 'Adobe\'s clean sans-serif'
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    fontFamily: 'Playfair Display',
    fallback: ['Georgia', 'serif'],
    category: 'serif',
    description: 'Elegant, distinctive serif'
  }
];

// Layout options
export const LAYOUT_OPTIONS: LayoutOption[] = [
  {
    id: 'sidebar-left',
    name: 'Left Sidebar',
    description: 'Contact info and skills in left sidebar',
    supportedTemplates: ['modern', 'creative']
  },
  {
    id: 'single-column',
    name: 'Single Column',
    description: 'Traditional single column layout',
    supportedTemplates: ['classic', 'frank-digital', 'modern', 'creative']
  },
  {
    id: 'two-column',
    name: 'Two Column',
    description: 'Content split into two columns',
    supportedTemplates: ['modern', 'creative']
  },
  {
    id: 'asymmetric',
    name: 'Asymmetric',
    description: 'Creative asymmetric layout',
    supportedTemplates: ['creative']
  }
];

// Size configurations
export const SIZE_CONFIGS = {
  small: {
    baseFontSize: '14px',
    headingScale: 1.2,
    spacing: '0.8rem'
  },
  medium: {
    baseFontSize: '16px',
    headingScale: 1.25,
    spacing: '1rem'
  },
  large: {
    baseFontSize: '18px',
    headingScale: 1.3,
    spacing: '1.2rem'
  }
};

// Spacing configurations
export const SPACING_CONFIGS = {
  compact: {
    sectionGap: '1.5rem',
    itemGap: '0.75rem',
    lineHeight: 1.4
  },
  normal: {
    sectionGap: '2rem',
    itemGap: '1rem',
    lineHeight: 1.5
  },
  relaxed: {
    sectionGap: '2.5rem',
    itemGap: '1.25rem',
    lineHeight: 1.6
  }
};

export interface TemplateCustomization {
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