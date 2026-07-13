import React from 'react';
import { Link } from 'react-router-dom';

const notifications = [
  {
    id: 1,
    title: 'New comment on Obsession',
    detail: 'A reader left a new comment on the Obsession review.',
    time: '2 hours ago',
    to: '/post/1',
    viewLabel: 'View article',
  },
  {
    id: 2,
    title: 'Draft article waiting for review',
    detail: 'Open Article management and filter by draft status.',
    time: 'Yesterday',
    to: '/admin/articles',
    viewLabel: 'View articles',
  },
  {
    id: 3,
    title: 'Category list updated',
    detail: 'Review categories and keep them organized.',
    time: '2 days ago',
    to: '/admin/categories',
    viewLabel: 'View categories',
  },
  {
    id: 4,
    title: 'Profile reminder',
    detail: 'Make sure your admin profile details are up to date.',
    time: '3 days ago',
    to: '/admin/profile',
    viewLabel: 'View profile',
  },
];

export default function AdminNotificationsPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Notification</h1>
          <p>Recent admin alerts and updates.</p>
        </div>
      </div>

      <div className="admin-notification-list">
        {notifications.map((item) => (
          <article key={item.id} className="admin-notification-card">
            <div className="admin-notification-body">
              <p className="admin-simple-card-title">{item.title}</p>
              <p className="admin-notification-detail">{item.detail}</p>
              <p className="admin-simple-card-meta">{item.time}</p>
            </div>
            <Link to={item.to} className="admin-secondary-btn">
              View
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
