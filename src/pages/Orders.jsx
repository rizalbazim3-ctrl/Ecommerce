import React from 'react'
import useUsers from '../services/useUsers'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Orders() {

  const {data ,
    isLoading,
    isError
  } = useUsers()
  
   console.log(localStorage.getItem("userId"))

   if(isLoading){
    return <p>Loading...</p>
   }


   if(isError){
     return <p>something is wrong</p>
   }

   console.log(data.orderedUserDetails)
  return (
    <div>
      <Navbar />
      <div className='w-[100%] flex flex-col items-center mt-10'>
        <p className='text-xl font-bold mb-5 rounded bg-[#3B5D3A] text-white p-3'>ORDERED ITEMS </p>
        

          {
            data.orderedUserDetails.map((user)=> (
                <section key = {user.orderDate}
          className='flex flex-row gap-10 w-[50%] h-[10%] font-semibold px-8 py-8 my-5 rounded-lg bg-[#fbf6ec] text-[#3D2B1F] items-center justify-center'>
            {user.items.map((item)=>(

                <div className=' w-[30%] flex flex-wrap '>
                <section>
                  <img className='w-[60%]  '
                src={item.image}
                alt="book"
                  />
                  <p>Q-{item.quantity}</p>
                  <p>price :{item.price}</p>
                </section>
              </div>

            ))}
          <div className='w-[33%]'> 
            <p>Orded Address:</p>
            <p>{user.address.orderedName}</p>
            <p>{user.address.orderedEmail}</p>
            <p>{user.address.orderedNumber}</p>
            <p>{user.address.orderedStreet}</p>
            <p>{user.address.orderedState}</p>
            <p>payment :{user.payment}</p>
            <p>{user.orderDate}</p>
          </div>
          <div>
          </div>
          <p className='text-green-500 italic text-lg'>Delivered</p>
        </section>
             ) )
          }
      </div>
      <Footer/>
    </div>
  )
}

export default Orders