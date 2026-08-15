import React,{useEffect, useState} from 'react'
import OrderTable from "../../components/admin/OrderTable"
import useAdminUsers from "../../services/admin/useAdminUsers"
import {useSelector} from "react-redux"


function AdminOrders() {
 
      const {
        data : Allusers = [],
        isLoading,
        isError
    } = useAdminUsers()
    const adminSearch = useSelector((state)=> state.adminFilter.adminSearch)
    

    //pagination
    const [startPage,setStartPage] = useState(0)
    const [endPage,setEndPage] = useState(5)
    const perPage = 5
    const [value,setValue] = useState(0)

    const users = Allusers.filter((user)=> user.role === "user")

    const AllOrders = users.flatMap((user)=>{
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

    const searchedOrders = AllOrders.filter((item)=> adminSearch.trim().length === 0? true : String(item.orderId).includes(adminSearch) )
    console.log(searchedOrders)
    const orders =searchedOrders.slice(startPage,endPage)

    const paginationButton = []

    for(let i =1; i<=Math.ceil(AllOrders.length/5);i++){
      paginationButton.push(<button 
        key = {i}
        className = {`rounded  font-semibold px-4  text-white 
        py-1 mx-2  ${(i === value) ? "bg-yellow-900/80"  : "bg-yellow-900/50 hover:bg-yellow-900/70"}` }
        value = {i}
        onClick={(e)=>{

          setValue(i)
          const value = e.target.value 
          setStartPage( (value-1) * perPage)

          setEndPage( value * perPage)

        }}
      >{i}</button>)
    }

    useEffect(()=>{
      setStartPage(0)
      setEndPage(perPage)
    },[adminSearch])
    

    if(isLoading){
      return <p>Loading...</p>
    }

  return (
    <div >
    <div className='rounded-lg bg-[#F2EFE9] p-5 mx-10 min-h-[400px]'>

      {/* Table Header */}
  <div className="grid grid-cols-7 gap-4 px-6 py-4 bg-[#F2EFE9] border-b border-yellow-900 rounded-xl text-sm font-semibold text-yellow-900  ">
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

        <div className='flex flex-wrap justify-center mt-3 mb-5'>
     <p className = 'px-3 py-1 bg-yellow-900/70 text-white hover:bg-yellow-900/90 rounded'
    onClick={()=>{
      if(endPage !== pages){
      setStartPage((prev)=>prev-perPage)
      setEndPage((prev)=> prev-perPage)
      
      }
    }}
    >{ "< "}Previous</p>
    {
      paginationButton.map((item)=>{
        return (
          item
        )
      })
    }

     <p className = 'px-5 py-1 bg-yellow-900/70 text-white hover:bg-yellow-900/90 rounded'
    onClick={()=>{
      if(Loginusers.length > endPage){
        setStartPage((prev)=>prev+perPage)
        setEndPage((prev)=> prev+perPage)

      }
    }}

    >Next{ " >"}</p>

    </div>
    </div>
  )
}

export default AdminOrders