import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Users,
  Tags,
  LogOut,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner"
import { NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function AdminSideBar({sidebarOpen,setSidebarOpen}) {
  const navigate = useNavigate()
  const queryClient =  useQueryClient() 

  const handleLogout = ()=>{
          localStorage.removeItem("userId") 
          localStorage.removeItem("role")
          queryClient.invalidateQueries({
            queryKey : ["user"]
          })
          toast.success("Logouted successfully")
          navigate("/Login")
  }

  const handleMenuClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div>
      {/* small screen */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Normal */}
      <aside
            className={`top:0 h-[800px] fixed md:sticky md:top-5 left-0 z-50 w-64 md:h-[730px] mt-5 ml-0 md:ml-5 bg-[#F2EFE9]
              text-yellow-900 flex flex-col rounded-lgshadow-lg transition-transform duration-300

              ${
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              }
            `}
          >

            {/* Close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-5 right-4 text-xl"
          >
            ✕
          </button>
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

        onClick={handleMenuClick}
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
        onClick={handleMenuClick}
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
        onClick={handleMenuClick}
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
        onClick={handleMenuClick}
          className={(info) => (
            info.isActive ?
              "flex items-center gap-3 bg-yellow-800 text-yellow-100  rounded-lg px-4 py-3 "
              :
              "flex items-center gap-3 hover:bg-yellow-800 rounded-lg px-4 py-3 hover:text-yellow-100 transition duration-300"
            )}>

          <Users size={20} />
          <span>Users</span>
        </NavLink>

        <NavLink to = "/"
        onClick={handleMenuClick}
          className={(info) => (
            info.isActive ?
              "flex items-center gap-3 bg-yellow-800 text-yellow-100  rounded-lg px-4 py-3 "
              :
              "flex items-center gap-3 hover:bg-yellow-800 rounded-lg px-4 py-3 hover:text-yellow-100 transition duration-300"
            )}>

          <Home size={20} />
          <span>Home</span>
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
    </div>
  );
}

export default AdminSideBar;