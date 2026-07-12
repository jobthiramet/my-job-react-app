import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';

function formatDateTime(value) {
  if (!value) {
    return 'Not available';
  }

  return new Date(value).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const initial = user.name?.trim()?.charAt(0)?.toUpperCase() || '?';

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="auth-page">
      <div className="app-container">
        <NavBar />
        <main className="auth-main">
          <div className="auth-card profile-card">
            <div className="profile-header">
              <div className="profile-avatar" aria-hidden="true">
                {initial}
              </div>
              <h1 className="auth-title profile-title">User profile</h1>
              <p className="profile-subtitle">@{user.username}</p>
            </div>

            <dl className="profile-details">
              <div className="profile-row">
                <dt>Name</dt>
                <dd>{user.name}</dd>
              </div>
              <div className="profile-row">
                <dt>Username</dt>
                <dd>{user.username}</dd>
              </div>
              <div className="profile-row">
                <dt>Email</dt>
                <dd>{user.email}</dd>
              </div>
              <div className="profile-row">
                <dt>Registered</dt>
                <dd>{formatDateTime(user.createdAt)}</dd>
              </div>
              <div className="profile-row">
                <dt>Last login</dt>
                <dd>{formatDateTime(user.lastLoginAt)}</dd>
              </div>
            </dl>

            <button type="button" className="auth-submit profile-logout" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
