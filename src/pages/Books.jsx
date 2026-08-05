import React,{useState} from 'react'
import BookCard from '../components/BookCard'
import useBooks from '../services/useBooks'
import Navbar from '../components/Navbar'
import Footer from "../components/Footer"
import {useSelector} from "react-redux"

function Books() {

  const [maxPrice, setMaxPrice] = useState(2000)
  const search = useSelector((state)=> state.AllBooks.search)

  const {data : books = [],
    isLoading,
    isError
  } = useBooks()

  const filteredBooks = books.filter(
  (book) =>
    (!search || book.title.toLowerCase().includes(search.toLowerCase())) &&
    book.price <= maxPrice
  )

  if(isLoading){
    return <p>Loading... </p>
  }

  return (
    

    <div className='w-full relative'>
      <Navbar/>
       
      <img src="booksforbooks.png" alt="banner" 
      className='w-[90%] h-[500px] mx-auto my-10 rounded-xl'
      />
      <p className="text-4xl font-serif font-bold text-[#3b2a20] text-center  hover:scale-102 duration-500 ">
        The Story Shelf
      </p>
     
      <section className='mt-20 mb-10 mx-20 grid grid-cols-4'>
        { 
        filteredBooks.map((book)=> <BookCard key={book.id}  book = {book}/> )
        }
      </section>
       <div className=' absolute top-170 left-40 flex gap-15'>
        <p className='font-semibold text-lg text-black/60 mt-3'>Filter</p>
        <div className='w-70'>
           <div className=" flex justify-between mx-2 mb-2">
          <span>price</span><span>₹{maxPrice}</span>
        </div>
        <input type="range" 
         min="0" 
         max ="2000" 
         step = "100" 
         value = {maxPrice} 
         onChange = {(e)=>  setMaxPrice(e.target.value) }
         className='w-full accent-[#8b6f47]'
        />
        </div>
       </div>
      <Footer/>
    </div>
  )
}

export default Books