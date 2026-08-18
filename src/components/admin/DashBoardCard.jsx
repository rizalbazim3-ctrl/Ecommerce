import React from 'react'
import { BookOpen, Users, ShoppingCart, IndianRupee } from "lucide-react";
import useAdminUsers from '../../services/admin/useAdminUsers';
import useBooks from '../../services/useBooks';

function DashBoardCard() {


//books
  const {
    data : books = []
  } = useBooks()


  //users
  const {
    data : users = [],
    isLoading,
    isError
  } = useAdminUsers()


 const withoutAdmin = users.filter((item)=> {
        return item.role === "user"
    })


    //successsfullOrders
    const successFullOrders = withoutAdmin.reduce((orders,item)=>{
      return orders + item.orderedUserDetails.filter(
        (value)=> value.delivery === "Delivered"
      ).length
    },0)

// total revenue
  const Total = withoutAdmin.reduce((orderTotal,user)=>{
    return orderTotal + user.orderedUserDetails.reduce((product,order)=>{
      return product + order.items.reduce((price,item)=>{
        return price + item.price * item.quantity
      },0)
    },0)
  },0)


  //Loadnig
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white px-15 py-8 rounded-xl shadow-md flex flex-col items-center ">
        
        <div className="w-12 h-12 border-4 border-gray-200 border-t-yellow-900 rounded-full animate-spin"></div>

        <p className="mt-4 text-gray-700 font-semibold">
          Loading...
        </p>

        <p className="text-sm text-gray-400 mt-1">
          Please wait
        </p>

      </div>
    </div>
  );
}

  return (
    <div className="p-6">

      <section className="grid md:grid-cols-4 md:gap-6 ">

        <div className="rounded-xl bg-[#F2EFE9] shadow-md md:p-6 p-4 hover:shadow-xl transition">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-500 font-medium">Books</h2>
            <BookOpen className="text-blue-600" size={28} />
          </div>

          <h1 className="text-4xl font-bold mt-6 text-yellow-900">{books.length}</h1>

          <p className="text-gray-500 mt-2">Total Books</p>
        </div>

        <div className="rounded-xl bg-[#F2EFE9] shadow-md p-6 hover:shadow-xl transition">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-500 font-medium">Users</h2>
            <Users className="text-green-600" size={28} />
          </div>

          <h1 className="text-4xl font-bold mt-6 text-yellow-900">{users.length}</h1>

          <p className="text-gray-500 mt-2">Registered Users</p>
        </div>

        <div className="rounded-xl bg-[#F2EFE9] shadow-md p-6 hover:shadow-xl transition">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-500 font-medium">Orders</h2>
            <ShoppingCart className="text-orange-500" size={28} />
          </div>

          <h1 className="text-4xl font-bold mt-6 text-yellow-900">{successFullOrders}</h1>

          <p className="text-gray-500 mt-2">Completed Orders</p>
        </div>

        <div className="rounded-xl bg-[#F2EFE9] shadow-md p-6 hover:shadow-xl transition">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-500 font-medium">Revenue</h2>
            <IndianRupee className="text-purple-600" size={28} />
          </div>

          <h1 className="text-4xl font-bold mt-6 text-yellow-900">{Total}</h1>

          <p className="text-gray-500 mt-2">Total Revenue</p>
        </div>

      </section>

    </div>
  )
}

export default DashBoardCard