import React from 'react'
import BookCard from '../components/BookCard'
import {useSelector} from "react-redux"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function BooksHistory() {
  const kithab = useSelector((state=> state.AllBooks.kithab))
  const HistoryBook = kithab.filter((book)=> book.category === "History")
  return (
      <div>
      <Navbar/>
      <img src="HistoryBnner.png" alt="banner" className = "w-[90%] h-[380px] overflow-hidden rounded-xl my-10 mx-auto " />
      <section className='flex flex-wrap gap-10 justify-center mb-10'>
          {HistoryBook.map((book)=> (
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

export default BooksHistory