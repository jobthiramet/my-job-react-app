import React from 'react';
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import {
  FileText,
  FolderOpen,
  User,
  Bell,
  KeyRound,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isAdmin } from '../../data/users';

const navItems = [
  { to: '/admin/articles', label: 'Article management', icon: FileText },
  { to: '/admin/categories', label: 'Category management', icon: FolderOpen },
  { to: '/admin/profile', label: 'Profile', icon: User },
  { to: '/admin/notifications', label: 'Notification', icon: Bell },
  { to: '/admin/reset-password', label: 'Reset password', icon: KeyRound },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin(user)) {
    return <Navigate to="/" replace />;
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">hh</span>
          <div>
            <p className="admin-brand-title">Admin panel</p>
            <p className="admin-brand-user">{user.name}</p>
          </div>
        </div>

        <nav className="admin-nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? 'is-active' : ''}`
              }
            >
              <Icon className="admin-nav-icon" strokeWidth={1.75} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button type="button" className="admin-logout" onClick={handleLogout}>
          <LogOut className="admin-nav-icon" strokeWidth={1.75} />
          Log out
        </button>
      </aside>

      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}

