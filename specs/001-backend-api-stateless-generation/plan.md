# Implementation Plan: Stateless CV Generation Backend API

**Branch**: `main` | **Date**: 2025-10-04 | **Spec**: [specification.md](../../.specify/memory/specification.md)**Progress Tracking**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [x] Phase 3: Tasks generated (/tasks command)
- [x] Phase 4: Implementation 80% complete
- [ ] Phase 5: Validation in progress

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All technical unknowns resolved
- [x] Architecture aligns with clarified requirements

**Current Implementation Status**:
- [x] Express server with stateless architecture
- [x] API key authentication middleware
- [x] Frank Digital template system with complete mock data
- [x] PDF generation service with Puppeteer
- [x] DOCX generation service with proper docx library
- [x] HTML generation with styled output
- [x] Complete CV generation endpoint (/api/generate/complete)
- [x] Enhanced CV data structure (CompleteCVData)
- [x] Full 15-year project history in mock data
- [ ] Additional template variants (modern, classic, creative)
- [ ] Comprehensive testing suite
- [ ] Performance optimization and rate limitinglarified stateless API architecture for CV generation service

## Summary
Build a stateless backend API that accepts CV data as payload and generates professional documents (PDF, DOCX, HTML) on-demand without persistence. The API serves a single external frontend (consultant manager app) with API key authentication and includes static templates for various industries.

## Technical Context
**Language/Version**: TypeScript with Node.js 18+  
**Primary Dependencies**: Express.js, Puppeteer, Helmet, CORS, Rate Limiting  
**Storage**: No database persistence - stateless design  
**Testing**: curl/Postman for API testing, Jest for unit tests  
**Target Platform**: Railway/Render deployment with horizontal scaling support
**Project Type**: Backend API server with minimal testing frontend  
**Performance Goals**: <500ms API response, <5s PDF generation  
**Constraints**: PDF files <2MB, DOCX <1MB, memory-efficient processing  
**Scale/Scope**: Single consumer (consultant manager app), 1000+ concurrent requests

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**API Design Excellence Check**:
- [x] RESTful endpoint design with consistent resource naming
- [x] Standardized response format with success/error wrappers
- [x] Comprehensive input validation with descriptive errors
- [x] Rate limiting strategy defined for all endpoints

**Type-Safe Server Development Check**:
- [x] TypeScript strict mode maintained throughout backend
- [x] No database types needed (stateless design)
- [x] All API interfaces properly typed
- [x] No `any` types in production code paths

**Performance-First Server Architecture Check**:
- [x] Response time targets defined (<500ms for 90% requests)
- [x] Memory-efficient PDF generation approach outlined
- [x] Horizontal scaling considerations documented
- [x] Background processing not needed (on-demand generation)

**Security & Data Protection Check**:
- [x] Security middleware stack defined (Helmet, CORS, rate limiting)
- [x] API key authentication strategy planned
- [x] Input sanitization strategy documented
- [x] No persistent data storage security concerns

**Document Generation Standards Check**:
- [x] Multiple export formats supported (PDF, DOCX, HTML)
- [x] File size optimization targets defined
- [x] Static template system architecture planned
- [x] No version control needed (stateless design)

## Project Structure

### Documentation (this feature)
```
specs/001-backend-api-stateless-generation/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/tasks command)
```

### Source Code (repository root)
```
src/
├── server/
│   ├── index.ts         # Express server
│   ├── routes/          # API route handlers
│   ├── services/        # PDF generation service
│   ├── templates/       # Static CV templates
│   ├── middleware/      # Auth, validation middleware
│   └── types/           # TypeScript interfaces
├── components/          # Minimal testing UI
└── lib/                 # Shared utilities

tests/
├── contract/            # API contract tests
├── integration/         # End-to-end tests
└── unit/                # Service unit tests
```

**Structure Decision**: Single project structure with clear separation between backend API server and minimal testing frontend. Static templates stored in codebase for simplicity.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - Document generation libraries (Puppeteer vs alternatives)
   - Template rendering approaches (React SSR vs HTML templates)
   - API key authentication patterns for Express
   - Memory optimization strategies for PDF generation

2. **Generate and dispatch research agents**:
   ```
   Task: "Research Puppeteer memory optimization for server deployment"
   Task: "Find best practices for Express API key authentication middleware"
   Task: "Evaluate template rendering approaches for CV generation"
   Task: "Research rate limiting strategies for document generation APIs"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all technical decisions documented

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - CVData payload structure (personal info, experience, education, skills)
   - Template configuration objects
   - Generation request/response schemas
   - Error response structures

2. **Generate API contracts** from functional requirements:
   - GET /health → health check endpoint
   - GET /api/templates → template catalog
   - POST /api/generate → CV generation with payload
   - Output OpenAPI schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - Template endpoints return proper schema
   - Generation endpoint validates input payload
   - Error handling returns consistent format
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Generate CV with different templates
   - Validate input payload requirements
   - Test file format outputs (PDF, DOCX, HTML)

5. **Update agent file incrementally**:
   - Add stateless API architecture notes
   - Include Puppeteer and template management
   - Update with current session progress

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, updated agent guidance

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load design docs from Phase 1
- Generate tasks from API contracts (each endpoint → test + implementation)
- Template system tasks (static template creation and serving)
- PDF generation service tasks
- Authentication middleware tasks

**Ordering Strategy**:
- TDD order: Contract tests before implementation 
- Infrastructure first: Auth middleware, template serving
- Core generation last: PDF service integration
- Mark [P] for parallel execution (different services)

**Estimated Output**: 20-25 numbered, ordered tasks in tasks.md

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*No constitutional violations - architecture aligns with stateless backend principles*

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All technical unknowns resolved
- [x] Architecture aligns with clarified requirements

---
*Based on Constitution v2.0.0 - See `.specify/memory/constitution.md`*