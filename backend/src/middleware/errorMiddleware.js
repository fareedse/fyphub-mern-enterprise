import { AppError } from '../utils/AppError.js';

export const notFound = (req, _res, next) => next(new AppError(`Route not found: ${req.originalUrl}`, 404));

export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.name === 'ValidationError'
    ? Object.values(err.errors).map((e) => e.message).join(', ')
    : err.message || 'Server error';

  res.status(statusCode).json({
    success: false,
    status: err.status || 'error',
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
