import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface Template {
  id: string
  name: string
  description: string
  templateType: string
  industryFocus?: string
  features?: string[]
  previewUrl?: string
  isPremium: boolean
  isActive: boolean
}

interface CVData {
  name: string
  title: string
  template: string
  format: 'pdf' | 'docx' | 'html'
}

const API_KEY = import.meta.env.VITE_CV_API_KEY || 'dev-api-key-12345'
const API_URL = import.meta.env.VITE_CV_API_URL || 'http://localhost:3001'

export default function CVGeneratorTest() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  
  const [cvData, setCvData] = useState<CVData>({
    name: 'John Doe',
    title: 'Software Engineer',
    template: 'modern',
    format: 'pdf'
  })

  // Fetch available templates
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`${API_URL}/api/templates`, {
          headers: {
            'X-API-Key': API_KEY,
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch templates: ${response.statusText}`)
        }
        
        const data = await response.json()
        if (data.success && data.data) {
          setTemplates(data.data)
        } else {
          throw new Error('Invalid response format')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch templates')
        console.error('Template fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  const handleGenerate = async () => {
    setGenerating(true)
    setError(null)
    setResult(null)
    
    try {
      const response = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cvData.name,
          title: cvData.title,
          template: cvData.template,
          format: cvData.format
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || `Generation failed: ${response.statusText}`)
      }
      
      const data = await response.json()
      if (data.success && data.data?.fileUrl) {
        setResult(data.data.fileUrl)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate CV')
      console.error('Generation error:', err)
    } finally {
      setGenerating(false)
    }
  }

  const downloadFile = () => {
    if (!result) return
    
    const link = document.createElement('a')
    link.href = result
    
    const filename = `${cvData.name.replace(/\s+/g, '_')}_CV.${cvData.format}`
    link.download = filename
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const openPreview = () => {
    if (!result) return
    
    if (cvData.format === 'html') {
      // For HTML, open in new tab
      const newWindow = window.open('', '_blank')
      if (newWindow) {
        const htmlContent = atob(result.split(',')[1])
        newWindow.document.write(htmlContent)
        newWindow.document.close()
      }
    } else {
      // For PDF/DOCX, open data URL
      window.open(result, '_blank')
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>CV Generator Test</CardTitle>
          <CardDescription>
            Test the CV generation API with different templates and formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            {loading ? (
              <div className="text-gray-500">Loading templates...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-colors ${
                      cvData.template === template.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCvData(prev => ({ ...prev, template: template.id }))}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                      {template.industryFocus && (
                        <p className="text-xs text-blue-600 mt-2">
                          Industry: {template.industryFocus}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.features?.slice(0, 2).map((feature, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-gray-200 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        )) || []}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={cvData.name}
                onChange={(e) => setCvData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={cvData.title}
                onChange={(e) => setCvData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter your professional title"
              />
            </div>
          </div>

          {/* Format Selection */}
          <div className="space-y-2">
            <Label>Format</Label>
            <div className="flex gap-4">
              {(['pdf', 'docx', 'html'] as const).map((format) => (
                <label key={format} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value={format}
                    checked={cvData.format === format}
                    onChange={(e) => setCvData(prev => ({ ...prev, format: e.target.value as any }))}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="uppercase">{format}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate}
            disabled={generating || !cvData.name || !cvData.title}
            className="w-full"
          >
            {generating ? 'Generating...' : 'Generate CV'}
          </Button>

          {/* Result Display */}
          {result && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-800">CV Generated Successfully!</h3>
                    <p className="text-sm text-green-600">
                      Format: {cvData.format.toUpperCase()} | Template: {cvData.template}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={openPreview}>
                      Preview
                    </Button>
                    <Button size="sm" onClick={downloadFile}>
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* API Status */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">API Configuration</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>API URL:</strong> {API_URL}</p>
            <p><strong>API Key:</strong> {API_KEY ? '***configured***' : 'not configured'}</p>
            <p><strong>Templates Loaded:</strong> {templates.length}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}