import React from 'react';
import { 
  Tractor, 
  Heart, 
  Code, 
  GraduationCap, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import './Footer.css';

/**
 * Footer Component
 * Displays assignment metadata, concepts demonstrated, and student credits.
 * Credits: Saibadeep Mullick, 4th Year BCA Student.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="agro-footer">
      <div className="container footer-container">
        {/* Top Info Grid */}
        <div className="footer-top-grid">
          {/* Brand & Purpose Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <Tractor size={22} />
              </div>
              <span className="footer-brand-title">AgroFarm Hub</span>
            </div>
            <p className="footer-tagline">
              Comprehensive agricultural employee directory system maintaining complete personnel
              records with dynamic React state, synthetic events, search indexing, and real-time department filtering.
            </p>
            <div className="academic-badge">
              <GraduationCap size={15} />
              <span>Bachelor of Computer Applications (BCA) - 4th Year</span>
            </div>
          </div>

          {/* Concepts Demonstrated Column */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Assignment 3 Concepts</h4>
            <ul className="footer-links-list">
              <li>
                <CheckCircle2 size={14} className="check-bullet" />
                <span><code>useState()</code> Array & Object State Management</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="check-bullet" />
                <span>Synthetic Event Handling (Forms, Clicks, Changes)</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="check-bullet" />
                <span>Multi-Criteria Search & Filter Pipelines</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="check-bullet" />
                <span>Conditional Rendering (Modals, Alerts, States)</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="check-bullet" />
                <span>Interactive CRUD Operations (Add, Edit, Delete)</span>
              </li>
            </ul>
          </div>

          {/* Required Fields Spec Column */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Employee Data Fields</h4>
            <div className="fields-tag-cloud">
              <span className="field-tag">Employee Name</span>
              <span className="field-tag">Employee ID</span>
              <span className="field-tag">Department Name</span>
              <span className="field-tag">Gender</span>
              <span className="field-tag">Phone Number</span>
              <span className="field-tag">Local Address</span>
              <span className="field-tag">Permanent Address</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Credits Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {currentYear} AgroFarm Personnel System. Built for React Practical Assignment 3.
          </p>

          <div className="developer-credit">
            <span className="credit-label">Developed by:</span>
            <span className="dev-name">Saibadeep Mullick</span>
            <span className="dev-dept">BCA 4th Year</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
