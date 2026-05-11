import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, enum: ['project', 'blog'], default: 'project' },
  description: String,
  icon: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });
export const Category = mongoose.model('Category', schema);
