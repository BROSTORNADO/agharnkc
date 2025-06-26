import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

/**
 * Register a new user
 * @route POST /api/users/register
 * @access Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(`Error during user registration: ${error.message}`);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Log in an existing user
 * @route POST /api/users/login
 * @access Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(`Error during user login: ${error.message}`);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Log out a user
 * @route POST /api/users/logout
 * @access Private
 */
export const logoutUser = (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(`Error during logout: ${error.message}`);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Get current user profile
 * @route GET /api/users/profile
 * @access Private
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(`Error fetching user profile: ${error.message}`);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

