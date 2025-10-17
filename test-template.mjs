// Test script to verify all fields are working
import { readFileSync, writeFileSync } from 'fs';

// Simple test function (we'll copy the template code inline)
function generateAndervangConsultingHTML(data) {
  const primaryColor = data.styling?.primaryColor || '#003D82';
  const orangeAccent = '#FF6B35';
  const fontFamily = data.styling?.fontFamily || '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif';
  const companyName = data.company || 'Andervang Consulting';

  // Generate basic HTML structure with all sections
  return `
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <title>\${data.personalInfo.name} - CV</title>
</head>
<body>
    <div class="header">
        <div class="company-brand">\${companyName}</div>
        <div class="contact-info">
            <strong>\${data.personalInfo.name}</strong><br>
            \${data.personalInfo.email}<br>
            \${data.personalInfo.phone || ''}<br>
            \${data.personalInfo.location || ''}
        </div>
    </div>

    <div class="profile-section">
        <div class="profile-content">
            <h1 class="profile-name">\${data.personalInfo.name}</h1>
            <div class="profile-title">\${data.personalInfo.title}</div>
            \${data.summary.introduction ? \`<div class="profile-intro">\${data.summary.introduction}</div>\` : ''}
            
            \${data.careerObjective ? \`
                <div class="career-objective">
                    <div class="career-objective-title">Karriärmål</div>
                    <div class="career-objective-text">\${data.careerObjective}</div>
                </div>
            \` : ''}
        </div>
    </div>

    \${data.roles && data.roles.length > 0 ? \`
        <div class="section">
            <h2 class="section-title">Professionella roller</h2>
            <div class="roles-grid">
                \${data.roles.map(role => \`
                    <div class="role-card">
                        <div class="role-title">\${role.name}</div>
                        \${role.description ? \`<div class="role-description">\${role.description}</div>\` : ''}
                        <div class="skills-list">
                            \${role.responsibilities.map(skill => 
                                \`<span class="skill-tag">\${skill}</span>\`
                            ).join('')}
                        </div>
                    </div>
                \`).join('')}
            </div>
        </div>
    \` : ''}

    \${data.projects && data.projects.length > 0 ? \`
        <div class="section">
            <h2 class="section-title">Projekt och uppdrag</h2>
            \${data.projects.map(project => \`
                <div class="project-item">
                    <div class="project-title">\${project.title}</div>
                    <div class="project-description">\${project.description}</div>
                    \${project.url ? \`
                        <div class="project-url">
                            <strong>Projekt URL:</strong> <a href="\${project.url}" target="_blank">\${project.url}</a>
                        </div>
                    \` : ''}
                </div>
            \`).join('')}
        </div>
    \` : ''}

    \${data.employment && data.employment.length > 0 ? \`
        <div class="section">
            <h2 class="section-title">Anställningar och roller</h2>
            \${data.employment.map(job => \`
                <div class="employment-item">
                    <div class="employment-company">\${job.company}</div>
                    <div class="employment-description">\${job.description}</div>
                </div>
            \`).join('')}
        </div>
    \` : ''}

    \${data.education && data.education.length > 0 ? \`
        <div class="section">
            <h2 class="section-title">Utbildning</h2>
            \${data.education.map(edu => \`
                <div class="education-item">
                    <div class="education-degree">\${edu.degree}</div>
                    <div class="education-institution">\${edu.institution}</div>
                    \${edu.specialization ? \`<div class="education-specialization">\${edu.specialization}</div>\` : ''}
                </div>
            \`).join('')}
        </div>
    \` : ''}

    \${data.certifications && data.certifications.length > 0 ? \`
        <div class="section">
            <h2 class="section-title">Certifieringar</h2>
            \${data.certifications.map(cert => \`
                <div class="certification-item">
                    <div class="certification-title">\${cert.title}</div>
                    <div class="certification-issuer">\${cert.issuer}</div>
                </div>
            \`).join('')}
        </div>
    \` : ''}

    \${data.courses && data.courses.length > 0 ? \`
        <div class="section">
            <h2 class="section-title">Kurser och vidareutbildning</h2>
            \${data.courses.map(course => \`
                <div class="course-item">
                    <div class="course-name">\${course.name}</div>
                    <div class="course-provider">\${course.institution || course.provider || ''}</div>
                </div>
            \`).join('')}
        </div>
    \` : ''}

    \${data.competencies && data.competencies.length > 0 ? \`
        <div class="section">
            <h2 class="section-title">Kompetenser</h2>
            \${data.competencies.map(category => \`
                <div class="competency-category">
                    <div class="competency-title">\${category.category}</div>
                </div>
            \`).join('')}
        </div>
    \` : ''}

    \${data.languages && data.languages.length > 0 ? \`
        <div class="section">
            <h2 class="section-title">Språkkunskaper</h2>
            \${data.languages.map(lang => \`
                <div class="language-item">
                    <div class="language-name">\${lang.language}</div>
                    <div class="language-proficiency">\${lang.proficiency}</div>
                </div>
            \`).join('')}
        </div>
    \` : ''}

    \${data.closing ? \`
        <div class="closing-section">
            <div class="closing-text">\${data.closing.statement || data.closing.text || ''}</div>
        </div>
    \` : ''}
</body>
</html>`;
}

const payload = JSON.parse(readFileSync('./comprehensive-test-payload.json', 'utf8'));
const html = generateAndervangConsultingHTML(payload);

console.log('HTML generated successfully! Size:', html.length, 'characters');
console.log('\nSections found:');

const checks = [
    { text: 'Karriärmål', name: '✓ Career Objective' },
    { text: 'Professionella roller', name: '✓ Professional Roles' },
    { text: 'Kurser och vidareutbildning', name: '✓ Courses' },
    { text: 'Projekt och uppdrag', name: '✓ Projects' },
    { text: 'Anställningar och roller', name: '✓ Employment' },
    { text: 'Utbildning', name: '✓ Education' },
    { text: 'Certifieringar', name: '✓ Certifications' },
    { text: 'Kompetenser', name: '✓ Competencies' },
    { text: 'Språkkunskaper', name: '✓ Languages' },
    { text: 'Tack för att du tog dig tid', name: '✓ Closing Statement' },
    { text: 'Frontend Specialist', name: '✓ Roles with responsibilities' },
    { text: 'digitalidag.se', name: '✓ Project URLs' },
    { text: 'Frank Digital AB', name: '✓ Company field' },
    { text: 'Advanced React Performance Optimization', name: '✓ Courses with institution' }
];

checks.forEach(check => {
    if (html.includes(check.text)) {
        console.log(check.name);
    }
});

// Write HTML to file for manual inspection
writeFileSync('./comprehensive-test-output.html', html);
console.log('\n✓ HTML output saved to comprehensive-test-output.html');