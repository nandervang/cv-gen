import request from 'supertest'
import { app } from '../../src/server/index.js'

describe('Health Endpoint Contract', () => {
  describe('GET /health', () => {
    it('should return health status without authentication', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)

      expect(response.body).toMatchObject({
        success: true,
        message: 'CV Generation API is running',
        version: '1.0.0',
        status: {
          server: 'healthy',
          puppeteer: 'ready',
          templates: 'loaded'
        }
      })

      expect(response.body.timestamp).toBeDefined()
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date)
    })

    it('should have correct response headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)

      expect(response.headers['content-type']).toMatch(/application\/json/)
    })

    it('should respond quickly (under 100ms)', async () => {
      const start = Date.now()
      
      await request(app)
        .get('/health')
        .expect(200)
      
      const duration = Date.now() - start
      expect(duration).toBeLessThan(100)
    })
  })
})