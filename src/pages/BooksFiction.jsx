import React,{useEffect} from 'react'
import BookCard from '../components/BookCard'
import {useSelector} from "react-redux"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function BooksFiction() {
  const kithab = useSelector((state)=> state.AllBooks.kithab)
  const fictionBook = kithab.filter((book)=> book.category === "Fiction" )

  return (
    <div>
      <Navbar  />
      <img src="fictionBanner.png" alt="banner"className=" w-[90%] h-[380px] mx-auto overflow-hidden rounded-xl my-10"/>
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