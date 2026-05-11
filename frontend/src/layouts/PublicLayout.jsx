import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { whatsappLink } from '../utils/whatsapp';

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  const nav = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/blogs">Blogs</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </>
  );

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>WhatsApp: +92 3247054618 • fyphubse@gmail.com</span>
          <span>Complete Code • Report • PPT • Demo</span>
        </div>
      </div>

      <header className="navbar">
        <div className="container">
          <Link className="logo" to="/">FYP<span>Hub</span></Link>
          <nav className={`navlinks ${open ? 'open' : ''}`}>{nav}</nav>
          <div className={`nav-actions ${open ? 'open' : ''}`}>
            {user ? (
              <>
                <Link className="btn ghost" to={isAdmin ? '/admin' : '/dashboard'}>Dashboard</Link>
                <button className="btn" onClick={logout}>Logout</button>
              </>
            ) : (
              <Link className="btn ghost" to="/login">Login</Link>
            )}
            <a className="btn primary" href={whatsappLink('Hi FYP Hub, I need help with my final year project.')} target="_blank">Let's Talk</a>
          </div>
          <button className="btn mobile-toggle" onClick={() => setOpen(true)}>
            <Menu size={18} />
          </button>
        </div>
      </header>

      <aside className={`public-mobile-nav ${open ? 'open' : ''}`}>
        <div className="mobile-nav-top">
          <Link className="logo" to="/" onClick={closeMenu}>FYP<span>Hub</span></Link>
          <button className="btn close-mobile-nav hide-desktop" onClick={closeMenu}>
            <X size={18} />
          </button>
        </div>
        <nav className="mobile-nav-links" onClick={closeMenu}>{nav}</nav>
        <div className="mobile-nav-actions">
          {user ? (
            <>
              <Link className="btn ghost" to={isAdmin ? '/admin' : '/dashboard'} onClick={closeMenu}>Dashboard</Link>
              <button className="btn" onClick={() => { closeMenu(); logout(); }}>Logout</button>
            </>
          ) : (
            <Link className="btn ghost" to="/login" onClick={closeMenu}>Login</Link>
          )}
          <a className="btn primary" href={whatsappLink('Hi FYP Hub, I need help with my final year project.')} target="_blank" onClick={closeMenu}>Let's Talk</a>
        </div>
      </aside>

      <div className={`mobile-nav-backdrop ${open ? 'open' : ''}`} onClick={closeMenu} />

      <Outlet />

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Link className="logo" to="/">FYP<span>Hub</span></Link>
            <p>Premium final year projects with source code, documentation, PPT, video demo and installation support.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <p><Link to="/projects">Projects</Link></p>
            <p><Link to="/about">About</Link></p>
            <p><Link to="/blogs">Blogs</Link></p>
            <p><Link to="/contact">Contact</Link></p>
          </div>
          <div>
            <h4>Resources</h4>
            <p>FYP Guidelines</p>
            <p>Documentation Help</p>
            <p>Installation Support</p>
            <p>MERN Course</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>fyphubse@gmail.com</p>
            <p>+92 324 7054618</p>
            <p><Link to="/privacy-policy">Privacy Policy</Link></p>
            <p><Link to="/terms-and-conditions">Terms</Link></p>
          </div>
        </div>
        <div className="container" style={{ borderTop: '1px solid #1e293b', marginTop: 30, paddingTop: 20 }}>© 2026 FYP Hub. All rights reserved.</div>
      </footer>
    </>
  );
}
