'use client'
import { useState, useEffect } from 'react';
import styles from './TestList.module.css';

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/student-tests/upcoming', {
        method: 'GET',
        credentials: 'include', // Include cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  const handleStartTest = (testLink) => {
    window.open(testLink, '_blank');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading tests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>Error Loading Tests</h3>
          <p>{error}</p>
          <button onClick={fetchTests} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Upcoming Tests</h1>
        <button onClick={fetchTests} className={styles.refreshButton}>
          Refresh
        </button>
      </div>

      {tests.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <h3>No Upcoming Tests</h3>
          <p>You don't have any tests scheduled at the moment.</p>
        </div>
      ) : (
        <div className={styles.testGrid}>
          {tests.map((test) => (
            <div key={test.id} className={styles.testCard}>
              <div className={styles.testHeader}>
                <h3 className={styles.testName}>{test.test_name}</h3>
                <span className={styles.languageBadge}>{test.language}</span>
              </div>
              
              <div className={styles.testDetails}>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Date:</span>
                  <span className={styles.detailValue}>{formatDate(test.test_time)}</span>
                </div>
                
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Time:</span>
                  <span className={styles.detailValue}>{formatTime(test.test_time)}</span>
                </div>
                
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Duration:</span>
                  <span className={styles.detailValue}>{formatDuration(test.test_duration)}</span>
                </div>
                
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Status:</span>
                  <span className={`${styles.statusBadge} ${styles[test.status.toLowerCase()]}`}>
                    {test.status}
                  </span>
                </div>
              </div>

              <div className={styles.testActions}>
                <button 
                  onClick={() => handleStartTest(test.test_link)}
                  className={styles.startButton}
                >
                  Start Test
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestList;