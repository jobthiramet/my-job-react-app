import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { authenticateUser } from '../data/users';
import { validateLoginForm } from '../utils/loginValidation';

const initialForm = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setFormError('');

    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateLoginForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError('');
      return;
    }

    const user = authenticateUser(form.email, form.password);

    if (!user) {
      setFormError('Invalid email or password.');
      return;
    }

    navigate('/');
  }

  return (
    <div className="auth-page">
      <div className="app-container">
        <NavBar />
        <main className="auth-main">
          <div className="auth-card">
            <h1 className="auth-title">Log in</h1>
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>

              <div className={`form-field ${errors.password ? 'has-error' : ''}`}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="field-error">{errors.password}</p>}
              </div>

              {formError && <p className="form-error">{formError}</p>}

              <button type="submit" className="auth-submit">Log in</button>
            </form>
            <p className="auth-footer">
              Don&apos;t have any account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
