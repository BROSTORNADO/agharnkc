import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile } from '../controllers/user.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js'; // New middleware

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protectRoute, getUserProfile); // New route

export default router;

