import React from 'react'
import useUsers from '../services/useUsers'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Orders() {

  const {data ,
    isLoading,
    isError
  } = useUsers()
  


   if(isLoading){
    return <p>Loading...</p>
   }


   if(isError){
     return <p>something is wrong</p>
   }


  return (
    
    <div>
      <Navbar />
      <div className='w-[100%] flex flex-col items-center mt-10'>
        <p className='text-xl font-bold mb-5 rounded bg-[#3B5D3A] text-white p-3'>ORDERED ITEMS </p>
        

           {data.orderedUserDetails.map((user) => (
      <section
        key={user.orderDate}
        className='w-[50%] px-8 py-8 my-5 rounded-lg bg-[#fbf6ec] text-[#3D2B1F] font-semibold'
      >

        {/* TOP: Ordered Items */}
        <div className='w-full border-b pb-6 mb-6'>
          <p className='text-xl font-bold mb-5'>
            Ordered Items
          </p>

          <div className='flex flex-wrap gap-6'>
            {user.items.map((item) => (
              <div
                className='w-[120px] flex flex-col items-center'
                key={item.id}
              >
                <img
                  className='w-[80px] h-[110px] object-contain'
                  src={item.image}
                  alt="book"
                />

                <p>Q-{item.quantity}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM: Address + Status */}
        <div className='flex flex-row justify-between items-start'>

          {/* Address */}
          <div className='w-[60%]'>
            <p className='font-bold text-lg mb-2'>
              Ordered Address:
            </p>

            <p>{user.address.orderedName}</p>
            <p>{user.address.orderedEmail}</p>
            <p>{user.address.orderedNumber}</p>
            <p>{user.address.orderedStreet}</p>
            <p>{user.address.orderedState}</p>
            <p>Payment: {user.payment}</p>
            <p>{user.orderDate}</p>
          </div>

          {/* Status */}
          <div className='w-[30%] flex justify-center items-center'>
            <p 
            className={`${user.delivery === "Delivered" && 'text-green-600 italic text-lg'}
          ${user.delivery === "Shipped" && 'text-blue-500 italic text-lg'}
          ${user.delivery === "Pending" && 'text-yellow-500 italic text-lg'}
          ${user.delivery === "Cancelled" && 'text-red-600 italic text-lg'}`}
            >
              {user.delivery}
            </p>
          </div>

        </div>

      </section>
    ))}
      </div>
      <Footer/>
    </div>
  )
}

export default Orders