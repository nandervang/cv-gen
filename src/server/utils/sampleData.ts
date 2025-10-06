import type { CompleteCVData } from '../types/cv.js';

/**
 * Generate sample CV data for template previews
 * This creates realistic but generic data to showcase template features
 */
export function generateSampleCVData(): CompleteCVData {
  return {
    personalInfo: {
      name: "Alex Johnson",
      title: "Senior Software Engineer & Technical Lead",
      email: "alex.johnson@email.com",
      phone: "+46 70 123 45 67",
      location: "Stockholm, Sweden"
    },
    summary: {
      introduction: "Experienced software engineer with 8+ years in full-stack development, specializing in modern web technologies and cloud infrastructure. Passionate about building scalable solutions and mentoring development teams.",
      highlights: [
        "8+ years of full-stack development experience",
        "Expert in React, Node.js, and cloud technologies", 
        "Led development teams of 5-8 engineers",
        "Built applications serving 100,000+ users"
      ]
    },
    projects: [
      {
        title: "E-Commerce Platform Modernization",
        type: "Full-Stack Development",
        period: "2023-2024",
        description: "Led the complete redesign and migration of a legacy e-commerce platform to modern microservices architecture. Implemented real-time inventory management and improved performance by 300%.",
        technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS", "Redis"]
      },
      {
        title: "Mobile Banking Application",
        type: "Mobile Development",
        period: "2022-2023", 
        description: "Developed secure mobile banking application with biometric authentication and real-time transaction processing. Achieved 99.9% uptime and processed over 1M transactions.",
        technologies: ["React Native", "TypeScript", "GraphQL", "MongoDB", "Kubernetes"]
      },
      {
        title: "Real-Time Analytics Dashboard",
        type: "Data Visualization",
        period: "2021-2022",
        description: "Built comprehensive analytics dashboard for business intelligence with real-time data processing and interactive visualizations. Reduced report generation time by 80%.",
        technologies: ["Vue.js", "D3.js", "Python", "Apache Kafka", "Elasticsearch"]
      }
    ],
    employment: [
      {
        position: "Senior Software Engineer",
        company: "TechCorp Solutions",
        period: "2021-Present",
        description: "Lead development of enterprise web applications and mentor junior developers. Architected microservices infrastructure serving 500K+ daily active users.",
        technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL"]
      },
      {
        position: "Full-Stack Developer",
        company: "Digital Innovations AB",
        period: "2019-2021",
        description: "Developed and maintained multiple client-facing web applications. Implemented CI/CD pipelines and improved deployment efficiency by 60%.",
        technologies: ["Angular", "Express.js", "MySQL", "Jenkins", "Azure"]
      },
      {
        position: "Frontend Developer",
        company: "StartupLab",
        period: "2017-2019",
        description: "Built responsive web applications for B2B SaaS products. Collaborated with UX designers to create intuitive user interfaces.",
        technologies: ["JavaScript", "HTML5", "CSS3", "Webpack", "Git"]
      }
    ],
    education: [
      {
        degree: "Master of Science in Computer Science",
        institution: "Royal Institute of Technology (KTH)",
        period: "2015-2017",
        specialization: "Software Engineering and Distributed Systems"
      },
      {
        degree: "Bachelor of Science in Information Technology", 
        institution: "Stockholm University",
        period: "2012-2015",
        specialization: "Web Development and Database Systems"
      }
    ],
    certifications: [
      {
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        year: "2023",
        description: "Professional-level certification for designing distributed systems on AWS"
      },
      {
        title: "Certified Kubernetes Administrator",
        issuer: "Cloud Native Computing Foundation",
        year: "2022",
        description: "Expertise in Kubernetes cluster administration and orchestration"
      },
      {
        title: "React Professional Developer",
        issuer: "Meta (Facebook)",
        year: "2021",
        description: "Advanced React development patterns and best practices"
      }
    ],
    competencies: [
      {
        category: "Programming Languages",
        skills: [
          { name: "JavaScript/TypeScript", level: "expert" },
          { name: "Python", level: "advanced" },
          { name: "Java", level: "intermediate" },
          { name: "Go", level: "intermediate" }
        ]
      },
      {
        category: "Frontend Technologies",
        skills: [
          { name: "React/Next.js", level: "expert" },
          { name: "Vue.js", level: "advanced" },
          { name: "Angular", level: "advanced" },
          { name: "CSS/Sass", level: "expert" }
        ]
      },
      {
        category: "Backend & Cloud",
        skills: [
          { name: "Node.js/Express", level: "expert" },
          { name: "AWS/Azure", level: "advanced" },
          { name: "Docker/Kubernetes", level: "advanced" },
          { name: "PostgreSQL/MongoDB", level: "expert" }
        ]
      },
      {
        category: "Development Tools",
        skills: [
          { name: "Git/GitHub", level: "expert" },
          { name: "CI/CD Pipelines", level: "advanced" },
          { name: "Testing Frameworks", level: "advanced" },
          { name: "Monitoring & Analytics", level: "intermediate" }
        ]
      }
    ],
    languages: [
      {
        language: "English",
        proficiency: "Native/Fluent"
      },
      {
        language: "Swedish",
        proficiency: "Fluent"
      },
      {
        language: "German",
        proficiency: "Intermediate"
      },
      {
        language: "Spanish",
        proficiency: "Basic"
      }
    ],
    template: "modern",
    format: "html"
  };
}

/**
 * Generate lightweight sample data for quick previews
 */
export function generateLightweightSampleData(): Partial<CompleteCVData> {
  return {
    personalInfo: {
      name: "Alex Johnson",
      title: "Senior Software Engineer",
      email: "alex.johnson@email.com"
    },
    summary: {
      introduction: "Experienced software engineer with expertise in modern web technologies.",
      highlights: [
        "8+ years of development experience",
        "Expert in React and Node.js"
      ]
    },
    projects: [
      {
        title: "E-Commerce Platform",
        type: "Full-Stack Development", 
        period: "2023-2024",
        description: "Led platform modernization with improved performance.",
        technologies: ["React", "Node.js", "AWS"]
      }
    ],
    employment: [
      {
        position: "Senior Software Engineer",
        company: "TechCorp Solutions",
        period: "2021-Present",
        description: "Lead development of enterprise applications.",
        technologies: ["React", "Node.js", "AWS"]
      }
    ],
    education: [
      {
        degree: "MSc Computer Science",
        institution: "KTH Royal Institute",
        period: "2015-2017"
      }
    ]
  };
}