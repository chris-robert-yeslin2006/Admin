'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import Cookies from 'js-cookie';

const Login = () => {
  const [userType, setUserType] = useState('individual');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgId, setOrgId] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAnimateIn(true);

    const fetchOrganizations = async () => {
      try {
        const response = await fetch('http://localhost:8000/auth/organizations');
        if (response.ok) {
          const data = await response.json();
          setOrganizations(data);
        }
      } catch (err) {
        console.error("Failed to fetch organizations:", err);
      }
    };

    fetchOrganizations();
  }, []);

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store authentication data
        Cookies.set('token', result.access_token, { secure: true });
        Cookies.set('role', result.role, { secure: true });
        
        Cookies.set('username', result.username, { secure: true });
        if (result.org_id) Cookies.set('org_id', result.org_id, { secure: true });

        // Redirect based on role
        switch(result.role) {
          case 'student':
            router.push('/student/dashboard');
            break;
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'org':
            router.push('/organization/dashboard');
            break;
          case 'individual':
            router.push('/individual/dashboard');
            break;
          default:
            router.push('/');
        }
      } else {
        setError(result.detail || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <div className={styles.container}>
      <div className={styles.loginSection}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            DataFlow Portal
          </div>
        </div>

        <div className={styles.loginForm}>
          <h1>Welcome Back</h1>
          <p>Sign in to access your account</p>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : `Sign in `}
            </button>

            <a href="#" className={styles.forgotPassword}>Forgot your password?</a>
          </form>
        </div>
      </div>

      <div className={styles.imageSection}>
        <div className={styles.imageContent}>
          <h2 className={styles.imageTitle}>Data-Driven Decisions Made Simple</h2>
          <p className={styles.imageText}>
            Securely access your dashboard and unlock powerful insights. Manage your data with confidence through our enterprise-grade platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
