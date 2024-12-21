import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  getUserPosts,
} from '../controllers/post.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'posts',
    format: async (req, file) => 'jpeg', // Set file format
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Public ID for the file
  },
});

const upload = multer({ storage });
const router = express.Router();

router.post('/', protectRoute, upload.array('images', 5), createPost);
router.get('/', getAllPosts);
router.get('/user', protectRoute, getUserPosts); // Correctly mapped user-specific posts
router.get('/:id', getPostById);
router.delete('/:id', protectRoute, deletePost);

export default router;

