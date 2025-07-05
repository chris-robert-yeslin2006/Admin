'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import '../Admin.css'  
import ProtectedRoute from '../../../../components/ProtectedRoute'
import Cookies from 'js-cookie'

export default function StudentDetailsPage() {
  const [students, setStudents] = useState([])
  const [AdminName, setAdminName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingStudent, setEditingStudent] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: '',
    language: '',
    email: '',
    password: '',
    overall_mark: '',
    average_mark: '',
    recent_test_mark: '',
    fluency_mark: '',
    vocab_mark: '',
    sentence_mastery: '',
    pronunciation: ''
  })
  const [deleteConfirmStudent, setDeleteConfirmStudent] = useState(null)
  const [showMarkDetails, setShowMarkDetails] = useState(false)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const userId = Cookies.get('user_id')
  // console.log(orgId)

  useEffect(() => {
    fetchStudents()
  }, [userId])
  
  const fetchStudents = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const currAdminId = userId || Cookies.get('user_id')
      console.log(Cookies.get('user_id'));
      console.log('Current User ID:', currAdminId)
      if (!currAdminId) {
        setIsLoading(false)
        setError('No Admin ID found')
        return
      }
      
      console.log('Fetching students for Admin:', currAdminId)
      
      const res = await fetch(`http://localhost:8000/student/list?user_id=${currAdminId}`)
      
      if (!res.ok) {
        throw new Error('Failed to fetch student list')
      }
      
      const data = await res.json()
      console.log('API response:', data)
      
      // Set students array (will be empty if no students)
      setStudents(data.students || [])
  
      // Set organization name from the response
      if (data.org_name) {
        setAdminName(data.org_name)
      } else if (data.students && data.students.length > 0 && data.students[0].organizations) {
        // Fallback to the old way of getting org name
        setAdminName(data.students[0].organizations.name)
      }
    } catch (err) {
      console.error('Error fetching students:', err)
      setError('Failed to load students. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleEditClick = (student) => {
    setEditingStudent(student)
    
    // Initialize form with student data
    setEditFormData({
      name: student.name || '',
      language: student.language || '',
      email: student.email || '',
      password: '', // Password starts empty
      overall_mark: student.overall_mark || '',
      average_mark: student.average_mark || '',
      recent_test_mark: student.recent_test_mark || '',
      fluency_mark: student.fluency_mark || '',
      vocab_mark: student.vocab_mark || '',
      sentence_mastery: student.sentence_mastery || '',
      pronunciation: student.pronunciation || ''
    })
    
    // Check if any mark field has a value to determine if mark details should be shown
    const hasMarks = ['overall_mark', 'average_mark', 'recent_test_mark', 
                      'fluency_mark', 'vocab_mark', 'sentence_mastery', 'pronunciation']
                      .some(field => student[field] !== null && student[field] !== undefined && student[field] !== '')
    
    setShowMarkDetails(hasMarks)
  }
  
  const handleDeleteClick = (student) => {
    setDeleteConfirmStudent(student)
  }
  
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const toggleMarkDetails = () => {
    setShowMarkDetails(!showMarkDetails)
  }
  
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      // Prepare data for submission
      const submitData = { ...editFormData }
      
      // Convert empty mark strings to null and string values to numbers
      const markFields = ['overall_mark', 'average_mark', 'recent_test_mark', 
                          'fluency_mark', 'vocab_mark', 'sentence_mastery', 'pronunciation']
      
      markFields.forEach(field => {
        if (submitData[field] === '') {
          submitData[field] = null
        } else if (submitData[field]) {
          // Convert string to float for marks
          submitData[field] = parseFloat(submitData[field])
        }
      })
      
      // If password is empty, remove it from the request
      if (!submitData.password) {
        delete submitData.password
      }
      
      const res = await fetch(`http://localhost:8000/student/${editingStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      })
      
      if (!res.ok) {
        throw new Error('Failed to update student')
      }
      
      // Update the student in the local state
      setStudents(prev => 
        prev.map(student => 
          student.id === editingStudent.id 
            ? { ...student, ...submitData } 
            : student
        )
      )
      
      // Close the edit modal
      setEditingStudent(null)
    } catch (err) {
      console.error('Error updating student:', err)
      setError('Failed to update student. Please try again.')
    }
  }
  
  const handleDeleteConfirm = async () => {
    setError('')
    
    try {
      const res = await fetch(`http://localhost:8000/student/${deleteConfirmStudent.id}`, {
        method: 'DELETE'
      })
      
      if (!res.ok) {
        throw new Error('Failed to delete student')
      }
      
      // Remove the student from the local state
      setStudents(prev => prev.filter(student => student.id !== deleteConfirmStudent.id))
      
      // Close the delete confirmation modal
      setDeleteConfirmStudent(null)
    } catch (err) {
      console.error('Error deleting student:', err)
      setError('Failed to delete student. Please try again.')
    }
  }

  // Helper function to display marks
  const formatMark = (mark) => {
    if (mark === null || mark === undefined || mark === '') return '-'
    return mark
  }

  return (
    <ProtectedRoute>
      <div className="content-container">
        <div className="admin-header">
          <h1 className="page-title">Student Management</h1>
          <button 
            className="primary-button"
            onClick={() => router.push(`/organization/Student/Add?user_id=${userId}`)}
          >
            Add New Student
          </button>
        </div>
        
        {AdminName && (
          <div className="form-container" style={{ marginBottom: '24px' }}>
            <h2 className="page-title" style={{ margin: 0 }}>Organization: {AdminName}</h2>
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
            <p>Loading students...</p>
          </div>
        ) : students.length === 0 ? (
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
            <p>No students found for this organization.</p>
            <button 
              className="primary-button"
              onClick={() => router.push(`/organization/Student/Add?user_id=${userId}`)}
            >
              Add Your First Student
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Language</th>
                  <th>Email</th>
                  <th>Overall Mark</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.language}</td>
                    <td>{student.email}</td>
                    <td>{formatMark(student.overall_mark)}</td>
                    <td>{new Date(student.created_at).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <button 
                        className="edit-button"
                        onClick={() => handleEditClick(student)}
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
                        onClick={() => handleDeleteClick(student)}
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
        
        {/* Edit Student Modal */}
        {editingStudent && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Edit Student</h3>
                <button 
                  className="close-button"
                  onClick={() => setEditingStudent(null)}
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
              
              <form onSubmit={handleEditSubmit} className="edit-form">
                <div className="form-section">
                  <h4>Student Information</h4>
                  
                  <div className="form-field">
                    <label className="form-label">Student Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
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
                      value={editFormData.email}
                      onChange={handleFormChange}
                      className="form-input"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label className="form-label">Preferred Language</label>
                    <div className="select-wrapper">
                      <select
                        name="language"
                        value={editFormData.language}
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
                      value={editFormData.password}
                      onChange={handleFormChange}
                      className="form-input"
                      placeholder="Enter new password (optional)"
                    />
                  </div>
                </div>
                
                <div className="form-section">
                  <div className="section-header">
                    <h4>Performance Marks</h4>
                    <button
                      type="button"
                      className="toggle-button"
                      onClick={toggleMarkDetails}
                    >
                      {showMarkDetails ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                  
                  <div className="form-field">
                    <label className="form-label">Overall Mark</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      name="overall_mark"
                      value={editFormData.overall_mark}
                      onChange={handleFormChange}
                      className="form-input"
                      placeholder="Enter overall mark (0-100)"
                    />
                  </div>
                  
                  {showMarkDetails && (
                    <>
                      <div className="form-field">
                        <label className="form-label">Average Mark</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          name="average_mark"
                          value={editFormData.average_mark}
                          onChange={handleFormChange}
                          className="form-input"
                          placeholder="Enter average mark (0-100)"
                        />
                      </div>
                      
                      <div className="form-field">
                        <label className="form-label">Recent Test Mark</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          name="recent_test_mark"
                          value={editFormData.recent_test_mark}
                          onChange={handleFormChange}
                          className="form-input"
                          placeholder="Enter recent test mark (0-100)"
                        />
                      </div>
                      
                      <div className="form-fields-row">
                        <div className="form-field">
                          <label className="form-label">Fluency</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            name="fluency_mark"
                            value={editFormData.fluency_mark}
                            onChange={handleFormChange}
                            className="form-input"
                            placeholder="0-100"
                          />
                        </div>
                        
                        <div className="form-field">
                          <label className="form-label">Vocabulary</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            name="vocab_mark"
                            value={editFormData.vocab_mark}
                            onChange={handleFormChange}
                            className="form-input"
                            placeholder="0-100"
                          />
                        </div>
                      </div>
                      
                      <div className="form-fields-row">
                        <div className="form-field">
                          <label className="form-label">Sentence Mastery</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            name="sentence_mastery"
                            value={editFormData.sentence_mastery}
                            onChange={handleFormChange}
                            className="form-input"
                            placeholder="0-100"
                          />
                        </div>
                        
                        <div className="form-field">
                          <label className="form-label">Pronunciation</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            name="pronunciation"
                            value={editFormData.pronunciation}
                            onChange={handleFormChange}
                            className="form-input"
                            placeholder="0-100"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setEditingStudent(null)}
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
        {deleteConfirmStudent && (
          <div className="modal-overlay">
            <div className="modal-content delete-confirm">
              <div className="modal-header">
                <h3>Confirm Deletion</h3>
                <button 
                  className="close-button"
                  onClick={() => setDeleteConfirmStudent(null)}
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
                <p>Are you sure you want to delete <strong>{deleteConfirmStudent.name}</strong>?</p>
                <p className="warning-text">This action cannot be undone. The student account will be permanently removed from the system.</p>
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setDeleteConfirmStudent(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={handleDeleteConfirm}
                >
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}