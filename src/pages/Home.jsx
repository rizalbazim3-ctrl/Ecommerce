import React,{useEffect} from "react";
import axios from "axios"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {useQuery} from "@tanstack/react-query"
import BookCard from "../components/BookCard";
import {useNavigate} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import { addBook } from "../services/BookSlice";

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const kithab = useSelector((state)=>state.AllBooks.kithab)

  useEffect(()=>{
      const fetchFeatureadBooks = async ()=>{
   try{ const response = await axios.get("http://localhost:4001/books")
    console.log(response.data.slice(0,3))
     dispatch(addBook(response.data))
  }
    catch(error){
      console.error(error)
    }
  }
   fetchFeatureadBooks()
  },[dispatch])

  // const {data : books = []} = useQuery({
  //   queryKey : ["book"],
  //   queryFn : fetchFeatureadBooks,
  // })

  return (
    <div className="m-4 ">
      <Navbar/>
        <section className="mt-10 mb-10">
          <img src="hero-section-image.png" alt="banner" className="object-cover w-full overflow-hidden rounded-xl h-[450px]"/>
        </section>
        <section className="flex flex-wrap justify-center gap-10  mb-10">
          <button className="w-[20%] "><img src="fiction.jpg" alt="fiction" className="rounded-2xl"
          onClick={()=>{
            navigate("/BooksFiction")
          }}
          /></button>
          <button className="w-[20%]"><img src="biography.jpg" alt="biography" className="rounded-2xl" 
          onClick={()=>{
            navigate("/BooksBiography")
          }}
          /></button>
          <button className="w-[20%]"> <img src="romance.jpg" alt="romance" className="rounded-2xl"
          onClick={()=>{
            navigate("/BooksRomance")
          }}
          /></button>
          <button className="w-[20%]"><img src="history.jpg" alt="history" className="rounded-2xl"
          onClick={()=>{
            navigate("/BooksHistory")
          }}
          /></button>
          <button className="w-[20%]"><img src="mystery.jpg" alt="mystery" className="rounded-2xl"
          onClick={()=>{
            navigate("/BooksMistery")
          }}
          /></button>
          <button className="w-[20%]"><img src="science-fiction.jpg" alt="science-fiction" className="rounded-2xl"
          onClick={()=>{
            navigate("/BooksScienceFiction")
          }}
          /></button>
          <button className="w-[20%]"><img src="self-help.jpg" alt="self-help" className="rounded-2xl"
          onClick={()=>{
            navigate("/BooksSelfhelp")
          }}
          /></button>
        </section>
        <section className='flex flex-wrap gap-10 justify-center mb-10'>
          {kithab.map((book)=> (
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