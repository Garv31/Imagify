
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import paymentRouter from "./routes/paymentRoute.js";

const PORT = process.env.PORT || 4000

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Connect MongoDB
await connectDB()

// API Routes
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.use('/api/payment', paymentRouter)

// Test Route
app.get('/', (req, res) => {
    res.send('API Working fine')
})

// Start Server
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})
