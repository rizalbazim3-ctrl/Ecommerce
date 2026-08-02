import React, { useState,useEffect } from 'react'
import axios from "axios"
import Navbar from '../components/Navbar'
import {Trash2} from "lucide-react"
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import useBooks from '../services/useBooks'
import {toast} from "sonner"
import { useSelector,useDispatch } from 'react-redux'
import {setcartcount} from "../services/cartSlice"

function Cart() {
  const {data : books = [],
    isLoading,
    isError
  } = useBooks()
  const list = books.filter( (book)=> book.addcart )
  const navigate = useNavigate()

  const [quantities, setQuantities] = useState({})

  const addcart = async (id)=> {
          axios.patch(` http://localhost:4001/books/${id}`,{
            addcart : false
          })
      }

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }))
  }

  const decreaseQuantity = (id) => {
  setQuantities((prev) => ({
    ...prev,
    [id]: Math.max((prev[id] || 1) - 1, 1)
  }))
}

const dispatch = useDispatch()

const handleBuyNow = (book) => {
  const checkoutItem = {
    id: book.id,
    image: book.image,
    title: book.title,
    price: book.price,
    quantity: quantities[book.id] || 1
  }

  localStorage.setItem(
    "checkoutItems",
    JSON.stringify([checkoutItem])
  )

  navigate("/Checkout")
}

const handleBuyAll = () => {
  const checkoutItems = list.map((book) => ({
    id: book.id,
    image: book.image,
    title: book.title,
    price: book.price,
    quantity: quantities[book.id] || 1
  }))

  localStorage.setItem(
    "checkoutItems",
    JSON.stringify(checkoutItems)
  )

  navigate("/Checkout")
}


  const totalPrice = list.reduce((total, book) => {
  const quantity = quantities[book.id] || 1;

    return total + book.price * quantity;
  }, 0);

  return (
    <div className='w-full h-screen '>
          <Navbar/>
        {  
      list.map((book)=> (
       <div key = {book.id}
       className="w-[50%] flex flex-row py-5 mx-auto my-20 bg-[#fbf6ec] rounded-2xl shadow-2xl overflow-hidden group hover:scale-110 tansition duration-700">
           <section className='w-[50%] '>
                        <img
                  src={book.image}
                  alt={book.title}
                  className="w-[55%] h-[350px]  mx-auto rounded-lg border-2 border-[#3b2a1f]/10 p-4 bg-[#8a4a1f]/10 hover:border-[#8a4a1f]  transition duration-300"
                />
           </section>
            <article className='w-[50%]'>
              <Trash2 className="text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duraton-700 ml-[90%]" 
               onClick={
                 ()=>{
                  addcart(book.id) 
                 }
                }/>
              <p className="text-3xl md:text-4xl font-bold text-[#3b2a1f] mb-3">{book.title}</p>
              <p className="text-[#3b2a1f]/75 text-base md:text-lg leading-7 md:leading-8 max-w-2xl mb-6">{book.description}</p>
              <p className="flex items-center gap-2 text-[#3b2a1f] font-medium mb-4">
                <span className="text-yellow-500">★</span>
                <span>{book.rating}</span>
                <span className="text-sm text-gray-500">/ 5</span>
              </p>
              <p className="text-3xl font-bold text-[#8a4a1f] mb-6">
                ₹{book.price}
              </p>
              <div className="flex flex-col gap-4 mt-6">
                <div className='ml-5'>
                    <button
                      disabled={(quantities[book.id] || 1) === 1}
                      className="p-4 text-2xl font-bold bg-black/10 rounded-lg hover:text-red-500 hover:bg-gray-400/40 transition duration-300"
                      onClick={() => decreaseQuantity(book.id)}
                        >
                          -
                    </button>

                      <span className="text-xl font-bold">
                        {quantities[book.id] || 1}
                      </span>

                      <button
                        className="p-4 text-2xl font-bold bg-black/10 rounded-lg hover:text-green-500 hover:bg-gray-400/40 transition duration-300"
                        onClick={() => increaseQuantity(book.id)}
                          >
                        +
                    </button>
                <span className="ml-20 text-xl font-bold text-[#8a4a1f]">
                ₹{book.price * (quantities[book.id] || 1)}
                </span>
                </div>
                <button 
                onClick={
                  ()=>handleBuyNow(book)
                }
                className="w-[80%] px-8 py-3 border-2 border-[#8a4a1f] text-[#8a4a1f] font-semibold rounded-lg hover:bg-[#8a4a1f] hover:text-white transition duration-300">
                  Buy now
                </button>
            </div>
            </article>
           
          </div>
          
      )) 
        
      }

       <div className='w-[50%] bg-[#fbf6ec] my-10 rounded-lg mx-auto p-10  text-center'>

        <p className="ml-20 text-xl font-bold text-[#8a4a1f] mb-3">
          Total Price : ₹{totalPrice}
        </p>
              <button 
                onClick={
                  handleBuyAll
                }
                className="w-[60%]  px-8 py-3 border-2 border-[#8a4a1f] text-[#8a4a1f] font-semibold rounded-lg hover:bg-[#8a4a1f] hover:text-white transition duration-300">
                  Buy All
                </button>
            </div>
      <Footer/>
      </div>
    // <div>
    //  {list.length ? 
    //   list.map((book)=> (
    //   <div key = {book.id}>
    //     <img key={book.id} src= {book.image} alert = {book.title} />
    //     <button className='rounded p-2 bg-gray-900/80'
    //     onClick={()=>
    //     addcart(book.id)
    //   }>remove</button>
    //   </div>
    //   )) :
      
    //   }
    // </div>
  )
}

export default Cart