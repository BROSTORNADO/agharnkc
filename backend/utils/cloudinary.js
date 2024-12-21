import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'house-rental-app',
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error.message, { filePath });
    throw new Error('Image upload failed. Please try again.');
  }
};
/**
 * Delete an image from Cloudinary
 * @param {string} imageUrl - The URL of the image to delete
 */
export const deleteImage = async (imageUrl) => {
  try {
    const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0]; // Extract public ID
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  } catch (error) {
    console.error('Cloudinary deletion error:', error.message);
    throw new Error('Cloudinary deletion failed');
  }
};
