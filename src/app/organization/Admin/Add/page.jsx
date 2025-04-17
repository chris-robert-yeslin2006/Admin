'use client'

import { useEffect, useState } from 'react'
import '../Admin.css'
import ProtectedRoute from '../../../../components/ProtectedRoute'
import Cookies from 'js-cookie'

export default function AddAdmin() {
  const [formData, setFormData] = useState({
    name: '',
    org_id: '',
    role: '',
    contact: '',
    language: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [orgs, setOrgs] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Fetch all organization names
    fetch('http://localhost:8000/organization/list')
      .then(res => res.json())
      .then(data => {
        setOrgs(Array.isArray(data.organizations) ? data.organizations : [])
      })
      .catch(err => {
        console.error('Failed to fetch organizations', err)
        setError('Could not load organizations')
      })
      
    // Set org_id from current user's cookie if they are an org user
    const userRole = Cookies.get('role')
    const currentOrgId = Cookies.get('org_id')
    
    if (userRole === 'org' && currentOrgId) {
      setFormData(prev => ({
        ...prev,
        org_id: currentOrgId
      }))
    }
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    // Remove any trailing spaces from the field name
    const cleanName = name.trim()

    setFormData({
      ...formData,
      [cleanName]: value
    })
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }
    
    return true
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    try {
      // Create a copy of the form data without confirmPassword
      const submitData = { ...formData }
      delete submitData.confirmPassword
      
      const res = await fetch('http://localhost:8000/admin/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.detail || 'Failed to add admin')
      }

      console.log('Admin added:', data)
      setSubmitSuccess(true)

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)

      setFormData({
        name: '',
        org_id: formData.org_id, // Keep the org_id
        role: '',
        contact: '',
        language: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.error(error)
      setError(error.message || 'Failed to add admin')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className='layout-container'>
        <div className='main-content'>
          <div className='content-container'>
            <div className='admin-header'>
              <h1 className='page-title'>Add Administrator</h1>
              <p className='page-description'>
                Create a new administrator account with organization access
              </p>
            </div>

            <div className='admin-form-container'>
              {submitSuccess && (
                <div className='success-message'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
                    <polyline points='22 4 12 14.01 9 11.01'></polyline>
                  </svg>
                  <span>Administrator added successfully</span>
                </div>
              )}
              
              {error && (
                <div className='error-message'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className='admin-form-grid'>
                  <div className='form-field'>
                    <label className='form-label'>Administrator Name</label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='form-input'
                      placeholder='Enter full name'
                      required
                    />
                  </div>
                  <div className='form-field'>
                    <label className='form-label'>Role</label>
                    <input
                      type='text'
                      name='role'
                      value={formData.role}
                      onChange={handleChange}
                      className='form-input'
                      placeholder='e.g. System Admin, Manager'
                      required
                    />
                  </div>

                  <div className='form-field'>
                    <label className='form-label'>Email Address</label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='form-input'
                      placeholder='Enter email address'
                      required
                    />
                  </div>

                  

                  <div className='form-field'>
                    <label className='form-label'>Contact Information</label>
                    <input
                      type='text'
                      name='contact'
                      value={formData.contact}
                      onChange={handleChange}
                      className='form-input'
                      placeholder='Phone number'
                      required
                    />
                  </div>

                  <div className='form-field'>
                    <label className='form-label'>Password</label>
                    <input
                      type='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      className='form-input'
                      placeholder='Set password'
                      required
                    />
                  </div>

                  
                  
                  <div className='form-field' style={{ display: 'none' }}>
                    <label className='form-label'>Organization ID</label>
                    <input
                      type='text'
                      name='org_id'
                      value={formData.org_id}
                      onChange={handleChange}
                      className='form-input'
                      placeholder='Organization ID'
                      required
                      readOnly={Cookies.get('role') === 'org'} // Make read-only if org user
                    />
                  </div>
                  
                  <div className='form-field'>
                    <label className='form-label'>Preferred Language</label>
                    <div className='select-wrapper'>
                      <select
                        name='language'
                        value={formData.language}
                        onChange={handleChange}
                        className='form-input form-select'
                        required
                      >
                        <option value=''>Select Language </option>
                        <option value='English'>English</option>
                        <option value='Japanese'>Japanese</option>
                        <option value='Mandarin'>Mandarin</option>
                        <option value='German'>German</option>
                        <option value='Spanish'>Spanish</option>
                        <option value='French'>French</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className='form-field'>
                    <label className='form-label'>Confirm Password</label>
                    <input
                      type='password'
                      name='confirmPassword'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className='form-input'
                      placeholder='Confirm password'
                      required
                    />
                  </div>
                </div>

                <div className='form-divider'></div>

                <div className='form-actions'>
                  <button
                    type='submit'
                    className={`submit-button ${
                      isSubmitting ? 'submitting' : ''
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className='spinner'></span>
                        <span>Processing...</span>
                      </>
                    ) : (
                      'Add Administrator'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}