import React, { useState } from "react"
import useBooks from "../../services/useBooks"
import BookTable from "../../components/admin/BookTable"
import {  Plus } from "lucide-react";
import AddBook from "./AddBook";

function AdminBooks() {

  const [addNewNote,setAddNewNote] = useState(false)
  const [category,setCategory] = useState("All Categories")
  const [StockCategory,setStockCategory] = useState("All Stock")
  const [perPage,setPerPage] = useState(5)
  const [startPage,setStartPage] = useState(0)
  const [endPage,setEndPage] = useState(startPage + perPage)
  
    const {
    data : Allbooks = [],
    isLoading,           
    isError
  } = useBooks()
  

  if(isLoading){
    return <p>Loading...</p>
  } 

  //pagination

  const pages = (Math.ceil(Allbooks.length/5))
  const buttonList = []
      for(let i=1; i<=pages; i++){

      buttonList.push(<button className = "rounded bg-yellow-600 font-semibold px-4  py-1 mx-2 mt-3" 
        value = {i}
        key = {crypto.randomUUID()}
        onClick={(e)=>{
          setStartPage(((e.target.value)-1)*perPage)
        }}
       >{i}</button>)

      }
      console.log(startPage)

const books = Allbooks.filter((book)=>{
  const selected = category === "All Categories" ? book :
   book.category === category 

   const selectedStock = StockCategory === "All Stock" ? book :

   (StockCategory === "In Stock" && book.stock > 0) ||
   (StockCategory === "Low Stock" && book.stock <= 5) ||
   (StockCategory === "Out Of Stock" && book.stock === 0)

   return selected && selectedStock
  })
  .slice(startPage,endPage)
  


  return (
    <div className="p-8">

      {
            addNewNote && <AddBook setAddNewNote = {setAddNewNote}/>
        }

      {/* Header */}
      <div className="flex justify-between items-center rounded-xl bg-yellow-100 p-3">

        <div>
          <h1 className="text-3xl font-semibold text-yellow-900">
            Books
          </h1>

          <p className="text-gray-600 mt-1">  
            Manage all books
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-yellow-900 text-white  px-5 py-3 rounded-lg hover:bg-yellow-800 transition"

          onClick={()=>{
            setAddNewNote(true)
          }}
        >
          <Plus size={20} />
          Add New Book
        </button>

      </div>


      
      <div className="flex gap-4 mt-8">


        {/* Category */}
        <select 
          onChange={(e) => {
            setCategory(e.target.value)
          }}
          className="bg-yellow-100 border border-yellow-800 
          rounded-lg px-4 py-2 text-yellow-900 outline-none"
        >
          <option>All Categories</option>
          <option>Fiction</option>
          <option>Romance</option>
          <option>Self-Help</option>
          <option>Science Fiction</option>
          <option>History</option>
          <option>Biography</option>
          <option>Mystery</option>
        </select>


        {/* Stock */}
        <select
           onChange={(e) => {
            setStockCategory(e.target.value)
          }}
          className="bg-yellow-100 border border-yellow-800  rounded-lg px-4 py-2 text-yellow-900 outline-none"
        >
          <option>All Stock</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>

      </div>

        <BookTable books = {books}/>

       <div className="text-center mt-3 flex flex-wrap justify-center">
        <button className="rounded bg-yellow-400 mr-5 px-2 mt-3">{"< "}Previous</button>
          {
          buttonList.map((item)=> item )
          }
          <button className="rounded bg-yellow-400 px-4 ml-5 mt-3">Next{" >"}</button>
       </div>

    </div>
  );
}

export default AdminBooks;