import React from 'react';
import { 
  X, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  Home, 
  Hash, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Edit3,
  Shield,
  Clock,
  Sparkles
} from 'lucide-react';
import './EmployeeDetailModal.css';

/**
 * EmployeeDetailModal Component
 * Displays a comprehensive, clean, glassmorphism modal with the full employee record.
 * Strictly presents all required farm directory fields:
 * - Employee Name
 * - Employee ID
 * - Department Name
 * - Gender
 * - Phone Number
 * - Local Address
 * - Permanent Address
 * Plus operational role, status badge, join date, and direct edit action.
 */
const EmployeeDetailModal = ({
  employee,
  onClose,
  onEdit
}) => {
  if (!employee) return null;

  // Stylized monogram avatar (no picture)
  const initials = employee.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const getDeptColor = (dept) => {
    if (dept.includes('Crop')) return '#10b981';
    if (dept.includes('Dairy')) return '#3b82f6';
    if (dept.includes('Horticulture')) return '#8b5cf6';
    if (dept.includes('Poultry')) return '#f59e0b';
    if (dept.includes('Machinery')) return '#ec4899';
    return '#14b8a6';
  };

  return (
    <div className="detail-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="detail-modal-container card-glass" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header */}
        <div className="detail-modal-header">
          <div className="header-badge-row">
            <span className="badge-pill dept-pill" style={{ borderColor: getDeptColor(employee.department) }}>
              <Building2 size={13} />
              <span>{employee.department}</span>
            </span>
            <span className={`status-pill status-${employee.status?.toLowerCase() || 'active'}`}>
              <CheckCircle2 size={13} />
              <span>{employee.status || 'Active'}</span>
            </span>
          </div>

          <button 
            type="button" 
            className="modal-close-icon-btn" 
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Employee Identity Hero Banner */}
        <div className="detail-hero-section">
          <div className="detail-avatar-monogram">
            {initials}
          </div>
          <div className="detail-hero-info">
            <h2 className="detail-employee-name">{employee.name}</h2>
            <div className="detail-sub-meta">
              <span className="detail-role">
                <Briefcase size={14} />
                <span>{employee.role || 'Farm Specialist'}</span>
              </span>
              <span className="detail-empid-tag">
                <Hash size={13} />
                <code>{employee.employeeId}</code>
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Attribute Grid */}
        <div className="detail-content-body">
          <div className="detail-field-group">
            <h4 className="section-label">Contact & Demographic Details</h4>
            <div className="attributes-grid-2col">
              <div className="attr-item card-glass-subtle">
                <div className="attr-icon-box">
                  <User size={18} />
                </div>
                <div className="attr-text">
                  <span className="attr-title">Gender</span>
                  <span className="attr-value">{employee.gender}</span>
                </div>
              </div>

              <div className="attr-item card-glass-subtle">
                <div className="attr-icon-box">
                  <Phone size={18} />
                </div>
                <div className="attr-text">
                  <span className="attr-title">Contact Phone</span>
                  <a href={`tel:${employee.phoneNumber}`} className="attr-link">
                    {employee.phoneNumber}
                  </a>
                </div>
              </div>

              <div className="attr-item card-glass-subtle">
                <div className="attr-icon-box">
                  <Calendar size={18} />
                </div>
                <div className="attr-text">
                  <span className="attr-title">Date Registered</span>
                  <span className="attr-value">{employee.dateJoined || 'March 2024'}</span>
                </div>
              </div>

              <div className="attr-item card-glass-subtle">
                <div className="attr-icon-box">
                  <Shield size={18} />
                </div>
                <div className="attr-text">
                  <span className="attr-title">Employment Status</span>
                  <span className="attr-value">{employee.status || 'Active'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Residence & Location Addresses */}
          <div className="detail-field-group">
            <h4 className="section-label">Residential Address Records</h4>
            
            <div className="address-detail-block card-glass-subtle">
              <div className="addr-header-row">
                <div className="addr-icon-pill local-icon-pill">
                  <MapPin size={16} />
                  <span>Local Address (Farm Proximity)</span>
                </div>
                <span className="addr-tag">Current</span>
              </div>
              <p className="addr-content-text">{employee.localAddress}</p>
            </div>

            <div className="address-detail-block card-glass-subtle">
              <div className="addr-header-row">
                <div className="addr-icon-pill permanent-icon-pill">
                  <Home size={16} />
                  <span>Permanent Address (Official Record)</span>
                </div>
                <span className="addr-tag">Permanent</span>
              </div>
              <p className="addr-content-text">{employee.permanentAddress}</p>
            </div>
          </div>

          {/* Additional Farm Operational Notes */}
          <div className="field-notes-box">
            <Sparkles size={16} className="notes-icon" />
            <p className="notes-text">
              Assigned to active field duties at GreenValley Agricultural Division under 
              <strong> {employee.department}</strong>. Verified ID: <code>{employee.employeeId}</code>.
            </p>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="detail-modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary modal-footer-btn"
            onClick={onClose}
          >
            Close Details
          </button>
          <button 
            type="button" 
            className="btn btn-primary modal-footer-btn"
            onClick={() => {
              onClose();
              onEdit(employee);
            }}
          >
            <Edit3 size={16} />
            <span>Edit Employee Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;
