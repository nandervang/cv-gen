import request from 'supertest'
import { app } from '../../src/server/index.js'

const API_KEY = 'dev-api-key-12345'

describe('DOCX Generation Contract', () => {
  describe('POST /api/generate (DOCX)', () => {
    const validPayload = {
      name: 'Jane Smith',
      title: 'UX Designer',
      format: 'docx',
      template: 'creative'
    }

    it('should generate DOCX with valid payload', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send(validPayload)
        .expect(200)

      expect(response.body).toMatchObject({
        success: true,
        data: {
          fileUrl: expect.stringMatching(/^data:application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document;base64,/),
          format: 'docx',
          template: 'creative',
          generatedAt: expect.any(String)
        }
      })
    })

    it('should complete DOCX generation within 3 seconds', async () => {
      const start = Date.now()
      
      await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send(validPayload)
        .expect(200)
      
      const duration = Date.now() - start
      expect(duration).toBeLessThan(3000)
    }, 5000) // Extended timeout for DOCX generation

    it('should return valid DOCX base64 data', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send(validPayload)
        .expect(200)

      const fileUrl = response.body.data.fileUrl
      expect(fileUrl).toMatch(/^data:application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document;base64,/)
      
      // Base64 should be valid
      const base64Data = fileUrl.split(',')[1]
      expect(() => Buffer.from(base64Data, 'base64')).not.toThrow()
      
      // Should start with ZIP header (DOCX is a ZIP file)
      const docxData = Buffer.from(base64Data, 'base64')
      expect(docxData.toString('ascii', 0, 2)).toBe('PK') // ZIP file signature
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
            format: 'docx',
            template
          })
          .expect(200)

        expect(response.body.data.template).toBe(template)
        expect(response.body.data.format).toBe('docx')
      }
    })

    it('should handle special characters in name and title', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          name: "Mary O'Connor-Smith",
          title: "Senior Data Scientist & ML Engineer",
          format: 'docx'
        })
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.format).toBe('docx')
    })

    it('should reject invalid format combinations', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          name: 'John Doe',
          title: 'Engineer',
          format: 'invalid-format'
        })
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'INVALID_FORMAT'
        }
      })
    })
  })
})