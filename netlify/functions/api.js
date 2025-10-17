// Import Puppeteer and Chromium for PDF generation
console.log('Loading Puppeteer dependencies...');
import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium';
console.log('Puppeteer loaded successfully');

// Import DOCX library and Packer for Word document generation
console.log('Loading DOCX dependencies...');
import { Document, Paragraph, TextRun, AlignmentType, Packer } from 'docx';
console.log('DOCX loaded successfully');

console.log('CV Generation API loaded and ready');

// Helper functions for content generation
function generateAndervangConsultingHTML(cvData) {
  // Handle different payload formats - consultant manager vs direct API
  const { personalInfo, summary, company, styling, templateSettings } = cvData;
  const employment = cvData.employment || cvData.experience || []; // Handle both field names with fallback
  const competencies = cvData.competencies || []; // Enhanced competencies with levels
  const skills = cvData.skills || []; // New skills section with ratings
  const projects = cvData.projects || []; // Ensure array
  const education = cvData.education || []; // Enhanced education with honors/location
  const certifications = cvData.certifications || []; // Enhanced with URLs/expiration
  const courses = cvData.courses || []; // Enhanced with status/grades
  const languages = cvData.languages || []; // Ensure array
  const roles = cvData.roles || []; // Professional roles
  const closing = cvData.closing; // Closing section
  
  // Enhanced styling with templateSettings support
  const primaryColor = styling?.primaryColor || templateSettings?.colorScheme || '#003D82'; // Darker blue for better contrast
  const orangeAccent = styling?.accentColor || '#FF6B35'; // Orange accent color
  const fontFamily = styling?.fontFamily || '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif';
  const fontSize = styling?.fontSize || templateSettings?.fontSize || 'medium';
  const spacing = styling?.spacing || templateSettings?.margins || 'normal';
  const companyName = company || 'Andervang Consulting';
  return `<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo?.name || 'Unknown'} - CV</title>
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

        .social-links {
            margin-top: 8px;
            font-size: 11px;
        }

        .social-link {
            color: ${primaryColor};
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .social-link:hover {
            color: ${orangeAccent};
            text-decoration: underline;
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
        }

        .project-title {
            font-size: 16px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 12px;
            letter-spacing: -0.2px;
        }

        .employment-company {
            font-size: 18px;
            font-weight: 700;
            color: white;
            margin-bottom: 8px;
            letter-spacing: -0.2px;
        }

        .project-period, .employment-period {
            font-size: 11px;
            color: #86868b;
            font-weight: 500;
            white-space: nowrap;
        }

        .employment-period {
            color: rgba(255, 255, 255, 0.8);
        }

        .project-description, .employment-description {
            font-size: 13px;
            line-height: 1.5;
            color: #1d1d1f;
            margin-bottom: 12px;
        }

        .employment-description {
            color: rgba(255, 255, 255, 0.95);
        }

        .project-url {
            font-size: 12px;
            margin-bottom: 12px;
            color: #1d1d1f;
        }

        .project-link {
            color: ${primaryColor};
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        .project-link:hover {
            color: ${orangeAccent};
            text-decoration: underline;
        }

        .technology-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 12px;
        }

        .tech-tag {
            background: rgba(255, 255, 255, 0.9);
            color: ${primaryColor};
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 10px;
            font-weight: 500;
            border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .employment-item .tech-tag {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Achievements sections */
        .achievements-section, .project-achievements {
            margin-top: 16px;
            margin-bottom: 12px;
        }

        .achievements-title {
            font-size: 11px;
            font-weight: 600;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .employment-item .achievements-title {
            color: rgba(255, 255, 255, 0.9);
        }

        .project-item .achievements-title {
            color: ${primaryColor};
        }

        .achievements-list {
            margin: 0;
            padding-left: 16px;
            list-style-type: disc;
        }

        .achievement-item {
            font-size: 12px;
            line-height: 1.4;
            margin-bottom: 6px;
        }

        .employment-item .achievement-item {
            color: rgba(255, 255, 255, 0.95);
        }

        .project-item .achievement-item {
            color: #1d1d1f;
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

        .education-specialization {
            font-size: 10px;
            color: ${primaryColor};
            font-weight: 500;
            margin-top: 2px;
            letter-spacing: -0.02px;
        }

        .certification-description {
            font-size: 10px;
            color: #86868b;
            margin-top: 2px;
            letter-spacing: -0.02px;
        }

        .education-honors {
            font-size: 10px;
            color: ${orangeAccent};
            font-weight: 500;
            margin-top: 2px;
        }

        .education-location {
            font-size: 10px;
            color: #86868b;
            margin-top: 2px;
        }

        .certification-expiration {
            font-size: 10px;
            color: ${primaryColor};
            margin-top: 2px;
            font-weight: 500;
        }

        .cert-link {
            color: ${primaryColor};
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .cert-link:hover {
            color: ${orangeAccent};
            text-decoration: underline;
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
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 8px;
        }

        .competency-skill {
            padding: 6px 12px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.06);
            border-radius: 8px;
            font-size: 12px;
            color: #1d1d1f;
            font-weight: 500;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .more-skills {
            background: ${orangeAccent} !important;
            color: white !important;
            font-style: italic;
        }

        /* Skills Section with Ratings */
        .skills-category {
            margin-bottom: 24px;
            background: #ffffff;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid rgba(0, 0, 0, 0.04);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
        }

        .skills-category-title {
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 16px;
            letter-spacing: -0.1px;
        }

        .skills-icon {
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, ${primaryColor}, ${orangeAccent});
            color: white;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
            margin-right: 12px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 12px;
        }

        .skill-item {
            padding: 12px 16px;
            background: #f8f9fa;
            border: 1px solid rgba(0, 0, 0, 0.04);
            border-radius: 8px;
            transition: all 0.2s ease;
        }

        .skill-item:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .skill-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .skill-name {
            font-size: 13px;
            font-weight: 500;
            color: #1d1d1f;
        }

        .skill-rating {
            display: flex;
            gap: 2px;
        }

        .star {
            color: #e0e0e0;
            font-size: 12px;
            transition: color 0.2s ease;
        }

        .star.filled {
            color: ${orangeAccent};
        }

        .skill-progress {
            width: 100%;
            height: 4px;
            background: #e0e0e0;
            border-radius: 2px;
            overflow: hidden;
        }

        .skill-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, ${primaryColor}, ${orangeAccent});
            border-radius: 2px;
            transition: width 0.3s ease;
        }

        .languages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
        }

        .language-item {
            padding: 12px 16px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.04);
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .language-name {
            font-size: 14px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 4px;
        }

        .language-proficiency {
            font-size: 11px;
            color: ${primaryColor};
            font-weight: 500;
        }

        /* Print styles */
        @media print {
            body { 
                margin: 0; 
                padding: 15px;
                font-size: 12px;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .employment-item {
                break-inside: avoid;
            }
            .project-item {
                break-inside: avoid;
            }
        }

        /* Career Objective */
        .career-objective {
            margin-top: 16px;
        }

        .career-objective-title {
            font-size: 12px;
            font-weight: 600;
            color: ${primaryColor};
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .career-objective-text {
            font-size: 13px;
            line-height: 1.5;
            color: #2d2d2d;
            font-style: italic;
        }

        /* Summary Highlights */
        .summary-highlights {
            margin-top: 16px;
        }

        .highlights-title {
            font-size: 12px;
            font-weight: 600;
            color: ${primaryColor};
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .highlights-list {
            margin: 0;
            padding-left: 16px;
            list-style-type: disc;
        }

        .highlight-item {
            font-size: 12px;
            line-height: 1.4;
            margin-bottom: 4px;
            color: #1d1d1f;
        }

        /* Summary Specialties */
        .summary-specialties {
            margin-top: 16px;
        }

        .specialties-title {
            font-size: 12px;
            font-weight: 600;
            color: ${primaryColor};
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .specialties-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }

        .specialty-tag {
            background: rgba(255, 255, 255, 0.9);
            color: ${primaryColor};
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 10px;
            font-weight: 500;
            border: 1px solid rgba(0, 0, 0, 0.04);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        /* Professional Roles */
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

        .role-description {
            font-size: 12px;
            color: #86868b;
            margin-bottom: 8px;
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

        /* Courses */
        .course-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 16px 24px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.04);
            margin-bottom: 10px;
            border-radius: 14px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
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

        .course-meta {
            text-align: right;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .course-date {
            font-size: 13px;
            color: ${primaryColor};
            font-weight: 500;
            letter-spacing: -0.05px;
        }

        .course-credits {
            font-size: 11px;
            color: #86868b;
            font-weight: 400;
        }

        .course-duration {
            font-size: 11px;
            color: #86868b;
            margin-top: 2px;
        }

        .course-status {
            font-size: 10px;
            margin-top: 4px;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 500;
        }

        .status-completed {
            background: #d4edda;
            color: #155724;
        }

        .status-in-progress {
            background: #fff3cd;
            color: #856404;
        }

        .status-planned {
            background: #f8d7da;
            color: #721c24;
        }

        .course-grade {
            font-size: 11px;
            color: ${orangeAccent};
            font-weight: 600;
            margin-bottom: 2px;
        }

        /* Closing Section */
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

        .closing-signature {
            margin-top: 20px;
            opacity: 0.8;
        }

        .signature-name {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .signature-date, .signature-location {
            font-size: 12px;
            margin-bottom: 4px;
        }

        .signature-timestamp {
            font-size: 10px;
            opacity: 0.7;
            font-style: italic;
            margin-top: 8px;
        }

        /* Closing Contact Section */
        .closing-contact {
            margin: 24px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .closing-contact-title {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 16px;
            text-align: center;
            opacity: 0.9;
        }

        .closing-contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
        }

        .closing-contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            transition: all 0.2s ease;
        }

        .closing-contact-item:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-1px);
        }

        .contact-icon {
            font-size: 16px;
            opacity: 0.8;
        }

        .contact-link {
            color: white;
            text-decoration: none;
            font-size: 12px;
            font-weight: 500;
            transition: opacity 0.2s ease;
        }

        .contact-link:hover {
            opacity: 0.8;
            text-decoration: underline;
        }

        @page {
            margin: 0.5in;
            size: A4;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div>
            <div class="company-brand">${companyName}</div>
            <div class="company-tagline">Professional Consulting Services</div>
        </div>
        <div class="contact-info">
            <div><strong>${personalInfo?.name || 'N/A'}</strong></div>
            <div>${personalInfo?.email || ''}</div>
            <div>${personalInfo?.phone || ''}</div>
            ${personalInfo?.location ? `<div>${personalInfo.location}</div>` : ''}
            ${personalInfo?.linkedIn || personalInfo?.github || personalInfo?.website || personalInfo?.twitter || personalInfo?.instagram || personalInfo?.facebook ? `
                <div class="social-links">
                    ${personalInfo?.website ? `<div><a href="${personalInfo.website}" target="_blank" class="social-link">🌐 Website</a></div>` : ''}
                    ${personalInfo?.linkedIn ? `<div><a href="${personalInfo.linkedIn}" target="_blank" class="social-link">💼 LinkedIn</a></div>` : ''}
                    ${personalInfo?.github ? `<div><a href="${personalInfo.github}" target="_blank" class="social-link">🔗 GitHub</a></div>` : ''}
                    ${personalInfo?.twitter ? `<div><a href="${personalInfo.twitter}" target="_blank" class="social-link">🐦 Twitter</a></div>` : ''}
                    ${personalInfo?.instagram ? `<div><a href="${personalInfo.instagram}" target="_blank" class="social-link">📷 Instagram</a></div>` : ''}
                    ${personalInfo?.facebook ? `<div><a href="${personalInfo.facebook}" target="_blank" class="social-link">👥 Facebook</a></div>` : ''}
                </div>
            ` : ''}
        </div>
    </div>

    <!-- Profile Section -->
    <div class="profile-section">
        ${(personalInfo?.profileImage || personalInfo?.profilePhoto) ? 
            `<img class="profile-image" src="${personalInfo.profileImage || personalInfo.profilePhoto}" alt="Profile" />` : 
            `<div class="profile-image" style="background: #f5f5f7; display: flex; align-items: center; justify-content: center; color: #86868b; font-size: 11px;">No Image</div>`
        }
        <div class="profile-content">
            <h1 class="profile-name">${personalInfo?.name || 'N/A'}</h1>
            <h2 class="profile-title">${personalInfo?.title || 'N/A'}</h2>
            <div class="profile-intro">${summary?.introduction || ''}</div>
            
            ${summary?.highlights?.length ? `
                <div class="summary-highlights">
                    <div class="highlights-title">Nyckelkompetenser:</div>
                    <ul class="highlights-list">
                        ${summary.highlights.map(highlight => `<li class="highlight-item">${highlight}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${summary?.specialties?.length ? `
                <div class="summary-specialties">
                    <div class="specialties-title">Specialiteter:</div>
                    <div class="specialties-tags">
                        ${summary.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${cvData.careerObjective ? `
                <div class="career-objective">
                    <div class="career-objective-title">Karriärmål</div>
                    <div class="career-objective-text">${cvData.careerObjective}</div>
                </div>
            ` : ''}
        </div>
    </div>

    <!-- Professional Roles Section -->
    ${roles?.length ? `
        <div class="section">
            <h2 class="section-title">Professionella roller</h2>
            <div class="roles-grid">
                ${roles.map(role => `
                    <div class="role-card">
                        <div class="role-title">${role.name || role.title || 'N/A'}</div>
                        ${role.description ? `<div class="role-description">${role.description}</div>` : ''}
                        <div class="skills-list">
                            ${(role.responsibilities || role.skills || []).map(skill => 
                                `<span class="skill-tag">${skill}</span>`
                            ).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : ''}

    <!-- Employment Section (Orange gradient) -->
    ${employment?.length ? `
        <div class="section">
            <h2 class="section-title">Anställningar och roller</h2>
            ${employment.map(job => `
                <div class="employment-item">
                    <div class="employment-header">
                        <div>
                            <div class="employment-position">${job.position || job.title || job.role || 'N/A'}</div>
                            <div class="employment-company">${job.company || job.employer || 'N/A'}</div>
                        </div>
                        <div class="employment-period">${job.period || job.duration || 'N/A'}</div>
                    </div>
                    <div class="employment-description">${job.description || job.summary || ''}</div>
                    ${job.achievements?.length ? `
                        <div class="achievements-section">
                            <div class="achievements-title">Viktiga resultat:</div>
                            <ul class="achievements-list">
                                ${job.achievements.map(achievement => `<li class="achievement-item">${achievement}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${(job.technologies || job.skills || job.tech)?.length ? `
                        <div class="technology-tags">
                            ${(job.technologies || job.skills || job.tech).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    ` : ''}

    <!-- Projects Section -->
    ${projects?.length ? `
        <div class="section">
            <h2 class="section-title">Projekt och uppdrag</h2>
            ${projects.map(project => `
                <div class="project-item">
                    <div class="project-header">
                        <div>
                            <div class="project-type">${project.type || 'Projekt'}</div>
                            <div class="project-title">${project.title}</div>
                        </div>
                        <div class="project-period">${project.period}</div>
                    </div>
                    <div class="project-description">${project.description}</div>
                    ${project.achievements?.length ? `
                        <div class="project-achievements">
                            <div class="achievements-title">Viktiga resultat:</div>
                            <ul class="achievements-list">
                                ${project.achievements.map(achievement => `<li class="achievement-item">${achievement}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${project.url ? `
                        <div class="project-url">
                            <strong>Projekt URL:</strong> <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link">${project.url}</a>
                        </div>
                    ` : ''}
                    ${project.technologies?.length ? `
                        <div class="technology-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    ` : ''}

    <!-- Education Section -->
    ${education?.length ? `
        <div class="section">
            <h2 class="section-title">Utbildning</h2>
            ${education.map(edu => `
                <div class="education-item">
                    <div class="education-content">
                        <div class="education-degree">${edu.degree}</div>
                        <div class="education-institution">${edu.institution}</div>
                        ${edu.specialization ? `<div class="education-specialization">${edu.specialization}</div>` : ''}
                        ${edu.honors ? `<div class="education-honors">🏆 ${edu.honors}</div>` : ''}
                        ${edu.location ? `<div class="education-location">📍 ${edu.location}</div>` : ''}
                    </div>
                    <div class="education-period">${edu.period}</div>
                </div>
            `).join('')}
        </div>
    ` : ''}

    <!-- Certifications Section -->
    ${certifications?.length ? `
        <div class="section">
            <h2 class="section-title">Certifieringar</h2>
            ${certifications.map(cert => `
                <div class="certification-item">
                    <div class="certification-content">
                        <div class="certification-title">
                            ${cert.url ? `<a href="${cert.url}" target="_blank" class="cert-link">${cert.title}</a>` : cert.title}
                        </div>
                        <div class="certification-issuer">${cert.issuer}</div>
                        ${cert.description ? `<div class="certification-description">${cert.description}</div>` : ''}
                        ${cert.expiration ? `<div class="certification-expiration">🗓️ Upphör: ${cert.expiration}</div>` : ''}
                    </div>
                    <div class="certification-year">${cert.year}</div>
                </div>
            `).join('')}
        </div>
    ` : ''}

    <!-- Courses Section -->
    ${courses?.length ? `
        <div class="section">
            <h2 class="section-title">Kurser och vidareutbildning</h2>
            ${courses.map(course => `
                <div class="course-item">
                    <div class="course-content">
                        <div class="course-name">${course.name || course.title || 'N/A'}</div>
                        <div class="course-provider">${course.institution || course.provider || course.issuer || ''}</div>
                        ${course.description ? `<div class="course-duration">⏱️ ${course.description}</div>` : ''}
                        ${course.duration ? `<div class="course-duration">⏱️ ${course.duration}</div>` : ''}
                        ${course.status ? `<div class="course-status status-${course.status}">📋 Status: ${course.status}</div>` : ''}
                    </div>
                    <div class="course-meta">
                        <div class="course-date">${course.year || course.completionDate || course.date || ''}</div>
                        ${course.grade ? `<div class="course-grade">🎯 ${course.grade}</div>` : ''}
                        ${course.credits ? `<div class="course-credits">${course.credits} hp</div>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    ` : ''}

    <!-- Skills Section with Ratings -->
    ${skills?.length ? `
        <div class="section">
            <h2 class="section-title">Tekniska färdigheter</h2>
            ${skills.map((category, index) => `
                <div class="skills-category">
                    <div class="skills-category-title">
                        <div class="skills-icon">${index + 1}</div>
                        ${category.category}
                    </div>
                    <div class="skills-grid">
                        ${(category.items || []).map(skill => `
                            <div class="skill-item">
                                <div class="skill-header">
                                    <span class="skill-name">${typeof skill === 'string' ? skill : skill.name}</span>
                                    ${typeof skill === 'object' && skill.level ? `
                                        <div class="skill-rating">
                                            ${Array.from({length: 5}, (_, i) => 
                                                `<span class="star ${i < skill.level ? 'filled' : ''}">★</span>`
                                            ).join('')}
                                        </div>
                                    ` : ''}
                                </div>
                                ${typeof skill === 'object' && skill.level ? `
                                    <div class="skill-progress">
                                        <div class="skill-progress-bar" style="width: ${(skill.level / 5) * 100}%"></div>
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    ` : ''}

    <!-- Competencies Section -->
    ${competencies?.length ? `
        <div class="section">
            <h2 class="section-title">Kompetenser</h2>
            ${competencies.map((category, index) => {
                // Get skills/items and limit to prevent too large output
                const skills = category.items || category.skills || [];
                const skillsToShow = skills.slice(0, 50); // Limit to first 50 skills to prevent truncation
                return `
                <div class="competency-category">
                    <div class="competency-title">
                        <div class="competency-icon">${index + 1}</div>
                        ${category.category || category.name || `Kategori ${index + 1}`}
                    </div>
                    <div class="competency-skills">
                        ${skillsToShow.map(skill => 
                            `<span class="competency-skill">${typeof skill === 'string' ? skill : skill.name || skill}</span>`
                        ).join('')}
                        ${skills.length > 50 ? `<span class="competency-skill more-skills">+${skills.length - 50} mer...</span>` : ''}
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    ` : ''}

    <!-- Languages Section -->
    ${languages?.length ? `
        <div class="section">
            <h2 class="section-title">Språkkunskaper</h2>
            <div class="languages-grid">
                ${languages.map(lang => `
                    <div class="language-item">
                        <div class="language-name">${lang.language}</div>
                        <div class="language-proficiency">${lang.proficiency}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : ''}

    <!-- Closing Section -->
    ${cvData.closing ? `
        <div class="closing-section">
            <div class="closing-text">${cvData.closing.statement || cvData.closing.text || ''}</div>
            
            <div class="closing-contact">
                <div class="closing-contact-title">Kontakta mig gärna:</div>
                <div class="closing-contact-grid">
                    ${personalInfo?.email ? `
                        <div class="closing-contact-item">
                            <span class="contact-icon">📧</span>
                            <a href="mailto:${personalInfo.email}" class="contact-link">${personalInfo.email}</a>
                        </div>
                    ` : ''}
                    ${personalInfo?.phone ? `
                        <div class="closing-contact-item">
                            <span class="contact-icon">📱</span>
                            <a href="tel:${personalInfo.phone}" class="contact-link">${personalInfo.phone}</a>
                        </div>
                    ` : ''}
                    ${personalInfo?.linkedIn ? `
                        <div class="closing-contact-item">
                            <span class="contact-icon">💼</span>
                            <a href="${personalInfo.linkedIn}" target="_blank" class="contact-link">LinkedIn</a>
                        </div>
                    ` : ''}
                    ${personalInfo?.website ? `
                        <div class="closing-contact-item">
                            <span class="contact-icon">🌐</span>
                            <a href="${personalInfo.website}" target="_blank" class="contact-link">Portfolio</a>
                        </div>
                    ` : ''}
                </div>
            </div>

            ${cvData.closing.signature || cvData.closing.date || cvData.closing.location || personalInfo?.location ? `
                <div class="closing-signature">
                    ${cvData.closing.signature ? `<div class="signature-name">${cvData.closing.signature}</div>` : ''}
                    ${cvData.closing.date ? `<div class="signature-date">${cvData.closing.date}</div>` : ''}
                    <div class="signature-location">${cvData.closing.location || personalInfo?.location || ''}</div>
                    <div class="signature-timestamp">Genererat: ${new Date().toLocaleDateString('sv-SE')}</div>
                </div>
            ` : ''}
        </div>
    ` : ''}
</body>
</html>`;
}

async function generatePDFContent(cvData) {
  // Add overall timeout wrapper to prevent Netlify function timeout
  return await Promise.race([
    generatePDFContentInternal(cvData),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('PDF generation timed out after 22 seconds')), 22000)
    )
  ]);
}

async function generatePDFContentInternal(cvData) {
  let browser;
  try {
    console.log('Starting PDF generation...');
    const startTime = Date.now();
    
    // Generate the HTML content first using Andervang Consulting template
    const htmlContent = generateAndervangConsultingHTML(cvData);
    console.log('HTML content generated, length:', htmlContent.length, 'time:', Date.now() - startTime, 'ms');

    // Launch Puppeteer with enhanced Netlify-compatible settings
    console.log('Launching Puppeteer browser...');
    browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding'
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
      timeout: 15000, // Reduced timeout for browser launch
    });
    console.log('Browser launched successfully, time:', Date.now() - startTime, 'ms');

    const page = await browser.newPage();
    console.log('New page created, time:', Date.now() - startTime, 'ms');
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 800 });
    console.log('Viewport set, time:', Date.now() - startTime, 'ms');
    
    // Set the HTML content with optimized wait conditions
    await page.setContent(htmlContent, {
      waitUntil: 'domcontentloaded', // Fastest option
      timeout: 10000, // Further reduced timeout
    });
    console.log('HTML content set on page, time:', Date.now() - startTime, 'ms');

    // Minimal wait for fonts and styles - optimized for speed
    await new Promise(resolve => setTimeout(resolve, 200)); // Minimal wait time
    console.log('Wait completed, generating PDF, time:', Date.now() - startTime, 'ms');

    // Generate PDF with optimized settings for speed
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: '0.4in',
        right: '0.4in',
        bottom: '0.4in',
        left: '0.4in',
      },
      timeout: 10000, // Further reduced timeout
    });
    console.log('PDF generated, buffer size:', pdfBuffer.length, 'time:', Date.now() - startTime, 'ms');

    await browser.close();
    console.log('Browser closed, total time:', Date.now() - startTime, 'ms');

    // Validate PDF buffer
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('Generated PDF buffer is empty');
    }

    // Return base64 encoded PDF
    const base64PDF = Buffer.from(pdfBuffer).toString('base64');
    console.log('PDF conversion to base64 completed, length:', base64PDF.length, 'total time:', Date.now() - startTime, 'ms');
    return base64PDF;
  } catch (error) {
    console.error('PDF generation error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      name: error.name
    });
    
    // Ensure browser is closed even on error
    try {
      if (browser) {
        await browser.close();
        console.log('Browser closed after error');
      }
    } catch (closeError) {
      console.error('Error closing browser:', closeError.message);
    }
    
    // Check if this is a local development environment issue
    if (error.code === 'ENOEXEC' || error.message.includes('spawn ENOEXEC')) {
      throw new Error('PDF generation not available in local development environment. Puppeteer/Chromium cannot execute in Netlify Dev. This will work in production deployment.');
    }
    
    // Re-throw the error with more context
    throw new Error(`PDF generation failed: ${error.message}`);
  }
}

async function generateDOCXContent(cvData) {
  try {
    // Document, Paragraph, TextRun, AlignmentType are already imported at the top
    
    // Handle different payload formats - consultant manager vs direct API
    const { personalInfo, summary, company } = cvData;
    const employment = cvData.employment || cvData.experience || []; // Handle both field names with fallback
    const competencies = cvData.competencies || cvData.skills || []; // Handle both field names with fallback
    const projects = cvData.projects || []; // Ensure array
    const education = cvData.education || []; // Ensure array
    const certifications = cvData.certifications || []; // Ensure array
    const languages = cvData.languages || []; // Ensure array
    const companyName = company || 'Andervang Consulting';
    
    const children = [];
    
    // Header - Company Brand
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: companyName,
            size: 28,
            bold: true,
            font: "Arial",
            color: "003D82"
          })
        ],
        alignment: AlignmentType.LEFT,
        spacing: { after: 300 }
      })
    );
    
    // Contact Info
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${personalInfo?.name || 'N/A'}\n${personalInfo?.email || ''}\n${personalInfo?.phone || ''}\n${personalInfo?.location || ''}`,
            size: 20,
            font: "Arial"
          })
        ],
        alignment: AlignmentType.RIGHT,
        spacing: { after: 400 }
      })
    );
    
    // Name and Title
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: personalInfo?.name || 'N/A',
            size: 32,
            bold: true,
            font: "Arial"
          })
        ],
        spacing: { after: 200 }
      })
    );
    
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: personalInfo?.title || 'N/A',
            size: 18,
            font: "Arial",
            color: "003D82"
          })
        ],
        spacing: { after: 400 }
      })
    );
    
    // Introduction
    if (summary?.introduction) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: summary.introduction,
              size: 20,
              font: "Arial"
            })
          ],
          spacing: { after: 400 }
        })
      );
    }
    
    // Employment
    if (employment && employment.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "ANSTÄLLNINGAR OCH ROLLER",
              size: 24,
              bold: true,
              font: "Arial",
              color: "FF6B35"
            })
          ],
          spacing: { before: 400, after: 300 }
        })
      );
      
      employment.forEach(job => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${job.company || 'N/A'}`,
                size: 22,
                bold: true,
                font: "Arial",
                color: "FF6B35"
              })
            ],
            spacing: { before: 300, after: 100 }
          })
        );
        
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${job.position || 'N/A'} | ${job.period || 'N/A'}`,
                size: 18,
                bold: true,
                font: "Arial"
              })
            ],
            spacing: { after: 150 }
          })
        );
        
        if (job.description) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: job.description,
                  size: 18,
                  font: "Arial"
                })
              ],
              spacing: { after: 250 }
            })
          );
        }
      });
    }
    
    // Projects
    if (projects && projects.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "PROJEKT OCH UPPDRAG",
              size: 24,
              bold: true,
              font: "Arial",
              color: "003D82"
            })
          ],
          spacing: { before: 400, after: 300 }
        })
      );
      
      projects.forEach(project => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${project.title || 'N/A'} (${project.period || 'N/A'})`,
                size: 20,
                bold: true,
                font: "Arial"
              })
            ],
            spacing: { before: 200, after: 100 }
          })
        );
        
        if (project.description) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: project.description,
                  size: 18,
                  font: "Arial"
                })
              ],
              spacing: { after: 200 }
            })
          );
        }
      });
    }
    
    // Education
    if (education && education.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "UTBILDNING",
              size: 24,
              bold: true,
              font: "Arial",
              color: "003D82"
            })
          ],
          spacing: { before: 400, after: 300 }
        })
      );
      
      education.forEach(edu => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${edu.degree || 'N/A'} - ${edu.institution || 'N/A'} (${edu.period || 'N/A'})`,
                size: 18,
                font: "Arial"
              })
            ],
            spacing: { after: 150 }
          })
        );
      });
    }
    
    // Certifications
    if (certifications && certifications.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "CERTIFIERINGAR",
              size: 24,
              bold: true,
              font: "Arial",
              color: "003D82"
            })
          ],
          spacing: { before: 400, after: 300 }
        })
      );
      
      certifications.forEach(cert => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${cert.title || 'N/A'} - ${cert.issuer || 'N/A'} (${cert.year || 'N/A'})`,
                size: 18,
                font: "Arial"
              })
            ],
            spacing: { after: 100 }
          })
        );
        
        if (cert.description) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: cert.description,
                  size: 16,
                  font: "Arial",
                  color: "666666"
                })
              ],
              spacing: { after: 150 }
            })
          );
        }
      });
    }
    
    // Competencies
    if (competencies && competencies.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "KOMPETENSER",
              size: 24,
              bold: true,
              font: "Arial",
              color: "003D82"
            })
          ],
          spacing: { before: 400, after: 300 }
        })
      );
      
      competencies.forEach(category => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: category.category || category.name || 'N/A',
                size: 20,
                bold: true,
                font: "Arial"
              })
            ],
            spacing: { before: 200, after: 100 }
          })
        );
        
        const skills = category.items || category.skills || [];
        const skillNames = skills.map(skill => typeof skill === 'string' ? skill : skill.name).join(', ');
        
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: skillNames,
                size: 18,
                font: "Arial"
              })
            ],
            spacing: { after: 200 }
          })
        );
      });
    }
    
    // Languages
    if (languages && languages.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "SPRÅKKUNSKAPER",
              size: 24,
              bold: true,
              font: "Arial",
              color: "003D82"
            })
          ],
          spacing: { before: 400, after: 300 }
        })
      );
      
      languages.forEach(lang => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${lang.language}: ${lang.proficiency}`,
                size: 18,
                font: "Arial"
              })
            ],
            spacing: { after: 100 }
          })
        );
      });
    }
    
    // Create and pack the document
    const doc = new Document({
      sections: [{
        children: children
      }]
    });
    
    // Generate the DOCX buffer
    const buffer = await Packer.toBuffer(doc);
    return Buffer.from(buffer).toString('base64');
    
  } catch (error) {
    console.error('DOCX generation error:', error);
    // Fallback to simple text format
    const { personalInfo, summary, company } = cvData;
    const employment = cvData.employment || cvData.experience || [];
    const companyName = company || 'Andervang Consulting';
    
    const simpleContent = `${companyName}
CV - ${personalInfo?.name || 'N/A'}
${personalInfo?.title || 'N/A'}

KONTAKTINFORMATION
Email: ${personalInfo?.email || ''}
Telefon: ${personalInfo?.phone || ''}
${personalInfo?.location ? `Plats: ${personalInfo.location}` : ''}

PROFESSIONELL SAMMANFATTNING
${summary?.introduction || ''}

Genererat: ${new Date().toLocaleDateString('sv-SE')}
Template: Andervang Consulting`;
    
    return btoa(unescape(encodeURIComponent(simpleContent)));
  }
}

