import React, { useState, useEffect } from 'react';
import { 
  X, 
  UserPlus, 
  Edit3, 
  Building2, 
  User, 
  Phone, 
  Home, 
  MapPin, 
  Hash, 
  Briefcase, 
  AlertCircle,
  Copy
} from 'lucide-react';
import { farmDepartments, genderOptions } from '../data/initialEmployees';
import './EmployeeFormModal.css';

/**
 * EmployeeFormModal Component
 * Reusable modal for Adding a new employee and Editing existing employee details.
 * Manages controlled form state, input validation, and submission events.
 */
const EmployeeFormModal = ({
  isOpen,
  mode = 'add', // 'add' or 'edit'
  initialData = null,
  onSave,
  onClose
}) => {
  // Available departments excluding 'All Departments'
  const selectableDepartments = farmDepartments.filter((d) => d !== 'All Departments');

  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: selectableDepartments[0] || '',
    gender: 'Male',
    phoneNumber: '',
    localAddress: '',
    permanentAddress: '',
    role: '',
    status: 'Active'
  });

  const [sameAsLocal, setSameAsLocal] = useState(false);
  const [errors, setErrors] = useState({});

  // Sync state when editing existing employee or opening fresh add modal
  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        id: initialData.id,
        name: initialData.name || '',
        employeeId: initialData.employeeId || '',
        department: initialData.department || selectableDepartments[0],
        gender: initialData.gender || 'Male',
        phoneNumber: initialData.phoneNumber || '',
        localAddress: initialData.localAddress || '',
        permanentAddress: initialData.permanentAddress || '',
        role: initialData.role || '',
        status: initialData.status || 'Active'
      });
      setSameAsLocal(initialData.localAddress === initialData.permanentAddress);
    } else {
      // Defaults for new employee
      const randomNum = Math.floor(100 + Math.random() * 900);
      setFormData({
        name: '',
        employeeId: `FRM-${randomNum}`,
        department: selectableDepartments[0],
        gender: 'Male',
        phoneNumber: '',
        localAddress: '',
        permanentAddress: '',
        role: 'Field Associate',
        status: 'Active'
      });
      setSameAsLocal(false);
    }
    setErrors({});
  }, [initialData, mode, isOpen]);

  // Handle generic input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'localAddress' && sameAsLocal) {
        updated.permanentAddress = value;
      }
      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Toggle "Same as Local Address" checkbox
  const handleSameAddressToggle = (e) => {
    const checked = e.target.checked;
    setSameAsLocal(checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, permanentAddress: prev.localAddress }));
      if (errors.permanentAddress) {
        setErrors((prev) => ({ ...prev, permanentAddress: null }));
      }
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Employee Name is required';
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (formData.phoneNumber.trim().length < 8) {
      newErrors.phoneNumber = 'Enter a valid phone number';
    }
    if (!formData.localAddress.trim()) newErrors.localAddress = 'Local address is required';
    if (!formData.permanentAddress.trim()) newErrors.permanentAddress = 'Permanent address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit event handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSave({
      ...formData,
      id: initialData?.id || `emp-${Date.now()}`
    });
  };

  if (!isOpen) return null;

  return (
    <div className="form-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="form-modal-container card-glass" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="form-modal-header">
          <div className="header-icon-box">
            {mode === 'add' ? <UserPlus size={22} /> : <Edit3 size={22} />}
          </div>
          <div className="header-title-group">
            <h2 className="form-modal-title">
              {mode === 'add' ? 'Register New Farm Employee' : 'Edit Employee Details'}
            </h2>
            <p className="form-modal-subtitle">
              {mode === 'add' 
                ? 'Fill in the official farm employee records. All fields are required.' 
                : `Updating employee profile for ${formData.name || 'Staff Member'}`}
            </p>
          </div>
          <button 
            type="button" 
            className="form-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-grid">
            {/* Full Name */}
            <div className="form-field full-width">
              <label htmlFor="name" className="field-label">
                Full Name <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Chandra Paul"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                />
              </div>
              {errors.name && <span className="error-text"><AlertCircle size={12} /> {errors.name}</span>}
            </div>

            {/* Employee ID */}
            <div className="form-field">
              <label htmlFor="employeeId" className="field-label">
                Employee ID <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <Hash size={16} className="input-icon" />
                <input 
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  placeholder="e.g. FRM-0101"
                  className={`form-input font-code ${errors.employeeId ? 'input-error' : ''}`}
                />
              </div>
              {errors.employeeId && <span className="error-text"><AlertCircle size={12} /> {errors.employeeId}</span>}
            </div>

            {/* Phone Number */}
            <div className="form-field">
              <label htmlFor="phoneNumber" className="field-label">
                Phone Number <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <Phone size={16} className="input-icon" />
                <input 
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g. +91 98301 23456"
                  className={`form-input font-code ${errors.phoneNumber ? 'input-error' : ''}`}
                />
              </div>
              {errors.phoneNumber && <span className="error-text"><AlertCircle size={12} /> {errors.phoneNumber}</span>}
            </div>

            {/* Department */}
            <div className="form-field">
              <label htmlFor="department" className="field-label">
                Department Name <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <Building2 size={16} className="input-icon" />
                <select 
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-select"
                >
                  {selectableDepartments.map((dept, idx) => (
                    <option key={idx} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gender */}
            <div className="form-field">
              <label className="field-label">
                Gender <span className="required-star">*</span>
              </label>
              <div className="gender-radio-group">
                {genderOptions.map((g) => (
                  <label key={g} className={`gender-radio-label ${formData.gender === g ? 'active' : ''}`}>
                    <input 
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="hidden-radio"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Role / Designation */}
            <div className="form-field">
              <label htmlFor="role" className="field-label">
                Farm Role / Position
              </label>
              <div className="input-with-icon">
                <Briefcase size={16} className="input-icon" />
                <input 
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Agronomist / Field Lead"
                  className="form-input"
                />
              </div>
            </div>

            {/* Operational Status */}
            <div className="form-field">
              <label htmlFor="status" className="field-label">
                Operational Status
              </label>
              <select 
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Active">Active & On-Duty</option>
                <option value="On Field">On Field Operations</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>

            {/* Local Address */}
            <div className="form-field full-width">
              <label htmlFor="localAddress" className="field-label">
                Local Address (Farm / Nearby Residence) <span className="required-star">*</span>
              </label>
              <div className="input-with-icon textarea-wrapper">
                <Home size={16} className="input-icon icon-top" />
                <textarea 
                  id="localAddress"
                  name="localAddress"
                  rows="2"
                  value={formData.localAddress}
                  onChange={handleChange}
                  placeholder="e.g. Staff Quarter A-12, GreenValley Farm Campus, Burdwan, WB"
                  className={`form-textarea ${errors.localAddress ? 'input-error' : ''}`}
                />
              </div>
              {errors.localAddress && <span className="error-text"><AlertCircle size={12} /> {errors.localAddress}</span>}
            </div>

            {/* Same as Local Address Helper Checkbox */}
            <div className="form-field full-width checkbox-field">
              <label className="checkbox-label">
                <input 
                  type="checkbox"
                  checked={sameAsLocal}
                  onChange={handleSameAddressToggle}
                  className="form-checkbox"
                />
                <span>Permanent address is same as local address</span>
              </label>
            </div>

            {/* Permanent Address */}
            <div className="form-field full-width">
              <label htmlFor="permanentAddress" className="field-label">
                Permanent Address (Native Hometown Residence) <span className="required-star">*</span>
              </label>
              <div className="input-with-icon textarea-wrapper">
                <MapPin size={16} className="input-icon icon-top" />
                <textarea 
                  id="permanentAddress"
                  name="permanentAddress"
                  rows="2"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  disabled={sameAsLocal}
                  placeholder="e.g. Vill: Kanthalberia, Post: Sonarpur, South 24 Parganas, WB"
                  className={`form-textarea ${errors.permanentAddress ? 'input-error' : ''} ${sameAsLocal ? 'textarea-disabled' : ''}`}
                />
              </div>
              {errors.permanentAddress && <span className="error-text"><AlertCircle size={12} /> {errors.permanentAddress}</span>}
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="form-modal-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary submit-record-btn"
              id="submit-employee-form-btn"
            >
              {mode === 'add' ? (
                <>
                  <UserPlus size={16} />
                  <span>Register Employee</span>
                </>
              ) : (
                <>
                  <Edit3 size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
