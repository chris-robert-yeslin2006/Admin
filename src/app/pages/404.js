import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>404</h1>
      <h2 style={{ fontSize: '24px', fontWeight: 'semibold', marginBottom: '24px' }}>Page Not Found</h2>
      <p style={{ fontSize: '18px', marginBottom: '32px' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <a href="/" className="btn-primary">Go back to home</a>
    </div>
  );
}

export default NotFoundPage;