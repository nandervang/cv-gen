// Test script for new templates

const API_BASE = 'http://localhost:3001/api';
const API_KEY = 'dev-api-key-12345';

// Simplified mock data for testing
const testData = {
  personalInfo: {
    name: 'Niklas Andervang',
    title: 'Senior front-end/fullstack utvecklare & tillgänglighetsexpert',
    email: 'niklas.andervang@frankdigital.se',
    phone: '+46 70 993 17 94'
  },
  summary: {
    introduction: 'Niklas är en senior frontend/fullstack utvecklare som är bred med sin kompetens...',
    highlights: ['Test och kvalitetssäkring', 'Teamlead / mentor'],
    specialties: ['Webbtillgänglighet', 'Frontend utveckling']
  },
  projects: [{
    period: 'nov. 2024 - pågående',
    type: 'Front-end / Fullstack utvecklare',
    title: 'Cisco',
    description: 'Frontend utveckling med React/TypeScript för Cisco.',
    technologies: ['React', 'TypeScript', 'Jest']
  }],
  education: [{
    period: '2008 - 2011',
    degree: 'Interaktion och Design (MDA)',
    institution: 'Blekinge Tekniska Högskola'
  }],
  competencies: [{
    category: 'Expert inom området',
    skills: [{ name: 'CSS' }, { name: 'HTML' }, { name: 'JavaScript' }]
  }],
  languages: [{
    language: 'Svenska',
    proficiency: 'Modersmål'
  }],
  format: 'html'
};

async function testTemplate(templateName) {
  console.log(`\n🧪 Testing ${templateName} template...`);
  
  const payload = {
    ...testData,
    template: templateName
  };

  try {
    const response = await fetch(`${API_BASE}/generate/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ ${templateName} template - SUCCESS`);
      console.log(`   Generated data length: ${result.data.length} characters`);
    } else {
      console.log(`❌ ${templateName} template - FAILED`);
      console.log(`   Status: ${response.status}`);
      const errorText = await response.text();
      console.log(`   Response: ${errorText}`);
    }
  } catch (error) {
    console.log(`❌ ${templateName} template - ERROR`);
    console.log(`   Error: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 Testing all CV templates...');
  
  // Test templates endpoint first
  try {
    const response = await fetch(`${API_BASE}/templates`, {
      headers: { 'X-API-Key': API_KEY }
    });
    
    if (response.ok) {
      const templates = await response.json();
      console.log(`✅ Templates endpoint - Found ${templates.data.length} templates`);
      
      // Test each template
      for (const template of templates.data) {
        await testTemplate(template.id);
      }
    } else {
      console.log(`❌ Templates endpoint failed: ${response.status}`);
      const errorText = await response.text();
      console.log(`   Response: ${errorText}`);
    }
  } catch (error) {
    console.log(`❌ Failed to connect to API: ${error.message}`);
  }
}

main().catch(console.error);