import React, { useState } from 'react';
import Toast from '../../components/admin/Toast';
import { useAuth } from '../../context/AuthContext';

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80';

export default function AdminProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError('');
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file for your profile picture.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, avatar: String(reader.result || '') }));
      setError('');
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('Name is required.');
      return;
    }

    if (!form.username.trim()) {
      setError('Username is required.');
      return;
    }

    try {
      const saved = updateProfile({
        name: form.name,
        username: form.username,
        avatar: form.avatar,
      });
      setForm({
        name: saved.name || '',
        username: saved.username || '',
        email: saved.email || '',
        avatar: saved.avatar || '',
      });
      setToast('Profile updated successfully.');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-page">
      <Toast message={toast} onClose={() => setToast('')} />

      <div className="admin-page-header">
        <div>
          <h1>Profile</h1>
          <p>View and update your admin profile information.</p>
        </div>
      </div>

      <form className="admin-form admin-form-narrow" onSubmit={handleSubmit}>
        <div className="admin-profile-avatar-block">
          <img
            src={form.avatar || DEFAULT_AVATAR}
            alt={form.name || 'Profile'}
            className="admin-profile-avatar"
          />
          <div className="admin-field">
            <label htmlFor="avatar">Profile picture</label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        <div className="admin-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="admin-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="admin-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} disabled />
        </div>

        <div className="admin-field">
          <label>Role</label>
          <input type="text" value="Admin" disabled />
        </div>

        {error && <p className="admin-form-error">{error}</p>}

        <button type="submit" className="admin-primary-btn">
          Save changes
        </button>
      </form>
    </div>
  );
}
