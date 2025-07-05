'use client'
import Head from 'next/head';
import StatisticsSection from './Statistics/page';
import { useState } from 'react';
import '../../components/ProtectedRoute'
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('statistics');


  // Render active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'statistics':
        return <StatisticsSection />;
      case 'organizations':
        return <OrganizationSection />;
      case 'admin':
        return <AdminSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'contentManagement':
        return <ContentManagementSection />;
      case 'systemSettings':
        return <SystemSettingsSection />;
      default:
        return <StatisticsSection />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="dashboard-container">
        <Head>
          <title>Admin Dashboard | {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</title>
          <meta name="description" content="Admin Dashboard" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        
        
        <main className="main-content">
          {renderSectionContent()}
        </main>

        <style jsx>{`
          .dashboard-container {
            background-color: #f5f7fa;
          }
          
          .main-content {
            overflow-y: auto;
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}