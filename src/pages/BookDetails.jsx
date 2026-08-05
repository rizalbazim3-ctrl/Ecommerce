import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {useNavigate} from "react-router-dom"
import { toast } from 'sonner'
import useUsers from '../services/useUsers'
import {useQueryClient} from "@tanstack/react-query"

function BookDetails() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [Details,setDetails] = useState([])
  const userid = localStorage.getItem("userId")
  const queryClient = useQueryClient()

  useEffect( ()=>{
    const fetchDetails = async (id)=>{
      const response = await axios.get(`http://localhost:4001/books/${id}`)
      setDetails(response.data)
    }
    fetchDetails(id)
  },[id])

  const {data : user = [],
    isLoading,
    isError
  } = useUsers()

  const addcart = async ()=> {
    const addingCart = user.cart.filter((item)=> item.id === Details.id)
   try{ if(addingCart.length !== 0 ){
      toast.error("already added")
    }else{
        axios.patch(` http://localhost:4001/users/${userid}`,{
        cart : [...(user.cart) || [],Details]
          })

          queryClient.invalidateQueries({
                queryKey : ["user"]
              })

            toast.success("added Successfully")
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleBuyNow = (book) => {

    if(localStorage.getItem("userId")){
                  navigate(`/Checkout/${Details.id}`)
  const checkoutItem = {
    id: book.id,
    image: book.image,
    title: book.title,
    price: book.price,
    quantity: 1
  }

  localStorage.setItem(
    "checkoutItems",
    JSON.stringify([checkoutItem])
  )

  navigate("/Checkout")
  }
  else{
   navigate("/Login")
  }
  }

  
  return (
    <div className='w-full h-screen'>
      <Navbar/>
    { 
      Details.length === 0 ? <p>Loading...</p> :
      <div className="w-[70%] flex flex-row py-5 mx-auto my-20 bg-[#fbf6ec] rounded-2xl shadow-md overflow-hidden">
       <section className='w-[50%] '>
                    <img
              src={Details.image}
              alt={Details.title}
              className="w-[55%] h-[350px]  mx-auto rounded-lg border-2 border-[#3b2a1f]/10 p-4 bg-[#8a4a1f]/10 hover:border-[#8a4a1f]  transition duration-300"
            />
       </section>
        <article className='w-[50%]'>
          <p className="text-3xl md:text-4xl font-bold text-[#3b2a1f] mb-3">{Details.title}</p>
          <p className="text-[#3b2a1f]/75 text-base md:text-lg leading-7 md:leading-8 max-w-2xl mb-6">{Details.description}</p>
          <p className="flex items-center gap-2 text-[#3b2a1f] font-medium mb-4">
            <span className="text-yellow-500">★</span>
            <span>{Details.rating}</span>
            <span className="text-sm text-gray-500">/ 5</span>
          </p>
          <p className="text-3xl font-bold text-[#8a4a1f] mb-6">
            ₹{Details.price}
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <button 
            className="px-8 py-3 bg-[#8a4a1f] text-white font-semibold rounded-lg hover:bg-[#3b2a1f] transition duration-300"
             onClick={()=>{
                if(!localStorage.getItem("userId")){
                  navigate("/Login")
                }else{
                  addcart()          
                }
              }
            }>
              Add to Cart
            </button>

            <button 
            className="px-8 py-3 border-2 border-[#8a4a1f] text-[#8a4a1f] font-semibold rounded-lg hover:bg-[#8a4a1f] hover:text-white transition duration-300"
            onClick={()=> handleBuyNow(Details)}>
              Buy now
            </button>
        </div>
        </article>
      </div>
    
  }
  <Footer/>
  </div>
  )
}

export default BookDetails