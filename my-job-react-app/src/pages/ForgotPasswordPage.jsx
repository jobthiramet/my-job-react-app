import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { findUserByEmail } from '../data/users';
import { sendPasswordToEmail } from '../data/passwordMail';
import { validateForgotEmailForm } from '../utils/forgotPasswordValidation';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentMail, setSentMail] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');

    const validationErrors = validateForgotEmailForm({ email });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const user = findUserByEmail(email);
    if (!user) {
      setErrors({});
      setFormError('No account found with this email.');
      return;
    }

    setErrors({});
    setIsSending(true);

    try {
      const message = await sendPasswordToEmail(user);
      setSentMail(message);
    } catch (err) {
      setFormError(
        err.message || 'Unable to send the password email. Please try again.',
      );
    } finally {
      setIsSending(false);
    }
  }

  if (sentMail) {
    return (
      <div className="auth-page">
        <div className="app-container">
          <NavBar />
          <main className="auth-main">
            <div className="auth-card">
              <h1 className="auth-title">Check your email</h1>
              <p className="auth-subtitle">
                We sent a message to <strong>{sentMail.to}</strong>. Please
                check your inbox (and spam folder).
              </p>

              <div className="demo-mail-preview" aria-live="polite">
                <p className="demo-mail-label">Important</p>
                <p className="demo-mail-body">
                  If this is the <strong>first time</strong> you request a
                  password for this address, FormSubmit will first send an{' '}
                  <strong>activation email</strong>. Open it, click Activate /
                  Confirm, then come back here and press{' '}
                  <strong>Send password to email</strong> again. After that, the
                  real password email will arrive.
                </p>
              </div>

              <button
                type="button"
                className="auth-submit"
                onClick={() => navigate('/login')}
              >
                Back to log in
              </button>
              <button
                type="button"
                className="auth-secondary-btn"
                onClick={() => {
                  setSentMail(null);
                }}
              >
                Send again
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="app-container">
        <NavBar />
        <main className="auth-main">
          <div className="auth-card">
            <h1 className="auth-title">Forgot password</h1>
            <p className="auth-subtitle">
              Enter your account email and we will send your password to that
              inbox.
            </p>
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="forgot-email">Email</label>
                <input
                  id="forgot-email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  disabled={isSending}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setFormError('');
                    if (errors.email) {
                      setErrors((current) => {
                        const next = { ...current };
                        delete next.email;
                        return next;
                      });
                    }
                  }}
                />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>

              {formError && <p className="form-error">{formError}</p>}

              <button type="submit" className="auth-submit" disabled={isSending}>
                {isSending ? 'Sending...' : 'Send password to email'}
              </button>
            </form>
            <p className="auth-footer">
              Remember your password? <Link to="/login">Log in</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
