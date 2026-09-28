import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import './DeleteConfirmModal.css';

/**
 * DeleteConfirmModal Component
 * Prompts user for confirmation before executing the delete event.
 */
const DeleteConfirmModal = ({ 
  employee, 
  onConfirm, 
  onClose 
}) => {
  if (!employee) return null;

  return (
    <div className="delete-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="delete-modal-container card-glass" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="delete-close-btn"
          onClick={onClose}
          aria-label="Cancel deletion"
        >
          <X size={18} />
        </button>

        <div className="delete-modal-content">
          <div className="delete-icon-box">
            <AlertTriangle size={36} />
          </div>

          <h3 className="delete-title">Delete Employee Record?</h3>
          <p className="delete-message">
            Are you sure you want to delete <strong>{employee.name}</strong> (ID: <code>{employee.employeeId}</code>) 
            from the <strong>{employee.department}</strong> roster? This operation will remove the record from active memory.
          </p>

          <div className="delete-actions-group">
            <button 
              type="button" 
              className="btn btn-secondary cancel-delete-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-danger confirm-delete-btn"
              onClick={() => onConfirm(employee.id)}
              id="confirm-delete-action-btn"
            >
              <Trash2 size={16} />
              <span>Confirm Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
