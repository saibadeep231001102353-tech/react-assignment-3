import React from 'react';
import EmployeeCard from './EmployeeCard';
import { UserX, UserPlus, Sparkles } from 'lucide-react';
import './EmployeeList.css';

/**
 * EmployeeList Component
 * Renders the collection of EmployeeCard components in a responsive grid.
 * Displays an empty state when no matching employees are found.
 */
const EmployeeList = ({ 
  employees, 
  onEdit, 
  onDelete, 
  onViewDetails, 
  onOpenAddModal,
  selectedDepartment
}) => {
  if (employees.length === 0) {
    return (
      <section className="employee-list-section">
        <div className="container">
          <div className="empty-directory-card card-glass">
            <div className="empty-icon-circle">
              <UserX size={44} />
            </div>
            <h3 className="empty-title">No Farm Employees Found</h3>
            <p className="empty-subtitle">
              No staff records matched your current search query or the "{selectedDepartment}" filter.
              Try clearing your filters or register a new farm employee.
            </p>
            <button 
              type="button" 
              className="btn btn-primary empty-add-btn"
              onClick={onOpenAddModal}
            >
              <UserPlus size={16} />
              <span>Add New Farm Employee</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="employee-list-section" id="employee-roster">
      <div className="container">
        {/* Section Header */}
        <div className="list-header-bar">
          <div className="header-titles">
            <h2 className="list-title">
              Farm Staff <span className="gradient-text">Roster</span>
            </h2>
            <span className="roster-count-badge">
              {employees.length} {employees.length === 1 ? 'Employee' : 'Employees'} Listed
            </span>
          </div>

          <div className="dept-status-indicator">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Viewing: {selectedDepartment}</span>
          </div>
        </div>

        {/* Responsive Employee Grid */}
        <div className="employee-grid">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={onEdit}
              onDelete={onDelete}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployeeList;
