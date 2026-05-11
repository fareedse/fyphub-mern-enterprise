import path from 'path';
import multer from 'multer';
import { AppError } from '../utils/AppError.js';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'src/uploads'),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`)
});
const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true); else cb(new AppError('Only image uploads are allowed', 400));
};
export const upload = multer({ storage, fileFilter, limits: { fileSize: 3 * 1024 * 1024 } });
export const uploadImage = (req, res) => res.status(201).json({ success: true, url: `/uploads/${req.file.filename}` });
