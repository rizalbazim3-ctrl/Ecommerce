import React from 'react'
import { Bell , User ,Search , BookOpen} from 'lucide-react'
import {useSelector,useDispatch} from "react-redux"
import { setAdminSearch } from '../../services/admin/adminSlice'
import { useLocation } from 'react-router-dom'

function AdminHeader() {

  const adminSearch = useSelector((state)=> state.adminFilter.adminSearch)
  const dispatch = useDispatch()
  const {pathname} = useLocation()

  
  return (
    <div className=' mr-3 ml-3 bg-[#F2EFE9] p-5 my-5 rounded-xl shadow-xl'>
        <section className='w-full flex justify-around'>
          


            {/* searchBar */}
           <div className='w-[40%] flex border border-yellow-900 rounded-2xl 
           bg-yellow-100 p-2 pr-2  hover:border-yellow-900 transition duration-500 focus:ring-2 ' >
             <input type="text"
             placeholder={`${pathname === '/Admin/Orders' ? "Find orderId..." : "Searching..."}`}
             className='w-[100%] pl-3 outline-none'
             onChange={(e)=> {
              const value = e.target.value
              dispatch(setAdminSearch(value))
             }}
             />
             <Search
             className = "bg-yellow-700 w-10 h-7 text-yellow-100 rounded-full p-1 hover:scale-105 transition duration-300"
             />
           </div>


           {/* user,bell */}
            <div className='flex gap-5 m-2 text-yellow-900 '>
                <Bell className='hover:text-gray-900'/>
                <User className='hover:text-gray-900'/>
            </div>
        </section>
    </div>
  )
}

export default AdminHeader