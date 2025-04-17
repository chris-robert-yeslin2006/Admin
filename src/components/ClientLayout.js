'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import SideNav from './SideNav';
import Cookies from 'js-cookie';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState({
    avatar: '👤',
    name: 'Loading...',
    email: '',
    role: ''
  });

  useEffect(() => {
    const username = Cookies.get('username') || 'User';
    const role = Cookies.get('role') || '';
    const token = Cookies.get('token');
    const email = Cookies.get('email') || '';

    setUserProfile({
      avatar: '👤',
      name: username,
      email: email,
      role: role
    });

    if (!token) {
      router.push('/');
    }
  }, [router]);

  const handleNavChange = (section) => {
    const routes = {
      'statistics': '/organization/Statistics',
      'admin-add': '/organization/Admin/Add',
      'admin-list': '/organization/Admin/AdminDetails',
      'student-add': '/organization/Student/add',
      'student-list': '/organization/Student/List',
      'analytics': '/organization/Analytics/List',
      'contentManagement': '/organization/Content',
      'systemSettings': '/organization/Settings',
    };

    if (routes[section]) {
      router.push(routes[section]);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div>
        <SideNav
          activeSection={pathname}
          onNavChange={handleNavChange}
          userProfile={userProfile}
        />
      </div>
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}