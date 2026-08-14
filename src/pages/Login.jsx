import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import Dashboard from './admin/Dashboard'
import { useQuery } from '@tanstack/react-query'

 const fetchLogin = async () => {
    const response = await axios.get(`http://localhost:4001/users`)
    return response.data
  }

function Login() { 
  const inputRef = useRef(null)
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const navigate = useNavigate()

  const {
    data : user = [],
    isLoading
  } = useQuery({
    queryKey : ["allLogins"],
    queryFn : fetchLogin,
  })


  useEffect(() => {
    inputRef.current?.focus()
  }, []) 

  if(isLoading){
    return <p>Loading...</p>
  }

        
  const handleSignIn = async () => {
    // const data = await fetchLogin()
    const data = user.filter((item)=> item.email === email)


    if (data.length === 0) {
      toast.error("invalid email")
    } else if (data[0].password !== pass) {
      toast.error("invalid password")
    }else if(data[0].status === false){
      toast.error("Can't Login")
    } else if (data.length !== 0 && data[0].password === pass) {
      
     if(data[0].role !== "admin"){
       toast.success("Login successfull")
      localStorage.setItem("role", data[0].role)
      localStorage.setItem("userId", data[0].id)
      setEmail("")
      setPass("")
      navigate("/")
     }else if(data[0].role === "admin"){
      toast.success("Admin logged successfully")
      navigate("/Admin/Dashboard")
      localStorage.setItem("userId", data[0].id)
      localStorage.setItem("role", data[0].role)
      setEmail("")
      setPass("")
      
     }
    }
  }
        
  return (
    <div>
      <video 
        className='absolute inset-0 h-full w-full object-cover'
        autoPlay
        loop
        muted
      >
        <source 
          src="/Young_man_reading_in_library_202607291116.mp4" 
          type="video/mp4"
        />
      </video>

      <div className='h-screen flex flex-col md:flex-row justify-center gap-20 items-center border border-black/30 relative overflow-hidden bg-black/60 p-8 rounded-xl'>

        {/* WildInk Note */}
        <section className="z-10 text-white max-w-md">
          <h1 className="text-4xl font-bold mb-4 text-[#F3D7A4]">
            Welcome to WildInk
          </h1>

          <p className="text-lg italic mb-4 text-[#E8CFA8]">
            "Every book holds a story, and every story has the power 
            to change the way we see the world."
          </p>

          <p className="text-base text-[#F5EBDD]/80 leading-relaxed">
            Discover inspiring ideas, unforgettable characters, and new 
            adventures waiting between the pages. Find your next favorite 
            book and let your journey begin with WildInk.
          </p>
        </section>

        {/* Login Section */}
        <section className='flex flex-col z-10 text-white'>

          <input 
            type="text" 
            placeholder="Email" 
            ref={inputRef}
            className='w-sm border rounded-xl pl-2 py-2'
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />

          <input 
            type="password" 
            placeholder="PassWord" 
            className='w-sm border mt-4 rounded-xl pl-2 py-2'
            onChange={(e) => {
              setPass(e.target.value)
            }}
          />

          <footer className="mt-4 w-sm h-[100px] z-10">

            <button 
              className="border border-white/30 rounded-xl w-full py-2 text-black bg-white/30 font-semibold hover:bg-[#F3D7A4] hover:border-[#3b2a20] hover:text-yellow-900 mb-10  transition-colors duration-500"
              onClick={() => {
                handleSignIn()
              }}
            >
              Login
            </button>

            <p className="mb-5 w-sm text-center">
              or
            </p>

            <span className="ml-35 text-white">
              Don't you have account? 
            </span>

            <span 
              className='text-blue-500 hover:text-blue-700 mt-5 underline'
              onClick={() => {
                navigate("/Register")
              }}
            >
              SignUp
            </span>

          </footer>
        </section>

      </div>
    </div>
  )
}

export default Login