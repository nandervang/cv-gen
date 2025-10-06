# Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the CV Generation system in production environments. The system consists of a Node.js/Express backend API and can be deployed with or without the React frontend testing interface.

## Deployment Options

### Option 1: Backend API Only (Recommended for Production)
- Deploy only the CV generation API server
- Integrate with existing applications via API calls
- Minimal resource requirements
- Better security isolation

### Option 2: Full Stack Deployment
- Deploy both API server and React testing interface
- Useful for development environments or standalone demos
- Requires additional frontend hosting

## Prerequisites

- Node.js 18+ and npm
- Production server (Linux/Ubuntu recommended)
- Domain name and SSL certificate
- Process manager (PM2 recommended)
- Reverse proxy (Nginx recommended)
- Optional: Supabase account for file storage

## Backend API Deployment

### 1. Server Preparation

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (using NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install UFW firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
```

### 2. Application Setup

```bash
# Create application directory
sudo mkdir -p /var/www/cv-generation-api
sudo chown $USER:$USER /var/www/cv-generation-api

# Clone repository
cd /var/www/cv-generation-api
git clone https://github.com/your-username/cv-gen.git .

# Install dependencies
npm ci --only=production

# Build the application
npm run build:api
```

### 3. Environment Configuration

Create production environment file:

```bash
# Create environment file
sudo nano /var/www/cv-generation-api/.env.production
```

Environment variables:
```bash
# Server Configuration
NODE_ENV=production
PORT=3001
HOST=0.0.0.0

# API Security
API_KEY=your-secure-production-api-key-here

# CORS Configuration
CORS_ORIGIN=https://your-consultant-dashboard.com,https://your-domain.com

# Rate Limiting (Production Settings)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_GENERATION_WINDOW_MS=300000
RATE_LIMIT_GENERATION_MAX_REQUESTS=10

# Optional: Supabase Integration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key

# File Storage
UPLOAD_DIR=/var/www/cv-generation-api/uploads
MAX_FILE_SIZE=10485760

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/cv-generation-api/app.log

# Security Headers
HELMET_ENABLED=true
TRUST_PROXY=true
```

### 4. PM2 Configuration

Create PM2 ecosystem file:

```bash
# Create PM2 configuration
nano /var/www/cv-generation-api/ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'cv-generation-api',
    script: 'dist/server/index.js',
    cwd: '/var/www/cv-generation-api',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3001
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/log/cv-generation-api/error.log',
    out_file: '/var/log/cv-generation-api/out.log',
    log_file: '/var/log/cv-generation-api/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024',
    watch: false,
    ignore_watch: ['node_modules', 'uploads', 'logs'],
    restart_delay: 5000,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
```

### 5. Create Log Directory

```bash
# Create log directory
sudo mkdir -p /var/log/cv-generation-api
sudo chown $USER:$USER /var/log/cv-generation-api

# Create log rotation
sudo nano /etc/logrotate.d/cv-generation-api
```

Log rotation configuration:
```
/var/log/cv-generation-api/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reload cv-generation-api
    endscript
}
```

### 6. Start Application

```bash
# Start with PM2
cd /var/www/cv-generation-api
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
# Follow the instructions provided by the command above
```

### 7. Nginx Configuration

Create Nginx configuration:

```bash
# Create Nginx site configuration
sudo nano /etc/nginx/sites-available/cv-generation-api
```

```nginx
server {
    listen 80;
    server_name api.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.your-domain.com;

    # SSL Configuration
    ssl_certificate /path/to/your/fullchain.pem;
    ssl_certificate_key /path/to/your/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=generation:10m rate=2r/s;

    # Main API
    location / {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;
    }

    # Generation endpoints with stricter limits
    location ~ ^/api/(generate|batch) {
        limit_req zone=generation burst=5 nodelay;
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
        proxy_connect_timeout 10s;
        client_max_body_size 5M;
    }

    # Health check (allow monitoring)
    location /health {
        proxy_pass http://127.0.0.1:3001;
        access_log off;
    }

    # Block access to sensitive files
    location ~ /\. {
        deny all;
    }
}
```

Enable the site:
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/cv-generation-api /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 8. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d api.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 9. Firewall Configuration

```bash
# Configure UFW
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw deny 3001  # Block direct access to Node.js port
sudo ufw status verbose
```

## Production Environment Variables

Update your production configuration:

```bash
# /var/www/cv-generation-api/.env.production

NODE_ENV=production
PORT=3001
HOST=127.0.0.1

# Security
API_KEY=prod-api-key-$(openssl rand -hex 32)
CORS_ORIGIN=https://your-consultant-dashboard.com

# Rate Limiting (Production)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_GENERATION_WINDOW_MS=300000
RATE_LIMIT_GENERATION_MAX_REQUESTS=10

