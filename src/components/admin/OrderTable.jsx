import React, { useState } from 'react'
import OrderView from '../../pages/admin/OrderView' 
import { useMutation,useQueryClient } from '@tanstack/react-query'
import axios from "axios"
import { Eye } from 'lucide-react'

function OrderTable({order}) {
    const [OrderViewCheck,setOrderViewCheck] = useState(false)
    const queryClient = useQueryClient()

    const totalPrice = order.items.reduce((total , item)=> {
       return total + (item.price * item.quantity)
    },0)
  
    const totalQuantity = order.items.reduce((total,item)=>{
        return total + item.quantity
    },0)
 

    const updateStatus = async ({ email, orderId, status }) => {
        
    const  user  = await axios.get(
    `http://localhost:4001/users?email=${email}`
    );

    const updatedOrders = user.data[0].orderedUserDetails.map((order) => (
        order.orderId === orderId ? {...order,...status} : order 
    ))

    await axios.patch(`http://localhost:4001/users/${user.data[0].id}`, {
    orderedUserDetails: updatedOrders
    });
    };

    const statusMutation = useMutation({
        mutationFn : updateStatus,

        onSuccess : ()=>{
            queryClient.invalidateQueries({
                queryKey : ["AdminUser"]
            })
        }
    })


    const handleStatus = (status,email,orderId)=>{
        
        statusMutation.mutate({status,email,orderId})
    }

  return (
    <div className={` rounded-xl shadow-xl  overflow-hidden my-1 py-3 
    ${!OrderViewCheck && "hover:shadow-2xl hover:scale-102 hover:bg-gray-900/30 transition-scale-bg duration-500"}`}>

        {
        OrderViewCheck && <OrderView value = {{setOrderViewCheck,order}}/> 
       }

  {/* Order Row */}
  <div className="grid grid-cols-7  items-center px-6 py-5   ">

    <div className="font-semibold text-gray-800">
     #{order.orderId}
    </div>

    <div className="text-gray-700">
        {order.name}
    </div>

    <div className="text-gray-500 text-sm">
      {new Date(order.date).toLocaleString("en-US",{
        month : "short",
        day : "numeric"
      })}
    </div>

        <p className = "font-semibold text-gray-800" >
            {totalPrice}
        </p>

        <p className = "font-semibold text-gray-800 ml-4" >
            {totalQuantity}
        </p>

   <select className = {`outline-none text-blue-600 italic font-semibold  ${order.delivery === "Delivered" ?
    "text-green-600" : order.delivery === "Pending" ? "text-yellow-600" : order.delivery === "Shipped" ?
    "text-blue-600" : "text-red-600"
   }`}
   value = {order.delivery}
   onChange = {(e)=>{
    const status = {delivery : e.target.value}
    handleStatus(status,order.email,order.orderId)
   }}
   >
    <option>Pending</option>
    <option>Shipped</option>
    <option>Delivered</option>
    <option>Cancelled</option>
   </select>

    <div>
      <button
      onClick={()=>{
        setOrderViewCheck(true)
      }}
       className=" text-sm font-medium rounded-lg  transition ml-10 ">
        <Eye size={35} className='rounded hover:bg-gray-500/50 p-1'/> 
      </button>
    </div>

  </div>

 
</div>
  )
}

export default OrderTable