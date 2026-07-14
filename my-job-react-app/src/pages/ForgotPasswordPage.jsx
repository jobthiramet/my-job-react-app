import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { findUserByEmail, updateUserPassword } from '../data/users';
import {
  validateForgotEmailForm,
  validateForgotPasswordForm,
} from '../utils/forgotPasswordValidation';

const STEPS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  SUCCESS: 'success',
};

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  function handleEmailSubmit(event) {
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
    setStep(STEPS.PASSWORD);
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();
    setFormError('');

    const validationErrors = validateForgotPasswordForm({
      password,
      confirmPassword,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      updateUserPassword(email, password);
      setErrors({});
      setPassword('');
      setConfirmPassword('');
      setStep(STEPS.SUCCESS);
    } catch (err) {
      setFormError(err.message || 'Unable to reset password.');
    }
  }

  return (
    <div className="auth-page">
      <div className="app-container">
        <NavBar />
        <main className="auth-main">
          <div className="auth-card">
            {step === STEPS.EMAIL && (
              <>
                <h1 className="auth-title">Forgot password</h1>
                <p className="auth-subtitle">
                  Enter the email linked to your account to reset your password.
                </p>
                <form className="auth-form" onSubmit={handleEmailSubmit} noValidate>
                  <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="forgot-email">Email</label>
                    <input
                      id="forgot-email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={email}
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

                  <button type="submit" className="auth-submit">
                    Continue
                  </button>
                </form>
                <p className="auth-footer">
                  Remember your password? <Link to="/login">Log in</Link>
                </p>
              </>
            )}

            {step === STEPS.PASSWORD && (
              <>
                <h1 className="auth-title">Create new password</h1>
                <p className="auth-subtitle">
                  Resetting password for <strong>{email.trim().toLowerCase()}</strong>
                </p>
                <form className="auth-form" onSubmit={handlePasswordSubmit} noValidate>
                  <div className={`form-field ${errors.password ? 'has-error' : ''}`}>
                    <label htmlFor="forgot-password">New password</label>
                    <input
                      id="forgot-password"
                      name="password"
                      type="password"
                      placeholder="New password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setFormError('');
                        if (errors.password) {
                          setErrors((current) => {
                            const next = { ...current };
                            delete next.password;
                            return next;
                          });
                        }
                      }}
                    />
                    {errors.password && <p className="field-error">{errors.password}</p>}
                  </div>

                  <div
                    className={`form-field ${errors.confirmPassword ? 'has-error' : ''}`}
                  >
                    <label htmlFor="forgot-confirm-password">Confirm password</label>
                    <input
                      id="forgot-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setFormError('');
                        if (errors.confirmPassword) {
                          setErrors((current) => {
                            const next = { ...current };
                            delete next.confirmPassword;
                            return next;
                          });
                        }
                      }}
                    />
                    {errors.confirmPassword && (
                      <p className="field-error">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {formError && <p className="form-error">{formError}</p>}

                  <button type="submit" className="auth-submit">
                    Reset password
                  </button>
                  <button
                    type="button"
                    className="auth-secondary-btn"
                    onClick={() => {
                      setStep(STEPS.EMAIL);
                      setPassword('');
                      setConfirmPassword('');
                      setErrors({});
                      setFormError('');
                    }}
                  >
                    Back
                  </button>
                </form>
              </>
            )}

            {step === STEPS.SUCCESS && (
              <>
                <h1 className="auth-title">Password updated</h1>
                <p className="auth-subtitle">
                  Your password has been reset successfully. You can log in with your
                  new password.
                </p>
                <button
                  type="button"
                  className="auth-submit"
                  onClick={() => navigate('/login')}
                >
                  Back to log in
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
