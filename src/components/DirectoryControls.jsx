import React from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  RotateCcw, 
  UserPlus, 
  Users, 
  Sparkles 
} from 'lucide-react';
import './DirectoryControls.css';

/**
 * DirectoryControls Component
 * Provides Search, Department Filtering, Employee Counts, and Reset controls.
 * Uses controlled inputs and event handling via Props.
 */
const DirectoryControls = ({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departmentCounts,
  departments,
  totalCount,
  filteredCount,
  onResetFilters,
  onOpenAddModal
}) => {
  return (
    <section className="controls-container-section">
      <div className="container">
        <div className="directory-controls-card card-glass">
          {/* Row 1: Search Input & Primary Add Employee Button */}
          <div className="controls-row-primary">
            {/* Search Input */}
            <div className="search-bar-wrapper">
              <Search size={18} className="search-bar-icon" />
              <input 
                type="text"
                id="employee-search-input"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by Employee Name, ID (e.g. FRM-0101), phone, or address..."
                className="search-bar-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="search-clear-btn"
                  onClick={() => onSearchChange('')}
                  title="Clear search query"
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Add Button */}
            <button 
              type="button" 
              className="btn btn-primary add-employee-main-btn"
              onClick={onOpenAddModal}
              id="open-add-employee-modal-btn"
            >
              <UserPlus size={17} />
              <span>Add Farm Employee</span>
            </button>
          </div>

          {/* Row 2: Department Filter Tabs with Live Counts */}
          <div className="department-filter-wrapper">
            <div className="filter-label-group">
              <Building2 size={16} className="filter-icon" />
              <span className="filter-label">Department Filter:</span>
            </div>

            <div className="department-chips-list">
              {departments.map((dept, idx) => {
                const count = departmentCounts[dept] || 0;
                const isActive = selectedDepartment === dept;

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`dept-chip-btn ${isActive ? 'active' : ''}`}
                    onClick={() => onDepartmentChange(dept)}
                    title={`Filter by ${dept}`}
                  >
                    <span>{dept}</span>
                    <span className={`dept-count-badge ${isActive ? 'active-count' : ''}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Employee Count Summary & Reset */}
          <div className="controls-meta-row">
            <div className="count-summary">
              <Users size={16} className="count-icon" />
              <span>
                Employee Count: <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> farm staff members displayed
              </span>
            </div>

            {(searchQuery || selectedDepartment !== 'All Departments') && (
              <button 
                type="button" 
                className="reset-filters-btn"
                onClick={onResetFilters}
                title="Reset all search filters"
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectoryControls;
