import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    try {
      token = req.cookies.token;

      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password'); // Populate user details

      next();
    } catch (error) {
      console.error('Error with authentication middleware:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
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

