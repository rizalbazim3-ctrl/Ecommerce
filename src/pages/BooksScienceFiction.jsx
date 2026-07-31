import React from 'react'
import BookCard from '../components/BookCard'
import {useSelector} from "react-redux"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function BooksScienceFiction() {
  const kithab = useSelector((state=> state.AllBooks.kithab))
  const ScienceBook = kithab.filter((book)=> book.category === "Science Fiction")
  return (
      <div>
      <Navbar/>
      <img src="ScienceBanner.png" alt="banner" className = "w-[90%] h-[380px] overflow-hidden mx-auto rounded-xl my-10"/>
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