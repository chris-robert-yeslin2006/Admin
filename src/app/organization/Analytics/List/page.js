'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../../components/ProtectedRoute';
// import './analytics.css';

export default function AnalyticsOrgList() {
  const [organizations, setOrganizations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch('http://localhost:8000/organization/list');
        const data = await res.json();

        // Ensure we're only setting the array part
        setOrganizations(data.organizations);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleViewDetails = (orgId) => {
    router.push(`/Dashboard/Analytics/List/LanguageList?orgId=${orgId}`);
  };

  return (
    <ProtectedRoute>
    <div className="organizations-list-container">
    <div className="header">
      <h1>Analytics</h1>
      
    </div>

    <div className="search-filter">
      <div className="search-box">
        <input type="text" placeholder="Search organizations..." />
        <button className="search-button">Search</button>
      </div>
      <div className="filter">
        <select defaultValue="">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>

    <div className="table-container">
      <table className="organizations-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map(org => (
            <tr key={org.id}>
              <td>{org.name}</td>
              <td>{org.ambassador_name}</td>
              <td className="actions">
              <button className="view-admins-btn" onClick={() => handleViewDetails(org.id)}>
                View Details
              </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
         </div>    
         
      <style jsx>{`
        .organizations-list-container {
          padding: 24px;
          background-color: #f8fafc;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          height:99vh;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        h1 {
          margin: 0;
          color: #1e293b;
          font-size: 28px;
        }
        
        .add-button {
          background-color: #0ea5e9;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .add-button:hover {
          background-color: #0284c7;
        }
        
        .search-filter {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .search-box {
          display: flex;
          flex-grow: 1;
        }
        
        .search-box input {
          flex-grow: 1;
          padding: 10px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 6px 0 0 6px;
          font-size: 14px;
        }
        
        .search-button {
          background-color: #0ea5e9;
          color: white;
          border: none;
          border-radius: 0 6px 6px 0;
          padding: 0 16px;
          cursor: pointer;
        }
        
        .filter select {
          padding: 10px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
          background-color: white;
        }
        
        .table-container {
          overflow-x: auto;
          margin-bottom: 24px;
        }
        
        .organizations-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .organizations-table th {
          text-align: left;
          padding: 14px 16px;
          background-color: #e2e8f0;
          color: #475569;
          font-weight: 600;
        }
        
        .organizations-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .status-badge.active {
          background-color: #dcfce7;
          color: #166534;
        }
        
        .status-badge.inactive {
          background-color: #fee2e2;
          color: #991b1b;
        }
        
        .actions {
          display: flex;
          gap: 8px;
        }
        
        .view-admins-btn, .edit-btn {
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          border: none;
        }
        
        .view-admins-btn {
          background-color: #0ea5e9;
          color: white;
        }
        
        .view-admins-btn:hover {
          background-color: #0284c7;
        }
        
        .edit-btn {
          background-color: #64748b;
          color: white;
        }
        
        .edit-btn:hover {
          background-color: #475569;
        }
        
        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .pagination button {
          padding: 8px 16px;
          border: 1px solid #e2e8f0;
          background-color: white;
          border-radius: 6px;
          cursor: pointer;
        }
        
        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .page-numbers {
          display: flex;
          gap: 8px;
        }
        
        .page-numbers button {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        
        .page-numbers button.active {
          background-color: #0ea5e9;
          color: white;
          border-color: #0ea5e9;
        }
      `}</style>
    </div>
    </ProtectedRoute>
  );
}
