import React, { useState } from 'react'
import {useMutation} from "@tanstack/react-query"
import axios from "axios"
import { useQueryClient } from '@tanstack/react-query'
import {toast} from "sonner"

function AddBook({setAddNewNote}) {
  const [newBook,setNewBook] = useState({
      title: "",
      author: "",
      category: "",
      price: 0,
      rating: 0,
      stock: 0,
      pages: 0,
      description: "",
      image: "",
  })
  const queryClinet = useQueryClient()

  const addNewBook = async ()=>{
    const response = await axios.post(` http://localhost:4001/books`,newBook)
  }

  const addNewBookMutation = useMutation({
    mutationFn : addNewBook,

    onSuccess : ()=>{
      queryClinet.invalidateQueries({
        queryKey : ["books"]
      })
      setNewBook({
                title: "",
                author: "",
                category: "",
                price: 0,
                rating: 0,
                stock: 0,
                pages: 0,
                description: "",
                image: "",
             })
             setAddNewNote(false)
      console.log("ok ann addbook")
    }
  })
  
  const checking = (newBook.category.length >= 2 && newBook.price >= 50 && newBook.stock >= 1 &&  newBook.pages >= 10 && 
    newBook.description.length >= 5 && newBook.image.length >= 10 && newBook.title.length >= 2 && newBook.author.length > 3)

  const handleAddBook = (e)=>{
    e.preventDefault()
    console.log("button")
    if(newBook.title.length < 3){
      toast.error("Check Your New Book Title")
    }else if(newBook.author.length < 3){
      toast.error("You should provide Athour")
    }else if(newBook.category.length < 3){
      toast.error("You should provide category")
    }else if(newBook.price < 50){
      toast.error("Set price")
    }else if(newBook.stock < 1){
      toast.error("Empty stock is not allowed")
    }else if(newBook.pages < 10 ){
      toast.error("Put real page number")
    }else if(newBook.description.length < 5){
      toast.error("Put Good Description")
    }else if(newBook.image.length < 10){
      toast.error("Put Image URL ")
    }else if(checking){
      toast.success("Added successfully")
      addNewBookMutation.mutate()
    }
  }

  return (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-yellow-50 w-[650px] max-h-[90vh] overflow-y-auto hide-scrollbar rounded-2xl p-7 shadow-xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-semibold text-yellow-900">
            Add New Book
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Add a new book to your store
          </p>
        </div>

      </div>


      {/* Form */}
      <form className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-yellow-900 mb-2">
            Book Title
          </label>

          <input
            type="text"
            placeholder="Enter book title"
            className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
            onChange={(e)=>{
              setNewBook({
                ...newBook,
                title : e.target.value
              })
            }}
          />
        </div>


        {/* Author + Category */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-semibold text-yellow-900 mb-2">
              Author
            </label>

            <input
              type="text"
              placeholder="Enter author"
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
              onChange={(e)=>{
                setNewBook({
                  ...newBook,
                  author : e.target.value
                })
              }}
            />
          </div>


          <div>
            <label className="block text-sm font-semibold text-yellow-900 mb-2">
              Category
            </label>

            <input
              type="text"
              placeholder="Enter category"
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
                onChange={(e)=>{
                setNewBook({
                  ...newBook,
                  category : e.target.value
                })
              }}
            />
          </div>

        </div>


        {/* Price + Stock + Pages */}
        <div className="grid grid-cols-3 gap-4">

          <div>
            <label className="block text-sm font-semibold text-yellow-900 mb-2">
              Price
            </label>

            <input
              type="number"
              placeholder="₹ Price"
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
                onChange={(e)=>{
                setNewBook({
                  ...newBook,
                  price : e.target.value
                })
              }}
            />
          </div>


          <div>
            <label className="block text-sm font-semibold text-yellow-900 mb-2">
              Stock
            </label>

            <input
              type="number"
              placeholder="Stock"
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
                onChange={(e)=>{
                setNewBook({
                  ...newBook,
                  stock : e.target.value
                })
              }}
            />
          </div>


          <div>
            <label className="block text-sm font-semibold text-yellow-900 mb-2">
              Pages
            </label>

            <input
              type="number"
              placeholder="Pages"
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
                onChange={(e)=>{
                setNewBook({
                  ...newBook,
                  pages : e.target.value
                })
              }}
            />
          </div>

        </div>


        {/* Rating */}
        <div>

          <label className="block text-sm font-semibold text-yellow-900 mb-2">
            Rating
          </label>

          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="Rating (0 - 5)"
            className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
                onChange={(e)=>{
                setNewBook({
                  ...newBook,
                  rating : e.target.value
                })
              }}
          />

        </div>


        {/* Image */}
        <div>

          <label className="block text-sm font-semibold text-yellow-900 mb-2">
            Book Image URL
          </label>

          <input
            type="url"
            placeholder="https://example.com/book.jpg"
            className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
                onChange={(e)=>{
                setNewBook({
                  ...newBook,
                  image : e.target.value
                })
              }}
          />

        </div>


        {/* Description */}
        <div>

          <label className="block text-sm font-semibold text-yellow-900 mb-2">
            Description
          </label>

          <textarea
            rows="4"
            placeholder="Enter book description"
            className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800 resize-none"
            onChange={(e)=>{
                setNewBook({
                  ...newBook,
                  description : e.target.value
                })
              }}
          />

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-3">

          <button
            type="button"
            onClick={() => {
              setAddNewNote(false)
              setNewBook({
                title: "",
                author: "",
                category: "",
                price: 0,
                rating: 0,
                stock: 0,
                pages: 0,
                description: "",
                image: "",
             })
            }}
            className="px-5 py-3 rounded-lg border border-yellow-900 text-yellow-900 hover:bg-yellow-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-3 rounded-lg bg-yellow-900 text-white hover:bg-yellow-800 transition"
            onClick={handleAddBook}
          >
            Add Book
          </button>

        </div>

      </form>

    </div>
  </div>

  )
}

export default AddBook