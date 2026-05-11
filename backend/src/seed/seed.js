import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { Project } from '../models/Project.js';
import { Blog } from '../models/Blog.js';
import { Inquiry } from '../models/Inquiry.js';
import { Testimonial } from '../models/Testimonial.js';
import { Course } from '../models/Course.js';
import { SiteSettings } from '../models/SiteSettings.js';

dotenv.config();
const image = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
const projectImages = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
];

const run = async () => {
  await connectDB();
  await Promise.all([User.deleteMany(), Category.deleteMany(), Project.deleteMany(), Blog.deleteMany(), Inquiry.deleteMany(), Testimonial.deleteMany(), Course.deleteMany(), SiteSettings.deleteMany()]);
  const [admin, student] = await User.create([
    { name: 'FYP Hub Admin', email: 'admin@fyphub.shop', password: 'Admin@12345', role: 'admin', phone: '+923001234567' },
    { name: 'Demo Student', email: 'student@fyphub.shop', password: 'Student@12345', role: 'user', phone: '+923009876543', university: 'Demo University', degree: 'BS Computer Science' }
  ]);
  await Category.create([
    { name: 'Management Systems', slug: 'management-systems', type: 'project', description: 'ERP, CRM, school, hospital, inventory and business systems', icon: 'LayoutDashboard' },
    { name: 'E-Commerce', slug: 'e-commerce', type: 'project', description: 'Modern stores, marketplaces and checkout systems', icon: 'ShoppingCart' },
    { name: 'AI/ML Projects', slug: 'ai-ml-projects', type: 'project', description: 'Artificial intelligence, machine learning and prediction apps', icon: 'Brain' },
    { name: 'Mobile Apps', slug: 'mobile-apps', type: 'project', description: 'React Native and app-based student projects', icon: 'Smartphone' },
    { name: 'FYP Guides', slug: 'fyp-guides', type: 'blog' },
    { name: 'Technology', slug: 'technology', type: 'blog' }
  ]);
  const projects = await Project.create([
    { title: 'Restaurant Management System MERN', slug: 'restaurant-management-system-mern', category: 'management-systems', price: 18000, discountPrice: 14999, shortDescription: 'Complete restaurant ordering, menu, dashboard and order tracking platform.', fullDescription: 'A commercial-grade restaurant management system with customer ordering and admin operations.', problemStatement: 'Restaurants need a fast digital platform for ordering, menus and order management.', objectives: ['Online ordering', 'Admin menu management', 'Real-time order status', 'Customer inquiry capture'], scope: 'Suitable for final year project submission and small restaurant SaaS MVP.', features: ['Responsive website', 'JWT auth', 'Admin dashboard', 'Order workflow', 'Analytics cards'], modules: ['Customer app', 'Admin panel', 'Menu module', 'Order module', 'Settings module'], technologies: ['MongoDB', 'Express', 'React', 'Node.js'], tags: ['MERN', 'Restaurant', 'Admin Dashboard'], includedItems: ['Source code', 'Report', 'PPT', 'Video demo', 'Installation support'], mainImage: projectImages[0], gallery: projectImages, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', featured: true, status: 'published', views: 260 },
    { title: 'AI Customer Support SaaS', slug: 'ai-customer-support-saas', category: 'ai-ml-projects', price: 25000, discountPrice: 19999, shortDescription: 'Enterprise-style chatbot SaaS with workspace, knowledge base and analytics.', fullDescription: 'A full SaaS product concept for AI support automation and business chat widgets.', features: ['Workspace management', 'Knowledge base upload', 'Conversations', 'Analytics', 'Billing mockup'], modules: ['Auth', 'Chatbot', 'Admin', 'Analytics'], technologies: ['React', 'Node.js', 'MongoDB', 'OpenAI API'], tags: ['AI', 'SaaS', 'Chatbot'], includedItems: ['Code', 'Docs', 'PPT', 'Demo video'], mainImage: projectImages[1], gallery: projectImages, featured: true, status: 'published', views: 410 },
    { title: 'Healthcare Analytics Dashboard', slug: 'healthcare-analytics-dashboard', category: 'management-systems', price: 15000, discountPrice: 11999, shortDescription: 'Professional analytics dashboard for patient cohorts and hospital insights.', fullDescription: 'A data-driven healthcare analytics product with interactive dashboards and reports.', features: ['Analytics charts', 'Filters', 'Synthetic data', 'Reports'], modules: ['Patients', 'Hospitals', 'Cohorts', 'Exports'], technologies: ['Python', 'Streamlit', 'Pandas', 'SQLite'], tags: ['Healthcare', 'Analytics', 'Dashboard'], includedItems: ['Code', 'Report', 'PPT'], mainImage: projectImages[2], gallery: projectImages, featured: true, status: 'published', views: 190 },
    { title: 'E-Commerce Marketplace MERN', slug: 'ecommerce-marketplace-mern', category: 'e-commerce', price: 22000, shortDescription: 'Multi-vendor marketplace with products, cart, order management and admin panel.', fullDescription: 'A responsive e-commerce platform with seller and admin management.', features: ['Cart', 'Checkout flow', 'Vendor panel', 'Product management'], modules: ['Storefront', 'Admin', 'Seller', 'Orders'], technologies: ['MongoDB', 'Express', 'React', 'Node.js'], tags: ['Ecommerce', 'Marketplace'], includedItems: ['Code', 'Report', 'PPT'], mainImage: image, gallery: projectImages, featured: false, status: 'published', views: 99 }
  ]);
  await Blog.create([
    { title: 'How to Choose the Best Final Year Project', slug: 'how-to-choose-best-final-year-project', category: 'fyp-guides', tags: ['FYP', 'Students'], author: 'FYP Hub Team', featuredImage: image, excerpt: 'A practical guide for choosing a scoring and realistic FYP topic.', content: 'Choose a project that solves a real problem, has clear modules, uses modern technology and can be demonstrated professionally. Focus on documentation, working source code, database design and a clean UI.', seoTitle: 'Best Final Year Project Guide', seoDescription: 'How to choose the best FYP project.', readTime: '5 min', status: 'published' },
    { title: 'Why MERN Stack is Popular for Student Projects', slug: 'why-mern-stack-is-popular', category: 'technology', tags: ['MERN', 'React'], author: 'FYP Hub Team', featuredImage: projectImages[0], excerpt: 'MERN is one of the best choices for modern web-based FYPs.', content: 'MERN gives students a complete JavaScript stack with MongoDB, Express, React and Node.js. It is flexible, popular and ideal for dashboards, portals, marketplaces and SaaS apps.', seoTitle: 'MERN Stack for FYP', seoDescription: 'Why MERN is popular for final year projects.', readTime: '4 min', status: 'published' }
  ]);
  await Inquiry.create([{ name: 'Ali Khan', email: 'ali@example.com', phone: '+923111111111', university: 'City University', project: projects[0]._id, projectTitle: projects[0].title, projectType: 'Ready-made project', budget: '15000-20000', deadline: '1 week', message: 'I need this restaurant project with report and PPT.', user: student._id, status: 'new', priority: 'high' }]);
  await Testimonial.create([
    { name: 'Hamza R.', program: 'BSCS Student', review: 'The source code, report and PPT were complete. Installation support was very helpful.', rating: 5 },
    { name: 'Ayesha M.', program: 'Software Engineering', review: 'Professional UI and clean explanation. My project demo went smoothly.', rating: 5 },
    { name: 'Bilal S.', program: 'IT Student', review: 'Fast WhatsApp response and project was delivered with all documents.', rating: 5 }
  ]);
  await Course.create({ title: 'MERN Stack Mastery Course', instructorName: 'FYP Hub Expert Team', instructorTitle: 'Full Stack Developers', duration: '8 Weeks', price: 12000, benefits: ['Build real-world projects', 'React frontend mastery', 'Node/Express API development', 'MongoDB database design', 'Deployment guidance'], image, whatsappMessage: 'Hi FYP Hub, I want to enroll in the MERN Stack Course.', active: true });
  await SiteSettings.create({ siteName: 'FYP Hub', email: 'support@fyphub.shop', phone: '+92 300 1234567', whatsapp: '923001234567', footerDescription: 'Premium final year projects with source code, report, PPT, video demo and installation support.', socialLinks: { facebook: '#', instagram: '#', linkedin: '#', youtube: '#' }, seoTitle: 'FYP Hub - Premium Final Year Projects', seoDescription: 'Buy complete final year projects with source code, documentation and support.', defaultWhatsappMessage: 'Hi FYP Hub, I need help with a final year project.' });
  console.log('Seed complete');
  console.log('Admin: admin@fyphub.shop / Admin@12345');
  await mongoose.disconnect();
};
run().catch(async (err) => { console.error(err); await mongoose.disconnect(); process.exit(1); });
