import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {useSelector} from "react-redux"
import {toast} from "sonner"
import { useNavigate } from 'react-router-dom' 
import useBooks from '../services/useBooks'

function Checkout() {
  const {id} = useParams()
  const navigate = useNavigate()
  const {data : books = [],
    isLoading,
    isError
  } = useBooks()
  const checkout = books.find((book)=> book.id === Number(id))
  const [quantity,setQuantity] = useState(1)
  const [name,setName] = useState("")
  const [number,setNumber] = useState(0)
  const [street,setStreet] = useState("")
  const [place,setPlace] = useState("")  
  const [state,setState] = useState("")
  const [pincode,setPincode] = useState("")
  const [paymentMethod,setPaymentMethod] = useState("")

  const handlePlaceOrder = ()=>{
    if(name === ""){
      toast.error("Enter your name")
    }else if(number === "" || number.length !== 10){
      toast.error("check your number")
    }else if(street === ""){
      toast.error("Enter Street/House")
      console.log(street)
    }else if(place === ""){
      toast.error("Enter city")
    }else if(state === ""){
      toast.error("Enter your State")
    }else if(pincode === ""){
      toast.error("Enter your valid pincode")
    }else if(paymentMethod === ""){
      toast.error("Select any pament method")
    }else{
      setName("")
      setNumber("")
      setStreet("")
      setPlace("")
      setPincode("")
      setState("")
      setPaymentMethod("")
      
      toast.success("Successfull")
      navigate("/PaymentResult")
    }
  }

  return (
    <div className='w-full  flex  flex-col  items-center mb-20 '>
       <div 
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
              
              <button disabled = {quantity === 1}
              className="p-4   text-2xl  font-bold bg-black/10 rounded-lg hover:scale-110 transition duration-300"
              onClick={()=>{
                setQuantity(quantity-1)
              }}
              >-</button>
              <span 
              className='text-xl font-bold mx-3'>
                {quantity}</span>
              <button
                className="p-4 text-2xl  font-bold bg-black/10 rounded-lg hover:scale-110 transition duration-300"
              onClick = {()=>{
                setQuantity(quantity+1)
              }}
              >+</button>
              <span className='text-xl font-semibold text-gray-500 ml-10'
              >Total&nbsp;:-&nbsp;</span>
              <span className="text-xl font-bold text-[#8a4a1f]"
              >₹{quantity*checkout.price}</span>

            </article>
          </div>
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

      <div className="flex flex-col gap-4">

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
          <p className='border-b my-5 italic text-lg text-green-500'><span className='font-bold text-xl '>Price&nbsp;:&nbsp;</span>₹{checkout.price}</p>
          <p className='border-b my-5 italic text-lg text-green-500'><span className='font-bold text-xl '>PaymentMethod&nbsp;:&nbsp;</span>{paymentMethod}</p>
          <p className='border-b my-5 italic text-lg text-green-500'> <span className='font-bold text-xl '>Quantity&nbsp;:&nbsp;</span>₹{checkout.price * quantity}</p>
          <button onClick={handlePlaceOrder}
          className='rounded mx-auto ml-[40%] my-4 bg-yellow-900 text-white p-3 hover:bg-green-600 hover:scale-125   duration-500  '>Place Order</button>
        </footer>

          </div>
             
    </div>
  )
}

export default Checkout