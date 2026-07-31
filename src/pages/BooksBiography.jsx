import React from 'react'
import BookCard from '../components/BookCard'
import {useSelector} from "react-redux"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useBooks from '../services/useBooks'

function BooksBiography() {
  const {data : books = [],
    isLoading,
    isError
  } = useBooks()
  const BiographyBook = books.filter((book)=> book.category === "Biography")
  return (
      <div>
      <Navbar/>
      <img src="BiographyBanner.png" alt="banner" className = "w-[90%] h-[380px] overflow-hidden mx-auto rounded-xl my-10" />
      <section className='flex flex-wrap gap-10 justify-center mb-10'>
          {BiographyBook.map((book)=> (
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

export default BooksBiography