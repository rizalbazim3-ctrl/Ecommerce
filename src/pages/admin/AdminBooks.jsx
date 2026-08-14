import React, { useState,useEffect } from "react"
import useAdminBooks from "../../services/admin/useAdminBooks"
import BookTable from "../../components/admin/BookTable"
import {  Plus } from "lucide-react";
import AddBook from "./AddBook";
import { useSelector } from "react-redux";

function AdminBooks() {

  const [addNewNote,setAddNewNote] = useState(false)
  const [category,setCategory] = useState("All Categories")
  const [StockCategory,setStockCategory] = useState("All Stock")
  const [perPage,setPerPage] = useState(5)
  const [startPage,setStartPage] = useState(0)
  const [endPage,setEndPage] = useState(startPage + perPage)
  const [value, setValue] = useState(1)
  const adminSearch = useSelector((state)=> state.adminFilter.adminSearch)

  
    const {
    data : Allbooks = [],
    isLoading,           
    isError
  } = useAdminBooks()
  
//searching
const serachedBooks = Allbooks.filter((book)=> adminSearch === "" ? true : 
book.title.toLowerCase().includes(adminSearch.toLowerCase()))


 //filtering
const FilteredBooks = serachedBooks.filter((book)=>{
  const selected = category === "All Categories" ? book :
   book.category === category 

   const selectedStock = StockCategory === "All Stock" ? book :

   (StockCategory === "In Stock" && book.stock > 0) ||
   (StockCategory === "Low Stock" && book.stock <= 5) ||
   (StockCategory === "Out Of Stock" && book.stock === 0)

   return selected && selectedStock
  })
  const books = FilteredBooks.slice(startPage,endPage)

   //pagination
  const pages = (Math.ceil(FilteredBooks.length/5))
  const buttonList = []
      for(let i=1; i<=pages; i++){

      buttonList.push(<button 
        value = {i}
        
        key = {crypto.randomUUID()}
        onClick={(e)=>{
          setValue(i)
          const vlaue = e.target.value
          setStartPage((vlaue-1)*perPage)
          setEndPage(vlaue*perPage)
        }}

        className = {`rounded  font-semibold px-4  
        py-1 mx-2 mt-3 ${(i === value) ? "bg-yellow-600"  : "bg-yellow-800"}` }
       >{i}</button>)

      }

    useEffect(()=>{
    if(startPage === 0 ){
       setValue(1)
    }else{
      setValue(startPage/perPage + 1)
    }

  },[startPage])

   useEffect(()=>{
   
      setStartPage(0)

      setEndPage(perPage)

  },[category,StockCategory,adminSearch])
  
  
  
if(isLoading){
    return <p>Loading...</p>
  } 

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

        

        {
        FilteredBooks.length === 0 ? 
        <div className="w-full h-[400px] text-center text-red-700 font-bold text-xl italic mt-[200px]">
          Not Found
        </div>
        : <BookTable books = {books}/>
      }

       <div className="text-center mt-3 flex flex-wrap justify-center">
        <button className="rounded bg-yellow-400 mr-5 px-2 mt-3"
        onClick={()=>{
          if(startPage !== 0){
            setStartPage((prev)=> prev-1 * perPage)
            setEndPage((prev)=>prev-5)
          }
        }}
        >{"< "}Previous</button>
          {
          buttonList.map((item)=> item )
          }
          <button
           className="rounded bg-yellow-400 px-4 ml-5 mt-3"
           onClick={()=>{
            if(endPage !== FilteredBooks.length && endPage < FilteredBooks.length ){
              setStartPage((prev)=>prev + 1*perPage)
               setEndPage((prev => prev + perPage )) 
              }
           }}
           >Next{" >"}</button>
       </div>

    </div>
  );
}

export default AdminBooks;