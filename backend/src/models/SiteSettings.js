import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  siteName: { type: String, default: 'FYP Hub' },
  logo: String,
  email: String,
  phone: String,
  whatsapp: String,
  footerDescription: String,
  socialLinks: { facebook: String, instagram: String, linkedin: String, youtube: String },
  seoTitle: String,
  seoDescription: String,
  defaultWhatsappMessage: String
}, { timestamps: true });
export const SiteSettings = mongoose.model('SiteSettings', schema);
