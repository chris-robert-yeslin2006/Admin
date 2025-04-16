'use client'

import { useEffect, useState } from "react";
import '../Admin.css';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddAdmin() {
  const [formData, setFormData] = useState({
    name: '',
    org_name: '',
    role: '',
    contact: '',
    language: '',
  });

  const [orgs, setOrgs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Fetch all organization names
    fetch('http://localhost:8000/organization/list')
      .then(res => res.json())
      .then(data => {
        setOrgs(Array.isArray(data.organizations) ? data.organizations : []);
      })
      .catch(err => {
        console.error("Failed to fetch organizations", err);
        alert("Could not load organizations");
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:8000/admin/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to add admin');

      const data = await res.json();
      console.log('Admin added:', data);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);

      setFormData({
        name: '',
        org_name: '',
        role: '',
        contact: '',
        language: '',
      });

    } catch (error) {
      console.error(error);
      alert("Failed to add admin");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
    <div className="layout-container">
      <div className="main-content">
        <div className="content-container">
          <div className="admin-header">
            <h1 className="page-title">Add Administrator</h1>
            <p className="page-description">Create a new administrator account with organization access</p>
          </div>
          
          <div className="admin-form-container">
            {submitSuccess && (
              <div className="success-message">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Administrator added successfully</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <div className="form-field">
                  <label className="form-label">Administrator Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Organization</label>
                  <div className="select-wrapper">
                    <select
                      name="org_name v"
                      value={formData.org_name}
                      onChange={handleChange}
                      className="form-input form-select"
                      required
                    >
                      <option value="">Select Organization</option>
                      {orgs.map((org) => (
                        <option key={org.id} value={org.name}>
                          {org.name}
                        </option>
                      ))}
                    </select>
                    </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. System Admin, Manager"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Contact Information</label>
                  <input
                    type="text"
                    name="contact "
                    value={formData.contact}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Email or phone number"
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Preferred Language</label>
                  <div className="select-wrapper">
                    <select
                      name="language  V"
                      value={formData.language}
                      onChange={handleChange}
                      className="form-input form-select"
                      required
                    >
                      <option value="">Select Language </option>
                      <option value="English">English</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Mandarin">Mandarin</option>
                      <option value="German">German</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-divider"></div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
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
  );
}