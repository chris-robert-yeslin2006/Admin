'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import SideNav from './SideNav'
import Cookies from 'js-cookie'

export default function ClientLayout ({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const role = Cookies.get('role')
  const [userProfile, setUserProfile] = useState({
    avatar: '👤',
    name: 'Loading...',
    email: '',
    role: ''
  })

  useEffect(() => {
    const username = Cookies.get('username') || 'User'
    const token = Cookies.get('token')
    const email = Cookies.get('email') || ''
    console.log('User Role', role)

    setUserProfile({
      avatar: '👤',
      name: username,
      email: email,
      role: role
    })

    if (!token) {
      router.push('/')
    }
  }, [router])

  const handleNavChange = section => {
    let routes = {}

    if (role === 'org') {
      routes = {
        'statistics': '/organization/Statistics',
        'admin-add': '/organization/Admin/Add',
        'admin-list': '/organization/Admin/AdminDetails',
        'student-add': '/organization/Student/Add',
        'student-list': '/organization/Student/List',
        'analytics': '/organization/Analytics/List',
        'contentManagement': '/organization/Content',
        'systemSettings': '/organization/Settings'
      }
    } else if (role === 'student') {
      routes = {
        'statistics': '/Student/Statistics',
        'student-list': '/Student/Student/List',
        'student-test': '/Student/test/List',
        'practice': '/Student/Practice',
        'analytics': '/Student/Analytics/LanguageDetails',
        'test-schedule-list': '/Student/test/List',
      }
    } else {
      routes = {
        'statistics': '/admin/Statistics',
        'student-list': '/admin/Student/List',
        'analytics': '/admin/Analytics/LanguageDetails',
        'test-schedule-add': '/admin/testSchedule/add',
        'test-schedule-list': '/admin/testSchedule/list',
      }
    }

    if (routes[section]) {
      router.push(routes[section])
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div>
        <SideNav
          activeSection={pathname}
          onNavChange={handleNavChange}
          userProfile={userProfile}
        />
      </div>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  )
}