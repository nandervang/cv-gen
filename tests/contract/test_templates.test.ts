import request from 'supertest'
import { app } from '../../src/server/index.js'

const API_KEY = 'dev-api-key-12345'

describe('Templates Endpoint Contract', () => {
  describe('GET /api/templates', () => {
    it('should require API key authentication', async () => {
      const response = await request(app)
        .get('/api/templates')
        .expect(401)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'MISSING_API_KEY',
          message: 'API key is required'
        }
      })

      expect(response.body.timestamp).toBeDefined()
    })

    it('should reject invalid API key', async () => {
      const response = await request(app)
        .get('/api/templates')
        .set('X-API-Key', 'invalid-key')
        .expect(401)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'INVALID_API_KEY',
          message: 'Invalid API key'
        }
      })
    })

    it('should return template list with valid API key', async () => {
      const response = await request(app)
        .get('/api/templates')
        .set('X-API-Key', API_KEY)
        .expect(200)

      expect(response.body).toMatchObject({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            description: expect.any(String),
            previewUrl: expect.any(String)
          })
        ])
      })

      expect(response.body.timestamp).toBeDefined()
    })

    it('should return all required templates', async () => {
      const response = await request(app)
        .get('/api/templates')
        .set('X-API-Key', API_KEY)
        .expect(200)

      const templateIds = response.body.data.map((t: any) => t.id)
      expect(templateIds).toContain('modern')
      expect(templateIds).toContain('classic')
      expect(templateIds).toContain('creative')
    })

    it('should have consistent template structure', async () => {
      const response = await request(app)
        .get('/api/templates')
        .set('X-API-Key', API_KEY)
        .expect(200)

      response.body.data.forEach((template: any) => {
        expect(template).toHaveProperty('id')
        expect(template).toHaveProperty('name')
        expect(template).toHaveProperty('description')
        expect(template).toHaveProperty('previewUrl')
        
        expect(typeof template.id).toBe('string')
        expect(typeof template.name).toBe('string')
        expect(typeof template.description).toBe('string')
      })
    })

    it('should respond quickly (under 100ms)', async () => {
      const start = Date.now()
      
      await request(app)
        .get('/api/templates')
        .set('X-API-Key', API_KEY)
        .expect(200)
      
      const duration = Date.now() - start
      expect(duration).toBeLessThan(100)
    })
  })
})