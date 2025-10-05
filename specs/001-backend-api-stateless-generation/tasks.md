# Tasks: Simple CV Generation Backend API

**Input**: Design documents from `/specs/001-backend-api-stateless-generation/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

## Phase 3.1: Setup & Infrastructure
- [ ] T001 Update Express server with simplified stateless architecture
- [ ] T002 [P] Add API key authentication middleware in src/server/middleware/auth.ts
- [ ] T003 [P] Create input validation middleware in src/server/middleware/validation.ts
- [ ] T004 [P] Install document generation dependencies (puppeteer, docx, html templates)

## Phase 3.2: Contract Tests (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T005 [P] Contract test GET /health in tests/contract/test_health.js
- [ ] T006 [P] Contract test GET /api/templates in tests/contract/test_templates.js  
- [ ] T007 [P] Contract test POST /api/generate (PDF) in tests/contract/test_generate_pdf.js
- [ ] T008 [P] Contract test POST /api/generate (DOCX) in tests/contract/test_generate_docx.js
- [ ] T009 [P] Contract test POST /api/generate (HTML) in tests/contract/test_generate_html.js
- [ ] T010 [P] Contract test error responses in tests/contract/test_errors.js

## Phase 3.3: Static Template System (ONLY after tests are failing)
- [ ] T011 [P] Create modern template in src/server/templates/modern.ts
- [ ] T012 [P] Create classic template in src/server/templates/classic.ts
- [ ] T013 [P] Create creative template in src/server/templates/creative.ts
- [ ] T014 Template service for serving template catalog in src/server/services/TemplateService.ts
- [ ] T015 Template route handler GET /api/templates

## Phase 3.4: Document Generation Services
- [ ] T016 PDF generation service with Puppeteer in src/server/services/PDFService.ts
- [ ] T017 DOCX generation service in src/server/services/DOCXService.ts
- [ ] T018 HTML generation service in src/server/services/HTMLService.ts
- [ ] T019 Main CV generation service orchestrator in src/server/services/CVGenerationService.ts
- [ ] T020 Generation route handler POST /api/generate with format switching

## Phase 3.5: Integration & Error Handling
- [ ] T021 Integrate API key middleware with all protected routes
- [ ] T022 Add comprehensive input validation for SimpleCVData schema
- [ ] T023 Implement proper error handling for generation failures
- [ ] T024 Add memory optimization for Puppeteer browser management
- [ ] T025 Configure rate limiting for generation endpoints (10 req/5min)
- [ ] T026 Add structured logging for generation requests and errors

## Phase 3.6: Testing & Validation
- [ ] T027 [P] Integration test full PDF generation workflow in tests/integration/test_pdf_workflow.js
- [ ] T028 [P] Integration test DOCX generation in tests/integration/test_docx_workflow.js
- [ ] T029 [P] Integration test HTML generation in tests/integration/test_html_workflow.js
- [ ] T030 [P] Performance test generation times (<5s PDF, <3s DOCX, <1s HTML)
- [ ] T031 [P] Memory leak test for concurrent generation requests
- [ ] T032 [P] API key authentication test suite
- [ ] T033 Run quickstart.md validation tests
- [ ] T034 Generate OpenAPI documentation from contracts

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