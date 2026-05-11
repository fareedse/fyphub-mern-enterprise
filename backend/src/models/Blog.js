import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: String,
  tags: [String],
  author: { type: String, default: 'FYP Hub Team' },
  featuredImage: String,
  excerpt: String,
  content: String,
  seoTitle: String,
  seoDescription: String,
  readTime: String,
  status: { type: String, enum: ['draft', 'published'], default: 'draft' }
}, { timestamps: true });
export const Blog = mongoose.model('Blog', schema);
