<!--
SYNC IMPACT REPORT:
Version: v1.0.0 → v2.0.0 (Major rewrite for backend API focus)
Modified Principles:
- Frontend-focused principles → Backend API principles
- shadcn/ui Component Excellence → API Design Excellence
- Performance-First Animation → Performance-First Server Architecture  
- Accessibility & User Experience → Security & Data Protection
Added Sections:
- Document Generation Standards
- Development Workflow Standards
Removed Sections:
- Frontend animation requirements
- UI accessibility requirements (moved to minimal testing UI context)
Templates Requiring Updates:
⚠ plan-template.md - Constitution Check section needs backend API gates
⚠ tasks-template.md - Task categories need API development patterns
⚠ spec-template.md - Alignment with backend API scope
Follow-up TODOs: Update agent-specific guidance files for backend focus
-->

# CV Generation Backend API Constitution

## Core Principles

### I. API Design Excellence (NON-NEGOTIABLE)
All endpoints must follow RESTful conventions with consistent resource naming; Response format standardized with success/error wrappers and timestamps; Comprehensive input validation with descriptive error messages; Rate limiting implemented for all endpoints with stricter limits on resource-intensive operations; OpenAPI documentation maintained for all endpoints with request/response examples

### II. Type-Safe Server Development
TypeScript strict mode enforced throughout backend codebase; Server-side Supabase integration with generated database types; Proper interfaces for all API request/response objects; Runtime validation using input schemas; Zero tolerance for `any` types in production API code; Middleware typed with proper Express TypeScript patterns

### III. Performance-First Server Architecture
API response times under 500ms for 90% of requests; CV generation completed under 5 seconds; Database queries optimized with proper indexing and connection pooling; Memory-efficient PDF generation with Puppeteer lifecycle management; Horizontal scaling support with stateless API design; Background job processing for resource-intensive operations

### IV. Security & Data Protection
Implement comprehensive security middleware (Helmet, CORS, rate limiting); Row Level Security (RLS) policies enforced for all data access; Input sanitization and validation on all endpoints; Secure file storage with signed URLs and access controls; Audit logging for all data modifications and file generation; Environment-based configuration management with secrets isolation

### V. Document Generation Standards
Support multiple export formats (PDF, DOCX, HTML) with consistent quality; Template system with customizable styling and industry-focused layouts; File size optimization (PDFs under 2MB, DOCX under 1MB); Server-side rendering with proper resource cleanup; Version control for templates and generated documents; Batch generation capabilities with queue management

## Template & File Management
Template library stored in database with version control; Industry-specific templates (technical, creative, classic, modern) with customizable styling; File storage integration with Supabase Storage using organized bucket structure; Generated files accessible via signed URLs with configurable expiration; Template marketplace capabilities for sharing and discovering community templates; Metadata tracking for all generated documents including generation parameters and timestamps

## Development Workflow Standards
Express.js server with TypeScript and modular route organization; Puppeteer integration for high-quality PDF generation with proper browser lifecycle; Database schema migrations with version control and rollback capabilities; Comprehensive error handling with structured logging and monitoring; Testing strategy covering contract tests, integration tests, and performance validation; Environment separation (development, staging, production) with appropriate configurations

## Governance
Constitution supersedes all development practices and architectural decisions; Backend API must serve external frontend applications with consistent interface contracts; Testing UI minimal and focused on API validation only; Performance benchmarks mandatory before production deployment; Security review required for all data handling and file generation features; Complexity deviations must be documented with technical justification; All code changes must maintain backward compatibility unless major version increment justified

**Version**: 2.0.0 | **Ratified**: 2025-10-04 | **Last Amended**: 2025-10-04