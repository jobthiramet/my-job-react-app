import React from 'react';
import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import {
  FileText,
  FolderOpen,
  User,
  Users,
  Bell,
  KeyRound,
  LogOut,
  Newspaper,
  Home,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  canManageBlog,
  canManageUsers,
  getRoleLabel,
  isAdmin,
  isAdminIT,
} from '../../data/users';

const allNavItems = [
  {
    to: '/admin/users',
    label: 'User management',
    icon: Users,
    visible: canManageUsers,
  },
  {
    to: '/admin/content',
    label: 'Blog content',
    icon: Newspaper,
    visible: isAdminIT,
  },
  {
    to: '/admin/articles',
    label: 'Article management',
    icon: FileText,
    visible: canManageBlog,
  },
  {
    to: '/admin/categories',
    label: 'Category management',
    icon: FolderOpen,
    visible: canManageBlog,
  },
  {
    to: '/admin/profile',
    label: 'Profile',
    icon: User,
    visible: isAdmin,
  },
  {
    to: '/admin/notifications',
    label: 'Notification',
    icon: Bell,
    visible: isAdmin,
  },
  {
    to: '/admin/reset-password',
    label: 'Reset password',
    icon: KeyRound,
    visible: isAdmin,
  },
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

  const navItems = allNavItems.filter((item) => item.visible(user));

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
            <p className="admin-brand-role">{getRoleLabel(user.role)}</p>
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

        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-home-link">
            <Home className="admin-nav-icon" strokeWidth={1.75} />
            Back to home
          </Link>
          <button type="button" className="admin-logout" onClick={handleLogout}>
            <LogOut className="admin-nav-icon" strokeWidth={1.75} />
            Log out
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}
