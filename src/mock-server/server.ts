import express from 'express'
import { userHandler } from './handlers/user'
import { resolveStubToken } from './middleware/token'

const app = express()
const PORT = 4000

// Define a shared whitelist of allowed tokens
const allowedTokens = ['admin', 'guest', 'premium']

// Apply token middleware globally
app.use(resolveStubToken(allowedTokens))

// Register your endpoint handlers
app.get('/api/user', userHandler)

// Start the server
app.listen(PORT, () => {
    console.log(`🟢 Mock API Server running at http://localhost:${PORT}`)
})