import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import NavBar from '../components/NavBar';

export default function SignUpSuccessPage() {
  const location = useLocation();

  if (!location.state?.fromSignUp) {
    return <Navigate to="/signup" replace />;
  }

  return (
    <div className="auth-page">
      <div className="app-container">
        <NavBar />
        <main className="auth-main">
          <div className="auth-card success-card">
            <div className="success-icon" aria-hidden="true">
              <Check className="success-check" />
            </div>
            <h1 className="success-title">Registration success</h1>
            <Link to="/login" className="success-continue">
              Continue
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
