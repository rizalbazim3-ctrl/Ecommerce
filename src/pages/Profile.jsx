import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Users} from "../services/BooksApi"
import {useQuery} from "@tanstack/react-query"
import {toast} from "sonner"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {User}  from "lucide-react"

function Profile() {
    const navigate = useNavigate()
    const { data : userdetails = {},
        isLoading,
        isError
    } = useQuery({
        queryKey : ["userdetails"],
        queryFn : Users
    })
    
  return (
    <div>
        <Navbar/>
        <h1 className="text-4xl font-serif font-bold text-[#3b2a20] text-center m-10 hover:scale-102 duration-500">
            My Library</h1>
        <div 
        className='w-[40%] mx-auto flex flex-col justify-center items-center rounded-lg bg-[#3b2a20]/90 text-white p-9 m-10'>
             <User className="w-20 h-20 text-[#3b2a20] rounded-full p-3 bg-gray-400"/>
        <p className='font-semibold'>USER</p>

        <section className='w-[25%] mt-4 text-lg mb-4'>
        <p>FullName&nbsp;:&nbsp;{userdetails.name}</p>
        <p>userId&nbsp;:&nbsp;{userdetails.id}</p>
        <p>Email&nbsp;:&nbsp;{userdetails.email}</p>
        <p>PhoneNumber&nbsp;:&nbsp;{userdetails.phone}</p>
        </section>

         <button className='rounded bg-[#fbf6ec] text-[#3b2a1f] p-2 font-bold hover:scale-104 tansition duration-500 text-lg'
         onClick={()=>{
            localStorage.removeItem("userId")
            navigate("/")
            console.log(userdetails)
            toast.success("Your successfully logOut")
        }}
        >Log out</button>
        </div>
       
        <Footer/>
    </div>
  )
}

export default Profile