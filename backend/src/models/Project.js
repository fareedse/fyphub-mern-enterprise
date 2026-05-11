import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: Number,
  shortDescription: { type: String, required: true },
  fullDescription: String,
  problemStatement: String,
  objectives: [String],
  scope: String,
  features: [String],
  modules: [String],
  technologies: [String],
  tags: [String],
  includedItems: [String],
  mainImage: String,
  gallery: [String],
  videoUrl: String,
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  views: { type: Number, default: 0 }
}, { timestamps: true });
export const Project = mongoose.model('Project', schema);
