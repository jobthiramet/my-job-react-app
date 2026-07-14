import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isAdminBlog, isAdminIT } from '../../data/users';

export default function AdminHomeRedirect() {
  const { user } = useAuth();

  if (isAdminIT(user)) {
    return <Navigate to="users" replace />;
  }

  if (isAdminBlog(user)) {
    return <Navigate to="articles" replace />;
  }

  return <Navigate to="/" replace />;
}
