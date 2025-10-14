# CV Generation Backend API Integration Guide

## Overview

This guide provides step-by-step instructions for integrating the CV Generation Backend API into your consultant dashboard application. The system provides a robust REST API for high-quality CV generation with multiple templates including the featured **Andervang Consulting** template.

## Prerequisites

- CV Generation Backend API deployed (or local development setup)
- Basic understanding of REST APIs and HTTP authentication
- Frontend framework (React, Vue, Angular, etc.) 
- Understanding of async operations (CV generation can take 3-8 seconds)
- API key for authentication

## Integration Steps

### 1. Environment Configuration

Configure your environment variables for the CV Generation Backend API:

```javascript
// .env or environment configuration
const CV_API_CONFIG = {
  // Production: Your deployed backend API
  baseUrl: process.env.CV_API_URL || 'https://your-cv-api.herokuapp.com',
  // Development: Local backend server
  // baseUrl: process.env.CV_API_URL || 'http://localhost:3001',
  
  apiKey: process.env.CV_API_KEY || 'your-secure-api-key',
  timeout: 30000 // 30 seconds for CV generation
};
```

### 2. API Client Setup

Create a dedicated API client for the CV Generation Backend:

```javascript
// services/cvGenerationAPI.js

class CVGenerationAPI {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
    this.timeout = config.timeout;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        ...options.headers
      },
      timeout: this.timeout,
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      return data;
    } catch (error) {
      console.error('CV API Error:', error);
      throw error;
    }
  }

  // Check API health
  async checkHealth() {
    return this.makeRequest('/health');
  }

  // List available templates
  async getTemplates() {
    return this.makeRequest('/api/templates');
  }

  // Generate CV (single format)
  async generateCV(cvData) {
    return this.makeRequest('/api/generate', {
      method: 'POST',
      body: JSON.stringify(cvData)
    });
  }

  // Generate all formats (batch)
  async generateAllFormats(cvData) {
    return this.makeRequest('/api/batch/formats', {
      method: 'POST',
      body: JSON.stringify(cvData)
    });
  }

  // Generate with all templates and formats
  async generateComprehensive(cvData) {
    return this.makeRequest('/api/batch/comprehensive', {
      method: 'POST',
      body: JSON.stringify(cvData)
    });
  }

  // Generate template preview
  async generatePreview(templateId, options = {}) {
    return this.makeRequest('/api/preview/template', {
      method: 'POST',
      body: JSON.stringify({ templateId, ...options })
    });
  }
}

// Initialize API client
const cvAPI = new CVGenerationAPI(CV_API_CONFIG);
export default cvAPI;
```

### 3. Data Transformation

Transform your consultant profile data to match the CV API format:

```javascript
// utils/dataTransformer.js

export function transformConsultantToCV(consultantProfile, template = 'andervang-consulting') {
  return {
    personalInfo: {
      name: `${consultantProfile.firstName} ${consultantProfile.lastName}`,
      title: consultantProfile.jobTitle || consultantProfile.position,
      email: consultantProfile.email,
      phone: consultantProfile.phone,
      location: consultantProfile.location,
      linkedIn: consultantProfile.socialLinks?.linkedIn,
      github: consultantProfile.socialLinks?.github,
      website: consultantProfile.website
    },
    
    // Company name for Andervang Consulting template
    company: consultantProfile.companyName || 'Andervang Consulting',
    
    summary: {
      introduction: consultantProfile.summary || consultantProfile.bio,
      keyStrengths: consultantProfile.skills?.slice(0, 5) || [],
      careerObjective: consultantProfile.careerGoals
    },
    
    // Enhanced employment section for Andervang Consulting template
    employment: consultantProfile.workExperience?.map(exp => ({
      company: exp.company,
      position: exp.position,
      period: `${exp.startDate} - ${exp.endDate || 'Present'}`,
      description: exp.description,
      technologies: exp.technologies || [],
      achievements: exp.achievements || []
    })) || [],
    
    education: consultantProfile.education?.map(edu => ({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      period: `${edu.startYear} - ${edu.endYear}`,
      gpa: edu.gpa
    })) || [],
    
    skills: transformSkillsToCategories(consultantProfile.skills || []),
    
    projects: consultantProfile.projects?.map(project => ({
      name: project.name,
      description: project.description,
      technologies: project.technologies || [],
      url: project.url
    })) || [],
    
    certifications: consultantProfile.certifications?.map(cert => ({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      credentialId: cert.credentialId
    })) || [],
    
    languages: consultantProfile.languages?.map(lang => ({
      language: lang.language,
      proficiency: lang.level
    })) || []
  };
}

function transformSkillsToCategories(skills) {
  // Group skills by category if available, otherwise create default categories
  const categories = {};
  
  skills.forEach(skill => {
    const category = skill.category || 'Technical Skills';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(skill.name || skill);
  });
  
  return Object.entries(categories).map(([category, items]) => ({
    category,
    items
  }));
}
```

