import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [String],
    location: { type: String, required: true },
    whatsapp: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;

