import React from 'react'
import { useMutation } from '@tanstack/react-query'
import {toast} from "sonner"
import axios from "axios"
import useBooks from '../../services/useBooks'
import {Plus} from "lucide-react"

function DeleteBook({data}) {

  const {
    data : books = [],
    isLoading
  } = useBooks()

  // {deleteItemId,setIsdeleting}

       const fetchDelete = async ()=>{
        const response = await axios.delete(`http://localhost:4001/books/${data.deleteItemId}`)
     }

     const fetchSoftDelete = async (state)=>{
        const response = await axios.patch(`http://localhost:4001/books/${data.deleteItemId}`,
          {
            isDelete : state
          }
        )
     }

   //Delete controlling
     const DeleteMutation = useMutation({
        mutationFn : fetchDelete,

        onSuccess : ()=>{
            queryClient.invalidateQueries({
                queryKey : ["books"]
            })
            toast.Success("Deleted sucessfully")
        }
     })

        const SoftDeleteMutation = useMutation({
        mutationFn : fetchSoftDelete,

        onSuccess : ()=>{
            queryClient.invalidateQueries({
                queryKey : ["books"]
            })
            toast.Success("Soft Deleted sucessfully")
        }
     })

     if(isLoading){
          return <p>Loading...</p>
        }
        const deletingBook = books?.find((item)=> item.id === data.deleteItemId)
        const state = deletingBook.isDelete ? false : true
        console.log(deletingBook)
  return (
    <>
    <div className='w-full inset-0 fixed bg-black/40 '>

    <div className='rounded-xl bg-gray-100/50 w-[40%] mx-auto mt-[30%] text-center p-5'>
    <div className='w-full flex justify-end'>
      <button 
      onClick={()=>{
        data.setIsdeleting(false)
      }}
    >
      <Plus className='rotate-45' size={28}/>
    </button>
    </div>
      <p className='px-3 py-1 rounded bg-black-600 underline'
      >Are you sure?</p>
      <div className='p-3 flex gap-3 justify-center'>

        {/* softDelete */}
        <button className='px-3 py-1 rounded bg-green-600 text-white'
        onClick={()=>{
         
          SoftDeleteMutation.mutate(state)
          data.setIsdeleting(false)
        }}
        >{deletingBook.isDelete ? "unSoft Delete?" : "Soft  Delete?"}
        </button>

        {/* hardDelete */}
        <button className='px-3 py-1 rounded bg-red-600 text-white'
         onClick={()=> {
          DeleteMutation.mutate()
          data.setIsdeleting(false)
         } 
        }
        >Hard Delete?</button>
      </div>
    </div>

    </div>
    </>
  )
}

export default DeleteBook