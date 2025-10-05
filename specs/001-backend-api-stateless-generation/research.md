# Research: Stateless CV Generation Backend API

## Technical Decision Research

### Document Generation: Puppeteer for PDF Generation

**Decision**: Use Puppeteer for PDF generation with server-side HTML rendering

**Rationale**: 
- High-quality PDF output with full CSS support
- Excellent control over page formatting and styling
- Mature library with good TypeScript support
- Can handle complex layouts and responsive design
- Memory management features for server deployment

**Alternatives Considered**:
- jsPDF: Limited CSS support, programmatic approach too complex
- PDFKit: Good for simple documents, lacks advanced layout capabilities
- Playwright: Similar to Puppeteer but heavier, unnecessary overhead
- HTML-PDF: Deprecated and unreliable

**Implementation Notes**:
- Use headless Chrome with minimal memory footprint
- Implement proper browser lifecycle management
- Configure PDF options for consistent A4 output
- Enable resource cleanup and connection pooling

### Authentication: API Key Middleware

**Decision**: Implement custom Express middleware for API key authentication

**Rationale**:
- Simple integration with single consumer (consultant manager app)
- No complex session management needed for stateless design
- Easy to implement rate limiting per API key
- Clear separation of concerns with middleware pattern

**Alternatives Considered**:
- JWT tokens: Unnecessary complexity for single consumer
- OAuth 2.0: Over-engineered for simple API key needs
- Basic Auth: Less secure than API key headers
- No authentication: Security risk even for internal APIs

**Implementation Notes**:
- API key passed in `X-API-Key` header
- Environment-based key configuration
- Logging for authentication failures
- Rate limiting integration with API key identification

### Template Rendering: Static HTML Templates with Dynamic Data

**Decision**: Use template literals with static HTML structures

**Rationale**:
- Simple and performant for server-side rendering
- Easy to maintain and version control
- No complex templating engine dependencies
- Direct integration with Puppeteer HTML processing

**Alternatives Considered**:
- React SSR: Too complex for simple template generation
- Handlebars/Mustache: Additional dependency, unnecessary abstraction
- EJS templates: Server-side complexity not justified
- External template files: Harder to manage and deploy

**Implementation Notes**:
- Template functions that accept CV data payload
- Industry-specific template variations (tech, creative, classic)
- CSS-in-JS approach for styling consistency
- Responsive design for different page sizes

### Memory Optimization: Browser Pool Management

**Decision**: Implement browser instance pooling with lifecycle management

**Rationale**:
- Prevents memory leaks from browser instances
- Improves performance by reusing browser processes
- Essential for production server deployment
- Enables concurrent PDF generation

**Alternatives Considered**:
- New browser per request: Memory inefficient, slow startup
- Single shared browser: Concurrency issues, crash risks
- External PDF service: Additional infrastructure complexity
- File-based rendering: Slower, disk I/O overhead

**Implementation Notes**:
- Maximum browser pool size configuration
- Automatic cleanup after idle timeout
- Error handling for browser crashes
- Connection pooling for high concurrency

### Rate Limiting: Tiered Approach by Endpoint Type

**Decision**: Different rate limits for template serving vs PDF generation

**Rationale**:
- Template endpoints are lightweight, can handle high volume
- PDF generation is resource-intensive, needs stricter limits
- Protects server resources while enabling good UX
- Aligns with constitution performance requirements

**Implementation Notes**:
- Template endpoints: 100 requests/15 minutes
- Generation endpoints: 10 requests/5 minutes
- API key-based tracking for per-client limits
- Graceful error responses with retry timing

## Architecture Decisions Summary

1. **Stateless Design**: No database persistence, all data via payload
2. **Express Framework**: Mature, lightweight, excellent middleware ecosystem
3. **TypeScript**: Strict mode for type safety and developer experience
4. **Puppeteer Integration**: Professional PDF quality with memory optimization
5. **Security First**: API key auth, rate limiting, input validation
6. **Performance Focus**: Browser pooling, template caching, efficient rendering

## Implementation Readiness

All major technical unknowns have been resolved. The architecture is simple, focused, and aligns with the constitutional principles. Ready to proceed to Phase 1 design and contracts.