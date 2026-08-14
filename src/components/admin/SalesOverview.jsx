import React from 'react'
import useAdminUsers from "../../services/admin/useAdminUsers"
import useBooks from '../../services/useBooks'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts"

function SalesOverview() {
    
    const {
        data : books =[],
        isLoading : booksLoading,
    } = useBooks()

    const {
        data : users = [],
        isLoading,
        isError
    } = useAdminUsers()

    const withoutAdmin = users.filter((item)=> {
        return item.role === "user"
    })

    if(isLoading){
        return <p>Loading..</p>
    }
    if(booksLoading){
        return <p>Loading...</p>
    }


// monhtly graph
    const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthlySales = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0
    };

    withoutAdmin.forEach((user)=>{
        user.orderedUserDetails.forEach((order)=>{
            const date = new Date(order.orderDate)

            const month = date.toLocaleString("en-US",{
                month : "short",
            })

            order.items.forEach((item)=>{
                monthlySales[month] += item.price * item.quantity
            })

        })
    })

    const salesData = months.map((month)=>(
        {
            month,
            sales : monthlySales[month]
        }
    ))


    //Low stock

    const LowStockBooks = books.filter((book)=> book.stock < 10 ) 

   //BestSellingBook

   const productSale  = {}

   withoutAdmin.forEach((user)=> {
    user.orderedUserDetails.forEach((orders)=>{
        orders.items.forEach((item)=>{
            if(productSale[item.id]){
                productSale[item.id].quantity += item.quantity
            }else{
                productSale[item.id] = {
                    id : item.id,
                    title : item.title,
                    price : item.price,
                    quantity : item.quantity
                }
            }
        })
    })
   })

   const bestSellingBooks = Object.values(productSale)
   const bestSellingBooksOrderly = bestSellingBooks.sort((a,b)=> b.quantity - a.quantity)

   //recent orders

   const recentOrders = withoutAdmin.flatMap((user)=>{
   return  user.orderedUserDetails.flatMap((order)=>{
      return  order.items.map((item)=>{
          return  {
                ...item,
                name : user.name,
                email : user.email,
                date : order.orderDate
            }
            
   })
    })
   })

   const recentOrdersSorted = recentOrders.sort((a,b)=> {
    return (
        new Date(b.date)- new Date(a.date)
    )
   }).slice(0,5)


  return (
    <div className='w-full grid grid-cols-2 gap-5 mx-5'>
        <div className=" h-[400px]  rounded-xl bg-[#F2EFE9] hover:shadow-xl p-5">

            {/* time pireods */}
            <div className = "flex gap-10 ml-10 mb-3">
                <button className='rounded-xl bg-white px-2 border border-white hover:border-black transition duration-500' 
                >All</button>
                <button className='rounded-xl bg-white px-2 border border-white hover:border-black transition duration-500'
                >7 Day</button>
                <button className='rounded-xl bg-white px-2 border border-white hover:border-black transition duration-500'
                >Month</button>
            </div>

            <ResponsiveContainer width="100%" height="100%" 
            className="pb-5"  >
                <BarChart data={salesData} >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="sales"  fill="#a95f1d"
                barSize={29}
                activeBar={null}
                />

                </BarChart>
            </ResponsiveContainer>

        </div>

        <section className=' h-[400px] bg-[#F2EFE9] mr-10 rounded-xl p-5 '>
            <h1 className='text-2xl font-semibold text-yellow-900 underline text-center'>Low Stock Books</h1>
            
            <div className=' grid grid-cols-3  mt-3 text-lg text-Green-900 font-semibold text-center'>
                <p>Book</p>
                <p>Category</p>
                <p>Stock</p>
            </div>
            
            <div className = 'overflow-y-auto h-[300px] hide-scrollbar border-t'>

                {
                LowStockBooks.map((book)=> (
                <div className='grid grid-cols-3 rounded-xl  mt-5  gap-5 p-5 bg-[#B08D46]/60 text-white ' key={book.id}>
                    <p className='text-center font-semibold'>{book.title}</p>
                    <p className='text-center underline'>{book.category}</p>
                    <p className='text-center '>{book.stock}</p>
                 </div>
                    ))
                }

            </div>    
           
        </section>
        <section className=' rounded-xl h-[400px] bg-[#F2EFE9] p-5 hide-srollbar mb-5'>
           <h1 className= "text-center text-2xl text-yellow-900 font-semibold underline mb-5">Recent Orders</h1>

            <div className=' grid grid-cols-4  mt-3 text-lg text-Green-900 font-semibold text-center'>
                <p>Book</p>
                <p>UserName</p>
                <p>E-mail</p>
                <p>Date</p>
            </div>
                
                <div className='overflow-y-auto hide-scrollbar h-[300px] pt-3 border-t '>
                    {
                        recentOrdersSorted.map((item,index)=>(
                            <div className = "grid grid-cols-4 gap-3 rounded-lg text-center items-center bg-[#B08D46]/60 text-gray-200 mb-3 p-5"
                                key = {index}>
                                <p className='text-center font-semibold'>{item.title}</p>
                                <p className='text-center '>{item.name}</p>
                                <p className='text-center font-semibold'>{item.email}</p>
                                <p className='text-center '>{
                                    new Date(item.date).toLocaleString("en-US",{
                                        month : "short",
                                        day : "numeric",
                                        year : "numeric"
                                    })
                                    }</p>  
                            </div>
                            ))
                    }
                </div>
           
        </section>
        <section className=' h-[400px] bg-[#F2EFE9] mr-10 rounded-xl p-5 '>
           <h1 className= "text-center text-2xl font-semibold underline mb-5">Best Selling Books</h1>
            <div className=' grid grid-cols-3  mt-3 text-lg text-Green-900 font-semibold text-center'>
                <p>Book</p>
                <p>Pricce</p>   
                <p>Quantity</p>
            </div>
           
           <div className='overflow-y-auto h-[300px] hide-scrollbar border-t'>
             {
            bestSellingBooksOrderly.map((book)=> (
                <div className = "grid grid-cols-3 rounded-lg text-center items-center bg-[#B08D46]/60 mt-3 text-gray-200 mb-3 p-5"
                key = {book.id}>
                    <p className='text-center font-semibold'>{book.title}</p>
                    <p className='text-center underline'>₹{book.price}</p>
                    <p className='text-center '>{book.quantity}</p>  
                </div>
            ))
           }
           </div>
        </section>
    </div>
  )
}

export default SalesOverview