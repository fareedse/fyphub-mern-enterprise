import { Inquiry } from '../models/Inquiry.js';
import { Project } from '../models/Project.js';
import { User } from '../models/User.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';

export const dashboard = catchAsync(async (req, res) => {
  const [inquiries, recommended] = await Promise.all([
    Inquiry.find({ user: req.user._id }).sort('-createdAt').limit(5),
    Project.find({ status: 'published', featured: true }).limit(4)
  ]);
  res.json({ success: true, inquiries, recommended, stats: { inquiries: inquiries.length } });
});
export const myInquiries = catchAsync(async (req, res) => res.json({ success: true, items: await Inquiry.find({ user: req.user._id }).sort('-createdAt') }));
export const myInquiry = catchAsync(async (req, res, next) => {
  const item = await Inquiry.findOne({ _id: req.params.id, user: req.user._id });
  if (!item) return next(new AppError('Inquiry not found', 404));
  res.json({ success: true, item });
});
export const updateMyInquiry = catchAsync(async (req, res, next) => {
  const item = await Inquiry.findOneAndUpdate({ _id: req.params.id, user: req.user._id, status: 'new' }, req.body, { new: true, runValidators: true });
  if (!item) return next(new AppError('Only new inquiries can be edited', 400));
  res.json({ success: true, item });
});
export const deleteMyInquiry = catchAsync(async (req, res, next) => {
  const item = await Inquiry.findOneAndDelete({ _id: req.params.id, user: req.user._id, status: 'new' });
  if (!item) return next(new AppError('Only new inquiries can be cancelled', 400));
  res.json({ success: true, message: 'Inquiry cancelled' });
});
export const updateProfile = catchAsync(async (req, res) => {
  const allowed = ['name', 'phone', 'university', 'degree']; const data = {};
  allowed.forEach((k) => { if (req.body[k] !== undefined) data[k] = req.body[k]; });
  const user = await User.findByIdAndUpdate(req.user._id, data, { new: true, runValidators: true }).select('-password');
  res.json({ success: true, user });
});
export const changePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.comparePassword(req.body.currentPassword))) return next(new AppError('Current password is incorrect', 400));
  user.password = req.body.newPassword; await user.save();
  res.json({ success: true, message: 'Password changed successfully' });
});