### 4. React Components

Create React components for CV generation functionality:

```jsx
// components/CVGenerator.jsx
import React, { useState, useEffect } from 'react';
import cvAPI from '../services/cvGenerationAPI';
import { transformConsultantToCV } from '../utils/dataTransformer';

const CVGenerator = ({ consultantProfile }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('frank-digital');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState('');

  // Available templates (no API call needed)
  const templates = [
    { id: 'frank-digital', name: 'Frank Digital', description: 'Professional corporate design' },
    { id: 'modern', name: 'Modern', description: 'Clean minimalist layout' },
    { id: 'classic', name: 'Classic', description: 'Traditional professional format' },
    { id: 'creative', name: 'Creative', description: 'Creative design portfolio' }
  ];

  const generateCV = async () => {
    setIsGenerating(true);
    setError(null);
    setGenerationResult(null);
    setProgress('Preparing CV data...');

    try {
      const cvData = {
        ...transformConsultantToCV(consultantProfile),
        template: selectedTemplate,
        format: selectedFormat
      };

      setProgress('Generating CV (this may take 5-15 seconds)...');
      const result = await cvAPI.generateCV(cvData);
      
      setGenerationResult(result);
      setProgress('');
    } catch (err) {
      setError(err.message);
      setProgress('');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAllFormats = async () => {
    setIsGenerating(true);
    setError(null);
    setProgress('Generating all formats (this may take 30-90 seconds)...');

    try {
      const cvData = {
        ...transformConsultantToCV(consultantProfile),
        template: selectedTemplate
      };

      const result = await cvAPI.generateAllFormats(cvData);
      setGenerationResult(result);
      setProgress('');
    } catch (err) {
      setError(err.message);
      setProgress('');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="cv-generator">
      <h2>Generate CV</h2>
      
      {/* Template Selection */}
      <div className="template-selection">
        <label>Template:</label>
        <select 
          value={selectedTemplate} 
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          {templates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name} - {template.description}
            </option>
          ))}
        </select>
      </div>

      {/* Format Selection */}
      <div className="format-selection">
        <label>Format:</label>
        <select 
          value={selectedFormat} 
          onChange={(e) => setSelectedFormat(e.target.value)}
        >
          <option value="pdf">PDF (High Quality)</option>
          <option value="html">HTML (Preview)</option>
          <option value="docx">DOCX (Word Document)</option>
        </select>
      </div>

      {/* Generation Actions */}
      <div className="actions">
        <button 
          onClick={generateCV} 
          disabled={isGenerating}
          className="btn-primary"
        >
          {isGenerating ? 'Generating...' : `Generate ${selectedFormat.toUpperCase()}`}
        </button>
        
        <button 
          onClick={generateAllFormats} 
          disabled={isGenerating}
          className="btn-secondary"
        >
          Generate All Formats
        </button>
      </div>

      {/* Progress Display */}
      {progress && (
        <div className="progress">
          <p>{progress}</p>
          <div className="progress-bar">
            <div className="progress-animation"></div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <p><small>Note: PDF generation requires more time due to serverless cold starts.</small></p>
        </div>
      )}

      {/* Results Display */}
      {generationResult && (
        <div className="results">
          <h3>Generation Complete</h3>
          {generationResult.fileUrl ? (
            // Single file result
            <div>
              <p>Format: {selectedFormat.toUpperCase()}</p>
              <a 
                href={generationResult.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="download-link"
              >
                Download CV
              </a>
            </div>
          ) : generationResult.results ? (
            // Multiple formats result
            <div>
              <p>Generated multiple formats</p>
              {Object.entries(generationResult.results).map(([format, result]) => (
                <div key={format} className="format-result">
                  <span>{format.toUpperCase()}: </span>
                  {result.success ? (
                    <a 
                      href={result.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="download-link"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="error">Failed - {result.error}</span>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
};

export default CVGenerator;
```

### 5. Template Customization Component

