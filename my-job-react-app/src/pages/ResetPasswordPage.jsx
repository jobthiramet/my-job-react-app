import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';

export default function ResetPasswordPage() {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setMessage('Password reset is saved locally for this demo.');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <div className="auth-page">
      <div className="app-container">
        <NavBar />
        <main className="auth-main">
          <div className="auth-card">
            <h1 className="auth-title">Reset password</h1>
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="password">New password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
              {error && <p className="form-error">{error}</p>}
              {message && <p className="form-success">{message}</p>}
              <button type="submit" className="auth-submit">
                Update password
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
