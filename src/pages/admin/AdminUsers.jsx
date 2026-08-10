import React from 'react'
import UserTable from '../../components/admin/UserTable'
import { useQuery,useQueryClient } from '@tanstack/react-query'
import axios from "axios"

function AdminUsers() {
  
        const fetchUsers = async ()=> {
        const response = await axios.get("http://localhost:4001/users")
        return response.data
    }
    const queryClient = useQueryClient()

    const {
        data : Allusers = [],
        isLoading
    } = useQuery({
        queryKey : ["Allusers"],
        queryFn : fetchUsers,
    })
    if(isLoading){
      return <p>Loading...</p>
    }

    const users = Allusers.filter((item)=> item.role === "user")
    return (
    <>
     <div className="p-8">

  {/* Header */}
  <div className="bg-yellow-100 rounded-xl px-6 py-5">
    <h1 className="text-3xl font-semibold text-yellow-900">
      Users
    </h1>

    <p className="text-gray-600 mt-1">
      Manage registered customers
    </p>
  </div>


  {/* User Table */}
  <section className="mt-8 bg-yellow-100 rounded-xl p-5">

    {/* Table Heading */}
    <div
      className="grid grid-cols-5 justify-between px-5 py-4 text-yellow-900 font-semibold border-b border-yellow-300"
    >
      <p>User</p>
      <p>Email</p>
      <p>Phone</p>
      <p>status</p>

      <p className="text-center">Action</p>
    </div>

         {
            users.map((user)=> (

              <div key = {user.id}> 

                 <UserTable user = {user}/>

              </div>
            ))
        }

  </section>

  </div>
    </>
  )
}

export default AdminUsers