'use client'

import { useState } from 'react';

export default function SideNav({ activeSection, onNavChange, userProfile }) {
  // State for tracking expanded nav items
  const [expandedItems, setExpandedItems] = useState({
    organizations: false,
    admin: false,
    student: false
  });

  const toggleExpand = (item) => {
    setExpandedItems({
      ...expandedItems,
      [item]: !expandedItems[item]
    });
  };

  const isOrganization = userProfile.role === 'organization';

  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="user-avatar">{userProfile.avatar}</div>
        <div className="user-info">
          <h3>{userProfile.name}</h3>
          <p>{userProfile.role}</p>
        </div>
      </div>
      
      <div className="nav-container">
        <ul className="nav-menu">
          <li 
            className={`nav-item ${activeSection === 'statistics' ? 'active' : ''}`}
            onClick={() => onNavChange('statistics')}
          >
            <i>📊</i> 
            <span>Statistics</span>
          </li>
          
          <li className={`nav-item ${activeSection.startsWith('admin') ? 'active' : ''}`}>
                    <div className="nav-toggle">
                      <div className="nav-label">
                        <i>👥</i>
                        <span>Admin</span>
                      </div>
                      
                    </div>

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
                  </li>

          
                    <li className={`nav-item ${activeSection.startsWith('student') ? 'active' : ''}`}>
            <div className="nav-toggle">
              <div className="nav-label">
                <i>🎓</i>
                <span>Student</span>
              </div>
              
            </div>

            <ul className="sub-nav">
              <li 
                className={activeSection === 'student-add' ? 'active' : ''}
                onClick={() => onNavChange('student-add')}
              >
                Add
              </li>
              <li 
                className={activeSection === 'student-list' ? 'active' : ''}
                onClick={() => onNavChange('student-list')}
              >
                List
              </li>
            </ul>
          </li>


          <li 
            className={`nav-item ${activeSection === 'analytics' ? 'active' : ''}`}
            onClick={() => onNavChange('analytics')}
          >
            <i>📈</i>
            <span>Analytics</span>
          </li>
          
          {isOrganization && (
            <li 
              className={`nav-item ${activeSection === 'contentManagement' ? 'active' : ''}`}
              onClick={() => onNavChange('contentManagement')}
            >
              <i>📄</i>
              <span>Content Management</span>
            </li>
          )}
          
          <li 
            className={`nav-item ${activeSection === 'systemSettings' ? 'active' : ''}`}
            onClick={() => onNavChange('systemSettings')}
          >
            <i>⚙️</i>
            <span>System Settings</span>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .sidebar {
          background: linear-gradient(165deg, 
            rgba(255, 255, 255, 0.98) 0%,
            rgba(248, 250, 252, 0.95) 15%,
            rgba(241, 245, 249, 0.92) 35%,
            rgba(226, 232, 240, 0.90) 55%,
            rgba(203, 213, 225, 0.88) 75%,
            rgba(148, 163, 184, 0.85) 100%
          );
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: rgba(15, 23, 42, 0.95);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.15),
            0 10px 20px -5px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.7),
            inset 0 -1px 0 rgba(255, 255, 255, 0.3);
          height: 100vh;
          width: 280px;
          border-radius: 0 24px 24px 0;
          position: relative;
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.6) 0%, 
            rgba(255, 255, 255, 0.3) 25%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 75%,
            transparent 100%
          );
          border-radius: 0 24px 24px 0;
          pointer-events: none;
          opacity: 0.8;
        }
        
        .sidebar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 20%, 
            rgba(59, 130, 246, 0.08) 0%, 
            transparent 50%
          );
          border-radius: 0 24px 24px 0;
          pointer-events: none;
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          padding: 24px 28px;
          border-bottom: 1px solid rgba(59, 130, 246, 0.15);
          position: relative;
          z-index: 2;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
          flex-shrink: 0;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .user-profile:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 20%;
          width: 60%;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(59, 130, 246, 0.4),
            rgba(147, 197, 253, 0.6),
            rgba(128, 167, 230, 0.4),
            transparent
          );
          border-radius: 1px;
        }
        
        .user-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.9) 0%, 
            rgba(157, 185, 245, 0.95) 35%,
            rgba(29, 78, 216, 1) 100%
          );
          margin-right: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 600;
          color: white;
          box-shadow: 
            0 8px 25px rgba(59, 130, 246, 0.4),
            0 4px 10px rgba(59, 130, 246, 0.3),
            0 1px 3px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .user-avatar:hover {
          transform: scale(1.05);
          box-shadow: 
            0 12px 35px rgba(59, 130, 246, 0.5),
            0 6px 15px rgba(59, 130, 246, 0.4),
            0 2px 5px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }
        
        .user-info h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.3px;
          color: rgba(15, 23, 42, 0.95);
          transition: all 0.4s ease;
        }
        
        .user-info p {
          margin: 4px 0 0;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.2px;
          color: rgba(59, 130, 246, 0.8);
          transition: all 0.4s ease;
        }
        
        .nav-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .nav-menu {
          list-style: none;
          padding: 16px 20px;
          margin: 0;
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }
        
        .nav-item {
          border-radius: 14px;
          margin-bottom: 8px;
          font-weight: 500;
          position: relative;
          overflow: hidden;
          opacity: 0;
          animation: fadeInLeft 0.6s ease-out forwards;
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          flex-shrink: 0;
        }
        
        .nav-item:nth-child(1) { animation-delay: 0.1s; }
        .nav-item:nth-child(2) { animation-delay: 0.2s; }
        .nav-item:nth-child(3) { animation-delay: 0.3s; }
        .nav-item:nth-child(4) { animation-delay: 0.4s; }
        .nav-item:nth-child(5) { animation-delay: 0.5s; }
        .nav-item:nth-child(6) { animation-delay: 0.6s; }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.6) 0%, 
            rgba(255, 255, 255, 0.3) 100%
          );
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          border-radius: 14px;
        }
        
        .nav-item::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.4), 
            transparent
          );
          transition: left 0.8s ease;
          border-radius: 14px;
        }
        
        .nav-item:hover::after {
          left: 100%;
        }
        
        .nav-item i {
          margin-right: 12px;
          font-size: 18px;
          display: inline-flex;
          align-items: center;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
        }
        
        .nav-toggle, .nav-item {
          padding: 12px 18px;
          cursor: pointer;
          position: relative;
          z-index: 1;
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
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .nav-item.active {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(147, 197, 253, 0.12) 50%,
            rgba(219, 234, 254, 0.08) 100%
          );
          border: 1px solid rgba(59, 130, 246, 0.25);
          box-shadow: 
            0 8px 25px rgba(59, 130, 246, 0.15),
            0 4px 10px rgba(59, 130, 246, 0.1),
            0 1px 3px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 0 rgba(59, 130, 246, 0.1);
          transform: translateX(6px) scale(1.02);
          color: rgba(15, 23, 42, 1);
        }
        
        .nav-item.active::before {
          opacity: 1;
        }
        
        .nav-item.active i {
          transform: scale(1.1);
          color: rgba(59, 130, 246, 1);
        }
        
        .nav-item:hover:not(.active) {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.8) 0%, 
            rgba(248, 250, 252, 0.6) 50%,
            rgba(241, 245, 249, 0.4) 100%
          );
          transform: translateX(8px) scale(1.02);
          box-shadow: 
            0 12px 35px rgba(59, 130, 246, 0.08),
            0 6px 15px rgba(59, 130, 246, 0.05),
            0 2px 8px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
        
        .nav-item:hover:not(.active)::before {
          opacity: 0.8;
        }
        
        .nav-item:hover:not(.active) i {
          transform: scale(1.08);
          color: rgba(59, 130, 246, 0.9);
        }
        
        .nav-item:hover:not(.active) .nav-label {
          transform: translateX(2px);
        }
        
        .chevron {
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          color: rgba(59, 130, 246, 0.7);
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
        }
        
        .chevron.expanded {
          transform: rotate(180deg) scale(1.15);
          color: rgba(59, 130, 246, 1);
        }
        
        .sub-nav {
          list-style: none;
          padding: 6px 0 6px 40px;
          margin: 6px 0 6px 0;
          border-left: 2px solid rgba(59, 130, 246, 0.2);
          margin-left: 14px;
          opacity: 0;
          animation: fadeInDown 0.5s ease-out forwards;
          animation-delay: 0.1s;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .sub-nav li {
          padding: 10px 16px;
          cursor: pointer;
          font-size: 14px;
          border-radius: 10px;
          font-weight: 400;
          position: relative;
          overflow: hidden;
          margin-bottom: 4px;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .sub-nav li::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.5) 0%, 
            rgba(255, 255, 255, 0.2) 100%
          );
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          border-radius: 10px;
        }
        
        .sub-nav li::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent
          );
          transition: left 0.7s ease;
          border-radius: 10px;
        }
        
        .sub-nav li:hover::after {
          left: 100%;
        }
        
        .sub-nav li:hover:not(.active) {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.7) 0%, 
            rgba(248, 250, 252, 0.5) 100%
          );
          transform: translateX(8px) scale(1.02);
          box-shadow: 
            0 6px 20px rgba(59, 130, 246, 0.08),
            0 3px 8px rgba(59, 130, 246, 0.05),
            0 1px 3px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        
        .sub-nav li:hover:not(.active)::before {
          opacity: 0.9;
        }
        
        .sub-nav li.active {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.18) 0%, 
            rgba(147, 197, 253, 0.15) 50%,
            rgba(219, 234, 254, 0.1) 100%
          );
          font-weight: 600;
          color: rgba(15, 23, 42, 1);
          transform: translateX(4px) scale(1.02);
          box-shadow: 
            0 4px 15px rgba(59, 130, 246, 0.15),
            0 2px 6px rgba(59, 130, 246, 0.1),
            0 1px 3px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 0 rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.25);
        }
        
        .sub-nav li.active::before {
          opacity: 1;
        }
        
        /* Global smooth transitions */
        * {
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
      `}</style>
    </div>
  );
}