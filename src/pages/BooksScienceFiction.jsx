import React from 'react'
import BookCard from '../components/BookCard'
import {useSelector} from "react-redux"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useBooks from '../services/useBooks'

function BooksScienceFiction() {
  const {data : books = [],
    isLoading,
    isError
  } = useBooks()
  const ScienceBook = books.filter((book)=> book.category === "Science Fiction")
  return (
      <div>
      <Navbar/>
      <img src="ScienceBanner.png" alt="banner" className = "w-[90%] h-[430px] overflow-hidden mx-auto rounded-lg my-10"/>
      <h1 className="text-4xl font-serif font-bold text-[#3b2a20] text-center m-10 hover:scale-102 duration-500">
            Science Fiction</h1>
      <section className='flex flex-wrap gap-10 justify-center mb-10'>
          {ScienceBook.map((book)=> (
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

export default BooksScienceFiction