import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import ConfirmModal from '../../components/admin/ConfirmModal';
import Toast from '../../components/admin/Toast';
import {
  deleteAdminArticle,
  filterAdminArticles,
  getAdminArticles,
  getAdminCategories,
} from '../../data/adminArticles';

export default function AdminArticlesPage() {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(location.state?.statusFilter || 'all');
  const [category, setCategory] = useState('all');
  const [articles, setArticles] = useState(() => getAdminArticles());
  const [categories, setCategories] = useState(() => getAdminCategories());
  const [toast, setToast] = useState(location.state?.toast || '');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const refresh = useCallback(() => {
    setArticles(getAdminArticles());
    setCategories(getAdminCategories());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh, location.key]);

  useEffect(() => {
    if (location.state?.toast) {
      setToast(location.state.toast);
    }
    if (location.state?.statusFilter) {
      setStatus(location.state.statusFilter);
    }
  }, [location.state]);

  const filtered = filterAdminArticles(articles, { search, status, category });

  function handleDelete() {
    if (!deleteTarget) return;
    deleteAdminArticle(deleteTarget.id);
    setDeleteTarget(null);
    refresh();
    setToast('Article deleted successfully.');
  }

  return (
    <div className="admin-page">
      <Toast message={toast} onClose={() => setToast('')} />

      <div className="admin-page-header">
        <div>
          <h1>Article management</h1>
          <p>View, search, edit, and delete articles.</p>
        </div>
        <Link to="/admin/articles/create" className="admin-primary-btn">
          <Plus size={18} strokeWidth={2} />
          Create article
        </Link>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          className="admin-select"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <select
          className="admin-select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by category"
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
              <th>Article</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="admin-empty">
                  No articles found.
                </td>
              </tr>
            ) : (
              filtered.map((article) => (
                <tr key={article.id}>
                  <td>
                    <div className="admin-article-cell">
                      <img
                        src={article.thumbnail}
                        alt=""
                        className="admin-article-thumb"
                      />
                      <div>
                        <p className="admin-article-title">{article.title}</p>
                        <p className="admin-article-desc">{article.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>{article.category}</td>
                  <td>
                    <span className={`admin-status admin-status-${article.status}`}>
                      {article.status}
                    </span>
                  </td>
                  <td>{article.date}</td>
                  <td>{article.author}</td>
                  <td>
                    <div className="admin-row-actions">
                      <Link
                        to={`/admin/articles/${article.id}/edit`}
                        className="admin-icon-btn"
                        aria-label={`Edit ${article.title}`}
                      >
                        <Pencil size={16} strokeWidth={1.75} />
                      </Link>
                      <button
                        type="button"
                        className="admin-icon-btn admin-icon-btn-danger"
                        aria-label={`Delete ${article.title}`}
                        onClick={() => setDeleteTarget(article)}
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
        title="Delete article?"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
