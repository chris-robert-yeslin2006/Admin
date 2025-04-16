'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();
  const [adminsExpanded, setAdminsExpanded] = useState(false);

  // Check if the current path is under a specific route
  const isActive = (path) => pathname === path;
  const isAdminsActive = pathname.startsWith('/admins');

  // Toggle admins submenu
  const toggleAdmins = () => {
    setAdminsExpanded(!adminsExpanded);
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>OrgPanel</h2>
      </div>
      <ul className={styles.nav}>
        <li>
          <Link href="/overview" className={isActive('/overview') ? styles.active : ''}>
            <span className={styles.icon}>📊</span>
            <span>Overview</span>
          </Link>
        </li>
        <li>
          <div 
            className={`${styles.navItem} ${isAdminsActive ? styles.active : ''}`} 
            onClick={toggleAdmins}
          >
            <span className={styles.icon}>👥</span>
            <span>Admins</span>
            <span className={styles.arrow}>{adminsExpanded ? '▼' : '▶'}</span>
          </div>
          {adminsExpanded && (
            <ul className={styles.submenu}>
              <li>
                <Link href="/admins/list" className={isActive('/admins/list') ? styles.active : ''}>
                  <span>List</span>
                </Link>
              </li>
              <li>
                <Link href="/admins/add" className={isActive('/admins/add') ? styles.active : ''}>
                  <span>Add</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link href="/analytics" className={isActive('/analytics') ? styles.active : ''}>
            <span className={styles.icon}>📈</span>
            <span>Analytics</span>
          </Link>
        </li>
      </ul>
      <div className={styles.userProfile}>
        <div className={styles.avatar}>AD</div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>Admin User</p>
          <p className={styles.userRole}>Administrator</p>
        </div>
      </div>
    </nav>
  );
}