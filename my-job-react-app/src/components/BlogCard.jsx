import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogCard({ id, image, tag, title, description, author, date }) {
  return (
    <Link to={`/post/${id}`} className="article-card">
      <div className="card-poster">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="card-body">
        <span className="card-tag">{tag}</span>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>
        <div className="card-footer">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"
            alt={author}
            className="author-avatar"
          />
          <span className="author-name">{author}</span>
          <span className="divider">|</span>
          <span className="post-date">{date}</span>
        </div>
      </div>
    </Link>
  );
}
