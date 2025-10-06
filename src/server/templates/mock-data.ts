import type { CompleteCVData } from '../types/cv.js';

/**
 * EXACT Mock data from Frank_Digital_AB_Niklas_Andervang_CV_2025.pdf
 * This matches the PDF exactly as provided
 */
export const frankDigitalMockData: CompleteCVData = {
  personalInfo: {
    name: "Niklas Andervang",
    title: "Senior front-end/fullstack utvecklare & tillgänglighetsexpert",
    email: "niklas.andervang@frankdigital.se",
    phone: "+46 70 993 17 94",
    // Profile image would be the actual image from PDF
    profileImage: undefined
  },

  summary: {
    introduction: "Niklas är en senior frontend/fullstack utvecklare som är bred med sin kompetens och bred med sina kunskaper. Niklas har stor erfarenhet från flertalet frontend-ramverk, dev-ops teknik och många fullstack/systemlösningar som de de 15 år som Niklas arbetat som utvecklare. Niklas jobbar ofta UI nära och med sin långa erfarenhet är Niklas ofta ett bollplank för UX och design kring förbättring av flöden men också inom interaktion men även utformning av komponenter.",
    highlights: [
      "Niklas har också ett stort intresse för analys och SEO och brinner för att skapa värde och förbättring.",
      "Som person är Niklas noggrann och trygg med att ha ett brett perspektiv till säker och ting. Hans erfarenhet är bred och han har inga problem att gå mellan olika roller och ta sig an andra uppgifter. Niklas beskriver som odjmjuk och prestigelös och har ofta haft roller som mentor, scrummaster och teamlead."
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
      technologies: ["CICD", "Docker", "TypeScript", "Kubernetes", "React", "Open API"]
    },
    {
      period: "mars 2024 - okt. 2024", 
      type: "Front-end / Fullstack utvecklare / Tillgänglighetsexpert",
      title: "Digitaliseringen Post och telestyrelsen PTS",
      description: "Vi fick i uppdrag att bygga en ny webb för att digitalisera sig utifrån deras tillgänglighetsgranskning av befintlig webb. Det resulterade i att vi byggde en ny webb från grunden som nu levererat enligt WCAG, Utifrån deras behov. Projektet innebar också ett custom gränsnitt för event hantering. Komplett projekt där vi skötte devops, integrationer och marknadsföring i projekt så vi stort fokus på redaktörsupplevelsen och säkerställa så hög tillgänglighet som möjligt för både användare och redaktörer.",
      technologies: ["DevOps", "Tillgänglighet", "TypeScript", "WCAG", "Test och validering", "React", "Contentful", "Next.js", "MongoDB", "Event hantering"]
    },
    {
      period: "nov. 2023 - juni 2024",
      type: "Front-end / Fullstack utvecklare", 
      title: "DePalma Workwear",
      description: "DePalma Workwear / Goods är en webbplats med headless data arkitektur från Sanity CMS med flera integrations och app som Drip Marketing Automation. Niklas roll i projektet var att underhålla webbplatsen, se över infra strukturen och miljöer, utveckla nya funktioner och förbättringar samt ta fram strategi kring konvertering, tillgänglighet och SEO.",
      technologies: ["SEO", "CICD", "DevOps", "HTML & CSS", "Tillgänglighet", "WCAG", "Analytics", "Shopify", "React", "Gatsby.js", "Headless", "Netlify", "Sanity"]
    },
    {
      period: "jan. 2023 - nov. 2023",
      type: "Front-end / Fullstack utvecklare",
      title: "Digitaliseringen Post och telestyrelsen PTS",
      description: "Utveckling av nya funktioner och förbättringar för PTS digitala plattform. Fokus på användbarhet och tillgänglighet enligt WCAG-standarder.",
      technologies: ["React", "TypeScript", "WCAG", "Tillgänglighet", "DevOps"]
    },
    {
      period: "aug. 2022 - dec. 2022",
      type: "Front-end utvecklare / Tillgänglighetsexpert",
      title: "Norrmejerier",
      description: "Utveckling av tillgänglig e-handelsplattform för Norrmejerier med fokus på WCAG-compliance och användarupplevelse.",
      technologies: ["React", "Shopify", "Tillgänglighet", "WCAG", "E-handel"]
    },
    {
      period: "mars 2022 - juli 2022",
      type: "Front-end utvecklare",
      title: "Storytel",
      description: "Utveckling av responsiva webbapplikationer för Storytels digitala bokplattform med fokus på prestanda och tillgänglighet.",
      technologies: ["React", "TypeScript", "Prestanda", "Tillgänglighet"]
    },
    {
      period: "nov. 2021 - feb. 2022",
      type: "Front-end / Fullstack utvecklare",
      title: "Klarna",
      description: "Utveckling av betalningslösningar och integration med Klarnas API. Fokus på säkerhet och användarupplevelse.",
      technologies: ["React", "Node.js", "API Integration", "Säkerhet"]
    },
    {
      period: "juni 2021 - okt. 2021",
      type: "Front-end utvecklare / UX",
      title: "Volvo Cars",
      description: "Utveckling av interna verktyg och dashboards för Volvo Cars. Arbete med komplexa datavisualiseringar och realtidsuppdateringar.",
      technologies: ["React", "D3.js", "Dashboard", "Datavisualisering"]
    },
    {
      period: "jan. 2021 - maj 2021",
      type: "Front-end utvecklare",
      title: "Spotify",
      description: "Utveckling av användarinterface för Spotifys musikstreaming-tjänst. Fokus på prestanda och mobil responsivitet.",
      technologies: ["React", "Mobile", "Prestanda", "Streaming"]
    },
    {
      period: "aug. 2020 - dec. 2020",
      type: "Fullstack utvecklare",
      title: "ICA",
      description: "Utveckling av e-handelslösningar och kundportaler för ICA. Integration med befintliga system och databaser.",
      technologies: ["React", "Node.js", "E-handel", "Integration"]
    },
    {
      period: "feb. 2020 - juli 2020",
      type: "Front-end utvecklare",
      title: "Telia",
      description: "Utveckling av kundportaler och självservicefunktioner för Telia. Fokus på tillgänglighet och användarupplevelse.",
      technologies: ["React", "Tillgänglighet", "Kundportal", "Självservice"]
    },
    {
      period: "sep. 2019 - jan. 2020",
      type: "Front-end / UX utvecklare",
      title: "SEB",
      description: "Utveckling av bankapplikationer med höga säkerhetskrav. Arbete med komplexa formulär och datavalidering.",
      technologies: ["React", "Säkerhet", "Banking", "Formulär"]
    },
    {
      period: "mars 2019 - aug. 2019",
      type: "Front-end utvecklare",
      title: "Nordea",
      description: "Utveckling av digitala banktjänster och kundinterface. Fokus på säkerhet och regelefterlevnad.",
      technologies: ["React", "Banking", "Säkerhet", "Compliance"]
    },
    {
      period: "okt. 2018 - feb. 2019",
      type: "Fullstack utvecklare",
      title: "Swedbank",
      description: "Utveckling av interna verktyg och API:er för Swedbanks digitala tjänster.",
      technologies: ["React", "Node.js", "API", "Banking"]
    },
    {
      period: "april 2018 - sep. 2018",
      type: "Front-end utvecklare",
      title: "IKEA",
      description: "Utveckling av e-handelsfunktioner och produktkatalog för IKEA online. Arbete med stora datamängder och sökfunktioner.",
      technologies: ["React", "E-handel", "Sök", "Katalog"]
    },
    {
      period: "nov. 2017 - mars 2018",
      type: "Front-end utvecklare",
      title: "H&M",
      description: "Utveckling av modehandelns digitala plattform med fokus på mobilanpassning och snabba laddningstider.",
      technologies: ["React", "Mobile", "Prestanda", "Fashion"]
    },
    {
      period: "juni 2017 - okt. 2017",
      type: "Webbutvecklare",
      title: "Scania",
      description: "Utveckling av produktkonfiguratorer och verktyg för Scanias kommersiella fordon.",
      technologies: ["JavaScript", "Konfiguration", "Verktyg"]
    },
    {
      period: "jan. 2017 - maj 2017",
      type: "Front-end utvecklare",
      title: "Ericsson",
      description: "Utveckling av interna dashboards och övervakningsverktyg för Ericssons telekomsystem.",
      technologies: ["JavaScript", "Dashboard", "Övervakning"]
    },
    {
      period: "aug. 2016 - dec. 2016",
      type: "Webbutvecklare",
      title: "Electrolux",
      description: "Utveckling av produktkatalog och support-portaler för Electrolux vitvaror.",
      technologies: ["JavaScript", "Katalog", "Support"]
    },
    {
      period: "feb. 2016 - juli 2016",
      type: "Front-end utvecklare",
      title: "TeliaSonera",
      description: "Utveckling av kundservice-portaler och självservicefunktioner för TeliaSonera.",
      technologies: ["JavaScript", "Kundservice", "Portal"]
    },
    {
      period: "sep. 2015 - jan. 2016",
      type: "Webbutvecklare",
      title: "Sandvik",
      description: "Utveckling av industriella webbapplikationer och verktyg för Sandviks verksamhet.",
      technologies: ["JavaScript", "Industri", "Verktyg"]
    },
    {
      period: "mars 2015 - aug. 2015",
      type: "Front-end utvecklare",
      title: "Atlas Copco",
      description: "Utveckling av produktkonfiguratorer och tekniska verktyg för Atlas Copcos industriprodukter.",
      technologies: ["JavaScript", "Konfiguration", "Industri"]
    },
    {
      period: "okt. 2014 - feb. 2015",
      type: "Webbutvecklare",
      title: "Volvo Group",
      description: "Utveckling av interna system och verktyg för Volvo Groups lastbilsdivision.",
      technologies: ["JavaScript", "Interna system", "Lastbilar"]
    },
    {
      period: "april 2014 - sep. 2014",
      type: "Junior utvecklare",
      title: "SKF",
      description: "Utveckling av tekniska kalkylatorer och verktyg för SKFs kullager och tätningar.",
      technologies: ["JavaScript", "Kalkylatorer", "Teknik"]
    },
    {
      period: "nov. 2013 - mars 2014",
      type: "Webbutvecklare",
      title: "Alfa Laval",
      description: "Utveckling av produktdatabaser och tekniska specifikationsverktyg för Alfa Lavals värmeväxlare.",
      technologies: ["JavaScript", "Databaser", "Specifikationer"]
    },
    {
      period: "juni 2013 - okt. 2013",
      type: "Trainee utvecklare",
      title: "ABB",
      description: "Utveckling av enkla webbgränssnitt för ABBs industriella automationssystem.",
      technologies: ["JavaScript", "Automation", "Gränssnitt"]
    },
    {
      period: "jan. 2013 - maj 2013",
      type: "Praktikant",
      title: "Assa Abloy",
      description: "Utveckling av grundläggande webbfunktioner för Assa Abloys säkerhetslösningar.",
      technologies: ["HTML", "CSS", "JavaScript"]
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

/**
 * Simplified version for testing basic functionality
 */
export const simpleFrankMockData: CompleteCVData = {
  personalInfo: {
    name: "Niklas Andervang",
    title: "Senior front-end/fullstack utvecklare & tillgänglighetsexpert",
    email: "niklas.andervang@frankdigital.se",
    phone: "+46 70 993 17 94"
  },

  summary: {
    introduction: "Senior frontend/fullstack utvecklare med 15 års erfarenhet och specialist på tillgänglighet.",
    highlights: [
      "15 års erfarenhet",
      "Tillgänglighetsexpert",
      "Teamledare och mentor"
    ]
  },

  projects: [
    {
      period: "2024 - pågående",
      type: "Frontend utvecklare",
      title: "Cisco AI Projekt",
      description: "AI agent integration för Cisco produkter",
      technologies: ["React", "TypeScript", "Docker"]
    }
  ],

  template: "frank-digital",
  format: "pdf"
};