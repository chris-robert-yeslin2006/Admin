'use client'

import { useEffect, useState } from 'react'
import '../Admin.css' // Reusing your admin styles
import ProtectedRoute from '../../../../components/ProtectedRoute'
import Cookies from 'js-cookie'

export default function AddStudent() {
  const [formData, setFormData] = useState({
    name: '',
    org_id: '',
    language: '',
    email: '',
    password: '',
    confirmPassword: '',
    overall_mark: '',
    average_mark: '',
    recent_test_mark: '',
    fluency_mark: '',
    vocab_mark: '',
    sentence_mastery: '',
    pronunciation: ''
  })

  const [showMarkDetails, setShowMarkDetails] = useState(false)
  const [orgs, setOrgs] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
      
    // Set org_id from current user's cookie if they are an org user
    const userRole = Cookies.get('role')
    const currUserId = Cookies.get('user_id')
    const currOrgId = Cookies.get('org_id')
    const currLanguage = Cookies.get('language')

    console.log(currOrgId)
    console.log(currLanguage)
    
    if ((userRole === 'org' || userRole === 'admin') && currUserId) {
      setFormData(prev => ({
        ...prev,
        user_id: currUserId,
        org_id: currOrgId,
        language: currLanguage
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
      
      // Convert empty mark strings to null
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
      console.log(submitData)
      const res = await fetch('http://localhost:8000/student/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.detail || 'Failed to add student')
      }

      console.log('Student added:', data)
      setSubmitSuccess(true)

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)

      // Reset form but keep org_id
      setFormData({
        name: '',
        org_id: formData.org_id,
        email: '',
        password: '',
        confirmPassword: '',
        overall_mark: '',
        average_mark: '',
        recent_test_mark: '',
        fluency_mark: '',
        vocab_mark: '',
        sentence_mastery: '',
        pronunciation: ''
      })
      
      // Hide mark details after successful submission
      setShowMarkDetails(false)
    } catch (error) {
      console.error(error)
      setError(error.message || 'Failed to add student')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleMarkDetails = () => {
    setShowMarkDetails(!showMarkDetails)
  }

  return (
    <ProtectedRoute>
      <div className='layout-container'>
        <div className='main-content'>
          <div className='content-container'>
            <div className='admin-header'>
              <h1 className='page-title'>Add Student</h1>
              <p className='page-description'>
                Create a new student account with language assessment information
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
                  <span>Student added successfully</span>
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
                    <label className='form-label'>Student Name</label>
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
                      readOnly={Cookies.get('role') === 'org' || Cookies.get('role') === 'admin'} 
                    />
                  </div>
                </div>

                <div className='form-divider'></div>

                {showMarkDetails && (
                  <div className='admin-form-grid'>
                    <div className='form-field'>
                      <label className='form-label'>Overall Mark</label>
                      <input
                        type='number'
                        name='overall_mark'
                        value={formData.overall_mark}
                        onChange={handleChange}
                        className='form-input'
                        placeholder='0-100'
                        min='0'
                        max='100'
                      />
                    </div>
                    
                    <div className='form-field'>
                      <label className='form-label'>Average Mark</label>
                      <input
                        type='number'
                        name='average_mark'
                        value={formData.average_mark}
                        onChange={handleChange}
                        className='form-input'
                        placeholder='0-100'
                        min='0'
                        max='100'
                      />
                    </div>

                    <div className='form-field'>
                      <label className='form-label'>Recent Test Mark</label>
                      <input
                        type='number'
                        name='recent_test_mark'
                        value={formData.recent_test_mark}
                        onChange={handleChange}
                        className='form-input'
                        placeholder='0-100'
                        min='0'
                        max='100'
                      />
                    </div>
                    
                    <div className='form-field'>
                      <label className='form-label'>Fluency Mark</label>
                      <input
                        type='number'
                        name='fluency_mark'
                        value={formData.fluency_mark}
                        onChange={handleChange}
                        className='form-input'
                        placeholder='0-100'
                        min='0'
                        max='100'
                      />
                    </div>

                    <div className='form-field'>
                      <label className='form-label'>Vocabulary Mark</label>
                      <input
                        type='number'
                        name='vocab_mark'
                        value={formData.vocab_mark}
                        onChange={handleChange}
                        className='form-input'
                        placeholder='0-100'
                        min='0'
                        max='100'
                      />
                    </div>
                    
                    <div className='form-field'>
                      <label className='form-label'>Sentence Mastery</label>
                      <input
                        type='number'
                        name='sentence_mastery'
                        value={formData.sentence_mastery}
                        onChange={handleChange}
                        className='form-input'
                        placeholder='0-100'
                        min='0'
                        max='100'
                      />
                    </div>
                    
                    <div className='form-field'>
                      <label className='form-label'>Pronunciation</label>
                      <input
                        type='number'
                        name='pronunciation'
                        value={formData.pronunciation}
                        onChange={handleChange}
                        className='form-input'
                        placeholder='0-100'
                        min='0'
                        max='100'
                      />
                    </div>
                  </div>
                )}

                <div className='form-actions'>
                  <button
                    type='button'
                    className='secondary-button'
                    onClick={toggleMarkDetails}
                  >
                    {showMarkDetails ? 'Hide Mark Details' : 'Add Mark Details'}
                  </button>
                  
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
                      'Add Student'
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