'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import '../Admin.css';
import ProtectedRoute from '../../../../components/ProtectedRoute'
import Cookies from 'js-cookie'

export default function AdminDetailsPage() {
  const [admins, setAdmins] = useState([])
  const [orgName, setOrgName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [deleteConfirmAdmin, setDeleteConfirmAdmin] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    language: '',
    contact: '',
    email: '',
    password: ''  // Password will be optional
  })
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const orgId = searchParams.get('page')

  useEffect(() => {
    fetchAdmins()
  }, [orgId])
  
  const fetchAdmins = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // Get org_id from URL parameter (page) or from cookie as fallback
      const currentOrgId = orgId || Cookies.get('org_id')
      
      if (!currentOrgId) {
        setIsLoading(false)
        setError('No organization ID found')
        return
      }
      
      console.log('Fetching admins for organization:', currentOrgId)  // Debug log
      
      const res = await fetch(`http://localhost:8000/admin/list?org_id=${currentOrgId}`)
      
      if (!res.ok) {
        throw new Error('Failed to fetch admin list')
      }
      
      const data = await res.json()
      console.log('API response:', data)  // Debug log
      
      // Set admins array (will be empty if no admins)
      setAdmins(data.admins || [])
  
      // Set organization name from the response
      if (data.org_name) {
        setOrgName(data.org_name)
      } else if (data.admins && data.admins.length > 0 && data.admins[0].organizations) {
        // Fallback to the old way of getting org name
        setOrgName(data.admins[0].organizations.name)
      }
    } catch (err) {
      console.error('Error fetching admins:', err)
      setError('Failed to load admins. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleEditClick = (admin) => {
    setEditingAdmin(admin)
    setFormData({
      name: admin.name,
      role: admin.role,
      language: admin.language,
      contact: admin.contact,
      email: admin.email || '',  // Include existing email
      password: ''  // Password starts empty since we don't want to display the existing password
    })
  }
  
  const handleDeleteClick = (admin) => {
    setDeleteConfirmAdmin(admin)
  }
  
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const res = await fetch(`http://localhost:8000/admin/${editingAdmin.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      if (!res.ok) {
        throw new Error('Failed to update admin')
      }
      
      // Update the admin in the local state
      setAdmins(prev => 
        prev.map(admin => 
          admin.id === editingAdmin.id 
            ? { ...admin, ...formData } 
            : admin
        )
      )
      
      // Close the edit modal
      setEditingAdmin(null)
    } catch (err) {
      console.error('Error updating admin:', err)
      setError('Failed to update admin. Please try again.')
    }
  }
  
  const handleDeleteConfirm = async () => {
    setError('')
    
    try {
      const res = await fetch(`http://localhost:8000/admin/${deleteConfirmAdmin.id}`, {
        method: 'DELETE'
      })
      
      if (!res.ok) {
        throw new Error('Failed to delete admin')
      }
      
      // Remove the admin from the local state
      setAdmins(prev => prev.filter(admin => admin.id !== deleteConfirmAdmin.id))
      
      // Close the delete confirmation modal
      setDeleteConfirmAdmin(null)
    } catch (err) {
      console.error('Error deleting admin:', err)
      setError('Failed to delete admin. Please try again.')
    }
  }

  return (
    <ProtectedRoute>
      <div className="content-container">
        <div className="admin-header">
          <h1 className="page-title">Administrator Management</h1>
          <button 
            className="primary-button"
            onClick={() => router.push(`/organization/Admin/Add?org_id=${orgId}`)}
          >
            Add New Admin
          </button>
        </div>
        
        {orgName && (
          <div className="form-container" style={{ marginBottom: '24px' }}>
            <h2 className="page-title" style={{ margin: 0 }}>Organization: {orgName}</h2>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading administrators...</p>
          </div>
        ) : admins.length === 0 ? (
          <div className="empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <p>No administrators found for this organization.</p>
            <button 
              className="primary-button"
              onClick={() => router.push(`/organization/admin/add?org_id=${orgId}`)}
            >
              Add Your First Admin
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Language</th>
                  <th>Contact</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id}>
                    <td>{admin.name}</td>
                    <td>{admin.role}</td>
                    <td>{admin.language}</td>
                    <td>{admin.contact}</td>
                    <td>{new Date(admin.created_at).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <button 
                        className="edit-button"
                        onClick={() => handleEditClick(admin)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => handleDeleteClick(admin)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Edit Admin Modal */}
{editingAdmin && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h3>Edit Administrator</h3>
        <button 
          className="close-button"
          onClick={() => setEditingAdmin(null)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleEditSubmit}>
        <div className="form-field">
          <label className="form-label">Administrator Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="form-input"
            placeholder="Enter full name"
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            className="form-input"
            placeholder="Enter email address"
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleFormChange}
            className="form-input"
            placeholder="e.g. System Admin, Manager"
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Contact Information</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleFormChange}
            className="form-input"
            placeholder="Phone number"
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Preferred Language</label>
          <div className="select-wrapper">
            <select
              name="language"
              value={formData.language}
              onChange={handleFormChange}
              className="form-input form-select"
              required
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Japanese">Japanese</option>
              <option value="Mandarin">Mandarin</option>
              <option value="German">German</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">Password (leave blank to keep current)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            className="form-input"
            placeholder="Enter new password (optional)"
          />
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => setEditingAdmin(null)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)}
        
        {/* Delete Confirmation Modal */}
        {deleteConfirmAdmin && (
          <div className="modal-overlay">
            <div className="modal-content delete-confirm">
              <div className="modal-header">
                <h3>Confirm Deletion</h3>
                <button 
                  className="close-button"
                  onClick={() => setDeleteConfirmAdmin(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className="confirm-message">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="warning-icon"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <p>Are you sure you want to delete <strong>{deleteConfirmAdmin.name}</strong>?</p>
                <p className="warning-text">This action cannot be undone. The administrator account will be permanently removed from the system.</p>
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setDeleteConfirmAdmin(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={handleDeleteConfirm}
                >
                  Delete Administrator
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}