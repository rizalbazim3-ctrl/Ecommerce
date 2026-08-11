import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Users} from "../services/BooksApi"
import {useQuery} from "@tanstack/react-query"
import {toast} from "sonner"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {User, BookOpen} from "lucide-react"

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
    <div className="bg-[#fbf6ec] min-h-screen">
        <Navbar/>

    <h1 className="text-4xl font-serif font-bold text-[#3b2a20] text-center mt-12 mb-2 tracking-wide hover:scale-102 duration-500">
        My Library
    </h1>

    <div className="w-[90%] sm:w-[60%] lg:w-[38%] mx-auto relative m-10">

        <div className="absolute inset-0 border-2 border-[#3b2a20] rounded-lg translate-x-2 translate-y-2 opacity-40 pointer-events-none"></div>

        <div className="relative flex flex-col justify-center items-center rounded-lg 
            bg-[#3b2a20] text-[#fbf6ec] p-10 border-[3px] border-[#c9a876]
            shadow-[0_10px_30px_rgba(0,0,0,0.4)]">

            <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c9a876]"></span>
            <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#c9a876]"></span>
            <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#c9a876]"></span>
            <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c9a876]"></span>
            <div className="relative">
                <User className="w-20 h-20 text-[#3b2a20] rounded-full p-4 bg-[#c9a876] border-2 border-[#fbf6ec]/40 shadow-inner"/>
                <BookOpen className="w-6 h-6 text-[#3b2a20] bg-[#fbf6ec] rounded-full p-1 absolute -bottom-1 -right-1 border border-[#c9a876]"/>
            </div>

            <p className="font-serif tracking-[0.3em] text-[#c9a876] text-sm mt-4">MEMBER PROFILE</p>

            <div className="w-16 h-[2px] bg-[#c9a876] my-4 opacity-70"></div>

            <section className="w-full sm:w-[70%] font-serif text-base sm:text-lg space-y-3">
                <p className="flex justify-between border-b border-[#c9a876]/30 pb-2">
                    <span className="text-[#c9a876]">Full Name</span>
                    <span className="font-semibold">{isLoading ? "..." : userdetails.name}</span>
                </p>
                <p className="flex justify-between border-b border-[#c9a876]/30 pb-2">
                    <span className="text-[#c9a876]">User ID</span>
                    <span className="font-semibold">{isLoading ? "..." : userdetails.id}</span>
                </p>
                <p className="flex justify-between border-b border-[#c9a876]/30 pb-2">
                    <span className="text-[#c9a876]">Email</span>
                    <span className="font-semibold break-all">{isLoading ? "..." : userdetails.email}</span>
                </p>
                <p className="flex justify-between pb-2">
                    <span className="text-[#c9a876]">Phone</span>
                    <span className="font-semibold">{isLoading ? "..." : userdetails.phone}</span>
                </p>
            </section>

            {isError && (
                <p className="text-red-300 font-serif italic text-sm mt-2">
                    Failed to load member details.
                </p>
            )}

            <div className="w-16 h-[2px] bg-[#c9a876] my-6 opacity-70"></div>

            <button
                className="rounded bg-[#fbf6ec] text-[#3b2a1f] px-6 py-2 font-bold font-serif tracking-wide
                border border-[#c9a876] hover:scale-105 hover:bg-[#c9a876] transition duration-500 text-lg
                shadow-md"
                onClick={()=>{
                    localStorage.removeItem("userId")
                    localStorage.removeItem("role")
                    navigate("/")
                    toast.success("You have successfully logged out")
                }}
            >
                Log Out
            </button>
        </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Profile