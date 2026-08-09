import React from 'react'
import Dashboard from '../../pages/admin/Dashboard'
import AdminSideBar from './AdminSideBar'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="flex min-h-screen mb-5">

    <AdminSideBar />

    <div className="flex-1 flex flex-col">

        <AdminHeader />

        <main>
            <Outlet />
        </main>

    </div>

</div>
  )
}

export default AdminLayout