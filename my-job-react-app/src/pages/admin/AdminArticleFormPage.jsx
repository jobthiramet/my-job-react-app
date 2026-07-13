import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  createAdminArticle,
  getAdminArticleById,
  getAdminCategories,
  updateAdminArticle,
} from '../../data/adminArticles';

const emptyForm = {
  title: '',
  category: '',
  description: '',
  thumbnail: '',
};

export default function AdminArticleFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const categories = getAdminCategories();
  const existing = isEdit ? getAdminArticleById(id) : null;

  const [form, setForm] = useState(() => {
    if (existing) {
      return {
        title: existing.title,
        category: existing.category,
        description: existing.description,
        thumbnail: existing.thumbnail,
      };
    }

    return {
      ...emptyForm,
      category: categories[0] || '',
    };
  });
  const [error, setError] = useState('');

  if (isEdit && !existing) {
    return <Navigate to="/admin/articles" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError('');
  }

  function handleThumbnailChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file for the thumbnail.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, thumbnail: String(reader.result || '') }));
      setError('');
    };
    reader.readAsDataURL(file);
  }

  function validate() {
    if (!form.title.trim()) return 'Title is required.';
    if (!form.category) return 'Category is required.';
    if (!form.description.trim()) return 'Description is required.';
    if (!form.thumbnail) return 'Please upload a thumbnail image.';
    return '';
  }

  function handleSave(status) {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (isEdit) {
      updateAdminArticle(id, {
        title: form.title,
        category: form.category,
        description: form.description,
        thumbnail: form.thumbnail,
        status,
      });

      navigate('/admin/articles', {
        state: {
          toast: `Article updated and saved as ${status}.`,
          statusFilter: status,
        },
      });
      return;
    }

    createAdminArticle({
      ...form,
      status,
      author: user?.name || 'Thompson P.',
    });

    navigate('/admin/articles', {
      state: {
        toast:
          status === 'draft'
            ? 'Article saved as draft successfully.'
            : 'Article published successfully.',
        statusFilter: status,
      },
    });
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>{isEdit ? 'Edit article' : 'Create article'}</h1>
          <p>
            {isEdit
              ? 'Update article details, then save your changes.'
              : 'Fill in article details, then save as draft or publish.'}
          </p>
        </div>
        <Link to="/admin/articles" className="admin-secondary-btn">
          Back to list
        </Link>
      </div>

      <form className="admin-form" onSubmit={(event) => event.preventDefault()}>
        <div className="admin-form-grid">
          <div className="admin-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Article title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="admin-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={6}
            placeholder="Write a short summary of the article..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="admin-field">
          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
          {form.thumbnail && (
            <img src={form.thumbnail} alt="Thumbnail preview" className="admin-thumb-preview" />
          )}
        </div>

        {error && <p className="admin-form-error">{error}</p>}

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-secondary-btn"
            onClick={() => handleSave('draft')}
          >
            Save as draft
          </button>
          <button
            type="button"
            className="admin-primary-btn"
            onClick={() => handleSave('published')}
          >
            {isEdit ? 'Save and publish' : 'Save and publish'}
          </button>
        </div>
      </form>
    </div>
  );
}
