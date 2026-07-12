import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, KeyRound, LayoutGrid, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || '?';

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [user]);

  function handleLogout() {
    setMenuOpen(false);
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        hh<span className="dot">.</span>
      </Link>

      <div className="nav-actions">
        {user ? (
          <div className="nav-profile-menu" ref={menuRef}>
            <button
              type="button"
              className="nav-profile"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="nav-profile-avatar" aria-hidden="true">
                {initial}
              </span>
              <span className="nav-profile-name">{user.name}</span>
            </button>

            {menuOpen && (
              <div className="nav-dropdown" role="menu">
                <Link
                  to="/profile"
                  className="nav-dropdown-item"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="nav-dropdown-icon" strokeWidth={1.75} aria-hidden="true" />
                  Profile
                </Link>
                <Link
                  to="/reset-password"
                  className="nav-dropdown-item"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  <KeyRound className="nav-dropdown-icon" strokeWidth={1.75} aria-hidden="true" />
                  Reset password
                </Link>
                <Link
                  to="/admin"
                  className="nav-dropdown-item"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  <LayoutGrid className="nav-dropdown-icon" strokeWidth={1.75} aria-hidden="true" />
                  Admin panel
                </Link>
                <button
                  type="button"
                  className="nav-dropdown-item"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  <LogOut className="nav-dropdown-icon" strokeWidth={1.75} aria-hidden="true" />
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="btn-login">Log in</Link>
            <Link to="/signup" className="btn-signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
