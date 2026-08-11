import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Users,
  Tags,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner"
import { NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function AdminSideBar() {
  const navigate = useNavigate()
  const queryClient =  useQueryClient() 

  const handleLogout = ()=>{
          localStorage.removeItem("userId") 
          localStorage.removeItem("role")
          queryClient.invalidateQueries({
            querKey : ["user"]
          })
          toast.success("Logouted successfully")
          navigate("/Login")
  }
  return (
    <aside className="w-64  bg-yellow-100 text-yellow-900 flex flex-col rounded-lg ml-5 mt-5 ">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
           <div className='flex gap-3'>
             <BookOpen 
             size = {30}
             className='mt-2 '/>
            <h1 className=' text-4xl font-bold text-yellow-900'>WILDINK</h1>
           </div>
        <p className="text-sm text-gray-900">Admin Panel</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">

        <NavLink  to = "/Admin/Dashboard"
          className = {({isActive})=>(
          isActive ? "flex items-center gap-3 text-yellow-100 bg-yellow-800 rounded-lg px-4 py-3 "
          :
          "flex items-center gap-3 hover:bg-yellow-800 rounded-lg px-4 py-3 hover:text-yellow-100 transition duration-300"
        )}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to = "/Admin/Books"
          className = {({isActive})=>(
          isActive ? "flex items-center gap-3 text-yellow-100 bg-yellow-800 rounded-lg px-4 py-3  "
          :
          "flex items-center gap-3 hover:bg-yellow-800 rounded-lg px-4 py-3 hover:text-yellow-100 transition duration-300"
        )}
        >
          <BookOpen size={20} />
          <span>Books</span>
        </NavLink>

        <NavLink to = "/Admin/Orders"
          className = {({isActive})=>(
          isActive ? "flex items-center gap-3 text-yellow-100 bg-yellow-800 rounded-lg px-4 py-3  "
          :
          "flex items-center gap-3 hover:bg-yellow-800 rounded-lg px-4 py-3 hover:text-yellow-100 transition duration-300"
        )}
        >
          <ShoppingCart size={20} />
          <span>Orders</span>
        </NavLink>

        <NavLink to = "/Admin/Users"
          className={(info) => (
            info.isActive ?
              "flex items-center gap-3 bg-yellow-800 text-yellow-100  rounded-lg px-4 py-3 "
              :
              "flex items-center gap-3 hover:bg-yellow-800 rounded-lg px-4 py-3 hover:text-yellow-100 transition duration-300"
            )}>

          <Users size={20} />
          <span>Users</span>
        </NavLink>

        <NavLink to = "/Admin/Categories"
        className = {({isActive})=>(
          isActive ? "flex items-center gap-3 text-yellow-100 bg-yellow-800 rounded-lg px-4 py-3 "
          :
          "flex items-center gap-3 hover:bg-yellow-800 rounded-lg px-4 py-3 hover:text-yellow-100 transition duration-300"
        )}
        >
          <Tags size={20} />
          <span>Categories</span>
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button 
        className="flex items-center gap-3 w-full hover:bg-red-600 hover:text-white transition duration-500 rounded-lg px-4 py-3"
        onClick = { handleLogout }
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default AdminSideBar;