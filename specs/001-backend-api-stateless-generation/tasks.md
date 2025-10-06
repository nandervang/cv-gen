# Tasks: Simple CV Generation Backend API

**Input**: Design documents from `/specs/001-backend-api-stateless-generation/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

## Phase 3.1: Setup & Infrastructure
- [x] T001 Update Express server with simplified stateless architecture
- [x] T002 [P] Add API key authentication middleware in src/server/middleware/auth.ts
- [x] T003 [P] Create input validation middleware in src/server/middleware/validation.ts
- [x] T004 [P] Install document generation dependencies (puppeteer, docx, html templates)

## Phase 3.2: Contract Tests (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T005 [P] Contract test GET /health in tests/contract/test_health.js
- [x] T006 [P] Contract test GET /api/templates in tests/contract/test_templates.js  
- [x] T007 [P] Contract test POST /api/generate (PDF) in tests/contract/test_generate_pdf.js
- [x] T008 [P] Contract test POST /api/generate (DOCX) in tests/contract/test_generate_docx.js
- [x] T009 [P] Contract test POST /api/generate (HTML) in tests/contract/test_generate_html.js
- [x] T010 [P] Contract test error responses in tests/contract/test_error_responses.js

## Phase 3.3: Frank Digital Template System (COMPLETED)
- [x] T011 [P] Create Frank Digital template in src/server/templates/frank-digital.ts
- [x] T012 [P] Create complete mock data with 15-year project history
- [x] T013 [P] Create enhanced CV data structure (CompleteCVData)
- [x] T014 Template service for serving template catalog in src/server/services/TemplateService.ts
- [x] T015 Template route handler GET /api/templates

## Phase 3.4: Document Generation Services (COMPLETED)
- [x] T016 PDF generation service with Puppeteer in src/server/lib/pdf-generator.ts
- [x] T017 DOCX generation service in src/server/templates/frank-digital.ts
- [x] T018 HTML generation service in src/server/templates/frank-digital.ts
- [x] T019 Main CV generation service orchestrator in src/server/services/CVGenerationService.ts
- [x] T020 Generation route handler POST /api/generate/complete with format switching

## Phase 3.5: Integration & Error Handling (COMPLETED)
- [x] T021 Integrate API key middleware with all protected routes
- [x] T022 Add comprehensive input validation for CompleteCVData schema
- [x] T023 Implement proper error handling for generation failures
- [x] T024 Add memory optimization for Puppeteer browser management
- [x] T025 Configure rate limiting for generation endpoints (10 req/5min)
- [x] T026 Add structured logging for generation requests and errors

## Phase 3.6: Additional Templates & Testing (IN PROGRESS)
- [ ] T027 [P] Create modern template variant in src/server/templates/modern.ts
- [ ] T028 [P] Create classic template variant in src/server/templates/classic.ts
- [ ] T029 [P] Create creative template variant in src/server/templates/creative.ts
- [ ] T030 [P] Integration test full PDF generation workflow
- [ ] T031 [P] Integration test DOCX generation workflow
- [ ] T032 [P] Integration test HTML generation workflow
- [ ] T033 [P] Performance test generation times (<5s PDF, <3s DOCX, <1s HTML)
- [ ] T034 [P] Memory leak test for concurrent generation requests
- [ ] T035 Run quickstart.md validation tests
- [ ] T036 Generate OpenAPI documentation from contracts

## Dependencies
- Setup (T001-T004) before all other phases
- Contract tests (T005-T010) before implementation (T011-T026)
- Templates (T011-T015) before generation services (T016-T020)
- Services (T016-T020) before integration (T021-T026)
- Implementation complete before testing (T027-T034)

## Parallel Execution Groups
```
Group 1 (T002-T004): Middleware and dependencies
Group 2 (T005-T010): All contract tests  
Group 3 (T011-T013): Template creation
Group 4 (T027-T032): Integration and performance tests
```

## File-Level Task Distribution
- **src/server/middleware/**: T002, T003
- **src/server/templates/**: T011, T012, T013
- **src/server/services/**: T014, T016, T017, T018, T019
- **src/server/routes/**: T015, T020
- **tests/contract/**: T005, T006, T007, T008, T009, T010
- **tests/integration/**: T027, T028, T029, T030, T031, T032

## Validation Checklist
- [x] All OpenAPI contracts have corresponding tests
- [x] All SimpleCVData properties validated
- [x] All error codes tested (MISSING_NAME, INVALID_TEMPLATE, etc.)
- [x] Three output formats supported (PDF, DOCX, HTML)
- [x] API key authentication on all protected endpoints
- [x] Rate limiting configured per constitution requirements
- [x] Memory optimization for production deployment

## Expected Outcomes
After completing these tasks:
1. ✅ Working CV generation from name + title payload
2. ✅ Three output formats with proper quality
3. ✅ Static template system with modern/classic/creative options
4. ✅ API key authentication and rate limiting
5. ✅ Comprehensive error handling and validation
6. ✅ Performance within constitutional requirements (<5s generation)
7. ✅ Production-ready stateless architecture

This task list focuses on the core requirement: generating stunning CVs from minimal payload data with professional document quality.