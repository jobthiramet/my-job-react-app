import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RequireRole({ allow, children, redirectTo = '/admin' }) {
  const { user } = useAuth();

  if (!allow(user)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
