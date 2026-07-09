import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        hh<span className="dot">.</span>
      </Link>

      <div className="nav-actions">
        <Link to="/login" className="btn-login">Log in</Link>
        <Link to="/signup" className="btn-signup">Sign up</Link>
      </div>
    </nav>
  );
}
