import puppeteer, { Browser, Page } from 'puppeteer';
import type { ExtendedCVData, CompleteCVData, CVGenerationResult } from '../types/cv.js';
import { generateSimpleHTML } from '../templates/simple-test.ts';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class CVGenerationService {
  private browser: Browser | null = null;

  async initialize(): Promise<void> {
    if (!this.browser) {
      console.log('🚀 Initializing Puppeteer browser...');
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-extensions',
          '--no-first-run',
          '--no-zygote',
          '--single-process'
        ],
        timeout: 30000
      });
      console.log('✅ Puppeteer browser initialized successfully');
    }
  }

  async cleanup(): Promise<void> {
    if (this.browser) {
      console.log('🧹 Cleaning up Puppeteer browser...');
      await this.browser.close();
      this.browser = null;
      console.log('✅ Browser cleanup completed');
    }
  }

  async generateCV(
    cvData: ExtendedCVData | CompleteCVData,
    templateId: string = 'andervang-consulting',
    format: 'pdf' | 'html' | 'docx' = 'pdf'
  ): Promise<CVGenerationResult> {
    console.log(`🎨 Generating CV with template: ${templateId}, format: ${format}`);
    
    try {
      await this.initialize();

      let htmlContent: string;
      
      switch (templateId) {
        case 'andervang-consulting':
          htmlContent = generateSimpleHTML(cvData);
          break;
        default:
          throw new Error(`Unsupported template: ${templateId}`);
      }

      switch (format) {
        case 'html':
          return {
            success: true,
            data: `data:text/html;base64,${Buffer.from(htmlContent).toString('base64')}`,
            metadata: {
              templateId,
              format,
              generatedAt: new Date().toISOString()
            }
          };

        case 'pdf':
          return await this.generatePDF(htmlContent, templateId);

        case 'docx':
          return {
            success: true,
            data: `data:text/html;base64,${Buffer.from(htmlContent).toString('base64')}`,
            metadata: {
              templateId,
              format: 'html',
              generatedAt: new Date().toISOString()
            }
          };

        default:
          throw new Error(`Unsupported format: ${format}`);
      }
    } catch (error) {
      console.error('❌ CV generation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        metadata: {
          templateId,
          format,
          generatedAt: new Date().toISOString()
        }
      };
    }
  }

  private async generatePDF(htmlContent: string, templateId: string): Promise<CVGenerationResult> {
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    const page: Page = await this.browser.newPage();
    
    try {
      console.log('📄 Generating PDF...');
      
      await page.setContent(htmlContent, {
        waitUntil: ['networkidle0', 'domcontentloaded']
      });

      // Wait for any fonts or images to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0.5cm',
          right: '0.5cm',
          bottom: '0.5cm',
          left: '0.5cm'
        },
        preferCSSPageSize: true
      });

      console.log(`✅ PDF generated successfully (${pdfBuffer.length} bytes)`);

      // Create downloads directory if it doesn't exist
      const downloadsDir = path.join(__dirname, '../../downloads');
      try {
        await fs.mkdir(downloadsDir, { recursive: true });
      } catch {
        // Directory already exists, ignore
      }

      // Generate unique filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `cv-${templateId}-${timestamp}.pdf`;
      const filepath = path.join(downloadsDir, filename);

      // Save PDF to file
      await fs.writeFile(filepath, pdfBuffer);
      console.log(`💾 PDF saved to: ${filepath}`);

      return {
        success: true,
        data: {
          fileUrl: `/api/download/${filename}`,
          format: 'pdf',
          template: templateId,
          generatedAt: new Date().toISOString(),
          filename,
          size: pdfBuffer.length
        },
        metadata: {
          templateId,
          format: 'pdf',
          generatedAt: new Date().toISOString(),
          filename,
          size: pdfBuffer.length
        }
      };
    } finally {
      await page.close();
    }
  }

  async generatePDFDirectWithData(res: Response, cvData: ExtendedCVData | CompleteCVData, templateId: string = 'andervang-consulting'): Promise<void> {
    await this.initialize();

    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    console.log('🎨 Generating PDF with user data:', {
      name: cvData.personalInfo?.name,
      hasProfileImage: !!cvData.personalInfo?.profileImage,
      imagePreview: cvData.personalInfo?.profileImage?.substring(0, 50),
      template: templateId
    });

    const htmlContent = generateSimpleHTML(cvData);
    
    const page = await this.browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
      printBackground: true,
      preferCSSPageSize: true
    });

    await page.close();

    const filename = `${(cvData.personalInfo?.name || 'CV').replace(/\s+/g, '_')}_CV_${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    
    console.log(`✅ PDF generated successfully: ${filename} (${pdfBuffer.length} bytes)`);
    res.send(pdfBuffer);
  }

  async generatePDFDirect(res: Response): Promise<void> {
    await this.initialize();

    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    // Use the EXACT complete CV data from our previous enhanced work
    const realCVData = {
      // Company Information
      company: "Andervang Consulting",
      
      // Basic Information - REQUIRED by template
      personalInfo: {
        name: "Niklas Andervang",
        title: "Senior front-end/fullstack utvecklare & tillgänglighetsexpert",
        email: "niklas@andervang.com",
        phone: "+46702441323",
        location: "Stockholm, Sverige",
        profileImage: "data:image/jpeg;base64,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"
      },
      
      // Professional Summary - FIRST PAGE content
      summary: {
        introduction: "Niklas är en senior frontend/fullstack utvecklare som är bred med sin kompetens och kan röra sig i flera roller. Niklas har stor erfarenhet från flertalet frontend-ramverk, dev-ops teknik och moderna arkitekturlösningar under de ca 15 år som Niklas arbetat som utvecklare. Niklas jobbar ofta UI nära och med sin långa erfarenhet är Niklas ofta ett bollplank för UX och design kring förbättring av flöden och interaktion men även utformning av komponenter.\n\nNiklas har också ett stort intresse för analys och SEO och brinner för att skapa värde och förbättring. Som person är Niklas noggrann och trivs med att ha ett brett perspektiv till saker och ting.",
        
        // Key highlights to display on the right side (as shown in image)
        specialties: [
          "Senior utvecklare FE/Fullstack",
          "Test och kvalitetssäkring", 
          "Teamlead / mentor / scrummaster",
          "Tillgänglighetsexpert",
          "Teknisk projektledare"
        ]
      },

      // Role highlights - REQUIRED by Frank Digital template for role cards section
      roles: [
        {
          title: "Senior utvecklare FE/Fullstack",
          skills: ["React", "TypeScript", "Next.js", "Node.js", "DevOps"]
        },
        {
          title: "Tillgänglighetsexpert", 
          skills: ["WCAG", "AXE", "Tillgänglighetstester", "BrowserStack"]
        },
        {
          title: "Tech Lead & Mentor",
          skills: ["Scrum Master", "Team Lead", "Mentor", "Agile", "Projektledning"]
        }
      ],

      // EXPERIENCES/PROJECTS section
      projects: [
        {
          period: "juni 2024 - pågående",
          type: "Front-end / Fullstack utvecklare / Tillgänglighetsexpert",
          title: "Cisco",
          description: "Niklas jobbade i teamet för deras externa webbplats cisco.com/se. Stora delar av arbetet handlade om migrering och uppgradering av befintliga komponenter, sidor och mallar till en nyare teknisk plattform. Samtidigt som teamet byggde nya funktioner och förbättringar. I projektet jobbade han som fullstack utvecklare men också som tillgängligheitsexpert för att säkerställa att alla komponenter håller hög tillgänglighetsnivå.",
          technologies: ["DevOps", "Tillgänglighet", "TypeScript", "WCAG", "Test och validering", "React", "Contentful", "Next.js", "MongoDB", "Event hantering"]
        },
        {
          period: "mars 2024 - maj 2024",
          type: "Front-end / Fullstack utvecklare / Tillgänglighetsexpert",
          title: "Digitalidag / PTS", 
          description: "I projektet för Digitalidag skapades en hemsida i syfte att informera och dela med sig kring digitaliseringen på lokal nivå. Niklas jobbade som full-stack utvecklare med extra fokus på tillgänglighet och användarupplevelse. Webbplatsen skapades från scratch med modern teknik.",
          technologies: ["DevOps", "Tillgänglighet", "TypeScript", "WCAG", "Test och validering", "React", "Contentful", "Next.js", "MongoDB", "Event hantering"]
        },
        {
          period: "nov. 2023 - juni 2024", 
          type: "Front-end / Fullstack utvecklare",
          title: "DePalma Workwear",
          description: "DePalma Workwear / Goods är en webbplats med headless data arkitektur från Sanity CMS med flera integrationer som Shopify och Drip Marketing Automation. Niklas roll i projektet var att underhålla webbplatsen, se över infra strukturen och miljöer, utveckla nya funktioner och förbättringar samt ta fram strategi kring konvertering, tillgänglighet och SEO.",
          technologies: ["SEO", "CI/CD", "DevOps", "HTML & CSS", "Tillgänglighet", "WCAG", "Analytics", "Shopify", "React", "Gatsby.js", "Headless", "Netlify", "Sanity"]
        },
        {
          period: "dec. 2023 - apr. 2024",
          type: "Front-end / Fullstack utvecklare / Tillgänglighetsexpert", 
          title: "Postnord",
          description: "Postnord satsar och jobbar globalt och i detta projekt jobbade Niklas med den internationella .com webbplatsen. I projektet skapas nya agnostiska komponenter och block som sedan används i Optimizely CMS. En stor tyngt lades på att validera tillgänglighet för nya och befintliga komponenterna. Komponenterna skapades med modern teknisk, webkomponents som sedan kan användas oavsett teknikval/ramverk.",
          technologies: ["C#", "Kvalitetssäkring", "Tillgänglighet", "TypeScript", "WCAG", "Optimizely", "Test och validering", "Komponentbibliotek", "Stencil.js", ".NET", "Webcomponents", "Dotnet core"]
        },
        {
          period: "mars 2023 - dec. 2023",
          type: "Front-end utvecklare / Tillgänglighetsexpert",
          title: "Skandia", 
          description: "Niklas hade en specialistroll som tillgänglighetsexpert i det centrala designsystem teamet på Skandia. I projektet skedde en förflyttning av ramverk och ombyggnad av samtliga komponenter för webb, app och interna system. I arbetet jobbade Niklas med kvalitetssäkring, dokumentation och granskning men också direkt stöd för både utvecklare och design/ux. Niklas jobbade både operativt med process och utveckling men samtidigt strategiarbete för organsiationen.",
          technologies: ["Kvalitetssäkring", "Strategy", "Tillgänglighet", "BrowserStack", "AXE", "TypeScript", "WCAG", "Komponentbibliotek", "Tillgänglighetstester", "Figma", "Designsystem", "React", "Storybook", "Test och kvalitetssäkring", "Webdriver IO", "End2End-testning"]
        }
      ],

      // WORK EMPLOYMENTS & ROLES section
      employment: [
        {
          period: "nov 2022 - pågående",
          position: "Senior front-end/fullstack utvecklare & tillgänglighetsexpert",
          company: "Frank Digital AB", 
          description: "Som senior utvecklare och tillgänglighetsexpert arbetar Niklas med komplexa frontend-projekt och hjälper kunder att bygga tillgängliga och användarvänliga digitala lösningar.",
          technologies: ["React", "TypeScript", "Next.js", "WCAG", "Tillgänglighet", "DevOps"],
          achievements: [
            "Senior utveckling av frontend-applikationer",
            "Tillgänglighetsexpertis och WCAG-implementation", 
            "Mentorskap och teamledarskap",
            "Teknisk projektledning"
          ]
        },
        {
          period: "aug. 2017 - sep. 2022",
          position: "Tillgänglighetsexpert",
          company: "Valtech Global",
          description: "Under flera år jobbade Niklas som ansvarig för den interna kompetenssatsningen inom tillgänglighet för Valtech globalt. Det innefattade att utbilda och arbeta strategiskt med tillgänglighet. Att ta fram arbetssätt och verktyg samt bygga ett nätverk av experter från olika håll i världen.",
          technologies: ["Team-lead", "Way of working", "Kvalitetssäkring", "Strategi", "Dokumentation", "Nätverk", "Kompetensutveckling", "Utbildning", "Tillgänglighet"],
          achievements: [
            "Ansvarig för global kompetenssatsning inom tillgänglighet",
            "Byggde nätverk av experter från olika håll i världen", 
            "Genomförde utbildningar och workshops för medarbetare och kunder"
          ]
        }
      ],

      // EDUCATION/COURSES/CERTIFICATIONS section
      education: [
        {
          period: "2008 - 2011",
          degree: "Interaktionsdesign (MDA) interaktionsdesign (Kandidatexamen)",
          institution: "Blekinge Tekniska Högskola (Karlskrona)"
        }
      ],

      certifications: [
        {
          year: "2022", 
          title: "Certified Professional in Accessibility Core Competencies (CPACC)",
          issuer: "IAAP"
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
          year: "2015",
          title: "Agile Scrum kurs",
          issuer: "Certified Scrum Master"
        }
      ],

      courses: [
        {
          name: "Tillgänglighet konferens och workshops",
          provider: "FUNKA",
          completionDate: "2018"
        },
        {
          name: "UX kurser, Lean UX & UX strategi",
          provider: "Various providers", 
          completionDate: "2015"
        }
      ],

      // COMPETENCIES/SKILLS section
      competencies: [
        {
          category: "Expert inom området",
          skills: [
            { name: "CSS" },
            { name: "HTML" },
            { name: "Test och kvalitetssäkring" },
            { name: "Tillgänglighet" },
            { name: "WCAG" },
            { name: "React" }
          ]
        },
        {
          category: "Mycket hög kompetens",
          skills: [
            { name: "TypeScript" },
            { name: "JavaScript" },
            { name: "Next.js" },
            { name: "Node.js" },
            { name: "DevOps" },
            { name: "UX/UI Design" }
          ]
        },
        {
          category: "Hög kompetens", 
          skills: [
            { name: "C#" },
            { name: ".NET Core" },
            { name: "MongoDB" },
            { name: "Azure" },
            { name: "SEO" },
            { name: "Analytics" }
          ]
        }
      ],

      // LANGUAGES section
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

      // ENDING SECTION with contact info and closing text
      closing: {
        text: "Niklas är alltid öppen för nya utmaningar och möjligheter att bidra till spännande projekt inom frontend/fullstack utveckling och tillgänglighet. Hans breda tekniska kompetens kombinerat med stark fokus på användarupplevelse och kvalitet gör honom till en värdefull tillgång i alla utvecklingsteam.",
        contact: {
          email: "niklas@andervang.com",
          phone: "+46702441323", 
          location: "Stockholm, Sverige",
          company: "Andervang Consulting"
        }
      }
    };

    const htmlContent = generateSimpleHTML(realCVData);
    const page = await this.browser.newPage();

    try {
      console.log('📄 Generating PDF for direct download...');

      await page.setContent(htmlContent, {
        waitUntil: ['networkidle0', 'domcontentloaded']
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0.5cm',
          right: '0.5cm',
          bottom: '0.5cm',
          left: '0.5cm'
        },
        preferCSSPageSize: true
      });

      console.log(`✅ PDF generated for direct download (${pdfBuffer.length} bytes)`);

      // Generate filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `Niklas_Andervang_CV_${timestamp}.pdf`;

      // Set headers for file download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Length', pdfBuffer.length);

      // Send the PDF buffer directly
      res.send(pdfBuffer);
      
    } finally {
      await page.close();
    }
  }
}

export const cvGenerationService = new CVGenerationService();

process.on('SIGTERM', async () => {
  console.log('🛑 Received SIGTERM, cleaning up...');
  await cvGenerationService.cleanup();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Received SIGINT, cleaning up...');
  await cvGenerationService.cleanup();
  process.exit(0);
});
