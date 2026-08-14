import React from 'react'
import OrderTable from "../../components/admin/OrderTable"
import useAdminUsers from "../../services/admin/useAdminUsers"


function AdminOrders() {
 
      const {
        data : Allusers = [],
        isLoading,
        isError
    } = useAdminUsers()

    if(isLoading){
      return <p>Loading...</p>
    }

    const users = Allusers.filter((user)=> user.role === "user")

    const orders = users.flatMap((user)=>{
      return user.orderedUserDetails.map((order)=>{
        return (
          {
            ...order,
            uniqueKey : crypto.randomUUID(),
            orderId : order.orderId,
            email : user.email,
            delivery : order.delivery,
            date : order.orderDate,
            payment : order.payment,
            name : order.address.orderedName
          }
        )
      })
    })

  return (
    <div className='rounded-lg bg-yellow-100 p-5 mx-10'>

      {/* Table Header */}
  <div className="grid grid-cols-7 gap-4 px-6 py-4 bg-yellow-50 border-b border-yellow-200 rounded-xl text-sm font-semibold text-yellow-900  ">
    <div>Order ID</div>
    <div>Customer</div>
    <div>Date</div>
    <div>Total</div>
     <p>Quantity</p>
    <div className='ml-2'>Status</div>
    <div>Action</div>
  </div>
    {
      orders.map((order)=> <OrderTable
       key = {order.uniqueKey}
       order = {order} 
      />)
    }
    </div>
  )
}

export default AdminOrders