// Check if user is authenticated
export const isAuthenticated = () => {
    // For client-side only
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('accessToken');
      return !!token;
    }
    return false;
  };
  
  // Logout function
  export const logout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('accessToken');
      window.location.href = '/';
    }
  };
  
  // Get authentication token
  export const getToken = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('accessToken');
    }
    return null;
  };
  
  // Add auth header to requests
  export const authHeader = () => {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };