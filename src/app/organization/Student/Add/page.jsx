'use client'
import { useState } from 'react';
import styles from '../../page.module.css';

export default function AddStudent() {
  const [showMarkDetails, setShowMarkDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    contactInfo: '',
    language: 'Select Language',
    markDetails: {
      overallMark: '',
      averageMark: '',
      recentTest: '',
      fluencyMark: '',
      vocabularyMark: '',
      sentenceMasteryMark: '',
      pronunciationMark: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMarkChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      markDetails: {
        ...formData.markDetails,
        [name]: value
      }
    });
  };

  const toggleMarkDetails = () => {
    setShowMarkDetails(!showMarkDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // Here you would send the data to your backend
    alert('Student added successfully!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add Student</h1>
        <p className={styles.subtitle}>Create a new student account with language assessment information</p>
      </div>
      
      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Student Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="language">Preferred Language</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
              >
                <option value="Select Language">Select Language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="Arabic">Arabic</option>
                <option value="Russian">Russian</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="contactInfo">Contact Information</label>
              <input
                type="tel"
                id="contactInfo"
                name="contactInfo"
                placeholder="Phone number"
                value={formData.contactInfo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="studentId">Student ID</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                placeholder="Enter student ID"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.buttonContainer}>
            <button 
              type="button" 
              className={styles.markButton}
              onClick={toggleMarkDetails}
            >
              Add Mark Details
            </button>
            
            <button type="submit" className={styles.submitButton}>
              Add Student
            </button>
          </div>
        </form>
      </div>

      {showMarkDetails && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Mark Details</h2>
              <span className={styles.closeButton} onClick={toggleMarkDetails}>&times;</span>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="overallMark">Overall Mark</label>
                  <input
                    type="number"
                    id="overallMark"
                    name="overallMark"
                    placeholder="0-100"
                    min="0"
                    max="100"
                    value={formData.markDetails.overallMark}
                    onChange={handleMarkChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="averageMark">Average Mark</label>
                  <input
                    type="number"
                    id="averageMark"
                    name="averageMark"
                    placeholder="0-100"
                    min="0"
                    max="100"
                    value={formData.markDetails.averageMark}
                    onChange={handleMarkChange}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="recentTest">Recent Test Mark</label>
                  <input
                    type="number"
                    id="recentTest"
                    name="recentTest"
                    placeholder="0-100"
                    min="0"
                    max="100"
                    value={formData.markDetails.recentTest}
                    onChange={handleMarkChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="fluencyMark">Fluency Mark</label>
                  <input
                    type="number"
                    id="fluencyMark"
                    name="fluencyMark"
                    placeholder="0-100"
                    min="0"
                    max="100"
                    value={formData.markDetails.fluencyMark}
                    onChange={handleMarkChange}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="vocabularyMark">Vocabulary Mark</label>
                  <input
                    type="number"
                    id="vocabularyMark"
                    name="vocabularyMark"
                    placeholder="0-100"
                    min="0"
                    max="100"
                    value={formData.markDetails.vocabularyMark}
                    onChange={handleMarkChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="sentenceMasteryMark">Sentence Mastery Mark</label>
                  <input
                    type="number"
                    id="sentenceMasteryMark"
                    name="sentenceMasteryMark"
                    placeholder="0-100"
                    min="0"
                    max="100"
                    value={formData.markDetails.sentenceMasteryMark}
                    onChange={handleMarkChange}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="pronunciationMark">Pronunciation Mark</label>
                  <input
                    type="number"
                    id="pronunciationMark"
                    name="pronunciationMark"
                    placeholder="0-100"
                    min="0"
                    max="100"
                    value={formData.markDetails.pronunciationMark}
                    onChange={handleMarkChange}
                  />
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <button 
                  type="button" 
                  className={styles.saveButton}
                  onClick={toggleMarkDetails}
                >
                  Save Marks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}