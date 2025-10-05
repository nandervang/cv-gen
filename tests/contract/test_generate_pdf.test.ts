import request from 'supertest'
import { app } from '../../src/server/index.js'

const API_KEY = 'dev-api-key-12345'

describe('PDF Generation Contract', () => {
  describe('POST /api/generate (PDF)', () => {
    const validPayload = {
      name: 'John Doe',
      title: 'Senior Software Engineer',
      format: 'pdf'
    }

    it('should require API key authentication', async () => {
      const response = await request(app)
        .post('/api/generate')
        .send(validPayload)
        .expect(401)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'MISSING_API_KEY'
        }
      })
    })

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({ title: 'Engineer' }) // Missing name
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'MISSING_NAME',
          message: expect.stringContaining('Name')
        }
      })
    })

    it('should validate name field format', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          name: 'John123!@#', // Invalid characters
          title: 'Engineer'
        })
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'INVALID_NAME'
        }
      })
    })

    it('should validate title field requirement', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({ name: 'John Doe' }) // Missing title
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'MISSING_TITLE'
        }
      })
    })

    it('should validate template field', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          ...validPayload,
          template: 'invalid-template'
        })
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'INVALID_TEMPLATE'
        }
      })
    })

    it('should generate PDF with valid payload', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send(validPayload)
        .expect(200)

      expect(response.body).toMatchObject({
        success: true,
        data: {
          fileUrl: expect.stringMatching(/^data:application\/pdf;base64,/),
          format: 'pdf',
          template: expect.any(String),
          generatedAt: expect.any(String)
        }
      })

      expect(response.body.timestamp).toBeDefined()
      expect(new Date(response.body.data.generatedAt)).toBeInstanceOf(Date)
    })

    it('should use default template when not specified', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          name: 'Jane Doe',
          title: 'Designer'
        })
        .expect(200)

      expect(response.body.data.template).toBe('modern')
      expect(response.body.data.format).toBe('pdf') // Default format
    })

    it('should complete generation within 5 seconds', async () => {
      const start = Date.now()
      
      await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send(validPayload)
        .expect(200)
      
      const duration = Date.now() - start
      expect(duration).toBeLessThan(5000)
    }, 10000) // Extended timeout for PDF generation

    it('should return base64 encoded PDF data', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send(validPayload)
        .expect(200)

      const fileUrl = response.body.data.fileUrl
      expect(fileUrl).toMatch(/^data:application\/pdf;base64,/)
      
      // Base64 should be valid
      const base64Data = fileUrl.split(',')[1]
      expect(() => Buffer.from(base64Data, 'base64')).not.toThrow()
      
      // Should start with PDF header
      const pdfData = Buffer.from(base64Data, 'base64')
      expect(pdfData.toString('ascii', 0, 4)).toBe('%PDF')
    })
  })
})