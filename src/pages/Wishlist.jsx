  import React, { useEffect } from 'react'
  import { useSelector,useDispatch } from 'react-redux'
  import Navbar from '../components/Navbar'
  import Footer from '../components/Footer'
  import { Heart } from 'lucide-react'
  import axios from "axios"
  import useBooks from '../services/useBooks'
  import { toast } from 'sonner'
  import { setwishlistCount } from "../services/cartSlice"
  import useUsers from '../services/useUsers'

  function Wishlist() {
    const userid = localStorage.getItem("userId")
    const dispatch = useDispatch()

    const {data : user = [],
      isLoading,
      isError
    } = useUsers()

    if(isLoading){
      return <p>Loading...</p>
    }

      const list = user.wishlist.map( (book)=> book ) 
    const cartlist = user.cart.map((item)=> item )
    
    
 

    const wishlist = async (id)=> {
      
        try { 

          const wishUpdated = list.filter((item)=> item.id !== id )

          axios.patch(` http://localhost:4001/users/${userid}`,{
                wishlist : wishUpdated
            })}catch(error){
              console.log(error)
            }
            }  
    const addcart = async (id)=> {

      const cartUpdated = cartlist?.filter((item)=> item.id === id) || false

      const book = list.find((item)=> item.id === id )

      if(cartUpdated.length === 0){
        axios.patch(` http://localhost:4001/users/${userid}`,{
          cart : [...(user.cart) || []
            ,book]
        })
        
        toast.success("Added successfully")
      }else{
        toast.error("Already added")
      }
      console.log(id)
                          
    }                          
   
    return (
    <div className='w-full h-screen '>
            <Navbar/>
          { 
          list.length ? 
        list.map((book)=> (
        <div key = {book.id}
        className="w-[50%] flex flex-row py-5 mx-auto my-20 bg-[#fbf6ec] rounded-2xl shadow-2xl overflow-hidden group  hover:scale-110 transition duration-700">
            <section className='w-[50%] '>
                          <img
                    src={book.image}
                    alt={book.title}
                    className="w-[55%] h-[350px] object-contain mx-auto rounded-lg border-2 border-[#3b2a1f]/10 p-4 bg-[#8a4a1f]/10 hover:border-[#8a4a1f]  transition duration-300"
                  />
            </section>
              <article className='w-[50%]'>
                <Heart 
                className="text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duraton-700 ml-[90%] fill-red-500"
                onClick={()=>{
                  wishlist(book.id)
                }} />
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
                
                  <button className="w-[80%] ml-5 px-8 py-3 bg-[#8a4a1f] text-white font-semibold rounded-lg hover:bg-[#3b2a1f] transition duration-300"
                  onClick={
                  ()=> addcart(book.id)
                  }>
                    Add to Cart
                  </button>
              </article>
            </div>
        ))
            :
            <div  
              className=" flex justify-center items-center w-[70%] h-[40%] flex flex-row py-5 mx-auto my-20 bg-[#fbf6ec] rounded-2xl shadow-2xl overflow-hidden group  text-center">
                <p className='font-bold text-[#3b2a1f] text-3xl'>Empty</p>
            </div>
          
        }
        <Footer/>
        </div>
    )
  }

  export default Wishlist