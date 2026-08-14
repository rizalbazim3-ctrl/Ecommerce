import React from 'react'
import {Users,UserCheck, UserX} from "lucide-react"
function UserCard({users}) {
        const bolockedUsers = users.filter((item)=> item.status === false)
        const ActiveUsers = users.filter((item)=> item.status === true)
  return (
   <div >

      <section className="grid grid-cols-3 gap-6 my-5">

        <div className="rounded-xl bg-yellow-100 shadow-md p-6 hover:shadow-xl transition">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-500 font-medium">Users</h2>
            <Users className="text-yellow-900" size={28} />
            
          </div>

          <h1 className="text-4xl font-bold mt-6 text-yellow-900">{users.length}</h1>

          <p className="text-gray-500 mt-2">Total Users</p>
        </div>

        <div className="rounded-xl bg-yellow-100 shadow-md p-6 hover:shadow-xl transition">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-500 font-medium">Users</h2>
            <UserCheck className="text-green-500" size={28} />
            
          </div>

          <h1 className="text-4xl font-bold mt-6 text-yellow-900">{ActiveUsers.length}</h1>

          <p className="text-gray-500 mt-2">Active Users</p>
        </div>

        <div className="rounded-xl bg-yellow-100 shadow-md p-6 hover:shadow-xl transition">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-500 font-medium">Users</h2>
            <UserX className="text-red-500" size={28} />
          </div>

          <h1 className="text-4xl font-bold mt-6 text-yellow-900">{bolockedUsers.length}</h1>

          <p className="text-gray-500 mt-2">Blocked Users</p> 
        </div>

        

      </section>

    </div>
  )
}

export default UserCard