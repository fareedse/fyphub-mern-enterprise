import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const protect = catchAsync(async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return next(new AppError('Authentication required', 401));
  const token = header.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select('-password');
  if (!user || user.status !== 'active') return next(new AppError('User not found or inactive', 401));
  req.user = user;
  next();
});

export const restrictTo = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) return next(new AppError('You do not have permission to perform this action', 403));
  next();
};
