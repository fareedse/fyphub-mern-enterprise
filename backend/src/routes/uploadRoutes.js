import express from 'express';
import { upload, uploadImage } from '../controllers/uploadController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/', protect, restrictTo('admin', 'staff'), upload.single('image'), uploadImage);
export default router;
