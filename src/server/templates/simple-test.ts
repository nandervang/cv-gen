/* eslint-disable @typescript-eslint/no-explicit-any */
export function generateSimpleHTML(data: any): string {
  const primaryColor = data.styling?.primaryColor || '#003D82'; // Darker blue for better contrast  
  const orangeAccent = '#FF6B35'; // Orange accent color from Andervang template
  const fontFamily = data.styling?.fontFamily || '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif';
  const companyName = data.company || 'Andervang Consulting';

  return `
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo?.name || 'Professional CV'} - CV</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: ${fontFamily};
            line-height: 1.4;
            color: #1d1d1f;
            background: #fafafa;
            padding: 25px;
            font-size: 13px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid ${primaryColor};
            position: relative;
        }

        .header::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 60px;
            height: 3px;
            background: ${orangeAccent};
        }

        .company-brand {
            font-size: 20px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 4px;
            letter-spacing: -0.2px;
        }

        .company-tagline {
            font-size: 13px;
            color: #86868b;
            font-weight: 400;
            letter-spacing: -0.05px;
        }

        .contact-info {
            text-align: right;
            font-size: 13px;
            line-height: 1.3;
            color: #1d1d1f;
        }

        .contact-info strong {
            color: ${primaryColor};
            font-weight: 600;
        }

        .profile-section {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 24px;
            margin-bottom: 30px;
            align-items: start;
        }

        .profile-image {
            width: 90px;
            height: 90px;
            border-radius: 12px;
            object-fit: cover;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .profile-content {
            flex: 1;
        }

        .profile-name {
            font-size: 26px;
            font-weight: 700;
            color: #1d1d1f;
            margin-bottom: 6px;
            letter-spacing: -0.3px;
        }

        .profile-title {
            font-size: 16px;
            color: ${primaryColor};
            font-weight: 600;
            margin-bottom: 16px;
            letter-spacing: -0.1px;
        }

        .profile-intro {
            font-size: 14px;
            line-height: 1.5;
            color: #1d1d1f;
            letter-spacing: -0.05px;
        }

        .specialties-section {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 18px;
            border-radius: 12px;
            border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .specialties-title {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #1d1d1f;
            letter-spacing: -0.1px;
        }

        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }

        .skill-tag {
            background: rgba(255, 255, 255, 0.9);
            color: ${primaryColor};
            padding: 6px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 500;
            letter-spacing: -0.02px;
            border: 1px solid rgba(0, 0, 0, 0.06);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
        }

        .section {
            margin-bottom: 30px;
            position: relative;
        }

        .section::before {
            content: '';
            position: absolute;
            top: -8px;
            left: 0;
            width: 30px;
            height: 2px;
            background: ${orangeAccent};
            opacity: 0.6;
        }

        .section-title {
            font-size: 20px;
            font-weight: 700;
            color: ${primaryColor};
            margin-bottom: 12px;
            letter-spacing: -0.3px;
            display: flex;
            align-items: center;
            position: relative;
        }

        .section-title::after {
            content: '';
            flex: 1;
            height: 2px;
            background: linear-gradient(90deg, ${primaryColor}, ${orangeAccent}, transparent);
            margin-left: 16px;
            opacity: 0.3;
        }

        .roles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 14px;
            margin-bottom: 20px;
        }

        .role-card {
            background: #ffffff;
            padding: 18px;
            border-radius: 12px;
            border: 1px solid rgba(0, 0, 0, 0.04);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
        }

        .role-title {
            font-size: 14px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 12px;
            letter-spacing: -0.1px;
        }

        .project-item {
            margin-bottom: 18px;
            padding: 18px;
            background: #ffffff;
            border-radius: 10px;
            border: 1px solid rgba(0, 0, 0, 0.04);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            position: relative;
            transition: all 0.2s ease;
        }

        .project-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: ${primaryColor};
            border-radius: 10px 0 0 10px;
        }

        .project-item:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .employment-item {
            margin-bottom: 22px;
            padding: 24px;
            background: linear-gradient(135deg, ${orangeAccent}, #E85A20);
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 20px rgba(255, 107, 53, 0.25);
            color: white;
            position: relative;
            overflow: hidden;
            transition: all 0.2s ease;
        }

        .employment-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1));
        }

        .employment-item::after {
            content: '💼';
            position: absolute;
            top: 20px;
            right: 24px;
            font-size: 24px;
            opacity: 0.3;
        }

        .employment-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(255, 107, 53, 0.35);
        }

        .project-header, .employment-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }

        .project-type {
            font-size: 11px;
            color: ${primaryColor};
            font-weight: 500;
            letter-spacing: -0.02px;
        }

        .employment-position {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 600;
            letter-spacing: 0.3px;
            text-transform: uppercase;
        }

        .project-title {
            font-size: 16px;
            font-weight: 600;
            color: #1d1d1f;
            margin-top: 4px;
            letter-spacing: -0.2px;
            line-height: 1.3;
        }

        .employment-title, .employment-company {
            font-size: 18px;
            font-weight: 700;
            color: white;
            margin-top: 6px;
            letter-spacing: -0.3px;
            line-height: 1.2;
        }

        .company-name {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 12px;
            opacity: 0.9;
        }

        .project-period {
            font-size: 11px;
            color: #86868b;
            font-weight: 500;
            text-align: right;
            letter-spacing: -0.02px;
        }

        .employment-period {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 500;
            text-align: right;
            letter-spacing: -0.02px;
        }

        .project-description {
            font-size: 13px;
            line-height: 1.4;
            margin-bottom: 14px;
            color: #1d1d1f;
            letter-spacing: -0.05px;
        }

        .employment-description {
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 18px;
            color: rgba(255, 255, 255, 0.95);
            letter-spacing: -0.05px;
        }

        .employment-description ul {
            margin: 12px 0;
            padding-left: 20px;
        }

        .employment-description li {
            margin-bottom: 8px;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.9);
        }

        .employment-description li::marker {
            color: rgba(255, 255, 255, 0.7);
        }

        .technology-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 14px;
        }

        .tech-tag {
            background: #f5f5f7;
            color: #1d1d1f;
            border: 1px solid rgba(0, 0, 0, 0.04);
            padding: 4px 8px;
            border-radius: 8px;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: -0.02px;
        }

        .employment-item .tech-tag {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            font-weight: 600;
        }

        .employment-item .tech-tag:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .achievements {
            margin-top: 12px;
        }

        .achievement {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 6px;
            font-size: 13px;
        }

        .achievement::before {
            content: '•';
            color: rgba(255,255,255,0.8);
            font-weight: bold;
        }

        .education-item, .certification-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.04);
            margin-bottom: 6px;
            border-radius: 8px;
            font-size: 13px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
            position: relative;
            transition: all 0.1s ease;
        }

        .education-item::before, .certification-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: ${primaryColor};
            border-radius: 8px 0 0 8px;
        }

        .education-item:hover, .certification-item:hover {
            transform: translateX(3px);
            border-color: ${primaryColor};
        }

        .education-item:last-child, .certification-item:last-child {
            margin-bottom: 0;
        }

        .education-content, .certification-content {
            flex: 1;
        }

        .education-degree, .certification-title {
            font-size: 14px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 3px;
            letter-spacing: -0.1px;
        }

        .education-institution, .certification-issuer {
            font-size: 11px;
            color: #86868b;
            letter-spacing: -0.02px;
        }

        .education-period, .certification-year {
            font-size: 11px;
            color: ${primaryColor};
            font-weight: 500;
            letter-spacing: -0.02px;
        }

        .competency-category {
            margin-bottom: 18px;
            position: relative;
        }

        .competency-category::before {
            content: '';
            position: absolute;
            top: -4px;
            left: 0;
            width: 20px;
            height: 2px;
            background: ${orangeAccent};
            opacity: 0.7;
        }

        .competency-title {
            display: flex;
            align-items: center;
            font-size: 15px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 12px;
            letter-spacing: -0.15px;
        }

        .competency-icon {
            width: 22px;
            height: 22px;
            background: linear-gradient(135deg, ${primaryColor}, ${orangeAccent});
            color: white;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 600;
            margin-right: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .competency-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }

        .competency-skill {
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.04);
            color: #1d1d1f;
            padding: 5px 10px;
            border-radius: 6px;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: -0.02px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
            transition: all 0.1s ease;
            position: relative;
        }

        .competency-skill:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            border-color: ${orangeAccent};
        }

        .competency-skill.expert {
            background: ${orangeAccent};
            color: white;
            border-color: ${orangeAccent};
        }

        .competency-skill.advanced {
            background: ${primaryColor};
            color: white;
            border-color: ${primaryColor};
        }

        .languages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 12px;
        }

        .language-item {
            text-align: center;
            padding: 16px;
            background: #ffffff;
            border-radius: 10px;
            border: 1px solid rgba(0, 0, 0, 0.04);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            position: relative;
            transition: all 0.2s ease;
        }

        .language-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, ${primaryColor}, ${orangeAccent});
            border-radius: 10px 10px 0 0;
        }

        .language-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .language-name {
            font-size: 13px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 4px;
            letter-spacing: -0.1px;
        }

        .language-proficiency {
            font-size: 11px;
            color: ${primaryColor};
            letter-spacing: -0.05px;
            font-weight: 500;
        }

        /* Section Divider */
        .section-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, ${orangeAccent}, ${primaryColor}, ${orangeAccent}, transparent);
            margin: 25px 0;
            opacity: 0.3;
        }

        .course-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 24px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.04);
            margin-bottom: 10px;
            border-radius: 14px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }

        .course-item:last-child {
            margin-bottom: 0;
        }

        .course-content {
            flex: 1;
        }

        .course-name {
            font-size: 15px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 3px;
            letter-spacing: -0.1px;
        }

        .course-provider {
            font-size: 13px;
            color: #86868b;
            letter-spacing: -0.05px;
        }

        .course-date {
            font-size: 13px;
            color: ${primaryColor};
            font-weight: 500;
            letter-spacing: -0.05px;
        }

        .closing-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 16px;
            text-align: center;
            margin-top: 35px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
        }

        .closing-text {
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 20px;
            letter-spacing: -0.1px;
            opacity: 0.95;
        }

        .closing-contact {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 16px;
            margin-top: 20px;
        }

        .closing-contact-item {
            font-size: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 14px;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        }

        .closing-contact-item strong {
            display: block;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 6px;
            letter-spacing: -0.1px;
        }

        @media print {
            body {
                padding: 30px;
                font-size: 14px;
                background: white !important;
            }
            
            .section {
                margin-bottom: 30px;
            }
            
            .project-item {
                margin-bottom: 18px;
                page-break-inside: avoid;
                box-shadow: none !important;
                border: 1px solid #e5e5e7 !important;
            }
            
            .employment-item {
                margin-bottom: 20px;
                page-break-inside: avoid;
                background: #f0f0f0 !important;
                border: 2px solid ${orangeAccent} !important;
                color: #1d1d1f !important;
                box-shadow: none !important;
            }
            
            .employment-item .employment-position {
                color: ${orangeAccent} !important;
            }
            
            .employment-item .employment-company {
                color: #1d1d1f !important;
            }
            
            .employment-item .employment-period {
                color: #86868b !important;
            }
            
            .employment-item .employment-description {
                color: #1d1d1f !important;
            }
            
            .employment-item .tech-tag {
                background: white !important;
                color: ${orangeAccent} !important;
                border: 1px solid ${orangeAccent} !important;
            }
            
            .closing-section {
                background: #f5f5f7 !important;
                color: #1d1d1f !important;
                box-shadow: none !important;
            }
            
            .closing-contact-item {
                background: white !important;
                border: 1px solid #e5e5e7 !important;
            }

            .profile-section {
                background: none !important;
            }

            .specialties-section {
                background: #f5f5f7 !important;
            }
        }

        @page {
            size: A4;
            margin: 25mm;
        }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <div class="company-brand">${companyName}</div>
            <div class="company-tagline">Professional Development & Consulting</div>
        </div>
        <div class="contact-info">
            <strong>${data.personalInfo?.name || 'Professional Name'}</strong><br>
            ${data.personalInfo?.email || 'email@example.com'}<br>
            ${data.personalInfo?.phone || ''}<br>
            ${data.personalInfo?.location || ''}
        </div>
    </div>

    <div class="profile-section">
        ${data.personalInfo?.profileImage ? 
            `<img src="${data.personalInfo.profileImage}" alt="${data.personalInfo.name}" class="profile-image">` : 
            ''
        }
        <div class="profile-content">
            <h1 class="profile-name">${data.personalInfo?.name || 'Professional Name'}</h1>
            <div class="profile-title">${data.personalInfo?.title || 'Professional Title'}</div>
            <div class="profile-intro">${data.summary?.introduction || 'Professional summary'}</div>
            
            ${data.summary?.specialties ? `
                <div class="specialties-section">
                    <div class="specialties-title">Nyckelkompetenser</div>
                    <div class="skills-list">
                        ${data.summary.specialties.map((specialty: string) => 
                            `<span class="skill-tag">${specialty}</span>`
                        ).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    </div>

    ${data.roles && data.roles.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Professionella roller</h2>
            <div class="roles-grid">
                ${data.roles.map((role: any) => `
                    <div class="role-card">
                        <div class="role-title">${role.title}</div>
                        <div class="skills-list">
                            ${role.skills.map((skill: string) => 
                                `<span class="skill-tag">${skill}</span>`
                            ).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : ''}

    ${data.projects && data.projects.length > 0 ? `
        <div class="section-divider"></div>
        <div class="section">
            <h2 class="section-title">Projekt och uppdrag</h2>
            ${data.projects.map((project: any) => `
                <div class="project-item">
                    <div class="project-header">
                        <div>
                            <div class="project-type">${project.type}</div>
                            <div class="project-title">${project.title}</div>
                        </div>
                        <div class="project-period">${project.period}</div>
                    </div>
                    <div class="project-description">${project.description}</div>
                    ${project.technologies && project.technologies.length > 0 ? `
                        <div class="technology-tags">
                            ${project.technologies.map((tech: string) => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    ` : ''}

    ${data.employment && data.employment.length > 0 ? `
        <div class="section-divider"></div>
        <div class="section">
            <h2 class="section-title">Anställningar och roller</h2>
            ${data.employment.map((job: any) => `
                <div class="employment-item">
                    <div class="employment-header">
                        <div>
                            <div class="employment-position">${job.position}</div>
                            <div class="employment-company">${job.company}</div>
                        </div>
                        <div class="employment-period">${job.period}</div>
                    </div>
                    <div class="employment-description">${job.description}</div>
                    ${job.technologies && job.technologies.length > 0 ? `
                        <div class="technology-tags">
                            ${job.technologies.map((tech: string) => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                    ${job.achievements && job.achievements.length > 0 ? `
                        <div class="achievements">
                            ${job.achievements.map((achievement: string) => 
                                `<div class="achievement">${achievement}</div>`
                            ).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    ` : ''}

    ${data.education && data.education.length > 0 ? `
        <div class="section-divider"></div>
        <div class="section">
            <h2 class="section-title">Utbildning</h2>
            ${data.education.map((edu: any) => `
                <div class="education-item">
                    <div class="education-content">
                        <div class="education-degree">${edu.degree}</div>
                        <div class="education-institution">${edu.institution}</div>
                    </div>
                    <div class="education-period">${edu.period}</div>
                </div>
            `).join('')}
        </div>
    ` : ''}

    ${data.certifications && data.certifications.length > 0 ? `
        <div class="section">
            <h2 class="section-title">Certifieringar</h2>
            ${data.certifications.map((cert: any) => `
                <div class="certification-item">
                    <div class="certification-content">
                        <div class="certification-title">${cert.title}</div>
                        <div class="certification-issuer">${cert.issuer}</div>
                    </div>
                    <div class="certification-year">${cert.year}</div>
                </div>
            `).join('')}
        </div>
    ` : ''}

    ${data.courses && data.courses.length > 0 ? `
        <div class="section-divider"></div>
        <div class="section">
            <h2 class="section-title">Kurser och vidareutbildning</h2>
            ${data.courses.map((course: any) => `
                <div class="course-item">
                    <div class="course-content">
                        <div class="course-name">${course.name}</div>
                        <div class="course-provider">${course.provider}</div>
                    </div>
                    <div class="course-date">${course.completionDate}</div>
                </div>
            `).join('')}
        </div>
    ` : ''}

    ${data.competencies && data.competencies.length > 0 ? `
        <div class="section-divider"></div>
        <div class="section">
            <h2 class="section-title">Kompetenser</h2>
            ${data.competencies.map((category: any, index: number) => `
                <div class="competency-category">
                    <div class="competency-title">
                        <div class="competency-icon">${index + 1}</div>
                        ${category.category}
                    </div>
                    <div class="competency-skills">
                        ${category.skills.map((skill: any) => 
                            `<span class="competency-skill ${skill.level || ''}">${skill.name}</span>`
                        ).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    ` : ''}

    ${data.languages && data.languages.length > 0 ? `
        <div class="section-divider"></div>
        <div class="section">
            <h2 class="section-title">Språkkunskaper</h2>
            <div class="languages-grid">
                ${data.languages.map((lang: any) => `
                    <div class="language-item">
                        <div class="language-name">${lang.language}</div>
                        <div class="language-proficiency">${lang.proficiency}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : ''}

    ${data.closing ? `
        <div class="closing-section">
            <div class="closing-text">${data.closing.text}</div>
            <div class="closing-contact">
                <div class="closing-contact-item">
                    <strong>Email</strong>
                    ${data.closing.contact.email}
                </div>
                <div class="closing-contact-item">
                    <strong>Telefon</strong>
                    ${data.closing.contact.phone}
                </div>
                <div class="closing-contact-item">
                    <strong>Plats</strong>
                    ${data.closing.contact.location}
                </div>
                <div class="closing-contact-item">
                    <strong>Företag</strong>
                    ${data.closing.contact.company}
                </div>
            </div>
        </div>
    ` : ''}
</body>
</html>
  `;
}
