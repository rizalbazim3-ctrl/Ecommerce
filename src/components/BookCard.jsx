import React,{useState} from 'react'
import {Heart} from "lucide-react"
import Books from '../pages/Books'

function BookCard({book}) {
  const [isclick,setIsclick] = useState(false)
  return (
    <div className='text-center group block'>
    <div className="h-[400px] border border-black/30 bg-black/10 p-3 rounded-lg relative">
       <img src={book.image} alt="bookImage" className=' w-[275px]  object-cover h-[90%] rounded mt-6'/>
               <Heart className={`hidden group-hover:inline-block absolute top-2 right-4 ${isclick ? "text-red-500 fill-red-500" : `text-red-500` }`} 
               onClick={()=>{
                isclick ? setIsclick(false) : setIsclick(true)
               }}/>
               <p className='absolute top-2 left-4'>{book.rating}</p>
    </div>
    <div >
      <p className=" w-[300px] break-words"><span className = "font-bold">{book.title}</span> :&nbsp;{book.description}</p>
      <p>Price&nbsp;:&nbsp; {book.price}</p>
      <button className='hidden group-hover:inline-block border bg-[#241a12]/80 text-[#e7dcc4] px-2 rounded '>Add Cart</button>
    </div>
    </div>
  )
}

export default BookCard