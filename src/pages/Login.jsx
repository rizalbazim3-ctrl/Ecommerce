import React,{useRef,useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {toast} from "sonner"

function Login() { 
  const inputRef = useRef(null)
  const [email,setEmail] = useState("")
  const [pass,setPass] = useState("")
  const navigate = useNavigate()
    useEffect(()=> {
      inputRef.current.focus()
    },[]) 

      const fetchLogin =  async ()=> {
        const response =  await axios.get(`http://localhost:4001/users?email=${email}`)
        return response.data
        }

      const handleSignIn = async ()=>{
      const data = await fetchLogin()
      if(data.length === 0){
          toast.error("invalid email")
        }else if(data[0].password !== pass){
            toast.error("invalid password")
          }else if(data.length !== 0 && data[0].password === pass){
            console.log(typeof data[0].password)
            toast.success("Login successfull")
            setEmail("")
            setPass("")
            navigate("/")
          }
      }
        
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center border border-black/30 relative overflow-hidden '>
      <video className='absolute inset-0 w-full h-full object-cover'
      autoPlay
      loop
      muted
      >
        <source src="/Young_man_reading_in_library_202607291116.mp4" type = "video/mp4"/>
      </video>
      <section className='flex flex-col z-10 text-white'>
        <input type="text" placeholder ="Email" ref={inputRef}
         className='w-sm border rounded-xl pl-2 py-2'
          onChange = {(e)=> {
          setEmail(e.target.value)
         }}
         />
      <input type="password" placeholder = "PassWord" 
      className='w-sm border mt-4 rounded-xl pl-2 py-2'
      onChange = {(e)=> {
          setPass(e.target.value)
         }}
      />
      </section>
      <p className='relative w-sm py-4 z-10'>
        <span className='absolute right-3'>ForgotPassword?</span>
      </p>
      <footer className = " mt-4 w-sm h-[100px] z-10">
        <button className = "border rounded-xl w-full py-2 bg-white/30 hover:bg-black/80 hover:text-white mb-10" 
        onClick = {handleSignIn}
        >Login</button>
        <p className = "mb-5 w-sm text-center">or</p>
        <span className = "ml-35 text-white" >Don't you have account? </span>
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