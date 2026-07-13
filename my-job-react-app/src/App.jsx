import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SignUpSuccessPage from './pages/SignUpSuccessPage';
import ProfilePage from './pages/ProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PostDetailPage from './pages/PostDetailPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminArticlesPage from './pages/admin/AdminArticlesPage';
import AdminArticleFormPage from './pages/admin/AdminArticleFormPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminResetPasswordPage from './pages/admin/AdminResetPasswordPage';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup/success" element={<SignUpSuccessPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="articles" replace />} />
            <Route path="articles" element={<AdminArticlesPage />} />
            <Route path="articles/create" element={<AdminArticleFormPage />} />
            <Route path="articles/:id/edit" element={<AdminArticleFormPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="profile" element={<AdminProfilePage />} />
            <Route path="notifications" element={<AdminNotificationsPage />} />
            <Route path="reset-password" element={<AdminResetPasswordPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
