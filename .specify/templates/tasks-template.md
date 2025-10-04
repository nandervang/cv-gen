# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup
- [ ] T001 Create Express API server structure per implementation plan
- [ ] T002 Initialize TypeScript backend with Express, Puppeteer, Supabase dependencies
- [ ] T003 [P] Configure security middleware (Helmet, CORS, rate limiting)
- [ ] T004 [P] Configure TypeScript strict mode and linting for server code

## Phase 3.2: API Contract Tests (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T005 [P] Contract test POST /api/cvs in tests/contract/test_cvs_post.js
- [ ] T006 [P] Contract test GET /api/cvs/{id} in tests/contract/test_cvs_get.js
- [ ] T007 [P] Contract test GET /api/templates in tests/contract/test_templates_get.js
- [ ] T008 [P] Contract test POST /api/generate in tests/contract/test_generate_post.js
- [ ] T009 [P] Integration test CV creation workflow in tests/integration/test_cv_workflow.js
- [ ] T010 [P] Integration test PDF generation in tests/integration/test_pdf_generation.js

## Phase 3.3: Core API Implementation (ONLY after tests are failing)
- [ ] T011 [P] CV data model in src/server/models/CVModel.ts
- [ ] T012 [P] Template data model in src/server/models/TemplateModel.ts
- [ ] T013 [P] CVService CRUD operations in src/server/services/CVService.ts
- [ ] T014 [P] CV Generation Service in src/server/services/CVGenerationService.ts
- [ ] T015 POST /api/cvs endpoint implementation
- [ ] T016 GET /api/cvs/{id} endpoint implementation
- [ ] T017 GET /api/templates endpoint implementation
- [ ] T018 POST /api/generate endpoint implementation
- [ ] T019 Input validation middleware
- [ ] T020 Error handling and structured logging

## Phase 3.4: Document Generation & Storage
- [ ] T021 Puppeteer PDF generation service integration
- [ ] T022 DOCX generation capability (if required)
- [ ] T023 HTML export functionality
- [ ] T024 Supabase Storage integration for generated files
- [ ] T025 File cleanup and lifecycle management
- [ ] T026 Template rendering system

## Phase 3.5: Security & Performance
- [ ] T027 Database connection optimization and pooling
- [ ] T028 Rate limiting implementation for generation endpoints
- [ ] T029 File access security with signed URLs
- [ ] T030 Memory optimization for Puppeteer processes
- [ ] T031 [P] Performance tests for API response times
- [ ] T032 [P] Load testing for concurrent CV generation
- [ ] T033 [P] Update API documentation
- [ ] T034 Security audit and vulnerability scanning

## Dependencies
- Tests (T004-T007) before implementation (T008-T014)
- T008 blocks T009, T015
- T016 blocks T018
- Implementation before polish (T019-T023)

## Parallel Example
```
# Launch T004-T007 together:
Task: "Contract test POST /api/users in tests/contract/test_users_post.py"
Task: "Contract test GET /api/users/{id} in tests/contract/test_users_get.py"
Task: "Integration test registration in tests/integration/test_registration.py"
Task: "Integration test auth in tests/integration/test_auth.py"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
   
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
   
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task