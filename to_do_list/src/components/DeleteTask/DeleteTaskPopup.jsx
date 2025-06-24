// DeleteConfirmPopup.jsx
import React from 'react';

const DeleteConfirmPopup = ({
  showDeleteConfirm,
  todoToDelete,
  confirmDelete,
  setShowDeleteConfirm
}) => {
  if (!showDeleteConfirm || !todoToDelete) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this task?</p>
        <p>
          <strong>{todoToDelete.text || ''}</strong>
        </p>
        <div className="popup-buttons">
          <button className="addBtn" onClick={confirmDelete}>
            Yes, Delete
          </button>
          <button
            className="cancelBtn"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmPopup;
