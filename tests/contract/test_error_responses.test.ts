import request from 'supertest'
import { app } from '../../src/server/index.js'

const API_KEY = 'dev-api-key-12345'

describe('Error Response Contracts', () => {
  describe('Authentication Errors', () => {
    it('should return 401 for missing API key', async () => {
      const response = await request(app)
        .post('/api/generate')
        .send({
          name: 'John Doe',
          title: 'Engineer'
        })
        .expect(401)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'MISSING_API_KEY',
          message: 'API key is required'
        }
      })
    })

    it('should return 401 for invalid API key', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', 'invalid-key')
        .send({
          name: 'John Doe',
          title: 'Engineer'
        })
        .expect(401)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'INVALID_API_KEY',
          message: 'Invalid API key'
        }
      })
    })

    it('should return 401 for empty API key', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', '')
        .send({
          name: 'John Doe',
          title: 'Engineer'
        })
        .expect(401)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'MISSING_API_KEY',
          message: 'API key is required'
        }
      })
    })
  })

  describe('Validation Errors', () => {
    it('should return 400 for missing name field', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          title: 'Engineer'
        })
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: expect.stringContaining('name'),
          details: expect.arrayContaining([
            expect.objectContaining({
              field: 'name',
              message: expect.any(String)
            })
          ])
        }
      })
    })

    it('should return 400 for missing title field', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          name: 'John Doe'
        })
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: expect.stringContaining('title'),
          details: expect.arrayContaining([
            expect.objectContaining({
              field: 'title',
              message: expect.any(String)
            })
          ])
        }
      })
    })

    it('should return 400 for empty name field', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          name: '',
          title: 'Engineer'
        })
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          details: expect.arrayContaining([
            expect.objectContaining({
              field: 'name'
            })
          ])
        }
      })
    })

    it('should return 400 for empty title field', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          name: 'John Doe',
          title: ''
        })
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          details: expect.arrayContaining([
            expect.objectContaining({
              field: 'title'
            })
          ])
        }
      })
    })

    it('should return 400 for invalid format', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          name: 'John Doe',
          title: 'Engineer',
          format: 'invalid'
        })
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          details: expect.arrayContaining([
            expect.objectContaining({
              field: 'format'
            })
          ])
        }
      })
    })

    it('should return 400 for invalid template', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          name: 'John Doe',
          title: 'Engineer',
          template: 'invalid'
        })
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          details: expect.arrayContaining([
            expect.objectContaining({
              field: 'template'
            })
          ])
        }
      })
    })

    it('should return multiple validation errors', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          name: '',
          title: '',
          format: 'invalid',
          template: 'invalid'
        })
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          details: expect.arrayContaining([
            expect.objectContaining({ field: 'name' }),
            expect.objectContaining({ field: 'title' }),
            expect.objectContaining({ field: 'format' }),
            expect.objectContaining({ field: 'template' })
          ])
        }
      })

      expect(response.body.error.details).toHaveLength(4)
    })
  })

  describe('Content Type Errors', () => {
    it('should return 400 for non-JSON content', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .set('Content-Type', 'text/plain')
        .send('invalid content')
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: expect.stringMatching(/INVALID_JSON|PARSE_ERROR/)
        }
      })
    })

    it('should return 400 for malformed JSON', async () => {
      const response = await request(app)
        .post('/api/generate')
        .set('X-API-Key', API_KEY)
        .set('Content-Type', 'application/json')
        .send('{"name": "John", invalid}')
        .expect(400)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: expect.stringMatching(/INVALID_JSON|PARSE_ERROR/)
        }
      })
    })
  })

  describe('Rate Limiting Errors', () => {
    it('should return 429 when generation rate limit exceeded', async () => {
      // Make 11 requests quickly (rate limit is 10 for generation)
      const requests = Array.from({ length: 11 }, () =>
        request(app)
          .post('/api/generate')
          .set('X-API-Key', API_KEY)
          .send({
            name: 'John Doe',
            title: 'Engineer'
          })
      )

      const responses = await Promise.allSettled(requests)
      
      // At least one should be rate limited
      const rateLimited = responses.some(result => 
        result.status === 'fulfilled' && result.value.status === 429
      )
      
      expect(rateLimited).toBe(true)
    }, 10000) // Extended timeout for rate limiting test
  })

  describe('Method Not Allowed', () => {
    it('should return 405 for GET on generation endpoint', async () => {
      const response = await request(app)
        .get('/api/generate')
        .set('X-API-Key', API_KEY)
        .expect(405)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'METHOD_NOT_ALLOWED',
          message: expect.stringContaining('POST')
        }
      })
    })

    it('should return 405 for PUT on generation endpoint', async () => {
      const response = await request(app)
        .put('/api/generate')
        .set('X-API-Key', API_KEY)
        .send({
          name: 'John Doe',
          title: 'Engineer'
        })
        .expect(405)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'METHOD_NOT_ALLOWED'
        }
      })
    })
  })

  describe('404 Not Found', () => {
    it('should return 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .set('X-API-Key', API_KEY)
        .expect(404)

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: expect.stringContaining('endpoint')
        }
      })
    })
  })

  describe('Error Response Format Consistency', () => {
    it('should maintain consistent error format across all endpoints', async () => {
      const errorResponses = [
        // Missing API key
        await request(app).post('/api/generate').send({}),
        // Invalid validation
        await request(app).post('/api/generate').set('X-API-Key', API_KEY).send({}),
        // Not found
        await request(app).get('/api/invalid').set('X-API-Key', API_KEY)
      ]

      errorResponses.forEach(response => {
        expect(response.body).toHaveProperty('success', false)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('code')
        expect(response.body.error).toHaveProperty('message')
        expect(typeof response.body.error.code).toBe('string')
        expect(typeof response.body.error.message).toBe('string')
      })
    })
  })
})