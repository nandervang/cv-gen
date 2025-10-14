# Consultant Manager Integration Guide

## Updated API Requirements - Andervang Consulting Template

Based on the analysis of the Andervang Consulting template, here are the **new sections and changes** you need to implement in your consultant manager frontend application:

## 🔄 Field Mapping Changes

The template uses different field names than your current payload. You need to map:

### From your current format to API expected format

- `experience` → **`employment`** (or keep as `experience`)
- `title` → **`position`** (for employment entries)

## 🆕 New Required Sections

### 1. Summary Section (Enhanced)

**Current**: You send `personalInfo.summary`
**New**: Split into structured summary:

```javascript
{
  summary: {
    introduction: "Main profile description text", // Use your current personalInfo.summary
    specialties: ["React", "TypeScript", "Tillgänglighet", "DevOps"] // Extract key skills
  }
}
```

### 2. Professional Roles Section

**New section** for role-based competencies:

```javascript
{
  roles: [
    {
      title: "Frontend Specialist",
      skills: ["React", "TypeScript", "CSS", "HTML"]
    },
    {
      title: "Accessibility Expert", 
      skills: ["WCAG", "AXE", "Screen Readers"]
    }
  ]
}
```

### 3. Enhanced Projects Section

**Current**: Basic project info
**New**: Add `type` field (required):

```javascript
{
  projects: [
    {
      title: "Project Name", // or name
      type: "Fullstack Development", // ← NEW REQUIRED FIELD
      period: "2023-2024",
      description: "Project description",
      technologies: ["React", "Node.js"]
    }
  ]
}
```

### 4. Courses Section

**New section** for continued education:

```javascript
{
  courses: [
    {
      name: "Course Name",
      provider: "Provider/Institution",
      completionDate: "2023-06",
      credentialId: "optional-id",
      url: "optional-certificate-url"
    }
  ]
}
```

### 5. Structured Competencies (Alternative to Skills)
**Enhanced version** of skills with levels:

```javascript
{
  competencies: [ // Use instead of skills for more detail
    {
      category: "Frontend Utveckling",
      skills: [
        {
          name: "React",
          level: "Expert", // Beginner, Intermediate, Advanced, Expert
          yearsOfExperience: 8
        }
      ]
    }
  ]
}
```

### 6. Closing Section
**New section** for template footer:

```javascript
{
  closing: {
    text: "Thank you message and call to action",
    contact: {
      email: "contact@example.com",
      phone: "+46 70 123 45 67", 
      location: "Stockholm, Sverige",
      company: "Consultant Company Name"
    }
  }
}
```

## 🔧 Implementation Changes Needed

### 1. Update Your Payload Structure

```javascript
// CURRENT FORMAT (basic)
const currentPayload = {
  personalInfo: {
    name: "Niklas Andervang",
    email: "niklas@example.com",
    summary: "Long description..." // ← Split this
  },
  experience: [ // ← Rename to employment OR keep as experience
    {
      company: "Company",
      title: "Title", // ← Change to position
      period: "2024",
      description: "...",
      technologies: ["React"]
    }
  ],
  skills: [
    {
      category: "Frontend",
      items: ["React", "TypeScript"]
    }
  ]
};

// NEW FORMAT (Andervang Consulting compatible)
const enhancedPayload = {
  personalInfo: {
    name: "Niklas Andervang",
    email: "niklas@example.com",
    phone: "+46702441323",
    location: "Stockholm, Sverige",
    title: "Senior Frontend/Fullstack Utvecklare" // Add this
  },
  summary: {
    introduction: "Main description text", // Extract from old summary
    specialties: ["React", "TypeScript", "Tillgänglighet"] // Key skills for header
  },
  roles: [ // NEW - Professional roles
    {
      title: "Frontend Specialist",
      skills: ["React", "TypeScript", "CSS"]
    }
  ],
  projects: [ // Enhanced with type
    {
      title: "Project Name",
      type: "Fullstack Development", // NEW REQUIRED
      period: "2024",
      description: "...",
      technologies: ["React", "Node.js"]
    }
  ],
  employment: [ // Renamed from experience
    {
      company: "Company",
      position: "Position Title", // Changed from title
      period: "2024",
      description: "...",
      achievements: ["Achievement 1", "Achievement 2"], // Optional
      technologies: ["React", "TypeScript"]
    }
  ],
  skills: [ // Can keep as-is OR use competencies below
    {
      category: "Frontend",
      items: ["React", "TypeScript"]
    }
  ],
  competencies: [ // Alternative to skills with more detail
    {
      category: "Frontend Utveckling", 
      skills: [
        {
          name: "React",
          level: "Expert",
          yearsOfExperience: 8
        }
      ]
    }
  ],
  courses: [ // NEW - Courses section
    {
      name: "CPACC Certification",
      provider: "IAAP",
      completionDate: "2022"
    }
  ],
  closing: { // NEW - Closing section
    text: "Thank you message...",
    contact: {
      email: "niklas@andervang.com",
      phone: "+46 70 244 13 23",
      location: "Stockholm, Sverige", 
      company: "Andervang Consulting"
    }
  },
  template: "andervang-consulting",
  format: "pdf"
};
```

### 2. Data Transformation Functions

You'll need to create transformation functions:

