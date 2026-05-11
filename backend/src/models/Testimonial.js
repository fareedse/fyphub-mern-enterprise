import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  program: String,
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  image: String,
  featured: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });
export const Testimonial = mongoose.model('Testimonial', schema);
