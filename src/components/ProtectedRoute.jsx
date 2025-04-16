'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if role cookie exists to determine if the user is logged in
    const role = Cookies.get('role');
    const username = Cookies.get('username');

    if (!role || !username) {
      router.push('/Login');
    } else {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, [router]);

  if (loading) return null;

  return isAuthenticated ? children : null;
}
