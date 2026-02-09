import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import styles from './DeleteModal.module.css';

const DeleteModal = ({ isOpen, onClose, onConfirm, questionTitle, loading }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          <FaTimes />
        </button>

        <div className={styles.modalHeader}>
          <FaExclamationTriangle className={styles.warningIcon} />
          <h2>Delete Question</h2>
        </div>

        <div className={styles.modalBody}>
          <p>Are you sure you want to delete this question?</p>
          <div className={styles.questionTitleBox}>
            <strong>{questionTitle}</strong>
          </div>
          <p className={styles.warningText}>
            This action cannot be undone. The question will be permanently removed from the platform.
          </p>
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={`${styles.btn} ${styles.btnOutline}`}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className={`${styles.btn} ${styles.btnDanger}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;