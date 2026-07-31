import React,{useEffect} from "react";
import axios from "axios"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import {useNavigate} from "react-router-dom"
import useBooks from "../services/useBooks";

function Home() {

  const navigate = useNavigate()
  const {data : books = [],
    isLoading,
    isError
  } = useBooks()
  const featuredBook = books.slice(0,4)

  return (
    <div className="m-4 ">
      <Navbar/>
        <section className="mt-10 mb-10 bg-black/20">
          <img src="hero-section-image.png" alt="banner" 
          className="object-cover w-full overflow-hidden rounded-xl h-[450px] "/>
        </section>
        <section className="flex flex-wrap justify-center gap-10  mb-10">
          <button className="w-[20%] ">
            <img src="fiction.jpg" alt="fiction" 
            className="rounded-2xl shadow-md hover:rotate-y-43 hover:scale-130 transition-transform duration-900"
          onClick={()=>{
            navigate("/BooksFiction")
          }}
          /></button>
          <button className="w-[20%]">
            <img src="biography.jpg" alt="biography"
             className="rounded-2xl shadow-md  hover:rotate-y-43 hover:scale-130 transition-transform duration-900" 
          onClick={()=>{
            navigate("/BooksBiography")
          }}
          /></button>
          <button className="w-[20%]"> <img src="romance.jpg" alt="romance" 
          className="rounded-2xl shadow-md  hover:rotate-y-43 hover:scale-130 transition-transform duration-900"
          onClick={()=>{
            navigate("/BooksRomance")
          }}
          /></button>
          <button className="w-[20%]">
            <img src="history.jpg" alt="history" 
           className="rounded-2xl shadow-md  hover:rotate-y-43 hover:scale-130 transition-transform duration-900"
          onClick={()=>{
            navigate("/BooksHistory")
          }}
          /></button>
          <button className="w-[20%]">
            <img src="mystery.jpg" alt="mystery" 
            className="rounded-2xl shadow-md  hover:rotate-y-43 hover:scale-130 transition-transform duration-900"
          onClick={()=>{
            navigate("/BooksMystery")
          }}
          /></button>
          <button className="w-[20%]">
            <img src="science-fiction.jpg" alt="science-fiction" 
            className="rounded-2xl shadow-md  hover:rotate-y-43 hover:scale-130 transition-transform duration-900"          onClick={()=>{
            navigate("/BooksScienceFiction")
          }}
          /></button>
          <button className="w-[20%]">
            <img src="self-help.jpg" alt="self-help" 
           className="rounded-2xl shadow-md hover:rotate-y-43 hover:scale-130 transition-transform duration-900"
          onClick={()=>{
            navigate("/BooksSelfhelp")
          }}
          /></button>
        </section>
        <section className='flex flex-wrap gap-10 justify-center mb-10'>
          {featuredBook.map((book)=> (
            <div key = {book.id}>
              <section>
                < BookCard  book = {book} />
              </section>
            </div>
          ))}
        </section>
      <Footer/>
    </div>
  );
}

export default Home;