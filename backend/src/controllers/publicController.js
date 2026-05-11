import { Project } from '../models/Project.js';
import { Blog } from '../models/Blog.js';
import { Category } from '../models/Category.js';
import { Testimonial } from '../models/Testimonial.js';
import { Course } from '../models/Course.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { Inquiry } from '../models/Inquiry.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';
import { buildProjectQuery, getSort } from '../utils/apiFeatures.js';

export const listProjects = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1; const limit = Number(req.query.limit) || 12; const skip = (page - 1) * limit;
  const filter = { ...buildProjectQuery(req.query), status: 'published' };
  const [items, total] = await Promise.all([Project.find(filter).sort(getSort(req.query.sort)).skip(skip).limit(limit), Project.countDocuments(filter)]);
  res.json({ success: true, items, total, page, pages: Math.ceil(total / limit) });
});

export const featuredProjects = catchAsync(async (_req, res) => {
  const items = await Project.find({ status: 'published', featured: true }).sort('-createdAt').limit(8);
  res.json({ success: true, items });
});

export const projectBySlug = catchAsync(async (req, res, next) => {
  const item = await Project.findOneAndUpdate({ slug: req.params.slug, status: 'published' }, { $inc: { views: 1 } }, { new: true });
  if (!item) return next(new AppError('Project not found', 404));
  res.json({ success: true, item });
});

export const relatedProjects = catchAsync(async (req, res) => {
  const current = await Project.findOne({ slug: req.params.slug });
  const items = current ? await Project.find({ _id: { $ne: current._id }, status: 'published', $or: [{ category: current.category }, { technologies: { $in: current.technologies || [] } }] }).limit(4) : [];
  res.json({ success: true, items });
});

export const categories = catchAsync(async (req, res) => {
  const filter = { status: 'active' }; if (req.query.type) filter.type = req.query.type;
  res.json({ success: true, items: await Category.find(filter).sort('name') });
});

export const listBlogs = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1; const limit = Number(req.query.limit) || 9; const skip = (page - 1) * limit;
  const filter = { status: 'published' };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.search) filter.$or = [{ title: { $regex: req.query.search, $options: 'i' } }, { excerpt: { $regex: req.query.search, $options: 'i' } }, { tags: { $regex: req.query.search, $options: 'i' } }];
  const [items, total] = await Promise.all([Blog.find(filter).sort('-createdAt').skip(skip).limit(limit), Blog.countDocuments(filter)]);
  res.json({ success: true, items, total, page, pages: Math.ceil(total / limit) });
});

export const blogBySlug = catchAsync(async (req, res, next) => {
  const item = await Blog.findOne({ slug: req.params.slug, status: 'published' });
  if (!item) return next(new AppError('Blog not found', 404));
  res.json({ success: true, item });
});

export const relatedBlogs = catchAsync(async (req, res) => {
  const current = await Blog.findOne({ slug: req.params.slug });
  const items = current ? await Blog.find({ _id: { $ne: current._id }, status: 'published', category: current.category }).limit(3) : [];
  res.json({ success: true, items });
});

export const testimonials = catchAsync(async (_req, res) => res.json({ success: true, items: await Testimonial.find({ status: 'active', featured: true }).limit(8) }));
export const course = catchAsync(async (_req, res) => res.json({ success: true, item: await Course.findOne({ active: true }) }));
export const siteSettings = catchAsync(async (_req, res) => res.json({ success: true, item: await SiteSettings.findOne() }));

export const createInquiry = catchAsync(async (req, res) => {
  const item = await Inquiry.create({ ...req.body, user: req.user?._id });
  res.status(201).json({ success: true, item, message: 'Inquiry submitted successfully' });
});
