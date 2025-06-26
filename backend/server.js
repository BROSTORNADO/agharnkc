import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDatabase from './config/database.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Connect to MongoDB
connectDatabase()

// Middleware
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// 🔐 CORS: Allow frontend from Render + local dev
const allowedOrigins = [
  'https://agharnkc.onrender.com',
  'http://localhost:5173',
  'https://your-frontend-url.onrender.com' // Replace if your frontend is separate
]

app.use((req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  next()
})

// Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

// 📦 Serve Frontend (React/Vite Build)
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, './frontend/dist')
  app.use(express.static(frontendPath))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'))
  })
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})
