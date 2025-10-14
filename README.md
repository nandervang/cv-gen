# CV Generation API

A production-ready backend API for generating professional CVs with multiple templates and formats. Built with Netlify Functions for serverless deployment.

## 🎯 **Architecture**

**Backend-First Design**: This is primarily a backend API system designed for integration with external applications. The included frontend is for testing and development only.

**Production Use**: 
- Backend API integrated into consultant management dashboards
- Standalone API for custom applications  
- RESTful endpoints with comprehensive documentation

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- Netlify CLI (for deployment)

### Setup

```bash
git clone https://github.com/nandervang/cv-gen.git
cd cv-gen
npm install

# Start development
npm run dev

# Access testing UI: http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Deploy to Netlify

```bash
netlify deploy --prod
```

## 📊 **Featured Template: Andervang Consulting**

Our flagship template with distinctive design elements:

- **Design**: Apple-inspired clean aesthetics
- **Color System**: Dark blue primary (#003D82) with orange accents (#FF6B35) 
- **Employment Sections**: Distinctive orange gradient backgrounds
- **Visual Elements**: Section dividers, hover effects, interactive elements
- **Accessibility**: WCAG AA compliant
- **Content Density**: Optimized for comprehensive information

## 🔧 **API Endpoints**

### Core Generation

```bash
# Health Check
GET /.netlify/functions/health

# Generate CV
POST /.netlify/functions/api
Content-Type: application/json

{
  "personalInfo": {
    "name": "John Doe",
    "title": "Senior Developer",
    "email": "john@example.com"
  },
  "template": "andervang-consulting",
  "format": "pdf"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "fileUrl": "data:application/pdf;base64,JVBERi0x...",
    "format": "pdf",
    "template": "andervang-consulting",
    "generatedAt": "2025-10-13T12:00:00Z"
  }
}
```

## 📖 **Documentation**

- **[API Specification](docs/api-specification.md)** - Complete API reference
- **[Integration Guide](docs/consultant-dashboard-integration.md)** - External app integration
- **[Project Recommendations](docs/project-recommendations.md)** - Future development roadmap

## 🏗️ **Technical Stack**

### Backend (Netlify Functions)
- **Runtime**: Node.js serverless functions
- **Document Generation**: Puppeteer for PDF, custom HTML/DOCX
- **Templates**: Modular template system with full customization
- **Security**: CORS headers, input validation

### Testing Frontend (Development Only)
- **Framework**: React + Vite + TypeScript
- **UI**: shadcn/ui components
- **Purpose**: API validation and development testing
- **Scope**: Not for production - external apps handle UI

## 🧪 **Testing**

```bash
# Run API tests
npm test

# Lint code
npm run lint
```

## 🚢 **Production Integration**

This API is designed to integrate with external consultant management systems. See the [Integration Guide](docs/consultant-dashboard-integration.md) for:

- Complete payload structure
- Data transformation examples
- React component implementations
- Error handling patterns
- Production deployment strategies

## 📁 **Project Structure**

```
├── netlify/functions/     # Serverless API functions
│   ├── api.js            # Main CV generation endpoint
│   └── health.js         # Health check endpoint
├── src/                  # Testing frontend (dev only)
│   ├── components/       # React testing components
│   └── lib/              # Utility functions
├── docs/                 # Comprehensive documentation
└── tests/                # API contract tests
```

## 🔑 **Key Features**

- **Multi-format Export**: PDF, HTML, DOCX
- **Template System**: Multiple professional templates
- **Serverless Architecture**: Scales automatically
- **Type Safety**: Full TypeScript implementation
- **Comprehensive Testing**: API contract validation
- **Production Ready**: Security, error handling, documentation

---

**Note**: This is a backend API system. The React frontend is minimal and intended for development/testing only. Production applications should integrate with the API endpoints directly.