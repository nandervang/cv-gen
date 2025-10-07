# CV Generation System

A production-ready CV generation system built with Netlify Functions (serverless) backend and React frontend. Generate professional CVs in multiple formats (HTML, PDF, DOCX) using Puppeteer for high-quality PDF generation, with customizable templates and comprehensive batch testing capabilities.

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/your-username/cv-gen.git
cd cv-gen
npm install

# Start development server
npm run dev

# For local API testing (Express fallback)
npm run dev:full

# Test at http://localhost:5173 (frontend) and http://localhost:3001 (API)
```

## 🎯 Features

### Templates & Formats

- **4 Professional Templates**: Frank Digital, Modern, Classic, Creative
- **3 Output Formats**: HTML, PDF, DOCX
- **Template Customization**: 12 color schemes, 6 fonts, spacing options
- **Preview System**: Generate template previews with sample data

### Serverless Architecture

- **Netlify Functions**: Serverless API with automatic scaling
- **Puppeteer PDF Generation**: High-quality PDF creation using headless Chrome
- **Stateless Design**: No database dependencies for generation
- **Rate Limiting**: Built-in Netlify Function execution limits
- **Comprehensive Error Handling**: Structured error responses
- **Type Safety**: Full TypeScript implementation

### Testing & Development

- **React Testing Interface**: Visual template gallery and generation testing
- **Batch Testing**: Test all 12 template/format combinations simultaneously
- **Real-time Results**: Download links and status indicators
- **Contract Tests**: Comprehensive API endpoint testing

## 🏗️ Architecture

### Serverless Backend (Netlify Functions)

- **API Endpoints**: Templates, generation, customization, batch, preview
- **Document Generation**: Puppeteer for PDF, custom engine for HTML/DOCX
- **Security**: Rate limiting, CORS, input validation
- **Performance**: Optimized for serverless with @sparticuz/chromium

### Frontend (React + Vite - Port 5173)

- **Testing Interface**: Comprehensive UI for API validation
- **Component Library**: shadcn/ui with Tailwind CSS
- **Template Gallery**: Visual template selection and customization
- **Batch Testing**: Multi-format and multi-template testing

## 🛠️ Development

### Scripts

```bash
npm run dev              # Start frontend (Vite dev server)
npm run dev:api          # Start Express API fallback (port 3001)
npm run dev:full         # Start both frontend and API
npm run build            # Build for production (includes Netlify Functions)
npm run build:functions  # Build Netlify Functions only
npm run test             # Run all tests
npm run test:contract    # Run API contract tests
npm run lint             # Lint code
```

### API Usage Example

```javascript
// Generate CV with Netlify Functions (production)
const response = await fetch('/.netlify/functions/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
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
console.log('Generated CV:', result.fileUrl);
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
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Production (Netlify)
NODE_ENV=production
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```

### Netlify Configuration

The system is optimized for Netlify deployment with:

- **Functions**: `netlify/functions/` directory for serverless functions
- **Build**: Optimized bundling with esbuild for Puppeteer
- **Chromium**: Uses `@sparticuz/chromium` for serverless PDF generation
- **Redirects**: API routes redirect to Netlify Functions

## 🧪 Testing

### Available Tests

```bash
npm run test:contract     # API contract tests
npm run test:integration  # Integration tests
npm run test:watch       # Watch mode
```

### Manual Testing

1. **Frontend**: Visit http://localhost:5173 for interactive testing
2. **Batch Testing**: Use frontend's batch tester for comprehensive validation
3. **API Functions**: Test individual endpoints through the UI

## 🚀 Deployment

### Netlify Deployment

The system is designed for seamless Netlify deployment:

```bash
# 1. Build the project
npm run build

# 2. Deploy to Netlify (automatically handles functions)
# Connect your GitHub repo to Netlify for automatic deployments
```

### Production Checklist

- [ ] Connect GitHub repository to Netlify
- [ ] Set environment variables in Netlify dashboard
- [ ] Configure custom domain (optional)
- [ ] Test all Netlify Functions endpoints
- [ ] Verify PDF generation works in production
- [ ] Monitor function execution times and memory usage

## 📊 Performance

### Expected Performance

- **CV Generation**: 5-15 seconds per PDF (includes Chromium initialization)
- **Batch Operations**: 30-90 seconds for all formats (serverless limitations)
- **Frontend Response**: <100ms for non-generation endpoints
- **Function Cold Start**: 2-5 seconds (Puppeteer initialization)

### Serverless Optimizations

- **@sparticuz/chromium**: Optimized Chromium for serverless environments
- **Efficient bundling**: esbuild configuration for Netlify Functions
- **Memory management**: Automatic cleanup after PDF generation
- **Template caching**: Optimized HTML generation with minimal DOM manipulation

## 🔒 Security

### Security Features

- **Serverless isolation**: Each function execution is isolated
- **Input validation**: Comprehensive request validation
- **CORS protection**: Configurable cross-origin policies
- **Rate limiting**: Built-in Netlify Function limits
- **Secure headers**: Security headers for all responses

### Best Practices

- **Environment variables**: Store sensitive data in Netlify environment variables
- **HTTPS enforcement**: Automatic HTTPS with Netlify
- **Input sanitization**: All user inputs are validated and sanitized
- **Function timeouts**: Prevent long-running executions
- **Error handling**: Secure error messages without sensitive information

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

- **Slow PDF generation**: Cold starts in serverless environments are normal
- **Memory errors**: Netlify Functions have memory limits, batch operations may timeout
- **Build failures**: Ensure Puppeteer dependencies are correctly bundled

### Getting Help

1. Check the [API Specification](docs/api-specification.md)
2. Review batch testing results for debugging
3. Monitor Netlify Function logs for errors
4. Open an issue for bugs or feature requests

---

**Ready to generate professional CVs?** Deploy to Netlify and start generating high-quality PDFs in minutes!