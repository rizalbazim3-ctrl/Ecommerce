import React from 'react'
import { Bell , User ,Search , BookOpen} from 'lucide-react'

function AdminHeader() {
  return (
    <div className=' mx-10 bg-[#fbf6ec] p-5 my-5 rounded-xl shadow-xl'>
        <section className='w-full flex justify-around'>
          


            {/* searchBar */}
           <div className='w-[40%] flex border border-yellow-900 rounded-2xl bg-yellow-100 p-2 pr-2  hover:border-yellow-900 transition duration-500 focus:ring-2 ' >
             <input type="text"
             placeholder='search...'
             className='w-[100%] pl-3 outline-none'
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