# Consultant Dashboard Integration Guide

## Overview

This guide provides step-by-step instructions for integrating the CV Generation API into your consultant dashboard application. The integration allows your consultants to generate professional CVs directly from their profile data.

## Prerequisites

- CV Generation API running (locally or deployed)
- API key for authentication
- Basic understanding of HTTP requests
- Frontend framework (React, Vue, Angular, etc.)

## Integration Steps

### 1. Environment Configuration

First, configure your environment variables:

```javascript
// .env or environment configuration
const CV_API_CONFIG = {
  baseUrl: process.env.CV_API_URL || 'http://localhost:3001',
  apiKey: process.env.CV_API_KEY || 'dev-api-key-12345',
  timeout: 30000 // 30 seconds for generation requests
};
```

### 2. API Client Setup

Create a dedicated API client for CV generation:

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
        throw new Error(data.error?.message || 'API request failed');
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

  // Get available templates
  async getTemplates() {
    return this.makeRequest('/api/templates');
  }

  // Generate CV
  async generateCV(cvData) {
    return this.makeRequest('/api/generate/complete', {
      method: 'POST',
      body: JSON.stringify(cvData)
    });
  }

  // Generate all formats
  async generateAllFormats(cvData) {
    return this.makeRequest('/api/batch/formats', {
      method: 'POST',
      body: JSON.stringify(cvData)
    });
  }

  // Preview template with customization
  async previewTemplate(templateId, customization) {
    return this.makeRequest('/api/customization/preview', {
      method: 'POST',
      body: JSON.stringify({ templateId, customization })
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

export function transformConsultantToCV(consultantProfile) {
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
    
    summary: {
      introduction: consultantProfile.summary || consultantProfile.bio,
      keyStrengths: consultantProfile.skills?.slice(0, 5) || [],
      careerObjective: consultantProfile.careerGoals
    },
    
    experience: consultantProfile.workExperience?.map(exp => ({
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
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('frank-digital');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const response = await cvAPI.getTemplates();
      setTemplates(response.data || []);
    } catch (err) {
      setError('Failed to load templates');
      console.error(err);
    }
  };

  const generateCV = async () => {
    setIsGenerating(true);
    setError(null);
    setGenerationResult(null);

    try {
      const cvData = {
        ...transformConsultantToCV(consultantProfile),
        template: selectedTemplate,
        format: selectedFormat
      };

      const result = await cvAPI.generateCV(cvData);
      setGenerationResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAllFormats = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const cvData = {
        ...transformConsultantToCV(consultantProfile),
        template: selectedTemplate
      };

      const result = await cvAPI.generateAllFormats(cvData);
      setGenerationResult(result);
    } catch (err) {
      setError(err.message);
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
          <option value="pdf">PDF</option>
          <option value="html">HTML</option>
          <option value="docx">DOCX</option>
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

      {/* Error Display */}
      {error && (
        <div className="error">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Results Display */}
      {generationResult && (
        <div className="results">
          <h3>Generation Complete</h3>
          {generationResult.data?.fileUrl ? (
            // Single file result
            <div>
              <p>Format: {generationResult.data.format.toUpperCase()}</p>
              <a 
                href={generationResult.data.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="download-link"
              >
                Download CV
              </a>
            </div>
          ) : generationResult.data?.results ? (
            // Multiple formats result
            <div>
              <p>Generated {generationResult.data.summary?.successful} of {generationResult.data.summary?.total} formats</p>
              {Object.entries(generationResult.data.results).map(([format, result]) => (
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
                    <span className="error">Failed</span>
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
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    return {
      message: 'Too many CV generation requests. Please wait a moment and try again.',
      retry: true,
      retryAfter: 60000 // 1 minute
    };
  }
  
  if (error.code === 'VALIDATION_ERROR') {
    return {
      message: 'Please check that all required profile information is filled out.',
      retry: false
    };
  }
  
  if (error.code === 'GENERATION_ERROR') {
    return {
      message: 'CV generation failed. Please try again or contact support.',
      retry: true
    };
  }
  
  return {
    message: 'An unexpected error occurred. Please try again.',
    retry: true
  };
}
```

### 8. Progress Tracking

```jsx
// components/GenerationProgress.jsx
import React from 'react';

const GenerationProgress = ({ isGenerating, currentStep, totalSteps }) => {
  if (!isGenerating) return null;

  const steps = [
    'Validating data',
    'Applying template',
    'Generating document',
    'Finalizing output'
  ];

  return (
    <div className="generation-progress">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <p>Step {currentStep} of {totalSteps}: {steps[currentStep - 1]}</p>
    </div>
  );
};

export default GenerationProgress;
```

## Best Practices

### 1. User Experience
- Show clear progress indicators during generation
- Provide meaningful error messages
- Allow users to cancel long-running operations
- Cache templates to avoid repeated API calls

### 2. Performance
- Implement request debouncing for rapid user actions
- Use loading states for better UX
- Consider background generation for batch operations
- Implement retry logic with exponential backoff

### 3. Security
- Never expose API keys in frontend code
- Validate user permissions before allowing CV generation
- Implement rate limiting on your frontend
- Sanitize user data before sending to API

### 4. Error Recovery
- Implement retry mechanisms for transient failures
- Provide clear error messages and suggested actions
- Log errors for debugging and monitoring
- Graceful fallbacks when API is unavailable

### 5. Testing
- Mock API responses for unit tests
- Test error scenarios thoroughly
- Validate data transformation logic
- Test with various consultant profile data structures

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
- Set appropriate API URLs for different environments
- Configure proper CORS settings
- Use secure API keys in production
- Monitor API usage and costs

### Scaling
- Consider implementing client-side caching
- Monitor API rate limits
- Plan for increased generation volume
- Consider background job queuing for batch operations

This integration guide provides a complete framework for incorporating CV generation into your consultant dashboard. Adapt the components and logic to match your existing application architecture and design patterns.