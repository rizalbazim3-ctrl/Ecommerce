import React,{useState} from 'react'
import Dashboard from '../../pages/admin/Dashboard'
import AdminSideBar from './AdminSideBar'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  const [sidebarOpen,setSidebarOpen] = useState(false)
  return (
    <div className=" w-full flex min-h-screen  ">

    <AdminSideBar 
    sidebarOpen= {sidebarOpen}
    setSidebarOpen = {setSidebarOpen}
    />

    <div className="flex-1 flex flex-col">

        <AdminHeader 
        setSidebarOpen = {setSidebarOpen}
        />

        <main>
            <Outlet />
        </main>

    </div>

</div>
  )
}

export default AdminLayout