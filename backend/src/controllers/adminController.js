import slugify from 'slugify';
import { Project } from '../models/Project.js';
import { Category } from '../models/Category.js';
import { Blog } from '../models/Blog.js';
import { Inquiry } from '../models/Inquiry.js';
import { Testimonial } from '../models/Testimonial.js';
import { Course } from '../models/Course.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { User } from '../models/User.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';
import { buildProjectQuery, getSort } from '../utils/apiFeatures.js';

const withSlug = (body) => ({ ...body, slug: body.slug || (body.title || body.name ? slugify(body.title || body.name, { lower: true, strict: true }) : undefined) });
const crud = (Model) => ({
  list: catchAsync(async (req, res) => res.json({ success: true, items: await Model.find(req.query.status ? { status: req.query.status } : {}).sort('-createdAt') })),
  get: catchAsync(async (req, res, next) => { const item = await Model.findById(req.params.id); if (!item) return next(new AppError('Item not found', 404)); res.json({ success: true, item }); }),
  create: catchAsync(async (req, res) => res.status(201).json({ success: true, item: await Model.create(withSlug(req.body)) })),
  update: catchAsync(async (req, res, next) => { const item = await Model.findByIdAndUpdate(req.params.id, withSlug(req.body), { new: true, runValidators: true }); if (!item) return next(new AppError('Item not found', 404)); res.json({ success: true, item }); }),
  remove: catchAsync(async (req, res, next) => { const item = await Model.findByIdAndDelete(req.params.id); if (!item) return next(new AppError('Item not found', 404)); res.json({ success: true, message: 'Deleted successfully' }); })
});

export const stats = catchAsync(async (_req, res) => {
  const [projects, inquiries, newInquiries, blogs, users, recentInquiries] = await Promise.all([
    Project.countDocuments(), Inquiry.countDocuments(), Inquiry.countDocuments({ status: 'new' }), Blog.countDocuments(), User.countDocuments(), Inquiry.find().sort('-createdAt').limit(6)
  ]);
  res.json({ success: true, stats: { projects, inquiries, newInquiries, blogs, users }, recentInquiries });
});

export const adminProjects = {
  list: catchAsync(async (req, res) => res.json({ success: true, items: await Project.find(buildProjectQuery(req.query)).sort(getSort(req.query.sort)) })),
  get: crud(Project).get,
  create: crud(Project).create,
  update: crud(Project).update,
  remove: crud(Project).remove,
  status: catchAsync(async (req, res, next) => { const item = await Project.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }); if (!item) return next(new AppError('Project not found', 404)); res.json({ success: true, item }); }),
  featured: catchAsync(async (req, res, next) => { const item = await Project.findByIdAndUpdate(req.params.id, { featured: req.body.featured }, { new: true }); if (!item) return next(new AppError('Project not found', 404)); res.json({ success: true, item }); })
};
export const adminCategories = crud(Category);
export const adminBlogs = { ...crud(Blog), status: catchAsync(async (req, res, next) => { const item = await Blog.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }); if (!item) return next(new AppError('Blog not found', 404)); res.json({ success: true, item }); }) };
export const adminTestimonials = crud(Testimonial);

export const adminInquiries = {
  list: catchAsync(async (req, res) => {
    const filter = {}; if (req.query.status) filter.status = req.query.status; if (req.query.search) filter.$or = [{ name: { $regex: req.query.search, $options: 'i' } }, { email: { $regex: req.query.search, $options: 'i' } }, { phone: { $regex: req.query.search, $options: 'i' } }];
    res.json({ success: true, items: await Inquiry.find(filter).populate('project', 'title slug').sort('-createdAt') });
  }),
  get: catchAsync(async (req, res, next) => { const item = await Inquiry.findById(req.params.id).populate('project', 'title slug price'); if (!item) return next(new AppError('Inquiry not found', 404)); res.json({ success: true, item }); }),
  update: catchAsync(async (req, res, next) => { const item = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!item) return next(new AppError('Inquiry not found', 404)); res.json({ success: true, item }); }),
  remove: crud(Inquiry).remove
};

export const getCourse = catchAsync(async (_req, res) => res.json({ success: true, item: await Course.findOne() }));
export const updateCourse = catchAsync(async (req, res) => {
  const existing = await Course.findOne();
  const item = existing ? await Course.findByIdAndUpdate(existing._id, req.body, { new: true, runValidators: true }) : await Course.create(req.body);
  res.json({ success: true, item });
});
export const getSettings = catchAsync(async (_req, res) => res.json({ success: true, item: await SiteSettings.findOne() }));
export const updateSettings = catchAsync(async (req, res) => {
  const existing = await SiteSettings.findOne();
  const item = existing ? await SiteSettings.findByIdAndUpdate(existing._id, req.body, { new: true, runValidators: true }) : await SiteSettings.create(req.body);
  res.json({ success: true, item });
});
export const adminUsers = {
  list: catchAsync(async (_req, res) => res.json({ success: true, items: await User.find().select('-password').sort('-createdAt') })),
  create: catchAsync(async (req, res) => res.status(201).json({ success: true, item: await User.create(req.body) })),
  update: catchAsync(async (req, res, next) => { const item = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password'); if (!item) return next(new AppError('User not found', 404)); res.json({ success: true, item }); }),
  remove: catchAsync(async (req, res, next) => { if (String(req.params.id) === String(req.user._id)) return next(new AppError('You cannot delete yourself', 400)); const item = await User.findByIdAndDelete(req.params.id); if (!item) return next(new AppError('User not found', 404)); res.json({ success: true, message: 'User deleted' }); })
};
