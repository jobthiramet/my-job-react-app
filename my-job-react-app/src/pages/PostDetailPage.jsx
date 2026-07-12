import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PostComments from '../components/PostComments';
import { AUTHOR_BIO, getMovieById } from '../data/movies';

export default function PostDetailPage() {
  const { id } = useParams();
  const post = getMovieById(id);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="app-container">
        <NavBar />
        <main className="post-detail">
          <img src={post.image} alt={post.title} className="post-hero" />

          <div className="post-layout">
            <article className="post-main">
              <div className="post-meta">
                <span className="post-tag">{post.tag}</span>
                <span className="post-date-text">{post.date}</span>
              </div>

              <h1 className="post-title">{post.title}</h1>

              <p className="post-intro">{post.content.intro}</p>

              {post.content.sections.map((section) => (
                <section key={section.heading} className="post-section">
                  <h2 className="post-section-heading">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="post-paragraph">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="post-bullets">
                      {section.bullets.map((bullet) => (
                        <li key={bullet.label}>
                          <strong>{bullet.label}</strong> {bullet.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <PostComments postId={post.id} />

              <Link to="/" className="post-back-link">
                ← Back to all reviews
              </Link>
            </article>

            <aside className="post-sidebar">
              <div className="author-card">
                <div className="author-card-header">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                    alt={post.author}
                    className="author-card-avatar"
                  />
                  <div>
                    <p className="author-card-label">Author</p>
                    <p className="author-card-name">{post.author}</p>
                  </div>
                </div>
                <p className="author-card-bio">{AUTHOR_BIO}</p>
              </div>
            </aside>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
