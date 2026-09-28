import React from 'react';
import { 
  Tractor, 
  Users, 
  Sun, 
  Moon, 
  UserPlus, 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import './Header.css';

/**
 * Header Component for AgroFarm Hub
 * Receives metrics, theme state, and action callbacks via Props.
 */
const Header = ({ 
  stats, 
  theme, 
  onToggleTheme, 
  onOpenAddModal 
}) => {
  return (
    <header className="agro-header">
      {/* Top Navigation Bar */}
      <div className="agro-navbar">
        <div className="container agro-nav-container">
          <div className="agro-brand">
            <div className="brand-icon-box">
              <Tractor size={24} className="brand-icon" />
            </div>
            <div className="brand-text-group">
              <span className="brand-name">AgroFarm Hub</span>
              <span className="brand-tagline">Farm Workforce & Personnel Registry</span>
            </div>
          </div>

          <div className="agro-nav-actions">
            <div className="assignment-badge">
              <span className="pulse-dot"></span>
              <span>React Assignment 3: State & Events</span>
            </div>

            <button 
              type="button" 
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme mode"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              type="button" 
              className="btn btn-primary add-employee-nav-btn"
              onClick={onOpenAddModal}
              id="add-employee-header-btn"
            >
              <UserPlus size={18} />
              <span>Add Employee</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Welcome & Live Farm Metrics */}
      <div className="container hero-banner-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>GreenValley Agricultural Enterprise</span>
          </div>
          <h1 className="hero-heading">
            Farm Employee <span className="gradient-text">Directory</span>
          </h1>
          <p className="hero-subtext">
            Centralized workforce management portal tracking employee IDs, farm departments, 
            local and permanent residences, and operational field status with React state & events.
          </p>
        </div>

        {/* Dynamic Employee Count & Operations Ribbon */}
        <div className="stats-ribbon">
          <div className="stat-card card-glass">
            <div className="stat-icon-wrapper stat-emerald">
              <Users size={22} />
            </div>
            <div className="stat-details">
              <span className="stat-value">{stats.totalEmployees}</span>
              <span className="stat-label">Total Workforce</span>
            </div>
          </div>

          <div className="stat-card card-glass">
            <div className="stat-icon-wrapper stat-amber">
              <Building2 size={22} />
            </div>
            <div className="stat-details">
              <span className="stat-value">{stats.departmentsCount}</span>
              <span className="stat-label">Farm Departments</span>
            </div>
          </div>

          <div className="stat-card card-glass">
            <div className="stat-icon-wrapper stat-cyan">
              <MapPin size={22} />
            </div>
            <div className="stat-details">
              <span className="stat-value">{stats.onFieldEmployees}</span>
              <span className="stat-label">On Field Operations</span>
            </div>
          </div>

          <div className="stat-card card-glass">
            <div className="stat-icon-wrapper stat-forest">
              <CheckCircle2 size={22} />
            </div>
            <div className="stat-details">
              <span className="stat-value">{stats.activeEmployees}</span>
              <span className="stat-label">Active & On-Duty</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
