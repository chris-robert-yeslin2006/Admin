'use client'
import { useState, useEffect } from 'react';
import styles from './TestList.module.css';
import Cookies from 'js-cookie';

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [toast, setToast] = useState(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  // Auto-hide toast after specified duration
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, toast.duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Check for upcoming tests and show reminders
  useEffect(() => {
    const checkUpcomingTests = () => {
      tests.forEach(test => {
        const testStart = new Date(test.test_time);
        const timeUntilTest = testStart - currentTime;
        const minutesUntil = Math.floor(timeUntilTest / (1000 * 60));
        
        // Show reminder for tests starting in 5 minutes
        if (minutesUntil === 5 && !toast) {
          showToast(`Test "${test.test_name}" starts in 5 minutes!`, 'warning', 5000);
        }
        
        // Show reminder for tests starting in 1 minute
        if (minutesUntil === 1 && !toast) {
          showToast(`Test "${test.test_name}" starts in 1 minute!`, 'warning', 5000);
        }
      });
    };
    
    if (tests.length > 0) {
      checkUpcomingTests();
    }
  }, [currentTime, tests, toast]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const user_id = Cookies.get("user_id");
      const language = Cookies.get("language");

      if (!user_id || !language) {
        throw new Error("Missing user authentication info");
      }

      const response = await fetch(
        `http://localhost:8000/student-tests/upcoming?user_id=${user_id}&language=${language}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTests(data);
    } catch (err) {
      setError(err.message);
      showToast('Failed to load tests. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Enhanced toast function
  const showToast = (message, type = 'info', duration = 3000) => {
    setToast({ message, type, duration });
  };

  // Check if test is currently active (within test time window)
  const isTestActive = (test) => {
    const testStart = new Date(test.test_time);
    const testEnd = new Date(testStart.getTime() + test.test_duration * 60000);
    return currentTime >= testStart && currentTime <= testEnd;
  };

  // Check if test is starting soon (within 10 minutes)
  const isTestStartingSoon = (test) => {
    const testStart = new Date(test.test_time);
    const timeUntilTest = testStart - currentTime;
    const minutesUntil = Math.floor(timeUntilTest / (1000 * 60));
    return minutesUntil <= 10 && minutesUntil > 0;
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

  const getTimeUntilTest = (test) => {
    const testStart = new Date(test.test_time);
    const timeUntilTest = testStart - currentTime;
    
    if (timeUntilTest <= 0) return null;
    
    const days = Math.floor(timeUntilTest / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeUntilTest % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeUntilTest % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const handleStartTest = (test) => {
    if (!isTestActive(test)) {
      const timeUntil = getTimeUntilTest(test);
      if (timeUntil) {
        showToast(
          `Test "${test.test_name}" starts in ${timeUntil}. Please wait until ${formatTime(test.test_time)}.`,
          'warning',
          4000
        );
      } else {
        showToast(
          `Test "${test.test_name}" has ended or is not available.`,
          'error',
          4000
        );
      }
      return;
    }
    
    // Show success toast
    showToast(`Starting "${test.test_name}" test now!`, 'success', 2000);
    
    // Small delay to show the toast before opening link
    setTimeout(() => {
      window.open(test.test_link, '_blank');
    }, 500);
  };

  const getTestStatus = (test) => {
    if (isTestActive(test)) {
      return { status: 'Active Now', class: 'active' };
    } else if (isTestStartingSoon(test)) {
      return { status: 'Starting Soon', class: 'starting-soon' };
    } else {
      return { status: test.status, class: test.status.toLowerCase() };
    }
  };

  const dismissToast = () => {
    setToast(null);
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
      {/* Enhanced Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${styles[`toast-${toast.type}`]}`}>
          <div className={styles.toastContent}>
            <span className={styles.toastMessage}>{toast.message}</span>
            <button 
              className={styles.toastDismiss}
              onClick={dismissToast}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Upcoming Tests</h1>
          <div className={styles.headerStats}>
            <span className={styles.testCount}>
              {tests.length} {tests.length === 1 ? 'test' : 'tests'}
            </span>
          </div>
        </div>
        <button onClick={fetchTests} className={styles.refreshButton}>
          <span className={styles.refreshIcon}>↻</span>
          Refresh
        </button>
      </div>

      {tests.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <h3>No Upcoming Tests</h3>
          <p>You don't have any tests scheduled at the moment.</p>
          <button onClick={fetchTests} className={styles.checkAgainButton}>
            Check Again
          </button>
        </div>
      ) : (
        <div className={styles.testGrid}>
          {tests.map((test) => {
            const active = isTestActive(test);
            const startingSoon = isTestStartingSoon(test);
            const timeUntil = getTimeUntilTest(test);
            const testStatus = getTestStatus(test);
            
            return (
              <div 
                key={test.id} 
                className={`${styles.testCard} ${active ? styles.activeCard : ''} ${startingSoon ? styles.startingSoonCard : ''}`}
              >
                <div className={styles.testHeader}>
                  <h3 className={styles.testName}>{test.test_name}</h3>
                  <span className={styles.languageBadge}>{test.language}</span>
                </div>
                
                <div className={styles.testDetails}>
                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>📅 Date:</span>
                    <span className={styles.detailValue}>{formatDate(test.test_time)}</span>
                  </div>
                  
                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>🕒 Time:</span>
                    <span className={styles.detailValue}>{formatTime(test.test_time)}</span>
                  </div>
                  
                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>⏱️ Duration:</span>
                    <span className={styles.detailValue}>{formatDuration(test.test_duration)}</span>
                  </div>
                  
                  {timeUntil && (
                    <div className={styles.detail}>
                      <span className={styles.detailLabel}>⏳ Starts in:</span>
                      <span className={`${styles.detailValue} ${styles.countdown}`}>{timeUntil}</span>
                    </div>
                  )}
                  
                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>📊 Status:</span>
                    <span className={`${styles.statusBadge} ${styles[testStatus.class]}`}>
                      {testStatus.status}
                    </span>
                  </div>
                </div>

                <div className={styles.testActions}>
                  <button 
                    onClick={() => handleStartTest(test)}
                    className={`${styles.startButton} ${
                      active 
                        ? styles.activeButton 
                        : startingSoon 
                        ? styles.startingSoonButton 
                        : styles.inactiveButton
                    }`}
                    title={
                      active 
                        ? "Start test now" 
                        : timeUntil 
                        ? `Available in ${timeUntil}` 
                        : `Available at ${formatTime(test.test_time)}`
                    }
                  >
                    {active ? (
                      <>
                        <span className={styles.buttonIcon}>🚀</span>
                        Start Test
                      </>
                    ) : startingSoon ? (
                      <>
                        <span className={styles.buttonIcon}>⏰</span>
                        Starting Soon
                      </>
                    ) : (
                      <>
                        <span className={styles.buttonIcon}>📝</span>
                        Start Test
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TestList;