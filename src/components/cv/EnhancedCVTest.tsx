import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TemplateCustomizer } from './TemplateCustomizer';
import { BatchTester } from './BatchTester';

// Template information interface
interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  type: string;
  industryFocus: string;
  features: string[];
  isPremium: boolean;
  previewUrl: string;
}

// Generation result interface
interface GenerationResult {
  success: boolean;
  data?: {
    fileUrl: string;
    format: string;
    template: string;
    generatedAt: string;
  };
  error?: {
    message: string;
  };
}

// Template customization interface
interface TemplateCustomization {
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
  const [availableTemplates, setAvailableTemplates] = useState<TemplateInfo[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, string>>({});
  const [templateCustomization, setTemplateCustomization] = useState<TemplateCustomization>({
    templateId: 'frank-digital',
    fontSize: 'medium',
    spacing: 'normal'
  });

  // Fetch available templates on component mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Update customization when template changes
  useEffect(() => {
    setTemplateCustomization(prev => ({
      ...prev,
      templateId: selectedTemplate
    }));
  }, [selectedTemplate]);

  const fetchTemplates = async () => {
    setIsLoadingTemplates(true);
    try {
      const apiUrl = import.meta.env.VITE_CV_API_URL || window.location.origin;

      console.log('Fetching templates from:', apiUrl);

      const response = await fetch(`${apiUrl}/api/templates`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Debug logging
      if (data.success && Array.isArray(data.data)) {
        setAvailableTemplates(data.data);
      } else {
        console.error('Invalid API response:', data);
        setAvailableTemplates([]);
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult('');

    try {
      // Convert customization to styling format
      const styling = {
        primaryColor: templateCustomization.customColors?.primaryColor,
        accentColor: templateCustomization.customColors?.accentColor,
        highlightColor: templateCustomization.customColors?.highlightColor,
        fontFamily: templateCustomization.fontFamily,
        fontSize: templateCustomization.fontSize,
        spacing: templateCustomization.spacing,
        layout: templateCustomization.layout,
        colorScheme: templateCustomization.colorScheme
      };

      const payload = {
        ...customData,
        template: selectedTemplate,
        format: selectedFormat,
        styling: Object.fromEntries(
          Object.entries(styling).filter(([, value]) => value !== undefined)
        )
      };

      const apiUrl = import.meta.env.VITE_CV_API_URL || window.location.origin;

      const response = await fetch(`${apiUrl}/api/generate/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GenerationResult = await response.json();
      
      if (data.success) {
        setResult(data.data?.fileUrl || 'Generated successfully');
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

  const testAllTemplates = async () => {
    setIsTestingAll(true);
    setTestResults({});
    
    const templates = ['frank-digital', 'modern', 'classic', 'creative'];
    const formats: ('pdf' | 'html' | 'docx')[] = ['pdf', 'html', 'docx'];
    
    for (const template of templates) {
      for (const format of formats) {
        const testKey = `${template}-${format}`;
        
        try {
          const payload = {
            ...customData,
            template,
            format
          };

          const apiUrl = import.meta.env.VITE_CV_API_URL || window.location.origin;

          const response = await fetch(`${apiUrl}/api/generate/complete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: GenerationResult = await response.json();
          
          if (data.success) {
            setTestResults(prev => ({
              ...prev,
              [testKey]: '✅ Success'
            }));
          } else {
            setTestResults(prev => ({
              ...prev,
              [testKey]: `❌ Error: ${data.error?.message || 'Unknown error'}`
            }));
          }
        } catch (error) {
          setTestResults(prev => ({
            ...prev,
            [testKey]: `❌ Error: ${error instanceof Error ? error.message : 'Network error'}`
          }));
        }
        
        // Small delay between requests to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    setIsTestingAll(false);
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="template">Template</Label>
                <select
                  id="template"
                  title="Select CV Template"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  disabled={isLoadingTemplates}
                >
                  {isLoadingTemplates ? (
                    <option>Loading templates...</option>
                  ) : (
                    availableTemplates.length > 0 ? (
                      availableTemplates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="frank-digital">Frank Digital</option>
                        <option value="modern">Modern</option>
                        <option value="classic">Classic</option>
                        <option value="creative">Creative</option>
                      </>
                    )
                  )}
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

            {/* Template Information */}
            {availableTemplates.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                {(() => {
                  const selectedTemplateInfo = availableTemplates.find(t => t.id === selectedTemplate);
                  if (!selectedTemplateInfo) return null;
                  
                  return (
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">{selectedTemplateInfo.name}</h4>
                      <p className="text-blue-700 text-sm mb-2">{selectedTemplateInfo.description}</p>
                      <div className="text-xs space-y-1">
                        <div><strong>Industry Focus:</strong> {selectedTemplateInfo.industryFocus}</div>
                        {selectedTemplateInfo.features && (
                          <div><strong>Features:</strong> {selectedTemplateInfo.features.join(', ')}</div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
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

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || isTestingAll}
              className="w-full"
            >
              {isGenerating ? 'Generating CV...' : `Generate ${selectedTemplate} CV as ${selectedFormat.toUpperCase()}`}
            </Button>

            <Button 
              onClick={testAllTemplates} 
              disabled={isGenerating || isTestingAll}
              variant="outline"
              className="w-full"
            >
              {isTestingAll ? 'Testing All Templates...' : 'Test All Templates & Formats'}
            </Button>

            <Button 
              onClick={fetchTemplates} 
              disabled={isLoadingTemplates}
              variant="outline"
              className="w-full"
            >
              {isLoadingTemplates ? 'Loading...' : 'Refresh Templates'}
            </Button>
          </div>

          {/* Test Results */}
          {Object.keys(testResults).length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Template Test Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['frank-digital', 'modern', 'classic', 'creative'].map(template => (
                  <div key={template} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium capitalize mb-2">{template.replace('-', ' ')}</h4>
                    <div className="space-y-1 text-sm">
                      {(['pdf', 'html', 'docx'] as const).map(format => (
                        <div key={format} className="flex justify-between">
                          <span className="uppercase">{format}:</span>
                          <span className={testResults[`${template}-${format}`]?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                            {testResults[`${template}-${format}`] || '⏳ Pending...'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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

      {/* Template Gallery */}
      {availableTemplates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Available Templates</CardTitle>
            <CardDescription>
              Browse all available CV templates with their features and target industries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedTemplate === template.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{template.name}</h3>
                    {template.isPremium && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Premium</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  <div className="text-xs space-y-1">
                    <div><strong>Industry:</strong> {template.industryFocus}</div>
                    {template.features && template.features.length > 0 && (
                      <>
                        <div><strong>Features:</strong></div>
                        <ul className="ml-2 space-y-0.5">
                          {template.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Template Customizer */}
      <TemplateCustomizer
        selectedTemplate={selectedTemplate}
        onCustomizationChange={setTemplateCustomization}
      />

      {/* Batch Tester */}
      <BatchTester
        cvData={customData}
        selectedTemplate={selectedTemplate}
      />

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