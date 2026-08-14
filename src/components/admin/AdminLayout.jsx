import React from 'react'
import Dashboard from '../../pages/admin/Dashboard'
import AdminSideBar from './AdminSideBar'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className=" w-full flex min-h-screen  bg-[#DCC7A1] ">

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