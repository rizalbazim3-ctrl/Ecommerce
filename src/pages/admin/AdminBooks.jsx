import React, { useState } from "react"
import useBooks from "../../services/useBooks"
import BookTable from "../../components/admin/BookTable"
import {  Plus } from "lucide-react";
import AddBook from "./AddBook";

function AdminBooks() {

  const [addNewNote,setAddNewNote] = useState(false)

    const {
    data : books = [],
    isLoading,
    isError
  } = useBooks()

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
          className="bg-yellow-100 border border-yellow-800 
          rounded-lg px-4 py-2 text-yellow-900 outline-none"
        >
          <option>All Categories</option>
          <option>Fiction</option>
          <option>Romance</option>
          <option>Self Help</option>
          <option>Science Fiction</option>
        </select>


        {/* Stock */}
        <select
          className="bg-yellow-100 border border-yellow-800 
          rounded-lg px-4 py-2 text-yellow-900 outline-none"
        >
          <option>All Stock</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>

      </div>

        <BookTable books = {books}/>

    </div>
  );
}

export default AdminBooks;