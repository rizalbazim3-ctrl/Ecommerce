import React,{useRef,useEffect,useState} from 'react'
import {Mail,PhoneCall,LockIcon,User} from "lucide-react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"

function Register() {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [pass,setPass] = useState("")
  const [confirm,setConfirm] = useState("")
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const verifingEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  useEffect(()=> {
    inputRef.current.focus()
  },[])

  const sendUser = async (newUser)=>{
    const response = await axios.post(
      "http://localhost:4001/users",
      newUser
    )
  }

  const handleSignup =  async ()=>{ 
   
      const response = await axios.get(`http://localhost:4001/users?email=${email}`)
         
    
    if(response.data.length !== 0){
      toast.error("Email already exist")
      return;
    }
    else if(
      name.length > 2 && 
      email.endsWith("@gmail.com") &&  
      phone.length === 10 && 
      pass.length >= 6 && 
      pass === confirm
    ){
      console.log("finish")

      const newUser = {
        id : crypto.randomUUID(),
        name : name,
        email : email,
        phone : phone,
        password : pass,
        orderedUserDetails : [],
        cart : [],
        wishlist : []
      }

      sendUser(newUser)

      setEmail("")
      setName("")
      setPhone("")
      setConfirm("")
      setPass("")

      toast.success("Account created successfully")
      navigate("/Login")

    }else if(name.length < 2){
      toast.error("invalid name")
    }else if(!email.endsWith("@gmail.com") || !verifingEmail.test(email) ){
      toast.error("invalid email")
    }else if(phone.length !== 10 || Number(phone)%1 !== 0){
      toast.error("invalid phoneNumber")
    }else if(pass.length < 6){
      toast.error("invalid password")
    }else if(pass !== confirm){
      toast.error("check confirm password")
    }
  }

  return (
    <div className="flex flex-row w-full">

     
      <section
        className="w-[50%] h-screen bg-cover bg-center  relative"
        style={{ backgroundImage: "url('/reading book amen.jpeg')" }}
      >
        <div className="absolute inset-0 flex items-center bg-black/60 justify-center p-10">

          <div className="max-w-lg text-center text-[#F3D7A4]">

            <p className="text-sm tracking-[0.4em] uppercase mb-4 text-[#D8B47A]">
              Welcome to
            </p>
            <h1 className="text-6xl font-serif font-bold tracking-wide mb-6">
              WildInk
            </h1>

            <div className="w-24 h-[1px] bg-[#D8B47A] mx-auto mb-6"></div>

            <p className="text-2xl font-serif italic leading-relaxed mb-6">
              "Every great story begins with a single page."
            </p>

            <p className="text-base leading-7 text-[#F5EBDD]/80 font-serif">
              Step into a world where stories come alive, ideas find
              their voice, and every page holds a new adventure.
              Create your account and begin your journey through
              the timeless world of books with WildInk.
            </p>

            <div className="w-24 h-[1px] bg-[#D8B47A] mx-auto mt-7 mb-4"></div>

            <p className="text-sm tracking-widest text-[#D8B47A]">
              READ • DISCOVER • IMAGINE
            </p>

          </div>

        </div>

      </section>

      <div className='flex flex-col items-center relative justify-center w-[50%] h-screen bg-[url("/library.jpeg")] bg-cover bg-center'>

        <div className='absolute inset-0 bg-black/50'></div>

        <section className='bg-white/10 text-white p-5 z-10 rounded-lg brightness-100'>

          <section className='relative'>
            <User className='absolute top-3 left-2 text-white/40'/>

            <input 
              type="text" 
              ref={inputRef}
              placeholder='UserName'
              className='py-3 pl-10 border border-black/40 bg-black/40 rounded-xl w-sm'
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
              }}
            />
          </section>

          <section className='relative'>
            <Mail className='absolute top-5 left-2 text-white/40' />

            <input 
              type="text" 
              placeholder='Email'
              className='py-3 pl-10 border border-black/40 bg-black/40 rounded-xl w-sm mt-2'
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
            />
          </section>

          <section className='relative'>
            <PhoneCall className='absolute top-5 left-2 text-white/40'/>

            <input 
              type="text"
              inputMode="numeric"
              placeholder='PhoneNumber'
              className='py-3 pl-10 border border-black/40 bg-black/40 rounded-xl w-sm mt-2'
              value={phone}
              onChange={(e)=>{
                setPhone(e.target.value)
              }}
            />
          </section>

          <section className='relative'>
            <LockIcon className='absolute top-5 left-2 text-white/40'/>

            <input 
              type="text"
              placeholder='Password'
              className='py-3 pl-10 border border-black/40 rounded-xl w-sm mt-2 bg-black/40'
              value={pass}
              onChange={(e)=>{
                setPass(e.target.value)
              }}
            />
          </section>

          <section className='relative'>
            <LockIcon className='absolute top-5 left-2 text-white/40'/>

            <input 
              type="text"
              placeholder='ConfirmPassword'
              className='py-3 pl-10 border border-black/40 rounded-xl w-sm mt-2 bg-black/40'
              value={confirm}
              onChange={(e)=>{
                setConfirm(e.target.value)
              }}
            />
          </section>

          <button 
            className='py-3 bg-white/30 rounded-xl w-sm mt-2 mb-10 hover:bg-green-900/80 hover:text-white'
            onClick={handleSignup}
          >
            SignUp
          </button>

          <p className='pl-12'>
            Already have an account? 

            <span 
              className="underline text-blue-500 hover:text-blue-700"
              onClick={()=> {
                navigate("/Login")
              }}
            >
            Sign in
          </span>
        </p>

      </section>

      </div>

    </div>
  )
}

export default Register