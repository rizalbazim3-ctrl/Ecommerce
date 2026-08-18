import React, { useState,useEffect } from 'react'
import { Bell , User ,Search , BookOpen,Menu} from 'lucide-react'
import {useSelector,useDispatch} from "react-redux"
import { setAdminSearch } from '../../services/admin/adminSlice'
import { useLocation } from 'react-router-dom'

function AdminHeader({setSidebarOpen}) {

  const adminSearch = useSelector((state)=> state.adminFilter.adminSearch)
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const [adminIcon,setAdminIcon] = useState(false)
  const [search,setSearch] = useState("")

  useEffect(() => {

  const timer = setTimeout(() => {
    dispatch(setAdminSearch(search));
  }, 500);

  return () => {
    clearTimeout(timer);
  };

}, [search, dispatch]);
  
  return (
    <div className=' mr-3 ml-3 bg-[#F2EFE9] px-5  mt-5 py-4 rounded-xl shadow-xl '>
        <section className='w-full flex justify-around'>

          <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-yellow-100 transition"
        >
          <Menu size={25} />
        </button>

            {/* searchBar */}
         
             <input type="text"
             placeholder={`${pathname === '/Admin/Orders' ? "Find orderId..." : "Searching..."}`}
             className='w-[60%] pl-3 h-13 mt-4 outline-none border border-yellow-900/70 hover:border-yellow-900 hover:border-2 rounded-xl 
           bg-yellow-50  hover:border-yellow-900 transition duration-500'
             onChange={(e)=> {
              const value = e.target.value
              setSearch(value)
             }}
             />
            
           


            <div className='w-[50%] flex flex-col m-2 text-yellow-50  items-end '>
                <div className='rounded-full bg-yellow-900 p-1 mr-2'>
                  <User  />
                </div>
                <p className="text-yellow-900 italic ">ADMIN</p>
            </div>
        </section>
    </div>
  )
}

export default AdminHeader