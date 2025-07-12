import express from 'express'
import {
    addClubHandler,
    createClubHandler,
    createUserHandler, inviteClubHandler,
    signUserHandler
} from "./handlers/onboarding/OnboardingHandlers.js";


const app = express()
const PORT = 4000


// Onboarding endpoints
app.post('/api/auth', createUserHandler)
app.post('/api/auth/login', signUserHandler)
app.post('/api/clubs', createClubHandler)
app.post('/api/clubs/user', addClubHandler)
app.post('/api/clubs/invite', inviteClubHandler)

// Start the server
app.listen(PORT, () => {
    console.log(`Mock API Server running at http://localhost:${PORT}`)
})