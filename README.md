# CV Generation Backend API

A production-ready **backend API** for professional CV generation with multiple formats (HTML, PDF, DOCX). Built with Express.js, TypeScript, and Puppeteer for high-quality document generation. Includes a minimal frontend for API testing and development validation.

## 🎯 **Backend-First Architecture**

This is primarily a **backend API system** designed for integration with external consultant management applications. The included frontend serves **testing and development purposes only**.

### **Production Use Case**
- **Primary**: Backend API integrated into consultant management dashboards
- **Secondary**: Standalone API for custom applications
- **Testing**: Minimal React frontend for API validation

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/nandervang/cv-gen.git
cd cv-gen
npm install

# Start full development environment
npm run dev:full

# Access points:
# - Backend API: http://localhost:3001
# - Testing UI: http://localhost:5173
```

## � **Andervang Consulting Template System**

### **Featured Template: Andervang Consulting**
- **Design**: Apple-inspired clean aesthetics with modern professional layout
- **Color System**: Dark blue primary (#003D82) with vibrant orange accents (#FF6B35)
- **Employment Focus**: Distinctive orange gradient backgrounds for employment sections
- **Visual Hierarchy**: Section dividers, hover effects, and interactive elements
- **Accessibility**: WCAG AA compliant contrast ratios
- **Content Density**: Optimized for comprehensive information while maintaining readability

### **Additional Templates**
- **Modern Professional**: Tech-focused minimalist design
- **Classic Executive**: Traditional professional styling
- **Creative Portfolio**: Design-focused with visual elements

## 🏗️ **API-First Architecture**

### **Backend Core (Express + TypeScript - Port 3001)**
- **Document Generation**: Puppeteer PDF, custom HTML/DOCX engines
- **Template System**: Modular template architecture with full customization
- **Security**: API key authentication, CORS, rate limiting, Helmet security
- **Performance**: Clustering, memory optimization, efficient document processing
- **Type Safety**: Full TypeScript implementation with strict mode

### **Testing Frontend (React + Vite - Port 5173)**
- **Purpose**: API validation and development testing only
- **Components**: Minimal UI with shadcn/ui for consistency
- **Features**: Template preview, batch testing, generation workflow validation
- **Scope**: Not for production use - external applications handle UI

## 📚 **API Documentation**

### Core Endpoints

- **[API Specification](docs/api-specification.md)** - Complete API reference
- **[OpenAPI Specification](docs/openapi.yaml)** - Machine-readable API spec (YAML)
- **[OpenAPI JSON](docs/openapi.json)** - Machine-readable API spec (JSON)
- **[Quick Setup Guide](docs/quick-setup.md)** - Get running in 5 minutes
- **[Integration Guide](docs/consultant-dashboard-integration.md)** - External application integration

### Backend Features

- **Document Generation**: Multi-format export (HTML, PDF, DOCX)
- **Template Engine**: Modular system with Andervang Consulting and additional templates
- **API Security**: Authentication, CORS, rate limiting, input validation
- **Type Safety**: Full TypeScript implementation with comprehensive interfaces

## 🛠️ **Development & Testing**

### Development Scripts

```bash
npm run dev:api          # Backend API only (port 3001)
npm run dev              # Testing frontend only (port 5173)
npm run dev:full         # Both backend and frontend
npm run build            # Production build
npm run test             # Run test suites
npm run test:contract    # API contract tests
```

### API Testing Examples

```javascript
// Generate Andervang Consulting CV
const response = await fetch('http://localhost:3001/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'dev-api-key-12345'
  },
  body: JSON.stringify({
    personalInfo: {
      name: 'Niklas Andervang',
      title: 'Senior Consultant',
      email: 'niklas@andervang.com'
    },
    company: 'Andervang Consulting',
    employment: [{
      company: 'Tech Company AB',
      position: 'Senior Developer',
      period: '2023-Present',
      description: 'Led development of scalable backend systems...'
    }],
    template: 'andervang-consulting',
    format: 'pdf'
  })
});
```

## 🎨 **Template Customization**

### Andervang Consulting Template Features

- **Visual Distinction**: Employment sections with orange gradient backgrounds
- **Interactive Elements**: Hover effects and subtle animations
- **Content Density**: Optimized for comprehensive professional information
- **Accessibility**: WCAG AA compliant design with proper contrast ratios
- **Cross-Format**: Consistent styling across HTML, PDF, and DOCX exports

## 🔧 **Configuration & Deployment**

### Environment Variables

```bash
# Development
NODE_ENV=development
API_KEY=dev-api-key-12345
PORT=3001

# Production
NODE_ENV=production
API_KEY=your-secure-api-key
```

### Integration Recommendations

1. **External Applications**: Use the REST API for CV generation
2. **Consultant Dashboards**: Integrate via HTTP requests with proper authentication
3. **Custom UIs**: Build your own frontend and consume the backend API
4. **Batch Processing**: Use batch endpoints for multiple CV generation

## 🚀 **Production Deployment**

### Recommended Architecture

- **Backend**: Deploy Express API to cloud service (Heroku, Railway, etc.)
- **Frontend**: External consultant management application handles UI
- **Integration**: REST API consumption with proper authentication
- **Storage**: File generation with temporary URLs or external storage integration

See the [Deployment Guide](docs/deployment-guide.md) for detailed production setup instructions.

## 📊 **Performance & Security**

### Performance Metrics

- **CV Generation**: 3-8 seconds per PDF (including Puppeteer initialization)
- **API Response**: <200ms for non-generation endpoints
- **Batch Operations**: Parallel processing with configurable concurrency
- **Memory Management**: Efficient cleanup after document generation

### Security Features

- **API Key Authentication**: Secure endpoint access
- **CORS Protection**: Configurable cross-origin policies
- **Input Validation**: Comprehensive request sanitization
- **Rate Limiting**: Protection against abuse
- **Security Headers**: Helmet.js integration

## 🤝 **Integration Support**

This backend API is designed for seamless integration with external consultant management systems. The minimal testing frontend demonstrates API capabilities but is not intended for production use.

### Getting Help

1. Review [API Specification](docs/api-specification.md) for complete endpoint documentation
2. Check [Integration Guide](docs/consultant-dashboard-integration.md) for external application setup
3. Use the testing frontend for API validation and development
4. Open issues for bugs or feature requests

---

**Ready to integrate professional CV generation?** Start with the [API Specification](docs/api-specification.md) and [Integration Guide](docs/consultant-dashboard-integration.md)!
