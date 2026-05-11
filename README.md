# FYP Hub Enterprise MERN Website

A production-style MERN stack website for FYP Hub: public project marketplace, blog/resources, inquiry lead capture, user dashboard, admin dashboard, JWT authentication, MongoDB models, seed data, validation, error handling, responsive UI, and environment-based configuration.

## Project Structure

```txt
fyphub-mern-enterprise/
  frontend/   React + Vite app
  backend/    Node.js + Express + MongoDB API
  README.md
```

## Requirements

- Node.js 18+
- MongoDB Atlas or local MongoDB
- npm

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Default backend URL: `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Default frontend URL: `http://localhost:5173`

## Demo Accounts After Seeding

```txt
Admin: admin@fyphub.shop / Admin@12345
User:  student@fyphub.shop / Student@12345
```

## Important Environment Variables

### backend/.env

```txt
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fyphub_enterprise
JWT_SECRET=replace_with_long_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### frontend/.env

```txt
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=923001234567
```

## Features

- Public landing page
- Project listing with filters/search/sort
- Project details with gallery, inclusions, FAQs, WhatsApp CTA
- Blog listing and blog details
- Contact/inquiry form
- Login/register/forgot/reset screens
- User dashboard: profile, inquiries, inquiry details
- Admin dashboard: stats, projects, categories, inquiries, blogs, testimonials, course, users, settings
- JWT auth with role-based access
- Password hashing with bcrypt
- Express validation and central error handling
- MongoDB models and seed data
- Toast notifications, modals, empty states, loading states
- Responsive UI with mobile navigation and admin sidebar drawer

## API Summary

Public:
- `GET /api/projects`
- `GET /api/projects/featured`
- `GET /api/projects/:slug`
- `GET /api/projects/:slug/related`
- `GET /api/categories`
- `GET /api/blogs`
- `GET /api/blogs/:slug`
- `GET /api/testimonials`
- `GET /api/course`
- `GET /api/site-settings`
- `POST /api/inquiries`

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password/:token`

Admin:
- `GET /api/admin/stats`
- CRUD for projects, categories, blogs, inquiries, testimonials, users
- `GET/PUT /api/admin/course`
- `GET/PUT /api/admin/settings`

## Production Notes

Before real launch:
- Use MongoDB Atlas with IP restrictions.
- Set long random `JWT_SECRET`.
- Put frontend and backend behind HTTPS.
- Replace demo Cloudinary-style image URLs with uploaded assets/CDN storage.
- Connect transactional email provider for reset passwords.
- Add payment gateway if direct checkout is required.
- Add rate limiting and WAF at hosting layer for high traffic.

