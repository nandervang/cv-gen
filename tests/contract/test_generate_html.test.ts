import request from 'supertest'
import { app } from '../../src/server/index.js'

const API_KEY = 'dev-api-key-12345'

describe('HTML Generation Contract', () => {
  describe('POST /api/generate (HTML)', () => {
    const validPayload = {
      name: 'Alex Johnson',
      title: 'Frontend Developer',
      format: 'html',
      template: 'modern'
    }

    it('should generate HTML with valid payload', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send(validPayload)
        .expect(200)

      expect(response.body).toMatchObject({
        success: true,
        data: {
          fileUrl: expect.stringMatching(/^data:text\/html;base64,/),
          format: 'html',
          template: 'modern',
          generatedAt: expect.any(String)
        }
      })
    })

    it('should complete HTML generation within 1 second', async () => {
      const start = Date.now()
      
      await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send(validPayload)
        .expect(200)
      
      const duration = Date.now() - start
      expect(duration).toBeLessThan(1000)
    })

    it('should return valid HTML content', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send(validPayload)
        .expect(200)

      const fileUrl = response.body.data.fileUrl
      expect(fileUrl).toMatch(/^data:text\/html;base64,/)
      
      // Decode and validate HTML
      const base64Data = fileUrl.split(',')[1]
      const htmlContent = Buffer.from(base64Data, 'base64').toString('utf8')
      
      // Should be valid HTML structure
      expect(htmlContent).toMatch(/<!DOCTYPE html>/i)
      expect(htmlContent).toMatch(/<html[^>]*>/i)
      expect(htmlContent).toMatch(/<head>/i)
      expect(htmlContent).toMatch(/<body>/i)
      expect(htmlContent).toMatch(/<\/html>/i)
      
      // Should contain the user data
      expect(htmlContent).toContain('Alex Johnson')
      expect(htmlContent).toContain('Frontend Developer')
    })

    it('should include complete CV structure in HTML', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send(validPayload)
        .expect(200)

      const fileUrl = response.body.data.fileUrl
      const base64Data = fileUrl.split(',')[1]
      const htmlContent = Buffer.from(base64Data, 'base64').toString('utf8')
      
      // Should include typical CV sections
      expect(htmlContent).toMatch(/class="[^"]*(?:header|name|title)/i)
      expect(htmlContent).toMatch(/<style|<link[^>]+stylesheet/i) // CSS styling
      expect(htmlContent).toMatch(/viewport/i) // Mobile responsive
    })

    it('should work with all template types', async () => {
      const templates = ['modern', 'classic', 'creative']
      
      for (const template of templates) {
        const response = await request(app)
          .post('/api/generate')
          .set('X-API-Key', API_KEY)
          .send({
            name: 'Test User',
            title: 'Test Title',
            format: 'html',
            template
          })
          .expect(200)

        expect(response.body.data.template).toBe(template)
        expect(response.body.data.format).toBe('html')
        
        // Each template should have distinct styling
        const fileUrl = response.body.data.fileUrl
        const base64Data = fileUrl.split(',')[1]
        const htmlContent = Buffer.from(base64Data, 'base64').toString('utf8')
        expect(htmlContent).toContain('Test User')
      }
    })

    it('should properly escape HTML in user data', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          name: '<script>alert("XSS")</script>John & Jane',
          title: 'Developer & Designer <strong>Senior</strong>',
          format: 'html'
        })
        .expect(200)

      const fileUrl = response.body.data.fileUrl
      const base64Data = fileUrl.split(',')[1]
      const htmlContent = Buffer.from(base64Data, 'base64').toString('utf8')
      
      // Should not contain raw script tags
      expect(htmlContent).not.toContain('<script>alert("XSS")</script>')
      // Should contain escaped content
      expect(htmlContent).toMatch(/&lt;script&gt;|&amp;|&lt;strong&gt;/)
    })

    it('should generate mobile-responsive HTML', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send(validPayload)
        .expect(200)

      const fileUrl = response.body.data.fileUrl
      const base64Data = fileUrl.split(',')[1]
      const htmlContent = Buffer.from(base64Data, 'base64').toString('utf8')
      
      // Should include responsive meta tag
      expect(htmlContent).toMatch(/<meta[^>]+name="viewport"[^>]+content="width=device-width[^>]*>/i)
      
      // Should include responsive CSS patterns
      expect(htmlContent).toMatch(/@media[^{]+\{|max-width:|min-width:/i)
    })

    it('should include proper SEO meta tags', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send(validPayload)
        .expect(200)

      const fileUrl = response.body.data.fileUrl
      const base64Data = fileUrl.split(',')[1]
      const htmlContent = Buffer.from(base64Data, 'base64').toString('utf8')
      
      // Should include basic SEO elements
      expect(htmlContent).toMatch(/<title>[^<]*Alex Johnson[^<]*<\/title>/i)
      expect(htmlContent).toMatch(/<meta[^>]+charset/i)
      expect(htmlContent).toMatch(/<meta[^>]+description/i)
    })
  })
})