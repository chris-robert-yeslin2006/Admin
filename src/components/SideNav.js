'use client'

import { useState } from 'react';

export default function SideNav({ activeSection, onNavChange, userProfile }) {
  // State for tracking expanded nav items
  const [expandedItems, setExpandedItems] = useState({
    organizations: false,
    admin: false
  });

  // Toggle expanded state for items with sub-navigation
  const toggleExpand = (item) => {
    setExpandedItems({
      ...expandedItems,
      [item]: !expandedItems[item]
    });
  };

  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="user-avatar">{userProfile.avatar}</div>
        <div className="user-info">
          <h3>{userProfile.name}</h3>
          <p>Organization</p>
        </div>
      </div>
      
      <ul className="nav-menu">
        <li 
          className={`nav-item ${activeSection === 'statistics' ? 'active' : ''}`}
          onClick={() => onNavChange('statistics')}
        >
          <i>📊</i> 
          <span>Statistics</span>
        </li>
        
        <li className={`nav-item ${activeSection.startsWith('admin') ? 'active' : ''}`}>
          <div onClick={() => toggleExpand('admin')} className="nav-toggle">
            <div className="nav-label">
              <i>👥</i>
              <span>Admin</span>
            </div>
            <span className={`chevron ${expandedItems.admin ? 'expanded' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
          
          {expandedItems.admin && (
            <ul className="sub-nav">
              <li 
                className={activeSection === 'admin-add' ? 'active' : ''}
                onClick={() => onNavChange('admin-add')}
              >
                Add
              </li>
              <li 
                className={activeSection === 'admin-list' ? 'active' : ''}
                onClick={() => onNavChange('admin-list')}
              >
                List
              </li>
            </ul>
          )}
        </li>
        
        <li 
          className={`nav-item ${activeSection === 'analytics' ? 'active' : ''}`}
          onClick={() => onNavChange('analytics')}
        >
          <i>📈</i>
          <span>Analytics</span>
        </li>
        
        <li 
          className={`nav-item ${activeSection === 'contentManagement' ? 'active' : ''}`}
          onClick={() => onNavChange('contentManagement')}
        >
          <i>📄</i>
          <span>Content Management</span>
        </li>
        
        <li 
          className={`nav-item ${activeSection === 'systemSettings' ? 'active' : ''}`}
          onClick={() => onNavChange('systemSettings')}
        >
          <i>⚙️</i>
          <span>System Settings</span>
        </li>
      </ul>

      <style jsx>{`
        .sidebar {
          // background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          background :rgba(50, 60, 80, 0.95) ;
          color: rgba(255, 255, 255, 0.95);
          padding: 24px 0;
          box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
          height: 100%;
          overflow-y: auto;
          border-radius: 0 16px 16px 0;
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          padding: 0 24px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 20px;
          position: relative;
        }
        
        .user-profile:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 15%;
          width: 70%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        }
        
        .user-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
          margin-right: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 500;
          box-shadow: 0 4px 10px rgba(14, 165, 233, 0.3);
        }
        
        .user-info h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        
        .user-info p {
          margin: 4px 0 0;
          font-size: 14px;
          opacity: 0.7;
          letter-spacing: 0.3px;
        }
        
        .nav-menu {
          list-style: none;
          padding: 8px 16px;
          margin: 0;
        }
        
        .nav-item {
          border-radius: 8px;
          margin-bottom: 8px;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        
        .nav-item i {
          margin-right: 12px;
          font-size: 18px;
          display: inline-flex;
          align-items: center;
        }
        
        .nav-toggle, .nav-item {
          padding: 12px 16px;
          cursor: pointer;
        }
        
        .nav-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        
        .nav-label {
          display: flex;
          align-items: center;
        }
        
        .nav-item.active {
          background: rgba(56, 189, 248, 0.15);
          border-left: 3px solid #38bdf8;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .nav-item:hover:not(.active) {
          background-color: rgba(255,255,255,0.07);
          transform: translateX(3px);
        }
        
        .chevron {
          transition: transform 0.3s ease;
        }
        
        .chevron.expanded {
          transform: rotate(180deg);
        }
        
        .sub-nav {
          list-style: none;
          padding: 5px 0 5px 36px;
          margin: 8px 0 8px 0;
          border-left: 1px dashed rgba(255,255,255,0.2);
          margin-left: 10px;
        }
        
        .sub-nav li {
          padding: 10px 16px;
          cursor: pointer;
          font-size: 14px;
          border-radius: 6px;
          transition: all 0.2s ease;
          margin-bottom: 4px;
          font-weight: 400;
        }
        
        .sub-nav li:hover:not(.active) {
          background-color: rgba(255,255,255,0.07);
          transform: translateX(3px);
        }
        
        .sub-nav li.active {
          background-color: rgba(56, 189, 248, 0.15);
          font-weight: 500;
        }
        
        /* Custom scrollbar */
        .sidebar::-webkit-scrollbar {
          width: 5px;
        }
        
        .sidebar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        
        .sidebar::-webkit-scrollbar-thumb {
          background: rgba(56, 189, 248, 0.5);
          border-radius: 10px;
        }
        
        .sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(56, 189, 248, 0.7);
        }
      `}</style>
    </div>
  );
}