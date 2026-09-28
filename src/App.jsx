import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import DirectoryControls from './components/DirectoryControls';
import EmployeeList from './components/EmployeeList';
import EmployeeFormModal from './components/EmployeeFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmployeeDetailModal from './components/EmployeeDetailModal';
import Footer from './components/Footer';
import { initialEmployees, farmDepartments } from './data/initialEmployees';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X, 
  UserPlus 
} from 'lucide-react';
import './App.css';

/**
 * App Root Component
 * React Assignment 3: Employee Directory using State and Events.
 * Coordinates global state using useState(), manages synthetic events for
 * Add, Edit, Delete, Search, and Department Filtering, and conditionally renders modals.
 */
function App() {
  // Theme state ('dark' | 'light') with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('agro_theme_pref') || 'dark';
  });

  // Main Employees state with localStorage caching
  const [employees, setEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem('agro_employees_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not parse saved employees from localStorage:', e);
    }
    return initialEmployees;
  });

  // Search filter query state
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Department filter state
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  // Sync theme changes to HTML attribute & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('agro_theme_pref', theme);
  }, [theme]);

  // Sync employees list to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('agro_employees_v1', JSON.stringify(employees));
    } catch (e) {
      console.error('Failed to sync employees to localStorage:', e);
    }
  }, [employees]);

  // Notification helper with auto dismiss
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  // Toggle Theme Event Handler
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // ADD Employee Handler
  const handleAddEmployee = (newEmployeeData) => {
    const newEntry = {
      ...newEmployeeData,
      id: newEmployeeData.id || `emp-${Date.now()}`,
      joinDate: newEmployeeData.joinDate || 'Today'
    };

    setEmployees((prev) => [newEntry, ...prev]);
    setIsAddModalOpen(false);
    showToast(`Successfully registered ${newEntry.name} to ${newEntry.department}!`, 'success');
  };

  // EDIT Employee Handler
  const handleUpdateEmployee = (updatedData) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedData.id ? { ...emp, ...updatedData } : emp))
    );
    setEditingEmployee(null);

    // If viewing employee was edited, update its modal reference as well
    if (viewingEmployee?.id === updatedData.id) {
      setViewingEmployee((prev) => ({ ...prev, ...updatedData }));
    }

    showToast(`Updated details for ${updatedData.name} (ID: ${updatedData.employeeId}).`, 'info');
  };

  // DELETE Employee Handler
  const handleDeleteConfirm = (employeeId) => {
    const target = employees.find((e) => e.id === employeeId);
    setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
    setDeletingEmployee(null);

    // If viewing employee was deleted, close view modal
    if (viewingEmployee?.id === employeeId) {
      setViewingEmployee(null);
    }

    showToast(`Removed employee ${target ? target.name : ''} from the farm roster.`, 'danger');
  };

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All Departments');
  };

  // Filtered Employees Pipeline based on search & department
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      // 1. Department match
      const matchesDept = 
        selectedDepartment === 'All Departments' || 
        emp.department.toLowerCase() === selectedDepartment.toLowerCase();

      if (!matchesDept) return false;

      // 2. Search query match
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const nameMatch = emp.name.toLowerCase().includes(q);
      const idMatch = emp.employeeId.toLowerCase().includes(q);
      const deptMatch = emp.department.toLowerCase().includes(q);
      const phoneMatch = emp.phoneNumber.toLowerCase().includes(q);
      const localMatch = emp.localAddress.toLowerCase().includes(q);
      const permMatch = emp.permanentAddress.toLowerCase().includes(q);
      const roleMatch = emp.role ? emp.role.toLowerCase().includes(q) : false;

      return nameMatch || idMatch || deptMatch || phoneMatch || localMatch || permMatch || roleMatch;
    });
  }, [employees, selectedDepartment, searchQuery]);

  // Dynamic Department Counts for filter badges
  const departmentCounts = useMemo(() => {
    const counts = { 'All Departments': employees.length };
    farmDepartments.forEach((dept) => {
      if (dept !== 'All Departments') {
        counts[dept] = employees.filter((e) => e.department === dept).length;
      }
    });
    return counts;
  }, [employees]);

  // Overall statistics for Header display
  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const uniqueDepts = new Set(employees.map((e) => e.department)).size;
    const onFieldEmployees = employees.filter((e) => e.status === 'On Field').length;
    const activeEmployees = employees.filter((e) => e.status === 'Active' || e.status === 'On Field').length;

    return {
      totalEmployees,
      departmentsCount: uniqueDepts,
      onFieldEmployees,
      activeEmployees
    };
  }, [employees]);

  return (
    <div className="app-container">
      {/* Ambient background glows */}
      <div className="ambient-glow glow-top-left"></div>
      <div className="ambient-glow glow-bottom-right"></div>

      {/* Header Navigation & Banner */}
      <Header
        stats={stats}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Search, Filter & Employee Counts Controls */}
        <DirectoryControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          departmentCounts={departmentCounts}
          departments={farmDepartments}
          totalCount={employees.length}
          filteredCount={filteredEmployees.length}
          onResetFilters={handleResetFilters}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Dynamic Responsive Employee Grid */}
        <EmployeeList
          employees={filteredEmployees}
          onEdit={(emp) => setEditingEmployee(emp)}
          onDelete={(emp) => setDeletingEmployee(emp)}
          onViewDetails={(emp) => setViewingEmployee(emp)}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          selectedDepartment={selectedDepartment}
        />
      </main>

      {/* Footer with Assignment Metadata & Credits */}
      <Footer />

      {/* Floating Action Button (Quick Add) */}
      <button 
        type="button" 
        className="fab-add-employee" 
        onClick={() => setIsAddModalOpen(true)}
        title="Quick Add Farm Employee"
        aria-label="Add Farm Employee"
      >
        <UserPlus size={22} />
      </button>

      {/* Toast Notification Banner */}
      {toast && (
        <aside className={`toast-notification toast-${toast.type}`} role="alert" aria-live="polite">
          {toast.type === 'success' && <CheckCircle2 size={18} className="toast-icon" />}
          {toast.type === 'danger' && <AlertCircle size={18} className="toast-icon" />}
          {toast.type === 'info' && <Info size={18} className="toast-icon" />}
          <span>{toast.message}</span>
          <button 
            type="button" 
            className="toast-dismiss"
            onClick={() => setToast(null)}
            aria-label="Dismiss message"
          >
            <X size={15} />
          </button>
        </aside>
      )}

      {/* Modal: Add Employee */}
      {isAddModalOpen && (
        <EmployeeFormModal
          isOpen={isAddModalOpen}
          mode="add"
          onSave={handleAddEmployee}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {/* Modal: Edit Employee */}
      {editingEmployee && (
        <EmployeeFormModal
          isOpen={Boolean(editingEmployee)}
          mode="edit"
          initialData={editingEmployee}
          onSave={handleUpdateEmployee}
          onClose={() => setEditingEmployee(null)}
        />
      )}

      {/* Modal: Delete Confirmation */}
      {deletingEmployee && (
        <DeleteConfirmModal
          employee={deletingEmployee}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeletingEmployee(null)}
        />
      )}

      {/* Modal: Employee Full Details */}
      {viewingEmployee && (
        <EmployeeDetailModal
          employee={viewingEmployee}
          onClose={() => setViewingEmployee(null)}
          onEdit={(emp) => {
            setViewingEmployee(null);
            setEditingEmployee(emp);
          }}
        />
      )}
    </div>
  );
}

export default App;
