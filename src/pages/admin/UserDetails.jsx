import React from 'react'

function UserDetails({value}) {
    const user = value.user
   
  return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-yellow-50 w-[450px] rounded-2xl p-7 shadow-xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-yellow-900">
            User Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Customer information
          </p>
        </div>
      </div>


      {/* Profile */}
      <div className="flex items-center gap-4 bg-yellow-100 rounded-xl p-5">

        <div
          className="w-14 h-14 rounded-full
          bg-yellow-900 text-white
          flex items-center justify-center
          text-xl font-semibold"
        >
          {user.name[0].toUpperCase()}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-yellow-900">
            {user.name}
          </h3>

          <p className="text-gray-500">
            Customer
          </p>
        </div>

      </div>


      {/* User Information */}
      <div className="mt-6 space-y-4">

        <div className="flex justify-between border-b border-yellow-200 pb-3">
          <span className="text-gray-500">Email</span>
          <span className="font-medium text-gray-800">
            {user.email}
          </span>
        </div>

        <div className="flex justify-between border-b border-yellow-200 pb-3">
          <span className="text-gray-500">Phone</span>
          <span className="font-medium text-gray-800">
            {user.phone}
          </span>
        </div>

        <div className="flex justify-between border-b border-yellow-200 pb-3">
          <span className="text-gray-500">Status</span>

          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            {user.status ? "Active" : "Block"}
          </span>
        </div>

        <div className="flex justify-between border-b border-yellow-200 pb-3">
          <span className="text-gray-500">Role</span>
          <span className="font-medium text-yellow-900">
           {user.role}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Total Orders</span>
          <span className="font-semibold text-yellow-900">
            {user.orderedUserDetails.length}
          </span>
        </div>

      </div>


      {/* Close */}
      <button
        className="w-full mt-7 bg-yellow-900 text-white  py-3 rounded-lg hover:bg-yellow-800 transition"

        onClick={()=>{
            value.setOpenUser(false)
        }}
      >
        Close
      </button>

    </div>

  </div>

  )
}

export default UserDetails