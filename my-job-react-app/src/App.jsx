import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SignUpPage from './pages/SignUpPage';
import SignUpSuccessPage from './pages/SignUpSuccessPage';
import ProfilePage from './pages/ProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PostDetailPage from './pages/PostDetailPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminHomeRedirect from './components/admin/AdminHomeRedirect';
import RequireRole from './components/admin/RequireRole';
import AdminArticlesPage from './pages/admin/AdminArticlesPage';
import AdminArticleFormPage from './pages/admin/AdminArticleFormPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminResetPasswordPage from './pages/admin/AdminResetPasswordPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import { canManageBlog, canManageUsers, isAdminIT } from './data/users';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup/success" element={<SignUpSuccessPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomeRedirect />} />
            <Route
              path="users"
              element={
                <RequireRole allow={canManageUsers}>
                  <AdminUsersPage />
                </RequireRole>
              }
            />
            <Route
              path="content"
              element={
                <RequireRole allow={isAdminIT}>
                  <AdminContentPage />
                </RequireRole>
              }
            />
            <Route
              path="articles"
              element={
                <RequireRole allow={canManageBlog}>
                  <AdminArticlesPage />
                </RequireRole>
              }
            />
            <Route
              path="articles/create"
              element={
                <RequireRole allow={canManageBlog}>
                  <AdminArticleFormPage />
                </RequireRole>
              }
            />
            <Route
              path="articles/:id/edit"
              element={
                <RequireRole allow={canManageBlog}>
                  <AdminArticleFormPage />
                </RequireRole>
              }
            />
            <Route
              path="categories"
              element={
                <RequireRole allow={canManageBlog}>
                  <AdminCategoriesPage />
                </RequireRole>
              }
            />
            <Route path="profile" element={<AdminProfilePage />} />
            <Route path="notifications" element={<AdminNotificationsPage />} />
            <Route path="reset-password" element={<AdminResetPasswordPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
