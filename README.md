# CV Generation System

A production-ready CV generation system built with Node.js/Express backend and React frontend. Generate professional CVs in multiple formats (HTML, PDF, DOCX) with customizable templates and comprehensive batch testing capabilities.

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/your-username/cv-gen.git
cd cv-gen
npm install

# Start both servers
npm run dev:full

# Test at http://localhost:5173 (frontend) and http://localhost:3001 (API)
```

## 🎯 Features

### Templates & Formats
- **4 Professional Templates**: Frank Digital, Modern, Classic, Creative
- **3 Output Formats**: HTML, PDF, DOCX
- **Template Customization**: 12 color schemes, 6 fonts, spacing options
- **Preview System**: Generate template previews with sample data

### API Capabilities
- **Stateless Design**: No database dependencies for generation
- **Batch Processing**: Generate multiple formats/templates simultaneously  
- **Rate Limiting**: Production-ready with development-optimized limits
- **Comprehensive Error Handling**: Structured error responses
- **Type Safety**: Full TypeScript implementation

### Testing & Development
- **React Testing Interface**: Visual template gallery and generation testing
- **Batch Testing**: Test all 12 template/format combinations
- **Real-time Results**: Download links and status indicators
- **Contract Tests**: Comprehensive API endpoint testing

## � Documentation

### Getting Started
- **[Quick Setup Guide](docs/quick-setup.md)** - Get running in 5 minutes
- **[Complete Documentation](docs/README.md)** - Full system documentation
- **[API Specification](docs/api-specification.md)** - Detailed API reference

### Integration & Deployment  
- **[Consultant Dashboard Integration](docs/consultant-dashboard-integration.md)** - Step-by-step integration guide
- **[Deployment Guide](docs/deployment-guide.md)** - Production deployment instructions

## 🏗️ Architecture

### Backend (Express + TypeScript - Port 3001)
- **API Endpoints**: Templates, generation, customization, batch, preview
- **Document Generation**: Puppeteer for PDF, custom engine for HTML/DOCX
- **Security**: API key authentication, CORS, rate limiting, Helmet
- **Performance**: Clustering, memory optimization, efficient processing

### Frontend (React + Vite - Port 5173)
- **Testing Interface**: Comprehensive UI for API validation
- **Component Library**: shadcn/ui with Tailwind CSS
- **Template Gallery**: Visual template selection and customization
- **Batch Testing**: Multi-format and multi-template testing

## 🛠️ Development

### Scripts
```bash
npm run dev:full      # Start both API and frontend
npm run dev:api       # API server only (port 3001)
npm run dev          # Frontend only (port 5173)
npm run build        # Build both projects
npm run test         # Run all tests
npm run lint         # Lint code
```

### API Usage Example
```javascript
// Generate CV
const response = await fetch('http://localhost:3001/api/generate/complete', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'dev-api-key-12345'
  },
  body: JSON.stringify({
    personalInfo: {
      name: 'John Doe',
      title: 'Senior Developer', 
      email: 'john@example.com'
    },
    summary: {
      introduction: 'Experienced full-stack developer...'
    },
    template: 'frank-digital',
    format: 'pdf'
  })
});

const result = await response.json();
console.log('Generated CV:', result.data.fileUrl);
```

## 🎨 Available Templates

### Frank Digital
- **Type**: Corporate/Professional
- **Best For**: Digital agencies, tech companies
- **Features**: Clean layout, skills matrix, project showcase

### Modern Professional  
- **Type**: Modern/Minimalist
- **Best For**: Tech professionals, startups
- **Features**: Modern typography, clean sections, tech focus

### Classic Executive
- **Type**: Traditional/Executive  
- **Best For**: Senior positions, traditional industries
- **Features**: Professional layout, executive summary, formal style

### Creative Portfolio
- **Type**: Creative/Design
- **Best For**: Designers, creative professionals
- **Features**: Visual elements, portfolio sections, creative layout

## 🔧 Configuration

### Environment Variables
```bash
# Development
NODE_ENV=development
PORT=3001
API_KEY=dev-api-key-12345

# Production (see deployment guide)
NODE_ENV=production
API_KEY=your-secure-production-key
CORS_ORIGIN=https://your-consultant-dashboard.com
```

### Rate Limiting
- **Development**: 1000 requests/15min (general), 50 requests/1min (generation)
- **Production**: 100 requests/15min (general), 10 requests/5min (generation)

## 🧪 Testing

### Available Tests
```bash
npm run test:contract     # API contract tests
npm run test:integration  # Integration tests
npm run test:watch       # Watch mode
```

### Manual Testing
1. **Frontend**: Visit http://localhost:5173 for interactive testing
2. **API**: Use curl or Postman with provided examples
3. **Batch Testing**: Use frontend's batch tester for comprehensive validation

## 🚀 Deployment

### Production Checklist
- [ ] Update API keys and environment variables
- [ ] Configure CORS for production domains
- [ ] Set production rate limits
- [ ] Set up reverse proxy (Nginx recommended)
- [ ] Configure SSL certificates
- [ ] Set up monitoring and logging
- [ ] Test all endpoints in production environment

See the [Deployment Guide](docs/deployment-guide.md) for detailed instructions.

## 📊 Performance

### Expected Performance
- **CV Generation**: 3-8 seconds per document
- **Batch Operations**: 20-60 seconds for all formats
- **API Response Time**: <100ms for non-generation endpoints
- **Memory Usage**: <1GB per Node.js instance

### Optimization
- Puppeteer browser pooling for PDF generation
- Efficient template rendering with minimal DOM manipulation
- Memory cleanup after each generation
- Clustering support for production scaling

## � Security

### Security Features
- API key authentication
- CORS protection
- Rate limiting
- Security headers (Helmet)
- Input validation and sanitization
- Secure file storage with signed URLs

### Best Practices
- Store API keys securely
- Use HTTPS in production
- Validate all user inputs
- Monitor for unusual usage patterns
- Implement proper error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues
- **Port conflicts**: Use `pkill -f "tsx"` and `pkill -f "vite"` to clean up
- **Puppeteer issues**: Install Chrome dependencies (see quick setup guide)
- **Memory issues**: Monitor with `npm run dev:api` and restart if needed

### Getting Help
1. Check the [Quick Setup Guide](docs/quick-setup.md)
2. Review [API Specification](docs/api-specification.md)
3. See [Integration Guide](docs/consultant-dashboard-integration.md)
4. Open an issue for bugs or feature requests

---

**Ready to generate professional CVs?** Start with the [Quick Setup Guide](docs/quick-setup.md) and have the system running in 5 minutes!
