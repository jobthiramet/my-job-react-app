import React, { useCallback, useEffect, useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import ConfirmModal from '../../components/admin/ConfirmModal';
import Toast from '../../components/admin/Toast';
import {
  deleteAdminArticle,
  filterAdminArticles,
  getAdminArticles,
  getAdminCategories,
} from '../../data/adminArticles';

export default function AdminContentPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [articles, setArticles] = useState(() => getAdminArticles());
  const [categories, setCategories] = useState(() => getAdminCategories());
  const [toast, setToast] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const refresh = useCallback(() => {
    setArticles(getAdminArticles());
    setCategories(getAdminCategories());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filtered = filterAdminArticles(articles, {
    search,
    status: 'published',
    category,
  });

  function handleDelete() {
    if (!deleteTarget) return;
    deleteAdminArticle(deleteTarget.id);
    setDeleteTarget(null);
    refresh();
    setToast('Blog content deleted successfully.');
  }

  return (
    <div className="admin-page">
      <Toast message={toast} onClose={() => setToast('')} />

      <div className="admin-page-header">
        <div>
          <h1>Blog content</h1>
          <p>Review published posts and remove content from the public blog.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search className="admin-search-icon" size={18} strokeWidth={1.75} />
          <input
            type="search"
            placeholder="Search posts..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <select
          className="admin-select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.category}</td>
                <td>{article.author}</td>
                <td>{article.date}</td>
                <td>
                  <button
                    type="button"
                    className="admin-icon-btn admin-icon-btn-danger"
                    aria-label={`Delete ${article.title}`}
                    onClick={() => setDeleteTarget(article)}
                  >
                    <Trash2 size={16} strokeWidth={1.75} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5}>No published posts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete blog content?"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? It will be removed from the public blog.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
