'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import '../../Admin.css'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AdminDetailsPage() {
  const [admins, setAdmins] = useState([])
  const [orgName, setOrgName] = useState('')
  const searchParams = useSearchParams()
  const orgId = searchParams.get('page') 

  useEffect(() => {
    const fetchAdmins = async () => {
      const res = await fetch(`http://localhost:8000/admin/list?org_id=${orgId}`)
      const data = await res.json()
      setAdmins(data.admins)

      if (data.admins.length > 0) {
        // 🔥 get the org name from first admin
        setOrgName(data.admins[0].organizations.name)
      }
    }

    if (orgId) fetchAdmins()
  }, [orgId])

  return (
    <ProtectedRoute>
    <div className="content-container">
      <h1 className="page-title">Admin Details</h1>
      {orgName && (
        <div className="form-container" style={{ marginBottom: '24px' }}> {/* 🔥 white background + spacing */}
          <h2 className="page-title" style={{ margin: 0 }}>Organization Name : {orgName}</h2> {/* 🔥 org name at top */}
        </div>
      )}
      {admins.length === 0 ? (
        <p>No admins found for this organization.</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Language</th>
                <th>Contact</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.role}</td>
                  <td>{admin.language}</td>
                  <td>{admin.contact}</td>
                  <td>{new Date(admin.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </ProtectedRoute>
  )
}
