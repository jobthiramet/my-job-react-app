import React, { useMemo, useState } from 'react';
import { Pencil, Search, Trash2 } from 'lucide-react';
import ConfirmModal from '../../components/admin/ConfirmModal';
import Toast from '../../components/admin/Toast';
import {
  createAdminCategory,
  deleteAdminCategory,
  filterAdminCategories,
  getAdminCategories,
  updateAdminCategory,
} from '../../data/adminArticles';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(() => getAdminCategories());
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');
  const [editTarget, setEditTarget] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [newCategory, setNewCategory] = useState('');

  const filtered = useMemo(
    () => filterAdminCategories(categories, search),
    [categories, search],
  );

  function refresh() {
    setCategories(getAdminCategories());
  }

  function handleCreate(event) {
    event.preventDefault();
    setError('');

    try {
      createAdminCategory(newCategory);
      setNewCategory('');
      refresh();
      setToast('Category created successfully.');
    } catch (err) {
      setError(err.message);
    }
  }

  function openEdit(name) {
    setEditTarget(name);
    setEditValue(name);
    setError('');
  }

  function handleEditSave(event) {
    event.preventDefault();
    setError('');

    try {
      updateAdminCategory(editTarget, editValue);
      setEditTarget(null);
      setEditValue('');
      refresh();
      setToast('Category updated successfully.');
    } catch (err) {
      setError(err.message);
    }
  }

  function handleDelete() {
    if (!deleteTarget) return;
    deleteAdminCategory(deleteTarget);
    setDeleteTarget(null);
    refresh();
    setToast('Category deleted successfully.');
  }

  return (
    <div className="admin-page">
      <Toast message={toast} onClose={() => setToast('')} />

      <div className="admin-page-header">
        <div>
          <h1>Category management</h1>
          <p>Search, edit, and delete article categories.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <form className="admin-inline-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(event) => {
            setNewCategory(event.target.value);
            if (error) setError('');
          }}
        />
        <button type="submit" className="admin-primary-btn">
          Add category
        </button>
      </form>

      {error && !editTarget && <p className="admin-form-error">{error}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={2} className="admin-empty">
                  No categories found.
                </td>
              </tr>
            ) : (
              filtered.map((category) => (
                <tr key={category}>
                  <td>
                    {editTarget === category ? (
                      <form className="admin-inline-form" onSubmit={handleEditSave}>
                        <input
                          type="text"
                          value={editValue}
                          onChange={(event) => setEditValue(event.target.value)}
                          autoFocus
                        />
                        <button type="submit" className="admin-primary-btn">
                          Save
                        </button>
                        <button
                          type="button"
                          className="admin-secondary-btn"
                          onClick={() => {
                            setEditTarget(null);
                            setError('');
                          }}
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <span className="admin-simple-card-title">{category}</span>
                    )}
                    {editTarget === category && error && (
                      <p className="admin-form-error">{error}</p>
                    )}
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button
                        type="button"
                        className="admin-icon-btn"
                        aria-label={`Edit ${category}`}
                        onClick={() => openEdit(category)}
                      >
                        <Pencil size={16} strokeWidth={1.75} />
                      </button>
                      <button
                        type="button"
                        className="admin-icon-btn admin-icon-btn-danger"
                        aria-label={`Delete ${category}`}
                        onClick={() => setDeleteTarget(category)}
                      >
                        <Trash2 size={16} strokeWidth={1.75} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete category?"
        message={`Are you sure you want to delete "${deleteTarget}"? Articles in this category will be moved to another category.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
