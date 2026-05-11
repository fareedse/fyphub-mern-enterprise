import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  university: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  projectTitle: String,
  projectType: String,
  budget: String,
  deadline: String,
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'in-progress', 'completed', 'cancelled'], default: 'new' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  adminNotes: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
export const Inquiry = mongoose.model('Inquiry', schema);
