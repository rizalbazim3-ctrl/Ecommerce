import React,{useRef,useEffect} from 'react'
import {useNavigate} from "react-router-dom"

function Login() { 
  const inputRef = useRef(null)
  const navigate = useNavigate()
    useEffect(()=> {
      inputRef.current.focus()
    },[]) 
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center border border-black/30'>
      <section className='flex flex-col'>
        <input type="text" placeholder ="Email" ref={inputRef}
         className='w-sm border rounded-xl pl-2 py-2'/>
      <input type="password" placeholder = "PassWord" 
      className='w-sm border mt-4 rounded-xl pl-2 py-2'/>
      </section>
      <p className='relative w-sm py-4'>
        <span className='absolute right-3'>ForgotPassword?</span>
      </p>
      <footer className = " mt-4 w-sm h-[100px]">
        <button className = "border rounded-xl w-full py-2 bg-gray-100 mb-10" >Login</button>
        <p className = "mb-5 w-sm text-center">or</p>
        <span className = "ml-35">Don't you have account? </span>
      <span className=' text-blue-500 hover:text-blue-700 mt-5 underline'
      onClick={()=>{
        navigate("/Register")
      }}
      >SignUp</span>
      </footer>
    </div>
  )
}

export default Login