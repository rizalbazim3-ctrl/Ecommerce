import React,{useEffect} from 'react'
import BookCard from '../components/BookCard'
import {useSelector} from "react-redux"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useBooks from '../services/useBooks'

function BooksFiction() {
  const {data : books = [],
    isLoading,
    isError
  } = useBooks()
  const fictionBook = books.filter((book)=> book.category === "Fiction" )

  return (
    <div>
      <Navbar  />
      
      <img src="fictionBanner.png" alt="banner"className=" w-[90%] h-[380px] mx-auto overflow-hidden rounded-xl my-10"/>
      <h1 className="text-4xl font-serif font-bold text-[#3b2a20] text-center m-10 hover:scale-102 duration-500">
            Fiction</h1>
      <section className='flex flex-wrap gap-10 justify-center mb-10'>
       {fictionBook.map((book)=> (
            <div key = {book.id}>
              <section>
                < BookCard  book = {book} />
              </section>
            </div>
          ))}
        </section>
        <Footer/>
    </div>
  )
}

export default BooksFiction