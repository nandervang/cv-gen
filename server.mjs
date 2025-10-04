#!/usr/bin/env node

import { startAPIServer } from './src/server/index.js'

// Start the API server on port 3001
console.log('🚀 Starting CV Generation Backend API...')

startAPIServer()
  .then(() => {
    console.log('✅ API Server started successfully')
    console.log('📋 Available endpoints:')
    console.log('   GET  /health                    - Health check')
    console.log('   GET  /api/cvs                   - List CVs')
    console.log('   POST /api/cvs                   - Create CV')
    console.log('   GET  /api/templates             - List templates')
    console.log('   POST /api/generate              - Generate CV file')
    console.log('   POST /api/generate/preview      - Generate preview')
    console.log('')
    console.log('🌐 Frontend will proxy API requests from http://localhost:5173')
    console.log('💡 Run "npm run dev" in another terminal to start the frontend')
  })
  .catch((error) => {
    console.error('❌ Failed to start API server:', error)
    process.exit(1)
  })

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 Received SIGTERM, shutting down gracefully...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('🔄 Received SIGINT, shutting down gracefully...')
  process.exit(0)
})