```jsx
// components/TemplateCustomizer.jsx
import React, { useState } from 'react';

const TemplateCustomizer = ({ onCustomizationChange }) => {
  const [customization, setCustomization] = useState({
    colorScheme: 'blue-professional',
    fontFamily: 'inter',
    fontSize: 'medium',
    spacing: 'normal'
  });

  const colorSchemes = [
    'blue-professional', 'green-tech', 'purple-creative', 'red-dynamic',
    'orange-warm', 'teal-modern', 'indigo-corporate', 'pink-creative',
    'gray-minimal', 'emerald-fresh', 'amber-energetic', 'rose-elegant'
  ];

  const fontFamilies = [
    'inter', 'roboto', 'open-sans', 'lato', 'georgia', 'times'
  ];

  const updateCustomization = (key, value) => {
    const updated = { ...customization, [key]: value };
    setCustomization(updated);
    onCustomizationChange(updated);
  };

  return (
    <div className="template-customizer">
      <h3>Customize Template</h3>
      
      <div className="customization-group">
        <label>Color Scheme:</label>
        <select 
          value={customization.colorScheme}
          onChange={(e) => updateCustomization('colorScheme', e.target.value)}
        >
          {colorSchemes.map(scheme => (
            <option key={scheme} value={scheme}>
              {scheme.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div className="customization-group">
        <label>Font Family:</label>
        <select 
          value={customization.fontFamily}
          onChange={(e) => updateCustomization('fontFamily', e.target.value)}
        >
          {fontFamilies.map(font => (
            <option key={font} value={font}>
              {font.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div className="customization-group">
        <label>Font Size:</label>
        <select 
          value={customization.fontSize}
          onChange={(e) => updateCustomization('fontSize', e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div className="customization-group">
        <label>Spacing:</label>
        <select 
          value={customization.spacing}
          onChange={(e) => updateCustomization('spacing', e.target.value)}
        >
          <option value="compact">Compact</option>
          <option value="normal">Normal</option>
          <option value="relaxed">Relaxed</option>
        </select>
      </div>
    </div>
  );
};

export default TemplateCustomizer;
```

### 6. Integration in Your Dashboard

```jsx
// pages/ConsultantProfile.jsx
import React, { useState } from 'react';
import CVGenerator from '../components/CVGenerator';
import TemplateCustomizer from '../components/TemplateCustomizer';

const ConsultantProfile = ({ consultantId }) => {
  const [consultantProfile, setConsultantProfile] = useState(null);
  const [templateCustomization, setTemplateCustomization] = useState({});

  // Load consultant profile data
  useEffect(() => {
    loadConsultantProfile(consultantId);
  }, [consultantId]);

  const loadConsultantProfile = async (id) => {
    // Your existing logic to load consultant profile
    const profile = await fetchConsultantProfile(id);
    setConsultantProfile(profile);
  };

  return (
    <div className="consultant-profile">
      <h1>Consultant Profile</h1>
      
      {/* Your existing profile components */}
      
      {/* CV Generation Section */}
      <div className="cv-section">
        <h2>CV Generation</h2>
        
        <TemplateCustomizer 
          onCustomizationChange={setTemplateCustomization}
        />
        
        {consultantProfile && (
          <CVGenerator 
            consultantProfile={consultantProfile}
            customization={templateCustomization}
          />
        )}
      </div>
    </div>
  );
};

export default ConsultantProfile;
```

### 7. Error Handling

```javascript
// utils/errorHandler.js

export class CVGenerationError extends Error {
  constructor(message, code, statusCode) {
    super(message);
    this.name = 'CVGenerationError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

export function handleCVAPIError(error) {
  // Netlify Function timeout (10 minutes max)
  if (error.message.includes('timeout') || error.message.includes('Function invocation timeout')) {
    return {
      message: 'PDF generation timed out. This can happen with complex CVs or during cold starts. Please try again.',
      retry: true,
      retryAfter: 30000 // 30 seconds
    };
  }
  
  // Function memory limit exceeded
  if (error.message.includes('memory') || error.message.includes('out of memory')) {
    return {
      message: 'Generation failed due to memory constraints. Try with a simpler template or fewer sections.',
      retry: false
    };
  }
  
  // Cold start delays
  if (error.message.includes('cold') || error.message.includes('initialization')) {
    return {
      message: 'Function is initializing (cold start). This takes 5-15 seconds. Please wait...',
      retry: true,
      retryAfter: 15000 // 15 seconds
    };
  }
  
  // Puppeteer/Chromium errors
  if (error.message.includes('chromium') || error.message.includes('browser')) {
    return {
      message: 'PDF generation engine error. Please try again or use HTML format as fallback.',
      retry: true,
      retryAfter: 10000 // 10 seconds
    };
  }
  
  // Validation errors
  if (error.message.includes('validation') || error.statusCode === 400) {
    return {
      message: 'Please check that all required profile information is filled out correctly.',
      retry: false
    };
  }
  
  return {
    message: 'An unexpected error occurred. Please try again or contact support.',
    retry: true,
    retryAfter: 5000 // 5 seconds
  };
}
```

