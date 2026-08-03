import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {useSelector} from "react-redux"
import {toast} from "sonner"
import { useNavigate } from 'react-router-dom' 
import useBooks from '../services/useBooks'
import Footer from "../components/Footer"
import { User } from 'lucide-react'
import { useMutation,useQueryClient,useQuery } from '@tanstack/react-query'
import axios from "axios"
import useUsers from '../services/useUsers'
import Navbar from '../components/Navbar'

function Checkout() {
  const checkoutItems = JSON.parse(
  localStorage.getItem("checkoutItems") || "[]"
 )

  const navigate = useNavigate()

  const {data : books = [],
    isLoading : booksloading,
    isError : bookserror
  } = useBooks()

  const {
    data : user ,
    isLoading : userloading,
    isError : usererror
  } = useUsers()

  // const checkout = books.find((book)=> book.id === Number(id))
  const [quantity,setQuantity] = useState(1)
  const [name,setName] = useState("")
  const [number,setNumber] = useState(0)
  const [street,setStreet] = useState("")
  const [place,setPlace] = useState("")  
  const [state,setState] = useState("")
  const [pincode,setPincode] = useState("")
  const [paymentMethod,setPaymentMethod] = useState("")
  const [orderDetails,setOrderDetails] = useState([])
  const userId = localStorage.getItem("userId")
  const queryClient = useQueryClient()
  

const addAddress = async ({ userId, newDetails }) => {
  // Get the latest user data from server
  const userResponse = await axios.get(
    `http://localhost:4001/users/${userId}`
  )

  const user = userResponse.data

  // Add only the current new order
  const updatedOrders = [
    ...(user.orderedUserDetails || []),
    newDetails
  ]

  // Update server
  const response = await axios.patch(
    `http://localhost:4001/users/${userId}`,
    {
      orderedUserDetails: updatedOrders
    }
  )

  return response.data
}


const removeOrderedItemsFromCart = async () => {
  const userResponse = await axios.get(
    `http://localhost:4001/users/${userId}`
  )

  const user = userResponse.data

  const updatedCart = (user.cart || []).filter(
    (cartItem) =>
      !checkoutItems.some(
        (checkoutItem) => checkoutItem.id === cartItem.id
      )
  )

  await axios.patch(
    `http://localhost:4001/users/${userId}`,
    {
      cart: updatedCart
    }
  )
}



const patchMutation = useMutation({
  mutationFn: addAddress,

  onSuccess: async () => {
  await removeOrderedItemsFromCart()

  queryClient.invalidateQueries({
    queryKey: ["user"]
  })

  localStorage.removeItem("checkoutItems")

  console.log("Order successfully saved")
},

  onError: (error) => {
    console.log("Order failed:", error)
    toast.error("Order failed")
  }
})

const increaseQuantity = (id) => {
  const updatedItems = checkoutItems.map((item) =>
    item.id === id
      ? {
          ...item,
          quantity: item.quantity + 1
        }
      : item
  )

  localStorage.setItem(
    "checkoutItems",
    JSON.stringify(updatedItems)
  )

  window.location.reload()
}

const decreaseQuantity = (id) => {
  const updatedItems = checkoutItems.map((item) =>
    item.id === id
      ? {
          ...item,
          quantity: item.quantity - 1
        }
      : item
  )

  localStorage.setItem(
    "checkoutItems",
    JSON.stringify(updatedItems)
  )

  window.location.reload()
}


const handlePlaceOrder = async () => {
  if (checkoutItems.length === 0) {
    toast.error("Select product")
    return
  }

  if (name === "") {
    toast.error("Enter your name")
    return
  }

  if (number === "" || number.length !== 10) {
    toast.error("Check your number")
    return
  }

  if (street === "") {
    toast.error("Enter Street/House")
    return
  }

  if (place === "") {
    toast.error("Enter city")
    return
  }

  if (state === "") {
    toast.error("Enter your State")
    return
  }

  if (pincode === "") {
    toast.error("Enter your valid pincode")
    return
  }

  if (paymentMethod === "") {
    toast.error("Select any payment method")
    return
  }

  const newDetails = {
    orderDate: new Date().toISOString(),

    address: {
      orderedName: name,
      orderedNumber: number,
      orderedStreet: street,
      orderedPlace: place,
      orderedPincode: pincode,
      orderedState: state
    },

    payment: paymentMethod,

    items: checkoutItems
  }

  try {
    await patchMutation.mutate({
      userId,
      newDetails
    })

    toast.success("Order successfully placed")

    navigate("/PaymentResult")

  } catch (error) {
    toast.error("Failed to place order")
    console.log(error)
  }
}

  console.log(checkoutItems)

  // const checkoutItems = id ? [checkout] : items

  const totalPrice = checkoutItems.reduce(
  (total, item) => {
    return total + item.price * item.quantity
  },
  0
)

  const totalQuantity = checkoutItems.reduce(
  (total, item) => total +  item.quantity,
  0
  );
// //deleting cart
//   const removecart = async (id)=> {
  
//      try{ const cartUpdated =  list.filter((item)=> item.id !== id )
  
//             axios.patch(` http://localhost:4001/users/${userid}`,{
//               cart : cartUpdated
//             })
  
//             queryClient.invalidateQueries({
//               queryKey : ["user"]
//             })
//           }catch(error){
//             console.log(error)
//           }
//         }

  if(booksloading){
   return  <p>Loading...</p>
  }
  if(booksloading){
    return <p>something is wrong ,Try again</p>
  }

  return (
    <>
    <div className='w-full  flex  flex-col  items-center mb-20 '>

      <Navbar/>

      <h1 className="text-4xl font-serif font-bold text-[#3b2a20] border-b text-center m-10 hover:scale-102 duration-500">
            Complete Your Purchase</h1>
     {
       checkoutItems.map((checkout)=>(
          <div key = {checkout.id}
       className="w-[50%] flex flex-row py-5 my-10 bg-[#fbf6ec] rounded-2xl shadow-2xl overflow-hidden hover:scale-110 tansition duration-700">
           <section className='w-[50%] '>
                        <img
                  src={checkout.image}
                  alt={checkout.title}
                  className=" h-[300px] object-contain mx-auto rounded-lg "
                />
           </section>
            <article className='w-[50%]'>
              <p className="text-3xl md:text-4xl font-bold text-[#3b2a1f] mb-3"
              >{checkout.title}</p>
              <p className="text-[#3b2a1f]/75 text-base md:text-lg leading-7 md:leading-8 max-w-2xl mb-6"
              >{checkout.description}</p>
              <p className="flex items-center gap-2 text-[#3b2a1f] font-medium mb-4">
                <span className="text-yellow-500">★</span>
                <span>{checkout.rating}</span>
                <span className="text-sm text-gray-500">/ 5</span>
              </p>
              <p className="text-3xl font-bold text-[#8a4a1f] mb-6 ">
                ₹{checkout.price}
              </p>
              
              <button disabled = {checkout.quantity === 1}
              className="p-4   text-2xl  font-bold bg-black/10 rounded-lg hover:scale-110 transition duration-300"
              onClick={()=> decreaseQuantity(checkout.id)}
              >-</button>
              <span 
              className='text-xl font-bold mx-3'>
                {checkout.quantity}</span>
              <button
                className="p-4 text-2xl  font-bold bg-black/10 rounded-lg hover:scale-110 transition duration-300"
              onClick = {()=>  increaseQuantity(checkout.id)
              }
              >+</button>
              <span className='text-xl font-semibold text-gray-500 ml-10'
              >Total&nbsp;:-&nbsp;</span>
              <span className="text-xl font-bold text-[#8a4a1f]"
              >₹{checkout.quantity*checkout.price}</span>

            </article>
          </div>
       ))
     }
          <div className='w-[50%] bg-[#fbf6ec] rounded-2xl shadow-2xl hover:scale-110 tansition duration-700'>
            <p className="text-2xl font-bold text-[#3b2a1f] mb-5 text-center mt-7">Address :</p>
            <div 
          className=" grid grid-cols-2 gap-5 p-6  mx-auto ">
              <input
                type="text"
                placeholder="Full Name "
                className="border p-3 rounded-lg hover:bg-yellow-900/20 hover:scale-110 tansition duration-700" 
                onChange={
                  
                  (e)=> {
                     setName(e.target.value)
                  }
                   
                }/>
              <input
                type="text"
                placeholder="Phone Number"
                className="border p-3 rounded-lg hover:bg-yellow-900/20 hover:scale-110 tansition duration-700"
                onChange={
                  (e)=> setNumber(e.target.value)
                }/>

              <input
                type="text"
                placeholder="House / Street "
                className="border p-3 rounded-lg hover:bg-yellow-900/20 hover:scale-110 tansition duration-700" 
                onChange={
                  (e)=> setStreet(e.target.value)
                }/>

              <input
                type="text"
                placeholder="City"
                className="border p-3 rounded-lg hover:bg-yellow-900/20 hover:scale-110 tansition duration-700"
                onChange={
                  (e)=> setPlace(e.target.value)
                }/>

              <input
                type="text"
                placeholder="State"
                className="border p-3 rounded-lg hover:bg-yellow-900/20 hover:scale-110 tansition duration-700" 
                onChange={
                  (e)=> setState(e.target.value)
                }/>

              <input
                type="text"
                placeholder="Pincode"
                className="border p-3 rounded-lg hover:bg-yellow-900/20 hover:scale-110 tansition duration-700"
                onChange={
                  (e)=> setPincode(e.target.value)
                }/>
            </div>
              <h2 className="text-2xl font-bold text-[#3b2a1f] mb-5 text-center">
        Payment Method
      </h2>

      <div className="flex flex-col gap-4 mb-10">

        <label className="flex items-center gap-3 w-[80%] p-4 mx-auto border rounded-lg hover:bg-[#3b2a1f]/5 hover:scale-110 tansition duration-700 ">
          <input
            type="radio"
            name="payment"
            value="Cash On Delivery"
            checked={paymentMethod === "Cash On Delivery"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <span className="font-medium text-[#3b2a1f]">
            Cash on Delivery
          </span>
        </label>

       
        <label className="flex items-center gap-3 p-4 w-[80%] p-4 mx-auto border rounded-lg  hover:bg-[#3b2a1f]/5 mb-5 hover:scale-110 tansition duration-700">
          <input
            type="radio"
            name="payment"
            value="online"
            checked={paymentMethod === "online"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <span className="font-medium text-[#3b2a1f] ">
            Online Payment
          </span>
        </label>
        </div>

        <p className='font-bold text-2xl text-center text-red-500 '>Order Info:-</p>
        <footer className='w-[80%] border mx-auto mb-10 rounded-2xl px-10'>
          <p className='border-b my-5 italic text-lg text-green-500'><span className='font-bold text-xl '>Quantity&nbsp;:&nbsp;</span>{totalQuantity}</p>
          <p className='border-b my-5 italic text-lg text-green-500'><span className='font-bold text-xl '>PaymentMethod&nbsp;:&nbsp;</span>{paymentMethod}</p>
          <p className='border-b my-5 italic text-lg text-green-500'> <span className='font-bold text-xl '>Price&nbsp;:&nbsp;</span>₹{totalPrice}</p>
          <button onClick={handlePlaceOrder}
          className='rounded mx-auto ml-[40%] my-4 bg-yellow-900 text-white p-3 hover:bg-green-600 hover:scale-125   duration-500  '>Place Order</button>
        </footer>

          </div>
          
             
    </div>
    <Footer />
    </>
    
  )
}

export default Checkout