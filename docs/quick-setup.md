# Quick Setup Guide

## Getting Started in 5 Minutes

This guide gets you up and running with the CV Generation system locally for development and testing.

### Prerequisites

- Node.js 18+ and npm
- Git

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-username/cv-gen.git
cd cv-gen

# Install dependencies
npm install
```

### 2. Start Development Servers

```bash
# Start both API server (port 3001) and frontend (port 5173)
npm run dev:full
```

**Or start individually:**

```bash
# Terminal 1: Start API server
npm run dev:api

# Terminal 2: Start frontend
npm run dev
```

### 3. Test the System

**Option A: Use the Web Interface**
1. Open http://localhost:5173
2. Select a template (Frank Digital, Modern, Classic, or Creative)
3. Click "Generate CV" to test PDF generation
4. Try "Test All Templates & Formats" for comprehensive testing

**Option B: Test with curl**
```bash
# Health check
curl http://localhost:3001/health

# Generate a CV
curl -X POST http://localhost:3001/api/generate/complete \
  -H "Content-Type: application/json" \
  -H "X-API-Key: dev-api-key-12345" \
  -d '{
    "personalInfo": {
      "name": "John Doe",
      "title": "Developer",
      "email": "john@example.com"
    },
    "summary": {
      "introduction": "Experienced developer"
    },
    "template": "frank-digital",
    "format": "pdf"
  }'
```

### 4. Available Endpoints

- **Health**: `GET http://localhost:3001/health`
- **Templates**: `GET http://localhost:3001/api/templates`
- **Generate CV**: `POST http://localhost:3001/api/generate/complete`
- **Batch Generation**: `POST http://localhost:3001/api/batch/formats`
- **All Templates**: `POST http://localhost:3001/api/batch/comprehensive`

### 5. Templates Available

- **frank-digital**: Professional corporate style
- **modern**: Clean modern design for tech professionals  
- **classic**: Traditional executive format
- **creative**: Creative design for designers

### 6. Output Formats

- **PDF**: Portable document format (most common)
- **HTML**: Web-viewable format
- **DOCX**: Microsoft Word document

## API Key

Development API key: `dev-api-key-12345`

Include in all requests:
```
X-API-Key: dev-api-key-12345
```

## Troubleshooting

**Port already in use?**
```bash
# Kill existing processes
pkill -f "tsx"
pkill -f "vite"

# Then restart
npm run dev:full
```

**Puppeteer issues on Linux?**
```bash
# Install Chrome dependencies
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

## Next Steps

1. **For Production**: See [Deployment Guide](deployment-guide.md)
2. **For Integration**: See [Consultant Dashboard Integration Guide](consultant-dashboard-integration.md)
3. **API Details**: See [API Specification](api-specification.md)
4. **Full Documentation**: See [Complete README](README.md)

## Example Integration

```javascript
// Simple integration example
const cvAPI = {
  baseUrl: 'http://localhost:3001',
  apiKey: 'dev-api-key-12345',
  
  async generateCV(data, template = 'frank-digital', format = 'pdf') {
    const response = await fetch(`${this.baseUrl}/api/generate/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify({ ...data, template, format })
    });
    
    return response.json();
  }
};

// Usage
const result = await cvAPI.generateCV({
  personalInfo: { name: 'John Doe', title: 'Developer', email: 'john@example.com' },
  summary: { introduction: 'Experienced developer' }
});

console.log('CV generated:', result.data.fileUrl);
```

That's it! You now have a fully functional CV generation system running locally.