import React, { useState } from 'react'
import { Ban,Eye } from 'lucide-react'
import axios from "axios"
import { useMutation,useQueryClient } from '@tanstack/react-query'
import UserDetails from '../../pages/admin/UserDetails'

function UserTable({user}) {
    const queryClient = useQueryClient()
    const [openUser,setOpenUser] = useState(false)
    const fetchblock = async ({id,status})=>{
        const response = await axios.patch(`http://localhost:4001/users/${id}`,{
            status : status
        }) 
    }
    const orders = user.orderedUserDetails?.length

    const blockMutation = useMutation({
        mutationFn : fetchblock,

        onSuccess : ()=>{
            queryClient.invalidateQueries({
                queryKey : ["Allusers"]
            })
      
        }
    })

    const blockUser = (id,status)=>{
        blockMutation.mutate({id,status})
    
    }

  return (
<div >
    {
        openUser && <UserDetails  value = {{setOpenUser,user}}/>
    }
     <div
      className="grid grid-cols-5 items-center
      px-5 py-5 mt-2 rounded-lg
      hover:bg-yellow-200 transition "
    >

      {/* User */}

      <div className="flex flex-col   gap-3">

        <div
          className="w-10 h-10 rounded-full bg-yellow-900 text-white flex items-center justify-center font-semibold"
        >
          {user.name[0].toUpperCase()}
        </div>

        <div>
          <p className="font-semibold text-yellow-900">
            {user.name}
          </p>  
        </div>

      </div>


      {/* Email */}
      <p className="text-gray-700">
        {user.email}
      </p>


      {/* Phone */}
      <p className="text-gray-700">
        {user.phone}
      </p>



      {/* status */}
      <div>
        <span
          className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium"
        >
          {user.status  ? "Active" : "Block"}
        </span>
      </div>


      {/* Actions */}
      <div className="flex justify-center gap-3">

        {/* View */}
        <button
            className="p-2 rounded-lg text-yellow-900  hover:bg-yellow-300 transition"
           onClick={()=>{
            setOpenUser(true)
           }}
        >
            <Eye size={19} />
        </button>

        {/* Block */}
        <button
              className={
    user?.status
      ? "p-2 rounded-lg text-green-600 hover:bg-green-100 transition"
      : "p-2 rounded-lg text-red-600 hover:bg-red-100 transition"
  }

            onClick={()=>{
             const status =   user?.status ?  false :  true
               blockUser(user.id,status)
            }}
        >
            <Ban size={19} />
        </button>

        </div>

    </div>
</div>
  )
}

export default UserTable