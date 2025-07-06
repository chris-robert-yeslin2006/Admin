'use client'
import { useState, useEffect } from 'react';
import styles from './TestManager.module.css';
import Cookies from 'js-cookie';

const TestManager = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTest, setEditingTest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch tests from backend
useEffect(() => {
  const fetchTests = async () => {
    try {
      const auth_id = Cookies.get('user_id');
      if (!auth_id) throw new Error('User not authenticated');

      const response = await fetch(`http://localhost:8000/tests/list?auth_id=${auth_id}`);
      if (!response.ok) throw new Error('Failed to fetch tests');

      const data = await response.json();

      const now = new Date();

      // Loop over upcoming tests and check if end time has passed
      const updatedTests = await Promise.all(data.map(async (test) => {
        if (
          test.status === "upcoming" &&
          new Date(test.test_time).getTime() + test.test_duration * 60000 < now.getTime()
        ) {
          // Test is expired – mark as completed
          try {
            const putRes = await fetch(`http://localhost:8000/tests/${test.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
              },
              body: JSON.stringify({ status: "completed" })
            });

            if (putRes.ok) {
              const updated = await putRes.json();
              return updated.test;
            }
          } catch (e) {
            console.error(`Failed to update status for test ${test.id}:`, e);
          }
        }

        return test; // unchanged
      }));

      setTests(updatedTests);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchTests();
}, []);


  const handleEdit = (test) => {
    setEditingTest({ 
      ...test,
      date: test.test_time.split('T')[0],
      time: test.test_time.split('T')[1].substring(0, 5)
    });
    setShowModal(true);
  };

 const handleDelete = async (testId) => {
  if (window.confirm('Are you sure you want to delete this test?')) {
    try {
      const auth_id = Cookies.get('user_id');
      const response = await fetch(`http://localhost:8000/tests/${testId}?auth_id=${auth_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete test');
      }

      setTests(tests.filter(test => test.id !== testId));
    } catch (err) {
      setError(err.message);
    }
  }
};
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/tests/${editingTest.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
  test_name: editingTest.test_name,
  test_time: `${editingTest.date}T${editingTest.time}`, // ✅ FIXED LINE
  test_duration: editingTest.test_duration,
  test_link: editingTest.test_link,
  status: editingTest.status
})

      });

      if (!response.ok) {
        throw new Error('Failed to update test');
      }

      const updatedTest = await response.json();
      setTests(tests.map(test => 
        test.id === updatedTest.id ? updatedTest : test
      ));
      setShowModal(false);
      setEditingTest(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (field, value) => {
    setEditingTest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const completedTests = tests.filter(test => test.status === 'completed');
  const upcomingTests = tests.filter(test => test.status === 'upcoming');

  if (loading) return <div className={styles.loading}>Loading tests...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Test Management Dashboard</h1>
      
      {/* Completed Tests Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Completed Tests</h2>
        <div className={styles.testGrid}>
          {completedTests.map(test => (
            <div key={test.id} className={`${styles.testCard} ${styles.completed}`}>
              <div className={styles.testHeader}>
                <h3 className={styles.testTitle}>{test.test_name}</h3>
                <span className={styles.status}>✓ Completed</span>
              </div>
              <div className={styles.testInfo}>
                <p><strong>Date:</strong> {new Date(test.test_time).toLocaleDateString()}</p>
<p><strong>Time:</strong> {new Date(test.test_time).toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
})}</p>
                <p><strong>Duration:</strong> {test.test_duration} minutes</p>
                <p><strong>Language:</strong> {test.language}</p>
              </div>
            </div>
          ))}
          {completedTests.length === 0 && (
            <p className={styles.noTests}>No completed tests found</p>
          )}
        </div>
      </section>

      {/* Upcoming Tests Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Upcoming Tests</h2>
        <div className={styles.testGrid}>
          {upcomingTests.map(test => (
            <div key={test.id} className={`${styles.testCard} ${styles.upcoming}`}>
              <div className={styles.testHeader}>
                <h3 className={styles.testTitle}>{test.test_name}</h3>
                <span className={styles.status}>⏰ Upcoming</span>
              </div>
              <div className={styles.testInfo}>
                <p><strong>Date:</strong> {new Date(test.test_time).toLocaleDateString()}</p>
<p><strong>Time:</strong> {new Date(test.test_time).toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
})}</p>
                <p><strong>Duration:</strong> {test.test_duration} minutes</p>
                <p><strong>Language:</strong> {test.language}</p>
              </div>
              <div className={styles.testActions}>
                <button 
                  className={styles.editBtn}
                  onClick={() => handleEdit(test)}
                >
                  Edit
                </button>
                <button 
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(test.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {upcomingTests.length === 0 && (
            <p className={styles.noTests}>No upcoming tests scheduled</p>
          )}
        </div>
      </section>

      {/* Edit Modal */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit Test</h3>
            <form onSubmit={handleSave}>
              <div className={styles.formGroup}>
                <label>Test Name:</label>
                <input
                  type="text"
                  value={editingTest.test_name}
                  onChange={(e) => handleInputChange('test_name', e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Date:</label>
                <input
                  type="date"
                  value={editingTest.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Time:</label>
                <input
                  type="time"
                  value={editingTest.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Duration (minutes):</label>
                <input
                  type="number"
                  value={editingTest.test_duration}
                  onChange={(e) => handleInputChange('test_duration', parseInt(e.target.value))}
                  min="1"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Test Link:</label>
                <input
                  type="url"
                  value={editingTest.test_link || ''}
                  onChange={(e) => handleInputChange('test_link', e.target.value)}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.saveBtn}>Save</button>
                <button 
                  type="button" 
                  className={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestManager;