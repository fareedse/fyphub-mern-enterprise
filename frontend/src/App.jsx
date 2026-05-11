import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import About from './pages/About';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import { NotFound, Privacy, Terms, Unauthorized } from './pages/StaticPages';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import UserDashboard from './pages/user/UserDashboard';
import MyInquiries from './pages/user/MyInquiries';
import InquiryDetails from './pages/user/InquiryDetails';
import Profile from './pages/user/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import ProjectForm from './pages/admin/ProjectForm';
import { AdminSimple } from './pages/admin/AdminSimple';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminSettings from './pages/admin/AdminSettings';

function RequireAuth({ children }){const {isAuthed}=useAuth();return isAuthed?children:<Navigate to="/login" replace/>}
function RequireAdmin({ children }){const {isAuthed,isAdmin}=useAuth();if(!isAuthed)return <Navigate to="/login" replace/>;return isAdmin?children:<Navigate to="/unauthorized" replace/>}
export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/projects/:slug" element={<ProjectDetails/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/blogs/:slug" element={<BlogDetails/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/privacy-policy" element={<Privacy/>}/>
          <Route path="/terms-and-conditions" element={<Terms/>}/>
          <Route path="/unauthorized" element={<Unauthorized/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        </Route>
        <Route path="/dashboard" element={<RequireAuth><DashboardLayout/></RequireAuth>}>
          <Route index element={<UserDashboard/>}/>
          <Route path="inquiries" element={<MyInquiries/>}/>
          <Route path="inquiries/:id" element={<InquiryDetails/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
        <Route path="/admin" element={<RequireAdmin><DashboardLayout admin/></RequireAdmin>}>
          <Route index element={<AdminDashboard/>}/>
          <Route path="projects" element={<AdminProjects/>}/>
          <Route path="projects/new" element={<ProjectForm/>}/>
          <Route path="projects/:id/edit" element={<ProjectForm/>}/>
          <Route path="categories" element={<AdminSimple type="categories"/>}/>
          <Route path="inquiries" element={<AdminInquiries/>}/>
          <Route path="/admin/blogs" element={<AdminBlogs/>}/>
          <Route path="testimonials" element={<AdminSimple type="testimonials"/>}/>
          <Route path="course" element={<AdminSettings course/>}/>
          <Route path="users" element={<AdminSimple type="users"/>}/>
          <Route path="settings" element={<AdminSettings/>}/>
        </Route>
        <Route path="*" element={<PublicLayout/>}>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
