import React,{useState} from 'react'
import {Heart} from "lucide-react"
import Books from '../pages/Books'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import {toast} from "sonner"
import useUsers from "../services/useUsers"

function BookCard({book}) {
  // const  uptaing = async()=>{
  //                 const response = await axios.get(` http://localhost:4001/books`)

  //                 const data = response.data

  //                 await Promise.all(
  //                     data.map((book)=> {
  //                        axios.delete(` http://localhost:4001/books/${book.id}`,{
  //                           addcart :   false 
  //                        })
  //                     })
  //                 )
  //               }
  const [isclick,setIsclick] = useState(false)
  const navigate =useNavigate()

  const userid = localStorage.getItem("userId")

  const {
    data : data = {},
    isLoading
  } = useUsers()

  
  if(isLoading){
  return <p className='text-lg font-semibold text-blue-500 '>Loading...</p>
 }

//checking items

  const checkCart = data.cart?.filter(
    (item) => item.id === book.id
  ) || false;

  const checkWish = data.wishlist?.filter(
    (item) => item.id === book.id
  ) || false;


  //adding wishlist

  const wishlist = async ()=> {
    try{

      if(checkWish.length !== 0){
        const deletedWish = data.wishlist.filter((item)=> item.id !== book.id)

        const response = await axios.patch(`http://localhost:4001/users/${userid}`,{
          wishlist : deletedWish
        }) 
         toast.success("removed successfully")
      }else{
        const updated = [
        ...(data.wishlist || []),book
      ]

      const response = axios.patch(` http://localhost:4001/users/${userid}`,{
        wishlist : updated
    })
     toast.success("Added successfully")
      }
      
    }catch(error){
      console.log(error)
    }
    
    }

    // adding cart
  const addcart = async ()=> {
    try{
      const updated = [
        ...(data.cart || []),book
      ]

        const response = axios.patch(` http://localhost:4001/users/${userid}`,{
                            cart : updated
                         })

            toast.success("Added successfully")
    }catch(error){
      console.log(error)
    }
                       
 }


  return (
    <div className='mx-auto my-10 bg-[#fbf6ec] rounded-2xl shadow-2xl py-3 px-3 text-center group block hover:scale-110 transition duration-700'>
    <div
     className=" w-[80%] md:w-[200px] h-[250px] mx-auto rounded-lg border-2 border-[#3b2a1f]/10 p-4 bg-[#8a4a1f]/10 hover:border-[#8a4a1f]  transition duration-300 relative">
       <img src={book.image} alt="bookImage" 
       className="w-[100%] h-full  mx-auto overflow-hidden"
       onClick={()=>{
      navigate(`/Books/${book.id}`)
    }}
       />
 <Heart 
 className={`hidden  p-1 opacity-110 w-7 h-7 bg-white rounded-full group-hover:inline-block absolute top-1 right-3 ${checkWish.length !== 0 ? "text-red-500 fill-red-500" : `text-black/50` }`} 
               onClick={()=>{
                if(!localStorage.getItem("userId")){
                    navigate("/Login")
                  }else{
                        wishlist() 
                  }
                
               }}/>
    </div>
    <div className='w-[100%]'
     onClick={()=>{
      navigate(`/Books/${book.id}`)
    }}>
      <p className=" w-[220px] break-words hover:underline mx-auto"><span
       className = "font-bold">{book.title}</span> :&nbsp;{book.description}</p>
        <p className="flex justify-center gap-2 text-[#3b2a1f]  font-medium mb-4  ">
                <span className="text-yellow-500">★</span>
                <span>{book.rating}</span>
                <span className="text-sm text-gray-500">/ 5</span>
              </p>
      <p className='font-semibold'>Price&nbsp;:&nbsp; ₹{book.price}</p>
    </div>
    <button 
    className=' border-[#8a4a1f] bg-[#8a4a1f] text-white px-2 rounded-lg font-semibold hover:text-[#8a4a1f] hover:bg-white hover:border-[#8a4a1f] duration-500'
    onClick={()=>{
      if(!localStorage.getItem("userId")){
        navigate("/Login")
      }else{
        checkCart.length !== 0 ? toast.error("already added") :
                   addcart() 
      }
        
               }}
               >Add Cart</button>
    </div>
  )
}

export default BookCard