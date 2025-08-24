import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Close on click outside
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Focus management
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onMouseDown={handleClickOutside}
    >
      <div
        ref={modalRef}
        tabIndex={0}
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          minWidth: '320px',
          maxWidth: '90vw',
          outline: 'none',
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          style={{ marginTop: '1rem', float: 'right' }}
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
