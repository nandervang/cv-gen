import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock data based on Frank Digital CV
const frankDigitalMockData = {
  personalInfo: {
    name: "Niklas Andervang",
    title: "Senior front-end/fullstack utvecklare & tillgänglighetsexpert",
    email: "niklas.andervang@frankdigital.se",
    phone: "+46 70 993 17 94"
  },
  summary: {
    introduction: "Niklas är en senior frontend/fullstack utvecklare som är bred med sin kompetens och bred med sina kunskaper. Niklas har stor erfarenhet från flertalet frontend-ramverk, dev-ops teknik och många fullstack/systemlösningar som de de 15 år som Niklas arbetat som utvecklare.",
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
      description: "Vi fick i uppdrag att bygga en ny webb för att digitalisera sig utifrån deras tillgänglighetsgranskning av befintlig webb.",
      technologies: ["DevOps", "Tillgänglighet", "TypeScript", "WCAG", "Test och validering", "React", "Contentful", "Next.js", "MongoDB", "Event hantering"]
    }
  ],
  education: [
    {
      period: "2008 - 2011",
      degree: "Interaktion och Design (MDA) interaktionsdesign (Kandidatexamen)",
      institution: "Blekinge Tekniska Högskola (Karlskrona)"
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
    }
  ],
  competencies: [
    {
      category: "Expert inom området",
      skills: [
        { name: "CSS", level: "expert" },
        { name: "HTML", level: "expert" },
        { name: "Test och kvalitetssäkring", level: "expert" },
        { name: "Tillgänglighet", level: "expert" },
        { name: "WCAG", level: "expert" },
        { name: "React", level: "expert" }
      ]
    },
    {
      category: "Mycket hög kompetens", 
      skills: [
        { name: "TypeScript", level: "advanced" },
        { name: "JavaScript", level: "advanced" },
        { name: "Next.js", level: "advanced" },
        { name: "Git", level: "advanced" },
        { name: "SEO", level: "advanced" }
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
    primaryColor: "#6366f1",
    accentColor: "#8b5cf6", 
    fontFamily: "Inter, system-ui, sans-serif",
    layout: "single-column"
  }
};

export default function EnhancedCVTest() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState('frank-digital');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'html' | 'docx'>('pdf');
  const [customData, setCustomData] = useState(frankDigitalMockData);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult('');

    try {
      const payload = {
        ...customData,
        template: selectedTemplate,
        format: selectedFormat
      };

      const apiKey = import.meta.env.VITE_CV_API_KEY;
      const apiUrl = import.meta.env.VITE_CV_API_URL || 'http://localhost:3001';

      const response = await fetch(`${apiUrl}/api/generate/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setResult(data.data.fileUrl || data.data);
      } else {
        setResult(`Error: ${data.error?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Generation error:', error);
      setResult(`Error: ${error instanceof Error ? error.message : 'Network error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (result && result.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = result;
      const extension = selectedFormat === 'pdf' ? 'pdf' : selectedFormat === 'docx' ? 'docx' : 'html';
      link.download = `${customData.personalInfo.name.replace(/\s+/g, '_')}_CV.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setCustomData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enhanced CV Generator Test</CardTitle>
          <CardDescription>
            Test the complete CV generation system with Frank Digital template data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Personal Info Editor */}
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
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={customData.personalInfo.title}
                onChange={(e) => updatePersonalInfo('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={customData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={customData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              />
            </div>
          </div>

          {/* Template and Format Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="template">Template</Label>
              <select
                id="template"
                title="Select CV Template"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                <option value="frank-digital">Frank Digital</option>
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="creative">Creative</option>
              </select>
            </div>
            <div>
              <Label htmlFor="format">Format</Label>
              <select
                id="format"
                title="Select Output Format"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as 'pdf' | 'html' | 'docx')}
              >
                <option value="pdf">PDF</option>
                <option value="html">HTML</option>
                <option value="docx">DOCX</option>
              </select>
            </div>
          </div>

          {/* Data Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">CV Data Summary:</h3>
            <ul className="text-sm space-y-1">
              <li>• {customData.projects?.length || 0} projects</li>
              <li>• {customData.education?.length || 0} education entries</li>
              <li>• {customData.certifications?.length || 0} certifications</li>
              <li>• {customData.competencies?.length || 0} competency categories</li>
              <li>• {customData.languages?.length || 0} languages</li>
            </ul>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? 'Generating CV...' : `Generate ${selectedTemplate} CV as ${selectedFormat.toUpperCase()}`}
          </Button>

          {/* Result */}
          {result && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Generation Result:</h3>
                {result.startsWith('data:') ? (
                  <div className="space-y-2">
                    <p className="text-green-700">✅ CV generated successfully!</p>
                    <Button onClick={handleDownload} variant="outline">
                      Download {selectedFormat.toUpperCase()}
                    </Button>
                    {selectedFormat === 'html' && (
                      <div className="mt-4">
                        <iframe
                          src={result}
                          className="w-full h-96 border border-gray-300 rounded"
                          title="Generated CV Preview"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <pre className="text-red-700 text-sm overflow-auto">{result}</pre>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mock Data Display */}
      <Card>
        <CardHeader>
          <CardTitle>Frank Digital Mock Data</CardTitle>
          <CardDescription>
            Complete structured CV data based on the PDF example
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
            {JSON.stringify(customData, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}