import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
const sendAuth = (res, user, statusCode = 200) => {
  const token = signToken(user._id);
  const safeUser = { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, status: user.status, university: user.university, degree: user.degree };
  res.status(statusCode).json({ success: true, token, user: safeUser });
};

export const registerRules = [body('name').notEmpty().withMessage('Name is required'), body('email').isEmail().withMessage('Valid email is required'), body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')];
export const loginRules = [body('email').isEmail().withMessage('Valid email is required'), body('password').notEmpty().withMessage('Password is required')];

export const register = catchAsync(async (req, res, next) => {
  const exists = await User.findOne({ email: req.body.email });
  if (exists) return next(new AppError('Email already exists', 409));
  const user = await User.create({ name: req.body.name, email: req.body.email, password: req.body.password, phone: req.body.phone, university: req.body.university, degree: req.body.degree });
  sendAuth(res, user, 201);
});

export const login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) return next(new AppError('Invalid email or password', 401));
  if (user.status !== 'active') return next(new AppError('Your account is blocked', 403));
  sendAuth(res, user);
});

export const me = catchAsync(async (req, res) => res.json({ success: true, user: req.user }));

export const forgotPassword = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const raw = crypto.randomBytes(24).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(raw).digest('hex');
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
  }
  res.json({ success: true, message: 'Reset instructions sent if this email exists. Email delivery must be connected in production.' });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) return next(new AppError('Invalid or expired reset token', 400));
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  sendAuth(res, user);
});