### 8. Progress Tracking

```jsx
// components/GenerationProgress.jsx
import React, { useEffect, useState } from 'react';

const GenerationProgress = ({ isGenerating, estimatedTime = 15000 }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    'Initializing serverless function...',
    'Starting Chromium browser...',
    'Rendering HTML template...',
    'Generating PDF document...',
    'Finalizing and uploading...'
  ];

  useEffect(() => {
    if (!isGenerating) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev; // Don't complete until actually done
        return prev + (100 / (estimatedTime / 1000)); // Increment based on estimated time
      });
    }, 1000);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) return prev;
        return prev + 1;
      });
    }, estimatedTime / steps.length);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [isGenerating, estimatedTime]);

  if (!isGenerating) return null;

  return (
    <div className="generation-progress">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ 
            width: `${Math.min(progress, 95)}%`,
            transition: 'width 1s ease-out'
          }}
        />
      </div>
      <p className="progress-text">
        {steps[currentStep]} ({Math.round(progress)}%)
      </p>
      <small className="progress-note">
        Serverless functions may take 5-15 seconds due to cold starts.
      </small>
    </div>
  );
};

export default GenerationProgress;
```

## Best Practices

### 1. User Experience

- **Show clear progress indicators** during generation with realistic time estimates (5-15 seconds)
- **Inform users about cold starts** - first requests may take longer
- **Provide meaningful error messages** with guidance on next steps
- **Allow users to cancel** long-running operations if needed

### 2. Performance

- **Implement request debouncing** for rapid user actions
- **Use loading states** for better UX during function initialization
- **Consider background generation** for batch operations when possible
- **Cache results client-side** to avoid repeated generation of same CVs
- **Set appropriate timeouts** (45+ seconds for PDF generation)

### 3. Security

- **No API keys needed** for public Netlify Functions
- **Validate user permissions** before allowing CV generation
- **Implement client-side rate limiting** to prevent abuse
- **Sanitize user data** before sending to functions
- **Use HTTPS** for all communications (automatic with Netlify)

### 4. Error Recovery

- **Implement retry mechanisms** for transient failures (cold starts, timeouts)
- **Provide clear error messages** specific to serverless issues
- **Graceful fallbacks** when PDF generation fails (offer HTML instead)
- **Log errors** for debugging and monitoring function performance

### 5. Testing

- **Mock function responses** for unit tests
- **Test error scenarios** thoroughly, especially timeouts
- **Validate data transformation** logic with various profile structures
- **Test with different CV sizes** to understand performance characteristics

## Monitoring and Analytics

```javascript
// utils/analytics.js

export function trackCVGeneration(templateId, format, success, duration) {
  // Your analytics implementation
  analytics.track('CV Generated', {
    template: templateId,
    format: format,
    success: success,
    duration: duration,
    timestamp: new Date().toISOString()
  });
}

export function trackCVDownload(fileUrl, format) {
  analytics.track('CV Downloaded', {
    format: format,
    timestamp: new Date().toISOString()
  });
}
```

## Deployment Considerations

### Environment Configuration

- **Set appropriate URLs** for different environments (dev, staging, production)
- **No API keys required** for Netlify Functions (they're public endpoints)
- **Configure CORS** if needed for cross-domain requests
- **Monitor function usage** and costs in Netlify dashboard

### Scaling

- **Implement client-side caching** for generated CVs to reduce function calls
- **Monitor Netlify Function** execution limits and costs
- **Consider upgrade to Netlify Pro** for higher limits if needed
- **Plan for concurrent users** - Netlify Functions auto-scale but have cold start delays
- **Batch operations** may hit timeout limits (10-minute max per function)

This integration guide provides a complete framework for incorporating CV generation into your consultant dashboard. Adapt the components and logic to match your existing application architecture and design patterns. Remember that serverless functions have different performance characteristics than traditional APIs, so plan accordingly for cold starts and longer execution times.