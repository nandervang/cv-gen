// Jest setup file for API testing
// This file is run before all tests

// Set test environment variables
process.env.NODE_ENV = 'test'
process.env.CV_API_KEY = 'dev-api-key-12345'
process.env.PORT = '0' // Use random port for tests

// Increase test timeout for Puppeteer operations
jest.setTimeout(10000)

// Mock console in tests to reduce noise
global.console = {
  ...console,
  // Uncomment below to silence console.log in tests
  // log: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn()
}