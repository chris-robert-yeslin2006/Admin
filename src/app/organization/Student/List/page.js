'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProtectedRoute from '../../../../components/ProtectedRoute'

export default function AdminListPage() {
  const [organizations, setOrganizations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  useEffect(() => {
    const fetchOrganizations = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('http://localhost:8000/organization/list')
        const data = await res.json()
        setOrganizations(Array.isArray(data.organizations) ? data.organizations : [])
      } catch (error) {
        console.error('Error fetching organizations:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrganizations()
  }, [])

  const toggleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedOrganizations = [...organizations].sort((a, b) => {
    const aValue = a[sortColumn] || ''
    const bValue = b[sortColumn] || ''
    
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  const filteredOrganizations = sortedOrganizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (org.ambassador_name && org.ambassador_name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <ProtectedRoute>
    <div className="content-container">
      <div className="admin-header-container">
        <div>
          <h1 className="page-title">Organization Admins</h1>
          <p className="page-description">Manage organization administrators across the platform</p>
        </div>
        <Link href="/organization/Admin/Add">
          <button className="create-button">
            <svg className="plus-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create Admin
          </button>
        </Link>
      </div>

      <div className="admin-form-container table-view">
        <div className="table-controls">
          <div className="search-container">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search organizations or ambassadors..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-stats">
            {filteredOrganizations.length} of {organizations.length} organizations
          </div>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading organizations...</p>
          </div>
        ) : filteredOrganizations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3>No organizations found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th 
                    className={`sortable-column ${sortColumn === 'name' ? 'sorted ' + sortDirection : ''}`}
                    onClick={() => toggleSort('name')}
                  >
                    <div className="th-content">
                      Organization
                      <span className="sort-icon"></span>
                    </div>
                  </th>
                  <th 
                    className={`sortable-column ${sortColumn === 'ambassador_name' ? 'sorted ' + sortDirection : ''}`}
                    onClick={() => toggleSort('ambassador_name')}
                  >
                    <div className="th-content">
                      Ambassador
                      <span className="sort-icon"></span>
                    </div>
                  </th>
                  <th className="actions-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizations.map(org => (
                  <tr key={org.id} className="data-row">
                    <td>
                      <div className="org-name">
                        <div className="org-avatar">{org.name.charAt(0)}</div>
                        <span>{org.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="ambassador-info">
                        {org.ambassador_name ? (
                          <>
                            <div className="ambassador-status active"></div>
                            {org.ambassador_name}
                          </>
                        ) : (
                          <>
                            <div className="ambassador-status inactive"></div>
                            <span className="no-ambassador">No ambassador assigned</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="actions-cell">
                      <Link href={`/Dashboard/Admin/List/AdminDetails?page=${org.id}`}>
                        <button className="action-button view-button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          View Admins
                        </button>
                      </Link>
                      <button className="action-button edit-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Enhanced Admin List Styles */
        .admin-header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .create-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background-color: #4f46e5;
          color: white;
          font-weight: 500;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .create-button:hover {
          background-color: #4338ca;
          transform: translateY(-1px);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .plus-icon {
          width: 16px;
          height: 16px;
        }

        .table-view {
          padding: 0;
          overflow: hidden;
        }

        .table-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid #e2e8f0;
        }

        .search-container {
          position: relative;
          width: 360px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .search-input {
          width: 100%;
          padding: 10px 16px 10px 40px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s ease;
          background-color: #f8fafc;
        }

        .search-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          background-color: white;
        }

        .table-stats {
          font-size: 14px;
          color: #64748b;
        }

        .data-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        .data-table th {
          background-color: #f8fafc;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 14px 24px;
          text-align: left;
        }

        .sortable-column {
          cursor: pointer;
          user-select: none;
        }

        .th-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sort-icon {
          position: relative;
          width: 8px;
          height: 12px;
        }

        .sort-icon::before,
        .sort-icon::after {
          content: '';
          position: absolute;
          left: 0;
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
        }

        .sort-icon::before {
          top: 0;
          border-bottom: 4px solid #cbd5e1;
        }

        .sort-icon::after {
          bottom: 0;
          border-top: 4px solid #cbd5e1;
        }

        .sorted.asc .sort-icon::before {
          border-bottom-color: #4f46e5;
        }

        .sorted.desc .sort-icon::after {
          border-top-color: #4f46e5;
        }

        .data-row {
          transition: background-color 0.15s ease;
        }

        .data-row:hover {
          background-color: #f8fafc;
        }

        .data-table td {
          padding: 16px 24px;
          border-top: 1px solid #e2e8f0;
          font-size: 14px;
          color: #334155;
        }

        .org-name {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }

        .org-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background-color: #4f46e5;
          color: white;
          font-weight: 600;
          border-radius: 8px;
        }

        .ambassador-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ambassador-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .ambassador-status.active {
          background-color: #10b981;
        }

        .ambassador-status.inactive {
          background-color: #94a3b8;
        }

        .no-ambassador {
          color: #94a3b8;
          font-style: italic;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .view-button {
          color: #4f46e5;
          background-color: #eff6ff;
        }

        .view-button:hover {
          background-color: #dbeafe;
        }

        .edit-button {
          color: #0369a1;
          background-color: #f0f9ff;
        }

        .edit-button:hover {
          background-color: #e0f2fe;
        }

        /* Loading and Empty States */
        .loading-state, .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          text-align: center;
        }

        .spinner-large {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(99, 102, 241, 0.2);
          border-radius: 50%;
          border-top-color: #4f46e5;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        .empty-icon {
          color: #94a3b8;
          margin-bottom: 16px;
        }

        .empty-state h3 {
          font-size: 18px;
          font-weight: 600;
          color: #334155;
          margin: 0 0 8px 0;
        }

        .empty-state p {
          color: #64748b;
          font-size: 14px;
          margin: 0;
        }

        @media (max-width: 768px) {
          .admin-header-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .search-container {
            width: 100%;
          }

          .table-controls {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .actions-cell {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
    </ProtectedRoute>
  )
}