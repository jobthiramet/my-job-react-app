import React, { useEffect } from 'react';

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  confirmVariant = 'danger',
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return undefined;

    function handleEscape(event) {
      if (event.key === 'Escape') {
        onCancel?.();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onCancel]);

  if (!open) return null;

  const confirmClass =
    confirmVariant === 'primary' ? 'admin-primary-btn' : 'admin-danger-btn';

  return (
    <div className="admin-modal-backdrop" onClick={onCancel} role="presentation">
      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="admin-modal-title">{title}</h2>
        <p>{message}</p>
        <div className="admin-modal-actions">
          <button type="button" className="admin-secondary-btn" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className={confirmClass} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
