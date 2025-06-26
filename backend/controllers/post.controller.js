import Post from '../models/post.model.js';
import User from '../models/user.model.js'; // Import User model
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Create a new post
 * @route POST /api/posts
 * @access Private
 */
export const createPost = async (req, res) => {
  try {
    const { title, description, location, whatsapp } = req.body;

    // Validate required fields
    if (!title || !description || !location || !whatsapp || !req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'All fields are required, including images' });
    }

    // Collect image URLs from Cloudinary (provided by multer-storage-cloudinary)
    const imageUrls = req.files.map((file) => file.path);

    // Create the post
    const post = await Post.create({
      title,
      description,
      location,
      whatsapp,
      images: imageUrls,
      user: req.user._id, // Associated user ID
    });

    // Add post ID to user's `posts` field
    const user = await User.findById(req.user._id);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    res.status(201).json(post);
  } catch (error) {
    console.error(`Error creating post: ${error.message}`);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Get all posts
 * @route GET /api/posts
 * @access Public
 */
export const getAllPosts = async (req, res) => {
  try {
    const { location } = req.query;
    const filter = location ? { location } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 }); // Sort by latest posts
    res.status(200).json(posts);
  } catch (error) {
    console.error(`Error fetching posts: ${error.message}`);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Get a single post by ID
 * @route GET /api/posts/:id
 * @access Public
 */
export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID format' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(`Error fetching post: ${error.message}`);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

/**
 * Delete a post
 * @route DELETE /api/posts/:id
 * @access Private
 */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete images from Cloudinary
    const deleteImages = post.images.map(async (imageUrl) => {
      try {
        // Extract the publicId from the image URL
        const parts = imageUrl.split('/');
        const fileName = parts[parts.length - 1].split('.')[0]; // e.g., abc123
        const publicId = `posts/${fileName}`;

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.warn(`Warning: Failed to delete image ${imageUrl}:`, err.message);
        // Continue deleting other images even if one fails
      }
    });

    await Promise.all(deleteImages);

    // Delete the post from the database
    await post.deleteOne();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(`Error deleting post: ${error.message}`);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
/**
 * Get posts by the connected user
 * @route GET /api/posts/user
 * @access Private
 */
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    // Validate user ID is an ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 }); // Latest posts first
    res.status(200).json(posts);
  } catch (error) {
    console.error(`Error fetching user posts: ${error.message}`);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

