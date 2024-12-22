import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDatabase from './config/database.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to Database
connectDatabase();

// Middleware
app.use(express.json({ limit: '5mb' })); // Parse JSON requests with a size limit
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(cookieParser());

// CORS Handling Middleware
app.use((req, res, next) => {
  const allowedOrigins = req.headers.origin || '*'; // Allow dynamic origins
  res.header('Access-Control-Allow-Origin', allowedOrigins);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow cookies
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Serve Static Files in Production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
