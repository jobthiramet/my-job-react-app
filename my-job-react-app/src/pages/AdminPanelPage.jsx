import React from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';

export default function AdminPanelPage() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="auth-page">
      <div className="app-container">
        <NavBar />
        <main className="auth-main">
          <div className="auth-card profile-card">
            <h1 className="auth-title">Admin panel</h1>
            <p className="profile-subtitle">
              Welcome, {user.name}. This is a demo admin area.
            </p>
            <dl className="profile-details">
              <div className="profile-row">
                <dt>Signed in as</dt>
                <dd>{user.email}</dd>
              </div>
              <div className="profile-row">
                <dt>Role</dt>
                <dd>Admin (demo)</dd>
              </div>
            </dl>
          </div>
        </main>
      </div>
    </div>
  );
}
