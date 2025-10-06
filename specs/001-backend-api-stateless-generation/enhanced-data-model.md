# Enhanced CV Data Model - Frank Digital Style

Based on the Frank Digital CV example (Frank_Digital_AB_Niklas_Andervang_CV_2025.pdf), this document specifies the enhanced payload structure for comprehensive CV generation.

## Complete CV Data Structure

```typescript
interface CompleteCVData {
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
```

## Frank Digital Template Mock Data

Based on the provided PDF, here's the complete mock data structure:

```typescript
const frankDigitalMockData: CompleteCVData = {
  personalInfo: {
    name: "Niklas Andervang",
    title: "Senior front-end/fullstack utvecklare & tillgänglighetsexpert",
    email: "niklas.andervang@frankdigital.se",
    phone: "+46 70 993 17 94",
    profileImage: "data:image/jpeg;base64,..." // Profile image from PDF
  },

  summary: {
    introduction: "Niklas är en senior frontend/fullstack utvecklare som är bred med sin kompetens och bred med sina kunskaper. Niklas har stor erfarenhet från flertalet frontend-ramverk, dev-ops teknik och många fullstack/systemlösningar som de de 15 år som Niklas arbetat som utvecklare. Niklas jobbar ofta UI nära och med sin långa erfarenhet är Niklas ofta ett bollplank för UX och design kring förbättring av flöden men också inom interaktion men även utformning av komponenter.",
    highlights: [
      "15 års erfarenhet inom frontend/fullstack utveckling",
      "Bred kompetens inom moderna utvecklingsramverk",
      "Specialist på tillgänglighet och användbarhet",
      "Erfaren mentor och teamledare"
    ],
    specialties: [
      "Test och kvalitetssäkring",
      "Teamlead / mentor / Scrummaster", 
      "Tillgänglighetsexpert",
      "Teknisk projektledare"
    ]
  },

  roles: [
    {
      title: "Senior utvecklare FE/Fullstack",
      skills: [
        "Test och kvalitetssäkring",
        "Teamlead / mentor / Scrummaster",
        "Tillgänglighetsexpert", 
        "Teknisk projektledare"
      ]
    }
  ],

  projects: [
    {
      period: "nov. 2024 - pågående",
      type: "Front-end / Fullstack utvecklare",
      title: "Cisco",
      description: "Niklas är med i ett team där man utforskar AI agenter för Ciscos alla olika typer av produkter och tjänster. Niklas jobbar med integration av backend och frontend AI agenter med interface.",
      technologies: ["CICD", "Docker", "TypeScript", "Kubernetes", "React", "Open API"],
      achievements: ["AI agent integration", "Full-stack development"]
    },
    {
      period: "mars 2024 - okt. 2024", 
      type: "Front-end / Fullstack utvecklare / Tillgänglighetsexpert",
      title: "Digitaliseringen Post och telestyrelsen PTS",
      description: "Vi fick i uppdrag att bygga en ny webb för att digitalisera sig utifrån deras tillgänglighetsgranskning av befintlig webb. Det resulterade i att vi byggde en ny webb från grunden som nu levererat enligt WCAG, Utifrån deras behov. Projektet innebär också ett custom gränsnitt för event hantering. Komplett projekt där vi skötte devops, integrationer och marknadsföring i projekt så vi stort fokus på redaktörsupplevelsen och säkerställa så hög tillgänglighet som möjligt för både användare och redaktörer.",
      technologies: ["DevOps", "Tillgänglighet", "TypeScript", "WCAG", "Test och validering", "React", "Contentful", "Next.js", "MongoDB", "Event hantering"],
      achievements: ["WCAG-kompatibel webbplats", "Custom event management", "Full tillgänglighetsrevision"]
    },
    {
      period: "nov. 2023 - juni 2024",
      type: "Front-end / Fullstack utvecklare", 
      title: "DePalma Workwear",
      description: "DePalma Workwear / Goods är en webbplats med headless data arkitektur från Sanity CMS med flera integrations och app som Drip Marketing Automation. Niklas roll i projektet var att underhålla webbplatsen, se över infra strukturen och miljöer, utveckla nya funktioner och förbättringar samt ta fram strategi kring konvertering, tillgänglighet och SEO.",
      technologies: ["SEO", "CICD", "DevOps", "HTML & CSS", "Tillgänglighet", "WCAG", "Analytics", "Shopify", "React", "Gatsby.js", "Headless", "Netlify", "Sanity"],
      achievements: ["Headless CMS implementation", "SEO optimization", "E-commerce integration"]
    }
  ],

  education: [
    {
      period: "2008 - 2011",
      degree: "Interaktion och Design (MDA) interaktionsdesign (Kandidatexamen)",
      institution: "Blekinge Tekniska Högskola (Karlskrona)"
    },
    {
      period: "2007 - 2008", 
      degree: "Mekanik och teknik",
      institution: "Civilingenjör (Karlskrona)"
    }
  ],

  certifications: [
    {
      year: "2022",
      title: "Certified Professional in Accessibility Core Competencies",
      issuer: "IAAP, CPACC"
    },
    {
      year: "2021",
      title: "Agile core competence and fundamentals course",
      issuer: "Valtech"
    },
    {
      year: "2019",
      title: "Web Accessibility by Google", 
      issuer: "Google"
    },
    {
      year: "2018",
      title: "Tillgänglighet konferens och workshops FUNKA",
      issuer: "FUNKA"
    },
    {
      year: "2015",
      title: "Agile Scrum kurs",
      issuer: "Scrum Alliance"
    },
    {
      year: "2015", 
      title: "UX kurser, Lean UX & UX strategi",
      issuer: "UX Institute"
    },
    {
      year: "2008",
      title: "Interaktion och Design (MDA)",
      issuer: "Blekinge Tekniska Högskola"
    }
  ],

  competencies: [
    {
      category: "Expert inom området",
      skills: [
        { name: "CSS", level: "expert" },
        { name: "CSS HTML", level: "expert" },
        { name: "HTML", level: "expert" },
        { name: "HTML & CSS", level: "expert" },
        { name: "Innehållshanteringsstrategi", level: "expert" },
        { name: "PLI/Scrum", level: "expert" },
        { name: "Senior utvecklare FE/Fullstack", level: "expert" },
        { name: "Test och kvalitetssäkring", level: "expert" },
        { name: "Test och validering", level: "expert" },
        { name: "Testing", level: "expert" },
        { name: "Tillgänglighet", level: "expert" },
        { name: "Tillgänglighetsexpert", level: "expert" },
        { name: "Tillgänglighetstester", level: "expert" },
        { name: "UX UI", level: "expert" },
        { name: "WCAG", level: "expert" },
        { name: "WCAG-analys", level: "expert" },
        { name: "Webbutvecklare", level: "expert" },
        { name: "WordPress", level: "expert" }
      ]
    },
    {
      category: "Mycket hög kompetens", 
      skills: [
        { name: "Analytics", level: "advanced" },
        { name: "Engebreid-testning", level: "advanced" },
        { name: "Git", level: "advanced" },
        { name: "Google TagManager", level: "advanced" },
        { name: "Headless", level: "advanced" },
        { name: "JavaScript", level: "advanced" },
        { name: "jQuery", level: "advanced" },
        { name: "Komponentbibliotek", level: "advanced" },
        { name: "Kvalitetssäkring", level: "advanced" },
        { name: "MySQL", level: "advanced" },
        { name: "Next.js", level: "advanced" },
        { name: "Projektledare", level: "advanced" },
        { name: "React", level: "advanced" },
        { name: "SEO", level: "advanced" },
        { name: "SEO & Analys", level: "advanced" },
        { name: "Storybook", level: "advanced" },
        { name: "Strategi", level: "advanced" },
        { name: "TagManager", level: "advanced" },
        { name: "Teamlead / mentor / Scrummaster", level: "advanced" },
        { name: "TypeScript", level: "advanced" }
      ]
    },
    {
      category: "Hög kompetens",
      skills: [
        { name: ".NET", level: "intermediate" },
        { name: "AXE", level: "intermediate" },
        { name: "BrowserStack", level: "intermediate" },
        { name: "C#", level: "intermediate" },
        { name: "CICD", level: "intermediate" },
        { name: "Contentful", level: "intermediate" },
        { name: "Designsystem", level: "intermediate" },
        { name: "DevOps", level: "intermediate" },
        { name: "Docker", level: "intermediate" },
        { name: "Dotnet core", level: "intermediate" },
        { name: "Event hantering", level: "intermediate" },
        { name: "Figma", level: "intermediate" },
        { name: "Gatsby.js", level: "intermediate" },
        { name: "GatsbyJS", level: "intermediate" },
        { name: "GitHub", level: "intermediate" },
        { name: "Interaktionsdesign", level: "intermediate" },
        { name: "Kubernetes", level: "intermediate" },
        { name: "MailChimp", level: "intermediate" },
        { name: "MongoDB", level: "intermediate" },
        { name: "Netlify", level: "intermediate" },
        { name: "Open API", level: "intermediate" },
        { name: "Optimizely", level: "intermediate" },
        { name: "PHP", level: "intermediate" },
        { name: "Sanity", level: "intermediate" },
        { name: "Shopify", level: "intermediate" },
        { name: "SitecoreJS", level: "intermediate" },
        { name: "Strapi", level: "intermediate" },
        { name: "Teknisk projektledare", level: "intermediate" },
        { name: "Typeform", level: "intermediate" },
        { name: "Webcomponents", level: "intermediate" },
        { name: "Weblänser IO", level: "intermediate" }
      ]
    }
  ],

  languages: [
    {
      language: "Svenska",
      proficiency: "Modersmål"
    },
    {
      language: "Engelska", 
      proficiency: "Flytande"
    }
  ],

  template: "frank-digital",
  format: "pdf",
  styling: {
    primaryColor: "#6366f1", // Purple accent color from PDF
    accentColor: "#8b5cf6", 
    fontFamily: "Inter, system-ui, sans-serif",
    layout: "single-column"
  }
};
```

## Template Specifications

### Frank Digital Template Features

1. **Header Section**
   - Large company branding ("Frank fam.")
   - Name and professional title prominently displayed
   - Contact information in header area
   - Professional profile image (circular crop)

2. **Content Layout**
   - Clean single-column layout with generous whitespace
   - Color-coded section headers with dotted underlines
   - Consistent typography hierarchy
   - Tag-based technology and skill display

3. **Section Structure**
   - Projects with time periods, descriptions, and technology tags
   - Education with institution and degree details  
   - Certifications with year and issuing organization
   - Competencies grouped by skill level with visual tags
   - Languages with proficiency levels

4. **Visual Design**
   - Purple accent color (#6366f1) for headings and tags
   - Professional typography with clear hierarchy
   - Rounded skill/technology tags
   - Consistent spacing and alignment
   - Modern, clean aesthetic

### Output Format Requirements

- **PDF**: A4 format, high-quality print output, <2MB file size
- **HTML**: Self-contained with inline CSS, responsive design
- **DOCX**: Microsoft Word compatible, maintained formatting

This enhanced data model supports the full complexity of the Frank Digital CV while maintaining the flexibility for simpler CV generation use cases.