import { validationResult } from 'express-validator';
import { AppError } from '../utils/AppError.js';

export const validate = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array().map((e) => e.msg).join(', '), 422));
  }
  next();
};