```javascript
// Transform your existing data to new format
function transformToAndervangFormat(consultantData) {
  return {
    personalInfo: {
      ...consultantData.personalInfo,
      title: consultantData.personalInfo.jobTitle || consultantData.personalInfo.title
    },
    
    // Split summary into introduction and specialties  
    summary: {
      introduction: consultantData.personalInfo.summary,
      specialties: extractSpecialties(consultantData.skills) // Extract top skills
    },
    
    // Generate roles from skills/experience
    roles: generateRoles(consultantData.skills, consultantData.experience),
    
    // Add type to projects
    projects: consultantData.projects?.map(project => ({
      ...project,
      type: project.type || inferProjectType(project), // Add type field
      title: project.name || project.title
    })),
    
    // Rename experience to employment and title to position
    employment: consultantData.experience?.map(exp => ({
      ...exp,
      position: exp.title || exp.position
    })),
    
    // Keep skills as-is or transform to competencies
    skills: consultantData.skills,
    
    // Add courses if available
    courses: consultantData.courses || [],
    
    // Add closing section
    closing: {
      text: "Tack för att du tog dig tid att läsa mitt CV. Jag ser fram emot möjligheten att diskutera hur jag kan bidra till ert team.",
      contact: {
        email: consultantData.personalInfo.email,
        phone: consultantData.personalInfo.phone,
        location: consultantData.personalInfo.location,
        company: "Andervang Consulting" // Or from your data
      }
    },
    
    template: "andervang-consulting",
    format: "pdf"
  };
}

function extractSpecialties(skills) {
  // Extract top 5-6 skills for header display
  return skills?.slice(0, 2)
    .flatMap(category => category.items.slice(0, 3))
    .slice(0, 6) || [];
}

function generateRoles(skills, experience) {
  // Generate role cards from skills/experience
  return [
    {
      title: "Frontend Specialist", 
      skills: skills?.find(s => s.category.includes("Frontend"))?.items.slice(0, 4) || []
    },
    {
      title: "Backend Developer",
      skills: skills?.find(s => s.category.includes("Backend"))?.items.slice(0, 4) || []
    }
  ].filter(role => role.skills.length > 0);
}

function inferProjectType(project) {
  // Infer project type from technologies or description
  const technologies = project.technologies || [];
  if (technologies.includes("React") || technologies.includes("Vue")) {
    return "Frontend Development";
  }
  if (technologies.includes("Node.js") || technologies.includes("Express")) {
    return "Backend Development"; 
  }
  return "Fullstack Development";
}
```

### 3. UI Changes Needed

Add form fields for new sections:

```jsx
// Add to your consultant form
<FormSection title="Professional Roles">
  <RolesList 
    roles={consultant.roles}
    onChange={updateRoles}
  />
</FormSection>

<FormSection title="Project Types">
  <ProjectsList
    projects={consultant.projects}
    onChange={updateProjects}
    requireType={true} // Require type field
  />
</FormSection>

<FormSection title="Courses & Education">
  <CoursesList
    courses={consultant.courses}
    onChange={updateCourses}
  />
</FormSection>

<FormSection title="Closing Message">
  <ClosingSection
    closing={consultant.closing}
    onChange={updateClosing}
  />
</FormSection>
```

## 📋 Testing Your Integration

Use this test payload to verify your integration:

```bash
curl -X POST "https://andervang-cv.netlify.app/.netlify/functions/api/generate/complete" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-api-key-12345" \
  -d @test-payload.json
```

**test-payload.json**:
```json
{
  "personalInfo": {
    "name": "Test Consultant",
    "email": "test@example.com",
    "phone": "+46 70 123 45 67",
    "location": "Stockholm, Sverige",
    "title": "Senior Utvecklare"
  },
  "summary": {
    "introduction": "Erfaren utvecklare med fokus på modern webbutveckling",
    "specialties": ["React", "TypeScript", "Node.js", "Tillgänglighet"]
  },
  "roles": [
    {
      "title": "Frontend Specialist",
      "skills": ["React", "TypeScript", "CSS"]
    }
  ],
  "projects": [
    {
      "title": "Test Project",
      "type": "Fullstack Development",
      "period": "2024",
      "description": "Test project description",
      "technologies": ["React", "Node.js"]
    }
  ],
  "employment": [
    {
      "company": "Test Company",
      "position": "Senior Developer",
      "period": "2023-2024",
      "description": "Test description",
      "technologies": ["React", "TypeScript"]
    }
  ],
  "skills": [
    {
      "category": "Frontend",
      "items": ["React", "TypeScript", "JavaScript"]
    }
  ],
  "education": [
    {
      "institution": "Test University",
      "degree": "Test Degree",
      "period": "2018-2022"
    }
  ],
  "courses": [
    {
      "name": "Test Course",
      "provider": "Test Provider", 
      "completionDate": "2023"
    }
  ],
  "closing": {
    "text": "Tack för intresset!",
    "contact": {
      "email": "test@example.com",
      "phone": "+46 70 123 45 67",
      "location": "Stockholm, Sverige",
      "company": "Test Company"
    }
  },
  "template": "andervang-consulting",
  "format": "pdf"
}
```

## 🚀 Implementation Priority

### Phase 1 (Critical - Fix current 502 issues)

1. ✅ Add `summary.introduction` field (use existing `personalInfo.summary`)
2. ✅ Add `project.type` field to all projects
3. ✅ Change `experience.title` to `experience.position` OR use `employment` array

### Phase 2 (Enhanced features)

1. Add `summary.specialties` array
2. Add `roles` section
3. Add `courses` section
4. Add `closing` section

### Phase 3 (Advanced)

1. Implement `competencies` as alternative to `skills`
2. Add UI for managing all new sections
3. Add form validation for required fields

## 📖 Updated API Documentation

The complete OpenAPI specification is available at:

- YAML: `/docs/openapi.yaml`
- JSON: `/docs/openapi.json`

Import into Swagger UI for interactive documentation:

```bash
npx swagger-ui-serve docs/openapi.yaml
```

## ❓ Questions?

If you need help with any of these changes or run into integration issues, let me know!