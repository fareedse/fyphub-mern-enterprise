import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ admin = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const nav = useNavigate();

  const links = admin
    ? [
        ['/admin', 'Overview'],
        ['/admin/projects', 'Projects'],
        ['/admin/categories', 'Categories'],
        ['/admin/inquiries', 'Inquiries'],
        ['/admin/blogs', 'Blogs'],
        ['/admin/testimonials', 'Testimonials'],
        ['/admin/course', 'Course'],
        ['/admin/users', 'Users'],
        ['/admin/settings', 'Settings'],
      ]
    : [
        ['/dashboard', 'Dashboard'],
        ['/dashboard/inquiries', 'My Inquiries'],
        ['/dashboard/profile', 'Profile'],
        ['/projects', 'Browse Projects'],
      ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dashboard-layout">
      <button className="btn sidebar-toggle hide-desktop" onClick={() => setSidebarOpen(true)}>
        <Menu size={18} /> Menu
      </button>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <div className="logo">FYP<span>Hub</span></div>
          <button className="btn close-sidebar hide-desktop" onClick={closeSidebar}>
            <X size={18} />
          </button>
        </div>

        <p>{admin ? 'Admin Panel' : `Hi, ${user?.name || 'Student'}`}</p>

        {links.map(([to, label]) => (
          <NavLink key={to} end to={to} onClick={closeSidebar}>
            {label}
          </NavLink>
        ))}

        <button onClick={() => { closeSidebar(); nav('/'); }}>
          Back to Website
        </button>
        <button onClick={() => { closeSidebar(); logout(); }}>
          Logout
        </button>
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

