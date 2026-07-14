import React, { useMemo, useState } from 'react';
import { Pencil, Search, Trash2 } from 'lucide-react';
import ConfirmModal from '../../components/admin/ConfirmModal';
import Toast from '../../components/admin/Toast';
import { useAuth } from '../../context/AuthContext';
import {
  ASSIGNABLE_ROLES,
  deleteManagedUser,
  getPublicUsers,
  getRoleLabel,
  updateManagedUser,
} from '../../data/users';

export default function AdminUsersPage() {
  const { user: actor } = useAuth();
  const [users, setUsers] = useState(() => getPublicUsers());
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');
  const [editTarget, setEditTarget] = useState(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('user');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.username.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        getRoleLabel(item.role).toLowerCase().includes(query),
    );
  }, [users, search]);

  function refresh() {
    setUsers(getPublicUsers());
  }

  function openEdit(target) {
    setError('');
    setEditTarget(target);
    setEditName(target.name);
    setEditRole(target.role);
  }

  function handleSaveEdit(event) {
    event.preventDefault();
    setError('');

    try {
      updateManagedUser(
        editTarget.email,
        { name: editName, role: editRole },
        actor?.email,
      );
      setEditTarget(null);
      refresh();
      setToast('User updated successfully.');
    } catch (err) {
      setError(err.message);
    }
  }

  function handleDelete() {
    if (!deleteTarget) return;

    try {
      deleteManagedUser(deleteTarget.email, actor?.email);
      setDeleteTarget(null);
      refresh();
      setToast('User deleted successfully.');
    } catch (err) {
      setDeleteTarget(null);
      setError(err.message);
    }
  }

  return (
    <div className="admin-page">
      <Toast message={toast} onClose={() => setToast('')} />

      <div className="admin-page-header">
        <div>
          <h1>User management</h1>
          <p>View all users, edit names, assign roles, or delete accounts.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search className="admin-search-icon" size={18} strokeWidth={1.75} />
          <input
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      {error && !editTarget && <p className="admin-form-error">{error}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.email}>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  <span className={`admin-role-badge role-${item.role}`}>
                    {getRoleLabel(item.role)}
                  </span>
                </td>
                <td>
                  <div className="admin-row-actions">
                    <button
                      type="button"
                      className="admin-icon-btn"
                      aria-label={`Edit ${item.name}`}
                      onClick={() => openEdit(item)}
                    >
                      <Pencil size={16} strokeWidth={1.75} />
                    </button>
                    <button
                      type="button"
                      className="admin-icon-btn admin-icon-btn-danger"
                      aria-label={`Delete ${item.name}`}
                      onClick={() => {
                        setError('');
                        setDeleteTarget(item);
                      }}
                    >
                      <Trash2 size={16} strokeWidth={1.75} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editTarget && (
        <div className="admin-modal-backdrop" role="presentation" onClick={() => setEditTarget(null)}>
          <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-user-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="edit-user-title">Edit user</h2>
            <form className="admin-form" onSubmit={handleSaveEdit}>
              <div className="admin-field">
                <label htmlFor="edit-user-email">Email</label>
                <input id="edit-user-email" value={editTarget.email} disabled />
              </div>
              <div className="admin-field">
                <label htmlFor="edit-user-name">Name</label>
                <input
                  id="edit-user-name"
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                  required
                />
              </div>
              <div className="admin-field">
                <label htmlFor="edit-user-role">Role</label>
                <select
                  id="edit-user-role"
                  className="admin-select"
                  value={editRole}
                  onChange={(event) => setEditRole(event.target.value)}
                >
                  {ASSIGNABLE_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {getRoleLabel(role)}
                    </option>
                  ))}
                </select>
              </div>
              {error && <p className="admin-form-error">{error}</p>}
              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => setEditTarget(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete user?"
        message={`Are you sure you want to delete ${deleteTarget?.name}? This cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