export const handler = async (event, context) => {
  console.log('Function invoked:', {
    httpMethod: event.httpMethod,
    path: event.path,
    origin: event.headers?.origin || 'unknown',
    userAgent: event.headers['user-agent'] || 'unknown'
  });

  // CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  // Default headers for all responses
  const headers = {
    ...corsHeaders,
    'Content-Type': 'application/json'
  };

  try {
    // Parse the path to determine the route
    let path = event.path;
    if (path.startsWith('/.netlify/functions/api')) {
      path = path.substring('/.netlify/functions/api'.length); // Remove netlify function prefix
    } else if (path.startsWith('/api')) {
      path = path.substring(4); // Remove '/api' prefix
    }
    const method = event.httpMethod;
    
    console.log('Function called with path:', event.path, 'parsed to:', path);

    // Health check endpoint
    if (path === '/health' && method === 'GET') {
      console.log('Health check requested');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          status: 'healthy',
          timestamp: new Date().toISOString(),
          version: '1.0.0',
          environment: process.env.NODE_ENV || 'production',
          dependencies: {
            puppeteer: 'loaded',
            chromium: 'loaded',
            docx: 'loaded'
          }
        })
      };
    }

    // Main endpoint for consultant manager integration
    if (path === '' && method === 'POST') {
      // This is the main /api endpoint that the integration guide expects
      const body = JSON.parse(event.body || '{}');
      
      // Check if it's the ConsultantCVPayload format
      let format = body.format || 'pdf'; // Use let instead of const so we can reassign on fallback
      let fileContent = '';
      let mimeType = '';
      let filename = `CV_${body.personalInfo?.name?.replace(/\s+/g, '_') || 'Unknown'}`;
      
      if (format === 'html') {
        const htmlContent = generateAndervangConsultingHTML(body);
        fileContent = btoa(unescape(encodeURIComponent(htmlContent)));
        mimeType = 'text/html';
      } else if (format === 'pdf') {
        try {
          const pdfContent = await generatePDFContent(body);
          fileContent = pdfContent;
          mimeType = 'application/pdf';
        } catch (pdfError) {
          console.error('PDF generation failed:', pdfError);
          
          // Only fall back to HTML in local development environment
          if (pdfError.message.includes('local development environment') || 
              pdfError.message.includes('Puppeteer/Chromium cannot execute in Netlify Dev')) {
            console.log('Local development detected, falling back to HTML');
            const htmlContent = generateAndervangConsultingHTML(body);
            fileContent = btoa(unescape(encodeURIComponent(htmlContent)));
            mimeType = 'text/html';
            filename = filename.replace('.pdf', '.html');
            format = 'html';
          } else {
            // In production, return the error instead of falling back
            return {
              statusCode: 500,
              headers,
              body: JSON.stringify({
                success: false,
                error: {
                  code: 'PDF_GENERATION_FAILED',
                  message: `PDF generation failed: ${pdfError.message}`,
                  fallbackAvailable: true
                }
              })
            };
          }
        }
      } else if (format === 'docx') {
        try {
          const docContent = await generateDOCXContent(body);
          fileContent = docContent;
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        } catch (docxError) {
          console.error('DOCX generation failed, falling back to text:', docxError);
          // Fall back to simple text if DOCX generation fails
          const { personalInfo, company } = body;
          const simpleContent = `${company || 'Andervang Consulting'}\nCV - ${personalInfo?.name || 'N/A'}\n${personalInfo?.title || 'N/A'}\n\nGenererat: ${new Date().toLocaleDateString('sv-SE')}`;
          fileContent = btoa(unescape(encodeURIComponent(simpleContent)));
          mimeType = 'text/plain';
          filename = filename.replace('.docx', '.txt'); // Update filename
        }
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            fileUrl: `data:${mimeType};base64,${fileContent}`,
            format: format,
            generatedAt: new Date().toISOString(),
            template: body.template || 'andervang-consulting',
            filename: `${filename}.${format}`,
            note: body.format === 'pdf' && format === 'html' ? 
              'PDF generation not available in local development. Falling back to HTML format.' : 
              undefined
          }
        })
      };
    }

    // API key validation for protected routes
    const apiKey = event.headers['x-api-key'];
    const validKeys = [
      process.env.CV_API_KEY,
      process.env.VITE_CV_API_KEY,
      'dev-api-key-12345' // Development fallback
    ].filter(Boolean);

    if (!apiKey || !validKeys.includes(apiKey)) {
      return {
        statusCode: 401,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          error: {
            code: 'UNAUTHORIZED',
            message: 'Valid API key required'
          }
        })
      };
    }

    // Route handling
    if (path === '/templates' && method === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: [
            {
              id: 'andervang-consulting',
              name: 'Andervang Consulting',
              description: 'Professional template with Apple-inspired design and orange accent colors',
              templateType: 'professional',
              industryFocus: 'consulting',
              isPremium: false,
              isActive: true
            },
            {
              id: 'modern',
              name: 'Modern Professional',
              description: 'Clean, modern design perfect for tech professionals',
              templateType: 'modern',
              industryFocus: 'technology',
              isPremium: false,
              isActive: true
            },
            {
              id: 'classic',
              name: 'Classic Executive',
              description: 'Traditional corporate design for executive positions',
              templateType: 'classic',
              industryFocus: 'business',
              isPremium: false,
              isActive: true
            },
            {
              id: 'creative',
              name: 'Creative Portfolio',
              description: 'Artistic design for creative professionals',
              templateType: 'creative',
              industryFocus: 'creative',
              isPremium: false,
              isActive: true
            }
          ]
        })
      };
    }

    if (path === '/customization/options' && method === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            colorSchemes: {
              'frank-digital': [
                { id: 'blue-professional', name: 'Professional Blue', primaryColor: '#1e40af', accentColor: '#3b82f6', description: 'Classic professional blue theme' },
                { id: 'green-tech', name: 'Tech Green', primaryColor: '#166534', accentColor: '#22c55e', description: 'Modern tech green theme' }
              ],
              'modern': [
                { id: 'purple-creative', name: 'Creative Purple', primaryColor: '#7c3aed', accentColor: '#a855f7', description: 'Creative purple theme' },
                { id: 'teal-modern', name: 'Modern Teal', primaryColor: '#0f766e', accentColor: '#14b8a6', description: 'Modern teal theme' }
              ],
              'classic': [
                { id: 'gray-minimal', name: 'Minimal Gray', primaryColor: '#374151', accentColor: '#6b7280', description: 'Minimal gray theme' },
                { id: 'indigo-corporate', name: 'Corporate Indigo', primaryColor: '#3730a3', accentColor: '#6366f1', description: 'Corporate indigo theme' }
              ],
              'creative': [
                { id: 'pink-creative', name: 'Creative Pink', primaryColor: '#be185d', accentColor: '#ec4899', description: 'Creative pink theme' },
                { id: 'orange-warm', name: 'Warm Orange', primaryColor: '#c2410c', accentColor: '#f97316', description: 'Warm orange theme' }
              ]
            },
            fontOptions: [
              { id: 'inter', name: 'Inter', fontFamily: 'Inter', fallback: ['Arial', 'sans-serif'], category: 'sans-serif', description: 'Modern and readable' },
              { id: 'roboto', name: 'Roboto', fontFamily: 'Roboto', fallback: ['Arial', 'sans-serif'], category: 'sans-serif', description: 'Clean and professional' },
              { id: 'open-sans', name: 'Open Sans', fontFamily: 'Open Sans', fallback: ['Arial', 'sans-serif'], category: 'sans-serif', description: 'Friendly and approachable' },
              { id: 'lato', name: 'Lato', fontFamily: 'Lato', fallback: ['Arial', 'sans-serif'], category: 'sans-serif', description: 'Elegant and versatile' },
              { id: 'georgia', name: 'Georgia', fontFamily: 'Georgia', fallback: ['Times', 'serif'], category: 'serif', description: 'Traditional and authoritative' },
              { id: 'times', name: 'Times New Roman', fontFamily: 'Times New Roman', fallback: ['Times', 'serif'], category: 'serif', description: 'Classic and formal' }
            ],
            layoutOptions: [
              { id: 'single-column', name: 'Single Column', description: 'Traditional single column layout', supportedTemplates: ['frank-digital', 'modern', 'classic', 'creative'] },
              { id: 'two-column', name: 'Two Column', description: 'Modern two column layout', supportedTemplates: ['modern', 'creative'] },
              { id: 'sidebar-left', name: 'Left Sidebar', description: 'Sidebar on the left', supportedTemplates: ['modern', 'classic'] },
              { id: 'asymmetric', name: 'Asymmetric', description: 'Creative asymmetric layout', supportedTemplates: ['creative'] }
            ],
            sizeOptions: [
              { id: 'small', name: 'Small', description: 'Compact text size' },
              { id: 'medium', name: 'Medium', description: 'Standard text size' },
              { id: 'large', name: 'Large', description: 'Large text size for better readability' }
            ],
            spacingOptions: [
              { id: 'compact', name: 'Compact', description: 'Tight spacing for more content' },
              { id: 'normal', name: 'Normal', description: 'Standard spacing' },
              { id: 'relaxed', name: 'Relaxed', description: 'Generous spacing for better readability' }
            ]
          }
        })
      };
    }

    if (path === '/generate/complete' && method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      
      const format = body.format || 'pdf';
      let fileContent = '';
      let mimeType = '';
      let filename = `CV_${body.personalInfo?.name?.replace(/\s+/g, '_') || 'Unknown'}`;
      
      if (format === 'html') {
        const htmlContent = generateAndervangConsultingHTML(body);
        fileContent = btoa(unescape(encodeURIComponent(htmlContent)));
        mimeType = 'text/html';
      } else if (format === 'pdf') {
        const pdfContent = await generatePDFContent(body);
        fileContent = pdfContent;
        mimeType = 'application/pdf';
      } else if (format === 'docx') {
        const docContent = generateDOCXContent(body);
        fileContent = btoa(unescape(encodeURIComponent(docContent)));
        mimeType = 'text/plain'; // Simplified for now
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            fileUrl: `data:${mimeType};base64,${fileContent}`,
            format: format,
            generatedAt: new Date().toISOString(),
            template: body.template || 'modern',
            filename: `${filename}.${format}`,
            note: 'Generated with actual CV data'
          }
        })
      };
    }

    if (path === '/batch/formats' && method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      
      // Generate all three formats with actual CV data
      const formats = ['pdf', 'html', 'docx'];
      const results = {};
      
      for (const format of formats) {
        let fileContent = '';
        let mimeType = '';
        
        if (format === 'html') {
          const htmlContent = generateAndervangConsultingHTML(body);
          fileContent = btoa(unescape(encodeURIComponent(htmlContent)));
          mimeType = 'text/html';
        } else if (format === 'pdf') {
          const pdfContent = await generatePDFContent(body);
          fileContent = pdfContent;
          mimeType = 'application/pdf';
        } else if (format === 'docx') {
          const docContent = generateDOCXContent(body);
          fileContent = btoa(unescape(encodeURIComponent(docContent)));
          mimeType = 'text/plain';
        }
        
        results[format] = {
          success: true,
          fileUrl: `data:${mimeType};base64,${fileContent}`,
          generatedAt: new Date().toISOString()
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            summary: {
              total: 3,
              successful: 3,
              failed: 0
            },
            results
          }
        })
      };
    }

    if (path === '/batch/comprehensive' && method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      
      // Generate files for all templates and formats
      const templates = ['andervang-consulting', 'modern', 'classic', 'creative'];
      const formats = ['pdf', 'html', 'docx'];
      const results = {};
      
      for (const templateId of templates) {
        results[templateId] = {};
        const templateData = { ...body, template: templateId };
        
        for (const format of formats) {
          let fileContent = '';
          let mimeType = '';
          
          if (format === 'html') {
            const htmlContent = generateAndervangConsultingHTML(templateData);
            fileContent = btoa(unescape(encodeURIComponent(htmlContent)));
            mimeType = 'text/html';
          } else if (format === 'pdf') {
            const pdfContent = await generatePDFContent(templateData);
            fileContent = pdfContent;
            mimeType = 'application/pdf';
          } else if (format === 'docx') {
            const docContent = generateDOCXContent(templateData);
            fileContent = btoa(unescape(encodeURIComponent(docContent)));
            mimeType = 'text/plain';
          }
          
          results[templateId][format] = {
            success: true,
            fileUrl: `data:${mimeType};base64,${fileContent}`,
            generatedAt: new Date().toISOString()
          };
        }
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            summary: {
              totalTemplates: 4,
              totalFormats: 3,
              totalGenerated: 12,
              successful: 12,
              failed: 0
            },
            results
          }
        })
      };
    }

    // 404 for unknown routes
    console.log('No route matched for:', path, method);
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: {
          code: 'NOT_FOUND',
          message: `Route ${path} not found`,
          debug: {
            originalPath: event.path,
            parsedPath: path,
            method: method
          }
        }
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: {
          code: 'INTERNAL_ERROR',
          message: error.message
        }
      })
    };
  }
};