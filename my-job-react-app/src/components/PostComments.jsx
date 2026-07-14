import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Smile, Link2, Trash2 } from 'lucide-react';
import ConfirmModal from './admin/ConfirmModal';
import { useAuth } from '../context/AuthContext';
import { canModerateContent } from '../data/users';
import {
  addCommentToPost,
  deleteCommentFromPost,
  formatCommentDate,
  getCommentsForPost,
  getGuestId,
  getLikeState,
  togglePostLike,
} from '../data/comments';

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.84c0-2.37 1.4-3.68 3.55-3.68 1.03 0 2.11.18 2.11.18v2.33h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.91h-2.2V22c4.78-.75 8.44-4.91 8.44-9.93z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"
      />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.924L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

export default function PostComments({ postId }) {
  const { user } = useAuth();
  const likeUserKey = user?.email || getGuestId();
  const canDeleteComments = canModerateContent(user);
  const [comments, setComments] = useState(() => getCommentsForPost(postId));
  const [likeState, setLikeState] = useState(() => getLikeState(postId, likeUserKey));
  const [text, setText] = useState('');
  const [copyLabel, setCopyLabel] = useState('Copy link');
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    setComments(getCommentsForPost(postId));
    setLikeState(getLikeState(postId, likeUserKey));
    setText('');
    setError('');
    setDeleteTarget(null);
  }, [postId, likeUserKey]);

  function handleToggleLike() {
    setLikeState(togglePostLike(postId, likeUserKey));
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        setCopyLabel('Copied!');
        window.setTimeout(() => setCopyLabel('Copy link'), 1600);
      },
      () => {
        setCopyLabel('Failed');
        window.setTimeout(() => setCopyLabel('Copy link'), 1600);
      },
    );
  }

  function handleSend(event) {
    event.preventDefault();
    setError('');

    if (!user) {
      setError('Please log in to leave a comment.');
      return;
    }

    if (!text.trim()) {
      setError('Please write a comment before sending.');
      return;
    }

    const nextComments = addCommentToPost(postId, {
      name: user.name,
      text,
    });

    setComments(nextComments);
    setText('');
  }

  function handleDeleteComment() {
    if (!deleteTarget) return;
    const nextComments = deleteCommentFromPost(postId, deleteTarget.id);
    setComments(nextComments);
    setDeleteTarget(null);
  }

  return (
    <section className="post-comments">
      <div className="comment-actions-bar">
        <button
          type="button"
          className={`comment-reaction ${likeState.liked ? 'is-liked' : ''}`}
          aria-label={likeState.liked ? 'Unlike this post' : 'Like this post'}
          aria-pressed={likeState.liked}
          onClick={handleToggleLike}
        >
          <Smile className="comment-action-icon" strokeWidth={1.75} />
          <span>{likeState.count}</span>
        </button>

        <div className="comment-share-group">
          <button type="button" className="comment-copy-link" onClick={handleCopyLink}>
            <Link2 className="comment-action-icon" strokeWidth={1.75} />
            <span>{copyLabel}</span>
          </button>

          <a
            className="comment-social comment-social-facebook"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on Facebook"
          >
            <FacebookIcon className="comment-social-icon" />
          </a>
          <a
            className="comment-social comment-social-linkedin"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on LinkedIn"
          >
            <LinkedInIcon className="comment-social-icon" />
          </a>
          <a
            className="comment-social comment-social-x"
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on X"
          >
            <XIcon className="comment-social-icon" />
          </a>
        </div>
      </div>

      <form className="comment-form" onSubmit={handleSend}>
        <label htmlFor="post-comment" className="comment-form-label">
          Comment
        </label>
        <textarea
          id="post-comment"
          className="comment-textarea"
          placeholder="What are your thoughts?"
          rows={5}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            if (error) setError('');
          }}
        />
        {error && (
          <p className="comment-form-error">
            {error}
            {!user && (
              <>
                {' '}
                <Link to="/login">Log in</Link>
              </>
            )}
          </p>
        )}
        <button type="submit" className="comment-send">
          Send
        </button>
      </form>

      <div className="comment-list">
        {comments.map((comment) => (
          <article key={comment.id} className="comment-item">
            <img src={comment.avatar} alt={comment.name} className="comment-avatar" />
            <div className="comment-body">
              <div className="comment-meta">
                <span className="comment-author">{comment.name}</span>
                <span className="comment-time">{formatCommentDate(comment.createdAt)}</span>
                {canDeleteComments && (
                  <button
                    type="button"
                    className="comment-delete-btn"
                    aria-label={`Delete comment by ${comment.name}`}
                    onClick={() => setDeleteTarget(comment)}
                  >
                    <Trash2 size={14} strokeWidth={1.75} />
                    Delete
                  </button>
                )}
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          </article>
        ))}
      </div>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete comment?"
        message="Are you sure you want to delete this comment? This cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteComment}
      />
    </section>
  );
}
