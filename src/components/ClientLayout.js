'use client';

import { usePathname, useRouter } from 'next/navigation';
import SideNav from './SideNav';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavChange = (section) => {
    const routes = {
      'statistics': '/organization/Statistics',
      'admin-add': '/organization/Admin/Add',
      'admin-list': '/organization/Admin/List',
      'analytics': '/organization/Analytics/List',
      'contentManagement': '/organization/Content',
      'systemSettings': '/organization/Settings',
    };

    if (routes[section]) {
      router.push(routes[section]);
    }
  };

  const userProfile = {
    avatar: '👤',
    name: 'Surya',
    email: 'admin@example.com',
    role: 'Super Admin',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div >
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
