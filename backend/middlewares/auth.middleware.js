import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
  let token;

  // Check Authorization header (Bearer token) OR cookies (for fallback)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract token from Bearer header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    // Fallback to cookie if exists
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // Exclude password

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    console.error('Error with authentication middleware:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Middleware to check admin privilege
export const adminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is admin, proceed
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

