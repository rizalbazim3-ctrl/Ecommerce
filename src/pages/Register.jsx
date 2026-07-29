import React,{useRef,useEffect} from 'react'
import {Mail,Phone,LockIcon,User,PhoneCall} from "lucide-react"
import {useNavigate} from "react-router-dom"

function Register() {
  const inputRef = useRef(null)
  const navigate = useNavigate()
  useEffect(()=> {
    inputRef.current.focus()
  },[])
  return (
    <div  className='flex flex-col items-center  justify-center w-full h-screen '>
      <section>
        <section className='relative'>
          <User className='absolute top-3 left-2 text-black/50'/>
        <input type="text" ref ={inputRef}
        placeholder='UserName'
        className='py-3 pl-10 border border-black/40 rounded-xl w-sm'
         ></input>
        </section>
        <section className='relative'>
          <Mail className='absolute top-5 left-2 text-black/50' />
          <input type="text" 
          placeholder='Email'
          className='py-3 pl-10 border border-black/40 rounded-xl w-sm mt-2'
          />
          </section>
          <section className='relative'>
          <PhoneCall className='absolute top-5 left-2 text-black/50'/>
        <input type="text"
        placeholder='PhoneNumber'
        className='py-3 pl-10  border border-black/40 rounded-xl w-sm mt-2'
        />
        </section>
        <section className='relative'>
          <LockIcon className='absolute top-5 left-2 text-black/50'/>
        <input type="text"
        placeholder='Password'
        className='py-3 pl-10  border border-black/40 rounded-xl w-sm mt-2'
        />
        </section> 
        <section className='relative'>
          <LockIcon className='absolute top-5 left-2 text-black/50'/>
        <input type="text" placeholder='ConfirmPassword'
        className='py-3 pl-10 border border-black/40 rounded-xl w-sm mt-2'
        ></input>
        </section>
        <button className='py-3  bg-gray-100 rounded-xl w-sm mt-2 mb-10'
        
        >SignUp</button>
        <p className='pl-12'>Already have an account? <span className = "underline text-blue-500 hover:text-blue-700"
        onClick={()=> {
          navigate("/Login")
        }}
         >Sign in</span></p>
      </section>
    </div>
  )
}

export default Register