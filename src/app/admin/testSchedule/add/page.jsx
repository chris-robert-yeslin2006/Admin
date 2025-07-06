'use client'
import { useState } from 'react';
import styles from './TestScheduler.module.css';
import Cookies from 'js-cookie';

const TestScheduler = () => {
  const [formData, setFormData] = useState({
    testName: '',
    testDuration: '',
    testDate: '',
    testTime: '',
    testLink: ''
  });

  const [scheduledTests, setScheduledTests] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.testName.trim()) {
      newErrors.testName = 'Test name is required';
    }
    
    if (!formData.testDuration || formData.testDuration <= 0) {
      newErrors.testDuration = 'Valid test duration is required';
    }
    
    if (!formData.testDate) {
      newErrors.testDate = 'Test date is required';
    } else {
      const selectedDate = new Date(formData.testDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.testDate = 'Test date cannot be in the past';
      }
    }
    
    if (!formData.testTime) {
      newErrors.testTime = 'Test time is required';
    }
    
    if (!formData.testLink.trim()) {
      newErrors.testLink = 'Test link is required';
    } else {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(formData.testLink)) {
        newErrors.testLink = 'Please enter a valid URL';
      }
    }
    
    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validateForm();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  // Get auth_id from cookies (the id from auth table)
  const auth_id = Cookies.get('user_id'); 
  const org_id = Cookies.get('org_id');
  const language = Cookies.get('language') || 'en';

  if (!auth_id) {
    alert("User not authenticated");
    return;
  }

  // Combine date and time into ISO string
  const localDate = new Date(`${formData.testDate}T${formData.testTime}`);
  const test_time = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();

  const payload = {
    test_name: formData.testName,
    auth_id, // The ID from auth table
    org_id,
    language,
    test_duration: parseInt(formData.testDuration),
    test_time,
    test_link: formData.testLink,
    status: "upcoming"
  };

  try {
    const res = await fetch("http://localhost:8000/tests/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get('token')}` // If using JWT
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail?.message || "Failed to schedule test");
    }

    // Success handling...
  } catch (err) {
    console.error("Error scheduling test:", err);
    alert(`Error: ${err.message}`);
  }
};


  const deleteTest = (id) => {
    setScheduledTests(prev => prev.filter(test => test.id !== id));
  };

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Schedule Test</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="testName" className={styles.label}>
              Test Name *
            </label>
            <input
              type="text"
              id="testName"
              name="testName"
              value={formData.testName}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.testName ? styles.inputError : ''}`}
              placeholder="Enter test name"
            />
            {errors.testName && <span className={styles.errorText}>{errors.testName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="testDuration" className={styles.label}>
              Test Duration (minutes) *
            </label>
            <input
              type="number"
              id="testDuration"
              name="testDuration"
              value={formData.testDuration}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.testDuration ? styles.inputError : ''}`}
              placeholder="Enter duration in minutes"
              min="1"
            />
            {errors.testDuration && <span className={styles.errorText}>{errors.testDuration}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="testDate" className={styles.label}>
                Test Date *
              </label>
              <input
                type="date"
                id="testDate"
                name="testDate"
                value={formData.testDate}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.testDate ? styles.inputError : ''}`}
              />
              {errors.testDate && <span className={styles.errorText}>{errors.testDate}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="testTime" className={styles.label}>
                Test Time *
              </label>
              <input
                type="time"
                id="testTime"
                name="testTime"
                value={formData.testTime}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.testTime ? styles.inputError : ''}`}
              />
              {errors.testTime && <span className={styles.errorText}>{errors.testTime}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="testLink" className={styles.label}>
              Test Link *
            </label>
            <input
              type="url"
              id="testLink"
              name="testLink"
              value={formData.testLink}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.testLink ? styles.inputError : ''}`}
              placeholder="https://example.com/test"
            />
            {errors.testLink && <span className={styles.errorText}>{errors.testLink}</span>}
          </div>

          <button type="submit" className={styles.submitButton}>
            Schedule Test
          </button>
        </form>
      </div>

      {scheduledTests.length > 0 && (
        <div className={styles.testsContainer}>
          <h3 className={styles.testsTitle}>Scheduled Tests</h3>
          <div className={styles.testsList}>
            {scheduledTests.map(test => (
              <div key={test.id} className={styles.testCard}>
                <div className={styles.testHeader}>
                  <h4 className={styles.testName}>{test.testName}</h4>
                  <button
                    onClick={() => deleteTest(test.id)}
                    className={styles.deleteButton}
                  >
                    ×
                  </button>
                </div>
                <div className={styles.testDetails}>
                  <p><strong>Duration:</strong> {test.testDuration} minutes</p>
                  <p><strong>Date & Time:</strong> {formatDateTime(test.testDate, test.testTime)}</p>
                  <p><strong>Test Link:</strong> 
                    <a href={test.testLink} target="_blank" rel="noopener noreferrer" className={styles.testLink}>
                      {test.testLink}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestScheduler;