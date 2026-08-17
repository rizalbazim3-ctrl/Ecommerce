import React,{useState,useEffect} from 'react'
import AdminBooks from '../../pages/admin/AdminBooks'
import {  Plus, Pencil, Trash2 ,Eye  } from "lucide-react"
import { useMutation } from '@tanstack/react-query'
import axios from "axios"
import { useQueryClient } from '@tanstack/react-query'
import {toast} from "sonner"
import DeleteBook from '../../pages/admin/DeleteBook'
import BookView from "../../pages/admin/BookView"

function BookTable({books}) {
     const [editBook , setEditBook] = useState({})
     const [isEditOpen,setIsEditOpen] = useState(false)
     const [isDeleting,setIsdeleting] = useState(false)
     const [deleteItemId,setDeleteItemId] = useState(0)
     const [bookView,setBookView ] = useState(false)
     const [viewBookId,setViewBookId] = useState(0)

     const queryClient = useQueryClient()

     const editFetch = async (id)=>{
        const response = await axios.patch(`http://localhost:4001/books/${id}`,editBook)
     }

     //edit controlling
     const handleEdit = (id)=>{
        const book = books.find((item)=> item.id === id)

        setEditBook(book)
        setIsEditOpen(true)
     }



     //Update controlling
      const EditMutation = useMutation({
            mutationFn : editFetch,

            onSuccess : ()=>{
                queryClient.invalidateQueries({
                    queryKey : ["books"]
                })
                toast.success("Edited Successfully")
                setIsEditOpen(false)

            }

        })
        
        useEffect(()=>{
          if(isEditOpen){
            document.body.style.overflow = "hidden"
          }else{
            document.body.style.overflow = "auto"
          }
        },[isEditOpen])

  
       return  ( 
        <>
        { bookView &&
          <BookView value = {{viewBookId,books,setBookView}}/>
        }
              {
        isDeleting && (
            <DeleteBook data = {{deleteItemId,setIsdeleting}}/>
        )
      }
        {isEditOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center ">

    <div className="bg-yellow-50 w-[500px] h-[80%] rounded-xl p-6 overflow-auto hide-scrollbar">

      <h2 className="text-2xl font-bold mb-5 text-yellow-900">
        Edit Book
      </h2>

      <label className='text-gray-500'>Title</label>
      <input
        value={editBook.title}
        onChange={(e) =>
          setEditBook({
            ...editBook,
            title: e.target.value
          })
        }
        className="w-full border border-yellow-300  p-2 rounded mb-3 hover:bg-yellow-100  hover:scale-102 transition duration-300"
        placeholder="Book title"
      />

      <label className='text-gray-500'>Author</label>
      <input
        value={editBook.author}
        onChange={(e) =>
          setEditBook({
            ...editBook,
            author: e.target.value
          })
        }
        className="w-full border border-yellow-300  p-2 rounded mb-3 hover:bg-yellow-100  hover:scale-102 transition duration-300"
        placeholder="Author"
      />

      <label className='text-gray-500'>Price</label>
      <input
        value={editBook.price}
        onChange={(e) =>
          setEditBook({
            ...editBook,
            price: e.target.value
          })
        }
        className="w-full border border-yellow-300  p-2 rounded mb-3 hover:bg-yellow-100  hover:scale-102 transition duration-300"
        placeholder="Price"
      />

      <label className='text-gray-500'>Stock</label>
      <input
        value={editBook.stock}
        onChange={(e) =>
          setEditBook({
            ...editBook,
            stock: e.target.value
          })
        }
        className="w-full border border-yellow-300  p-2 rounded mb-5 hover:bg-yellow-100  hover:scale-102 transition duration-300"
        placeholder="Stock"
      />

      <label className='text-gray-500'>Description</label>
      <textarea type="text" 
      value={editBook.description}
      className='w-full border border-yellow-300  p-2 rounded mb-5 hover:bg-yellow-100  hover:scale-102 transition duration-300'
      placeholder='Description'
      onChange={(e)=>(
        setEditBook({
            ...editBook,
            description : e.target.value
        })
      )}
      />

      <label className='text-gray-500'>Image</label>
      <textarea type="text"
      className='w-full border border-yellow-300  p-2 rounded mb-5 hover:bg-yellow-100  hover:scale-102 transition duration-300'
      placeholder= "image-URL"
      value={editBook.image}
      onChange={(e)=>(
        setEditBook({
            ...editBook,
            image : e.target.value
        })
      )}
      />
      
      <label className='text-gray-500'>Pages</label>
      <input type="text"
      className='w-full border border-yellow-300  p-2 rounded mb-5 hover:bg-yellow-100  hover:scale-102 transition duration-300'
      placeholder= "pages"
      value={editBook.pages}
      onChange={(e)=>(
        setEditBook({
            ...editBook,
            page : e.target.value
        })
      )}
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsEditOpen(false)}
          className="px-4 py-2 border border-yellow-300  rounded"
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 bg-yellow-700 text-white rounded"
          onClick={()=>{
            EditMutation.mutate(editBook.id)
          }}
        >
          Update
            </button>
        </div>

        </div>
    </div>
    )}
        <div>
           {/* Books Table */}
      <section className="mt-8 bg-[#F2EFE9] rounded-xl p-5">

         {/* Heading */}
        <div className="grid grid-cols-6 px-5 py-3 rounded-xl
        text-yellow-900 font-semibold border-b border-yellow-900">

          <p>Book</p>
          <p>Author</p>
          <p>Category</p>
          <p>Price</p>
          <p>Stock</p>
          <p className="text-center">Action</p>

        </div>


         {/* Books */}
        <div className="mt-1">

         { books.map((book) => (

            <div
              key={book.id}
              className="grid grid-cols-6 items-center 
              px-5 py-10 mt-1 rounded-lg shadow-xl hover:shadow-2xl
              hover:bg-gray-800/30 hover:scale-102 transition duration-500"

              onClick={()=>{
                  setViewBookId(book.id)
                  setBookView(true) 
                 }}
            >

              <p className="font-semibold text-yellow-900">
                {book.title}
              </p>

              <p className="text-gray-700">
                {book.author}
              </p>

              <p className="text-gray-700">
                {book.category}
              </p>

              <p className="font-semibold">
                ₹{book.price}
              </p>

              <p
                className={
                  book.stock <= 5
                    ? "text-red-600 font-semibold"
                    : "text-green-700 font-semibold"
                }
              >
                {book.stock}
              </p>

              <div className="flex justify-center gap-3">

                <button 
                onClick={(e)=> {
                  e.stopPropagation()
                  handleEdit(book.id)}}
                className="p-2 rounded-lg hover:bg-gray-300">
                  <Pencil size={18} />
                </button>

                <button onClick={(e)=> {
                  e.stopPropagation()
                    setIsdeleting(true)
                    setDeleteItemId(book.id)
                } }
                className="p-2 rounded-lg hover:bg-red-100 text-red-600">
                  <Trash2 size={18} 
                  />
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>
    </div>
    </>
    )
    
}

export default BookTable