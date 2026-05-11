import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title: String,
  instructorName: String,
  instructorTitle: String,
  duration: String,
  price: Number,
  benefits: [String],
  image: String,
  whatsappMessage: String,
  active: { type: Boolean, default: true }
}, { timestamps: true });
export const Course = mongoose.model('Course', schema);
