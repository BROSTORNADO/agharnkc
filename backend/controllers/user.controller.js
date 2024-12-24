import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

/**
 * Register a new user
 * @route POST /api/users/register
 * @access Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create a new user
    const user = await User.create({ name, email, password })

    // Generate JWT token
    const token = generateToken(user._id)

    // Set the token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })

    // Respond with user data and token
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    })
  } catch (error) {
    console.error(`Error during user registration: ${error.message}`)
    res.status(500).json({ message: 'Server error. Please try again later.' })
  }
}

/**
 * Log in an existing user
 * @route POST /api/users/login
 * @access Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find the user by email
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      // Generate JWT token
      const token = generateToken(user._id)

      // Set the token in a cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      // Respond with user data
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    console.error(`Error during user login: ${error.message}`)
    res.status(500).json({ message: 'Server error. Please try again later.' })
  }
}

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
    })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error(`Error during logout: ${error.message}`)
    res.status(500).json({ message: 'Server error. Please try again later.' })
  }
}