# Logging
LOG_LEVEL=warn
LOG_FILE=/var/log/cv-generation-api/app.log

# Performance
MAX_CONCURRENT_GENERATIONS=5
GENERATION_TIMEOUT=30000

# File Storage
CLEANUP_INTERVAL=3600000
FILE_RETENTION_HOURS=24
```

## Monitoring and Maintenance

### 1. Health Monitoring

Create monitoring script:

```bash
# Create monitoring script
nano /var/www/cv-generation-api/scripts/health-check.sh
```

```bash
#!/bin/bash

API_URL="https://api.your-domain.com/health"
EXPECTED_STATUS="healthy"

# Check API health
RESPONSE=$(curl -s "$API_URL" | jq -r '.status.server // empty')

if [ "$RESPONSE" = "$EXPECTED_STATUS" ]; then
    echo "API is healthy"
    exit 0
else
    echo "API health check failed: $RESPONSE"
    # Optional: restart service
    # pm2 restart cv-generation-api
    exit 1
fi
```

Set up cron job for monitoring:
```bash
# Add to crontab
crontab -e

# Check every 5 minutes
*/5 * * * * /var/www/cv-generation-api/scripts/health-check.sh >> /var/log/cv-generation-api/health.log 2>&1
```

### 2. Log Monitoring

Install and configure log monitoring:

```bash
# Install log analysis tools
sudo apt install goaccess -y

# Create log analysis script
nano /var/www/cv-generation-api/scripts/analyze-logs.sh
```

```bash
#!/bin/bash

LOG_FILE="/var/log/cv-generation-api/combined.log"
REPORT_FILE="/var/www/cv-generation-api/reports/access-report.html"

# Generate access report
goaccess "$LOG_FILE" -o "$REPORT_FILE" --log-format=COMBINED
```

### 3. Performance Monitoring

Monitor with PM2:

```bash
# View real-time monitoring
pm2 monit

# View logs
pm2 logs cv-generation-api

# View metrics
pm2 show cv-generation-api

# Restart if needed
pm2 restart cv-generation-api

# Reload (zero downtime)
pm2 reload cv-generation-api
```

## Security Considerations

### 1. API Key Management

```bash
# Generate secure API keys
openssl rand -hex 32

# Store in environment variables only
# Never commit to version control
```

### 2. Update Production Rate Limits

Update server configuration for production:

```javascript
// In server configuration
const productionLimits = {
  general: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // requests per window
  },
  generation: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10 // requests per window
  }
};
```

### 3. CORS Configuration

```javascript
// Production CORS settings
const corsOptions = {
  origin: [
    'https://your-consultant-dashboard.com',
    'https://your-domain.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
```

## Backup and Recovery

### 1. Automated Backups

```bash
# Create backup script
nano /var/www/cv-generation-api/scripts/backup.sh
```

```bash
#!/bin/bash

BACKUP_DIR="/var/backups/cv-generation-api"
APP_DIR="/var/www/cv-generation-api"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup application
tar -czf "$BACKUP_DIR/app_$DATE.tar.gz" \
    --exclude=node_modules \
    --exclude=uploads \
    --exclude=logs \
    "$APP_DIR"

# Keep only last 7 days of backups
find "$BACKUP_DIR" -name "app_*.tar.gz" -mtime +7 -delete

echo "Backup completed: app_$DATE.tar.gz"
```

Schedule backups:
```bash
# Add to crontab
0 2 * * * /var/www/cv-generation-api/scripts/backup.sh
```

### 2. Disaster Recovery

```bash
# Restore from backup
cd /var/www
sudo tar -xzf /var/backups/cv-generation-api/app_YYYYMMDD_HHMMSS.tar.gz

# Reinstall dependencies
cd cv-generation-api
npm ci --only=production

# Rebuild application
npm run build:api

# Restart services
pm2 restart cv-generation-api
```

## Troubleshooting

### Common Issues

1. **Service won't start**
   ```bash
   # Check logs
   pm2 logs cv-generation-api
   
   # Check port availability
   sudo netstat -tulpn | grep :3001
   ```

2. **High memory usage**
   ```bash
   # Monitor memory
   pm2 monit
   
   # Restart if needed
   pm2 restart cv-generation-api
   ```

3. **PDF generation fails**
   ```bash
   # Install Puppeteer dependencies
   sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
   ```

### Performance Optimization

1. **Enable compression**
   ```nginx
   # Add to Nginx configuration
   gzip on;
   gzip_types text/plain application/json application/javascript text/css;
   ```

2. **Cache static assets**
   ```nginx
   # Add to Nginx configuration
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **Monitor resource usage**
   ```bash
   # System monitoring
   htop
   iostat
   free -h
   df -h
   ```

This deployment guide provides a production-ready setup for the CV Generation API with proper security, monitoring, and maintenance procedures.