'use client';

import { useEffect } from 'react';

interface ToastProps {
  show: boolean;
  message: string;
  success: boolean;
  onClose: () => void;
}

export default function Toast({ show, message, success, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`toast-notification ${success ? 'toast-success' : 'toast-error'}`}
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 9999,
        minWidth: '300px',
        padding: '15px 20px',
        borderRadius: '4px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        backgroundColor: success ? '#d4edda' : '#f8d7da',
        color: success ? '#155724' : '#721c24',
        border: `1px solid ${success ? '#c3e6cb' : '#f5c6cb'}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            marginLeft: '10px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: 'inherit',
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
