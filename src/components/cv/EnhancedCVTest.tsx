import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Correctly structured CV Data for Niklas Andervang based on specifications and Frank Digital template
const niklasAndervangMockData = {
  // Company Information
  company: "Andervang Consulting",
  
  // Basic Information - REQUIRED by template
  personalInfo: {
    name: "Niklas Andervang",
    title: "Senior front-end/fullstack utvecklare & tillgänglighetsexpert",
    email: "niklas@andervang.com",
    phone: "+46702441323",
    location: "Stockholm, Sverige",
    profileImage: "data:image/jpeg;base64,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" // Placeholder professional headshot
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

export default function EnhancedCVTest() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState('andervang-consulting');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'html' | 'docx'>('pdf');
  const [customData, setCustomData] = useState(niklasAndervangMockData);
  const [generatedFileData, setGeneratedFileData] = useState<{
    content: string;
    filename: string;
    format: string;
  } | null>(null);

  const updatePersonalInfo = (field: string, value: string) => {
    setCustomData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateSummary = (field: string, value: string) => {
    setCustomData((prev) => ({
      ...prev,
      summary: {
        ...prev.summary,
        [field]: value
      }
    }));
  };

  const downloadFile = (base64Content: string, filename: string, format: string) => {
    try {
      console.log('Download function called with:', {
        contentLength: base64Content.length,
        filename,
        format,
        contentPreview: base64Content.substring(0, 100)
      });

      if (!base64Content || base64Content.length === 0) {
        throw new Error('No content to download');
      }

      let mimeType: string;
      let processedContent: string;

      // Handle different file formats
      switch (format.toLowerCase()) {
        case 'pdf':
          mimeType = 'application/pdf';
          // Remove data URL prefix if present
          if (base64Content.startsWith('data:application/pdf;base64,')) {
            processedContent = base64Content.replace(/^data:application\/pdf;base64,/, '');
          } else if (base64Content.startsWith('data:')) {
            // Remove any data URL prefix
            processedContent = base64Content.split(',')[1] || base64Content;
          } else {
            // Assume it's already base64 encoded
            processedContent = base64Content;
          }
          break;
        case 'html':
          mimeType = 'text/html';
          if (base64Content.startsWith('data:text/html;base64,')) {
            processedContent = base64Content.replace(/^data:text\/html;base64,/, '');
          } else if (base64Content.startsWith('<')) {
            // If it's plain HTML, encode it to base64
            processedContent = btoa(unescape(encodeURIComponent(base64Content)));
          } else {
            processedContent = base64Content;
          }
          break;
        case 'docx':
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          if (base64Content.startsWith('data:')) {
            processedContent = base64Content.split(',')[1] || base64Content;
          } else {
            processedContent = base64Content;
          }
          break;
        default:
          mimeType = 'application/octet-stream';
          processedContent = base64Content;
      }

      console.log('Processing for download:', {
        mimeType,
        processedContentLength: processedContent.length,
        processedContentPreview: processedContent.substring(0, 50)
      });

      // Validate base64 content for PDFs
      if (format.toLowerCase() === 'pdf') {
        // Check if it looks like valid base64
        const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
        if (!base64Regex.test(processedContent)) {
          console.error('Invalid base64 content for PDF');
          throw new Error('Invalid PDF content - not valid base64');
        }
        
        // PDF files should start with %PDF- when decoded
        try {
          const decoded = atob(processedContent.substring(0, 20));
          if (!decoded.startsWith('%PDF-')) {
            console.warn('PDF content does not start with %PDF- header, but proceeding...');
          }
        } catch (e) {
          console.error('Cannot decode base64 content:', e);
          throw new Error('Cannot decode PDF content');
        }
      }

      // Convert base64 to blob
      const byteCharacters = atob(processedContent);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      console.log('Created blob:', {
        size: blob.size,
        type: blob.type
      });

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log(`✅ Download initiated: ${filename} (${blob.size} bytes)`);
    } catch (error) {
      console.error('Download error:', error);
      alert(`Failed to download file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image file too large. Please select an image smaller than 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        
        // Create an image element to resize
        const img = new Image();
        img.onload = () => {
          // Create canvas for resizing
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calculate new dimensions (max 300px width/height for profile photo)
          const maxSize = 300;
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
          
          updatePersonalInfo('profileImage', compressedBase64);
        };
        img.src = base64;
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCV = async () => {
    setIsGenerating(true);
    setResult('');
    setGeneratedFileData(null);
    
    try {
      const payload = {
        ...customData,
        template: selectedTemplate,
        format: selectedFormat
      };

      // Calculate payload size for debugging
      const payloadString = JSON.stringify(payload);
      const payloadSizeMB = (new Blob([payloadString]).size / 1024 / 1024).toFixed(2);

      console.log('Sending CV generation request:', {
        template: selectedTemplate,
        format: selectedFormat,
        hasProfilePhoto: !!payload.personalInfo.profileImage,
        payloadSizeMB: `${payloadSizeMB} MB`,
        profilePhotoSize: payload.personalInfo.profileImage ? 
          `${(payload.personalInfo.profileImage.length / 1024).toFixed(2)} KB` : 'No photo'
      });

      const response = await fetch('/api/generate-real', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      // Handle PDF downloads directly
      if (selectedFormat === 'pdf') {
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${customData.personalInfo.name.replace(/\s+/g, '_')}_CV_${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          
          setResult(`✅ PDF CV downloaded successfully!\n📄 Format: ${selectedFormat}\n📊 File size: ${blob.size} bytes`);
          setGeneratedFileData(null); // No need to store data for direct downloads
          return;
        } else {
          const errorData = await response.text();
          setResult(`❌ PDF download failed: ${errorData}`);
          setGeneratedFileData(null);
          return;
        }
      }

      const data = await response.json();
      console.log('CV generation response:', data);
      
      // Log the actual response structure for debugging
      console.log('Response data structure:', {
        hasData: !!data.data,
        dataKeys: data.data ? Object.keys(data.data) : [],
        contentType: typeof data.data?.content,
        contentLength: data.data?.content?.length,
        base64ContentType: typeof data.data?.base64Content,
        base64ContentLength: data.data?.base64Content?.length,
        hasBuffer: !!data.data?.buffer,
        format: data.data?.format
      });

      if (data.success) {
        // Store the generated file data for download
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${customData.personalInfo.name.replace(/\s+/g, '_')}_CV_${timestamp}.${selectedFormat}`;
        
        // Try to get the content from various possible response fields
        const content = data.data.fileUrl ||  // The actual content is in fileUrl as data URI
                       data.data.content || 
                       data.data.base64Content || 
                       data.data.buffer || 
                       data.data.data || 
                       '';
        
        console.log('Using content from response:', {
          source: data.data.fileUrl ? 'fileUrl' :
                 data.data.content ? 'content' : 
                 data.data.base64Content ? 'base64Content' : 
                 data.data.buffer ? 'buffer' : 
                 data.data.data ? 'data' : 'none',
          contentPreview: content.substring(0, 50),
          contentLength: content.length,
          isDataUrl: content.startsWith('data:')
        });
        
        setGeneratedFileData({
          content: content,
          filename: filename,
          format: selectedFormat
        });

        setResult(`✅ CV generated successfully!\n🔗 File URL: ${data.data.fileUrl}\n📄 Format: ${data.data.format}\n🎨 Template: ${data.data.template}\n⏰ Generated: ${data.data.generatedAt}\n📊 Content length: ${content.length} chars`);
      } else {
        setGeneratedFileData(null);
        setResult(`❌ Generation failed: ${data.error?.message || 'Unknown error'}\n📦 Payload size: ${payloadSizeMB} MB`);
      }
    } catch (error: unknown) {
      console.error('Generation error:', error);
      setGeneratedFileData(null);
      setResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enhanced CV Generator Test - Niklas Andervang</CardTitle>
          <CardDescription>
            Test CV generation with profile photo support
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={customData.personalInfo.name}
                onChange={(e) => updatePersonalInfo('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                {customData.personalInfo.profileImage && (
                  <div className="flex items-center space-x-2">
                    <img 
                      src={customData.personalInfo.profileImage} 
                      alt="Profile preview" 
                      className="w-12 h-12 rounded-full object-cover border border-gray-300"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updatePersonalInfo('profileImage', '')}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Generation Controls */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="template">Template</Label>
                <select
                  id="template"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  aria-label="Select CV template"
                >
                  <option value="andervang-consulting">Andervang Consulting</option>
                  <option value="frank-digital">Frank Digital</option>
                  <option value="modern-professional">Modern Professional</option>
                  <option value="classic-executive">Classic Executive</option>
                  <option value="creative-portfolio">Creative Portfolio</option>
                </select>
              </div>
              <div>
                <Label htmlFor="format">Format</Label>
                <select
                  id="format"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value as 'pdf' | 'html' | 'docx')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  aria-label="Select output format"
                >
                  <option value="pdf">PDF</option>
                  <option value="html">HTML</option>
                  <option value="docx">DOCX</option>
                </select>
              </div>
            </div>
            
            <Button
              onClick={generateCV}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? 'Generating CV...' : 'Generate CV'}
            </Button>
            
            {result && (
              <div className="bg-gray-100 p-4 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Generation Result:</h3>
                  {generatedFileData && (
                    <Button
                      onClick={() => downloadFile(
                        generatedFileData.content,
                        generatedFileData.filename,
                        generatedFileData.format
                      )}
                      variant="outline"
                      size="sm"
                      className="ml-4"
                    >
                      📥 Download CV
                    </Button>
                  )}
                </div>
                <pre className="text-sm whitespace-pre-wrap">{result}</pre>
                {generatedFileData && (
                  <div className="mt-3 p-3 bg-blue-50 rounded border">
                    <p className="text-sm text-blue-700">
                      <strong>Ready to download:</strong> {generatedFileData.filename}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      File size: {generatedFileData.content ? `${(generatedFileData.content.length / 1024).toFixed(1)} KB` : 'Unknown'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
                    <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">CV Data Summary (Andervang Consulting):</h3>
            <ul className="text-sm space-y-1">
              <li>• <strong>Name:</strong> {customData.personalInfo.name}</li>
              <li>• <strong>Company:</strong> {customData.company}</li>
              <li>• <strong>Email:</strong> {customData.personalInfo.email}</li>
              <li>• <strong>Title:</strong> {customData.personalInfo.title}</li>
              <li>• <strong>Summary:</strong> {customData.summary?.introduction?.substring(0, 80)}...</li>
              <li>• <strong>Specialties:</strong> {customData.summary?.specialties?.length || 0} items</li>
              <li>• <strong>Roles:</strong> {customData.roles?.length || 0} role highlights</li>
              <li>• <strong>Projects:</strong> {customData.projects?.length || 0} featured projects</li>
              <li>• <strong>Employment:</strong> {customData.employment?.length || 0} employment entries</li>
              <li>• <strong>Education:</strong> {customData.education?.length || 0} education entries</li>
              <li>• <strong>Certifications:</strong> {customData.certifications?.length || 0} certifications</li>
              <li>• <strong>Courses:</strong> {customData.courses?.length || 0} courses</li>
              <li>• <strong>Competencies:</strong> {customData.competencies?.length || 0} competency levels</li>
              <li>• <strong>Languages:</strong> {customData.languages?.length || 0} languages</li>
              <li>• <strong>Closing section:</strong> {customData.closing ? '✅ Included' : '❌ Missing'}</li>
              <li>• <strong>Profile photo:</strong> {customData.personalInfo.profileImage ? '✅ Placeholder included' : '❌ Not uploaded'}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
