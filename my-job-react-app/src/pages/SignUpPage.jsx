import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { getRegisteredUsers, registerUser } from '../data/users';
import { validateSignUpForm } from '../utils/signUpValidation';

const initialForm = {
  name: '',
  username: '',
  email: '',
  password: '',
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));

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

    const validationErrors = validateSignUpForm(form, getRegisteredUsers());

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    registerUser({
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
    });

    navigate('/signup/success', { state: { fromSignUp: true } });
  }

  return (
    <div className="auth-page">
      <div className="app-container">
        <NavBar />
        <main className="auth-main">
          <div className="auth-card">
            <h1 className="auth-title">Sign up</h1>
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="field-error">{errors.name}</p>}
              </div>

              <div className={`form-field ${errors.username ? 'has-error' : ''}`}>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="field-error">{errors.username}</p>}
              </div>

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

              <button type="submit" className="auth-submit">Sign up</button>
            </form>
            <p className="auth-footer">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
