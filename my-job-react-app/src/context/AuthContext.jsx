import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  clearCurrentUser,
  getCurrentUser,
  setCurrentUser,
} from '../data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  const value = useMemo(
    () => ({
      user,
      login(nextUser) {
        const savedUser = setCurrentUser(nextUser);
        setUser(savedUser);
        return savedUser;
      },
      logout() {
        clearCurrentUser();
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
