import React,{useState} from 'react'
import {Heart} from "lucide-react"
import Books from '../pages/Books'
import { useNavigate } from 'react-router-dom'

function BookCard({book}) {
  const [isclick,setIsclick] = useState(false)
  const navigate =useNavigate()
  return (
    <div className='text-center group block'>
    <div className=" w-[80%] md:w-[250px] h-[300px] rounded-lg border-2 border-[#3b2a1f]/10 p-4 bg-[#8a4a1f]/10 hover:border-[#8a4a1f]  transition duration-300 relative">
       <img src={book.image} alt="bookImage" 
       className="w-[100%] h-full object-cover mx-auto overflow-hidden"
       onClick={()=>{
      navigate(`/Books/${book.id}`)
    }}
       />
               <Heart className={`hidden  p-1  bg-white rounded-full group-hover:inline-block absolute top-2 right-4 ${isclick ? "text-red-500 fill-red-500" : `text-black/40` }`} 
               onClick={()=>{
                isclick ? setIsclick(false) : setIsclick(true)
               }}/>
    </div>
    <div className='w-[100%]'
     onClick={()=>{
      navigate(`/Books/${book.id}`)
    }}>
      <p className=" w-[220px] break-words hover:underline mx-auto"><span className = "font-bold">{book.title}</span> :&nbsp;{book.description}</p>
        <p >{book.rating}</p>
      <p>Price&nbsp;:&nbsp; {book.price}</p>
    </div>
    <button className=' border bg-[#241a12]/80 text-[#e7dcc4] px-2 rounded '>Add Cart</button>
    </div>
  )
}

export default BookCard