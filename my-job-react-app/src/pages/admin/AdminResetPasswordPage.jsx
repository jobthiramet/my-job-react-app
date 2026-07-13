import React, { useState } from 'react';
import ConfirmModal from '../../components/admin/ConfirmModal';
import Toast from '../../components/admin/Toast';
import { useAuth } from '../../context/AuthContext';

export default function AdminResetPasswordPage() {
  const { user, changePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  function validate() {
    if (!password || password.length < 8) {
      return 'Password must be at least 8 characters.';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }

    return '';
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setToast('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setConfirmOpen(true);
  }

  function handleConfirmReset() {
    try {
      changePassword(password);
      setConfirmOpen(false);
      setPassword('');
      setConfirmPassword('');
      setToast(`Password reset successfully for ${user?.email}.`);
    } catch (err) {
      setConfirmOpen(false);
      setError(err.message);
    }
  }

  return (
    <div className="admin-page">
      <Toast message={toast} onClose={() => setToast('')} />

      <div className="admin-page-header">
        <div>
          <h1>Reset password</h1>
          <p>Update your admin account password.</p>
        </div>
      </div>

      <form className="admin-form admin-form-narrow" onSubmit={handleSubmit}>
        <div className="admin-field">
          <label htmlFor="password">New password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError('');
            }}
            placeholder="New password"
          />
        </div>
        <div className="admin-field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              if (error) setError('');
            }}
            placeholder="Confirm password"
          />
        </div>
        {error && <p className="admin-form-error">{error}</p>}
        <button type="submit" className="admin-primary-btn">
          Change password
        </button>
      </form>

      <ConfirmModal
        open={confirmOpen}
        title="Reset password?"
        message="Are you sure you want to reset your password? You will use the new password the next time you log in."
        confirmLabel="Reset"
        cancelLabel="Cancel"
        confirmVariant="primary"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
