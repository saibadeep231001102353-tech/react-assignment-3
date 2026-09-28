import React from 'react';
import { 
  Building, 
  Phone, 
  MapPin, 
  Home, 
  Edit3, 
  Trash2, 
  Hash, 
  Briefcase, 
  User,
  Eye,
  CheckCircle2
} from 'lucide-react';
import './EmployeeCard.css';

/**
 * EmployeeCard Component
 * Displays individual farm employee record strictly adhering to the assignment fields:
 * - Name
 * - Employee ID
 * - Department Name
 * - Gender
 * - Phone Number
 * - Local Address
 * - Permanent Address
 * Plus Edit and Delete event handlers.
 */
const EmployeeCard = ({ 
  employee, 
  onEdit, 
  onDelete, 
  onViewDetails 
}) => {
  const {
    id,
    name,
    employeeId,
    department,
    gender,
    phoneNumber,
    localAddress,
    permanentAddress,
    role,
    status
  } = employee;

  // Generate initials for stylized monogram avatar (No picture)
  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Department-specific avatar gradient
  const getDeptGradient = (deptName) => {
    if (deptName.includes('Crop')) return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    if (deptName.includes('Dairy')) return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
    if (deptName.includes('Greenhouse')) return 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)';
    if (deptName.includes('Machinery')) return 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)';
    if (deptName.includes('Quality')) return 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)';
    return 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)';
  };

  return (
    <article className="employee-card card-glass" id={`employee-card-${employeeId}`}>
      {/* Card Header: Avatar Monogram, Name, and Status */}
      <div className="card-top-banner">
        <div className="avatar-and-names">
          {/* Monogram Badge (No Picture) */}
          <div 
            className="emp-monogram-box" 
            style={{ background: getDeptGradient(department) }}
            title={`${name} - ${department}`}
          >
            <span className="emp-monogram-text">{getInitials(name)}</span>
          </div>

          <div className="emp-identity-group">
            <h3 className="emp-name" title={name}>{name}</h3>
            {role && <span className="emp-role-title">{role}</span>}
          </div>
        </div>

        {/* Operational Status Pill */}
        <div className={`status-tag status-${status?.toLowerCase().replace(/\s+/g, '-') || 'active'}`}>
          <span className="status-dot"></span>
          <span>{status || 'Active'}</span>
        </div>
      </div>

      {/* Card Details: Mandatory Fields */}
      <div className="card-details-body">
        {/* Row: Employee ID & Gender */}
        <div className="emp-meta-tags-row">
          <span className="emp-id-badge" title="Farm Employee ID">
            <Hash size={13} className="meta-icon text-emerald" />
            <span>{employeeId}</span>
          </span>

          <span className="emp-gender-badge" title={`Gender: ${gender}`}>
            <User size={13} className="meta-icon" />
            <span>{gender}</span>
          </span>
        </div>

        {/* Department Name */}
        <div className="detail-item" title="Farm Department">
          <Building size={16} className="item-icon icon-emerald" />
          <div className="item-content">
            <span className="item-label">Department</span>
            <span className="item-value font-highlight">{department}</span>
          </div>
        </div>

        {/* Phone Number */}
        <div className="detail-item" title="Contact Number">
          <Phone size={16} className="item-icon icon-cyan" />
          <div className="item-content">
            <span className="item-label">Phone</span>
            <a href={`tel:${phoneNumber}`} className="item-value phone-link">
              {phoneNumber}
            </a>
          </div>
        </div>

        {/* Local Address */}
        <div className="detail-item address-item" title="Local Residence Address">
          <Home size={16} className="item-icon icon-amber" />
          <div className="item-content">
            <span className="item-label">Local Address</span>
            <span className="item-value address-text">{localAddress}</span>
          </div>
        </div>

        {/* Permanent Address */}
        <div className="detail-item address-item" title="Permanent Native Address">
          <MapPin size={16} className="item-icon icon-forest" />
          <div className="item-content">
            <span className="item-label">Permanent Address</span>
            <span className="item-value address-text">{permanentAddress}</span>
          </div>
        </div>
      </div>

      {/* Card Action Controls: Edit, Delete, View */}
      <div className="card-actions-bar">
        <button 
          type="button" 
          className="card-action-btn btn-view"
          onClick={() => onViewDetails(employee)}
          title="View full employee profile"
        >
          <Eye size={15} />
          <span>Details</span>
        </button>

        <button 
          type="button" 
          className="card-action-btn btn-edit"
          onClick={() => onEdit(employee)}
          title={`Edit ${name}'s records`}
          id={`edit-btn-${employeeId}`}
        >
          <Edit3 size={15} />
          <span>Edit</span>
        </button>

        <button 
          type="button" 
          className="card-action-btn btn-delete"
          onClick={() => onDelete(employee)}
          title={`Delete ${name} from directory`}
          id={`delete-btn-${employeeId}`}
        >
          <Trash2 size={15} />
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
};

export default EmployeeCard;
