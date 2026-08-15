import React,{useState} from 'react'
import UserTable from '../../components/admin/UserTable'
import { useQuery,useQueryClient } from '@tanstack/react-query'
import axios from "axios"
import UserCard from "../../components/admin/UserCard"
import {useEffect} from "react"
import { useSelector } from 'react-redux'

function AdminUsers() {
  
        const fetchUsers = async ()=> {
        const response = await axios.get("http://localhost:4001/users")
        return response.data
    }
    const queryClient = useQueryClient()
    const adminSearch = useSelector((state)=> state.adminFilter.adminSearch)

    const {
        data : Allusers = [],
        isLoading
    } = useQuery({
        queryKey : ["Allusers"],
        queryFn : fetchUsers,
    })


    const Loginusers = Allusers.filter((item)=>   adminSearch === "" ? item.role === "user" : item.role === "user" && item.name.toLowerCase().includes(adminSearch.toLowerCase()) )

    //paginantion
    const [startPage,setStartPage] = useState(0)
    const pages = 5 
    const [endPage,setEndPage] = useState(pages)
    const users = Loginusers.slice(startPage,endPage)
    const [value,setValue] = useState(1)
     

    const paginationList =[]

     for(let i =1; i<=Math.ceil(Loginusers.length/5);i++){
      paginationList.push(<button 
        key = {i}
        className = {`rounded  font-semibold px-4  text-white 
        py-1 mx-2  ${(i === value) ? "bg-yellow-900/80"  : "bg-yellow-900/50 hover:bg-yellow-900/70"}` }
        value = {i}
        onClick={(e)=>{
          const value = e.target.value 
          setStartPage( (value-1) * pages)
          setEndPage( value * pages)
          setValue(i)
        }}
      >{i}</button>)
    }

        useEffect(()=>{
        if(startPage === 0 ){
           setValue(1)
        }else{
          setValue(startPage/pages + 1)
        }
        console.log("useEffect")
      },[startPage])

      useEffect(()=>{

        setStartPage(0)

        setEndPage(pages)
        
      },[adminSearch])

        if(isLoading){
      return <p>Loading...</p>
    }
    return (
    <>
     <div className="p-8">

  {/* Header */}
  <div className="bg-[#F2EFE9] rounded-xl px-6 py-5">
    <h1 className="text-3xl font-semibold text-yellow-900">
      Users
    </h1>

    <p className="text-gray-600 mt-1">
      Manage registered customers
    </p>
  </div>

  <UserCard Loginusers = {Loginusers}/>


  {/* User Table */}
  <section className="mt-8 bg-[#F2EFE9] rounded-xl p-5">

    {/* Table Heading */}
    <div
      className="grid grid-cols-5 justify-between px-5 py-4 text-yellow-900 font-semibold border-b border-yellow-900 rounded-2xl"
    >
      <p>User</p>
      <p>Email</p>
      <p>Phone</p>
      <p>status</p>

      <p className="text-center">Action</p>
    </div>

         {
            users.map((user)=> (

              <div key = {user.id}> 

                 <UserTable user = {user}/>

              </div>
            ))
        }

  </section>

  <div className='flex flex-wrap justify-center mt-4  '>
      
    <p className = 'px-3 py-1 bg-yellow-900/70 text-white hover:bg-yellow-900/90 rounded'
    onClick={()=>{
      if(endPage !== pages){
      setStartPage((prev)=>prev-pages)
      setEndPage((prev)=> prev-pages)
      
      }
    }}
    >{ "< "}Previous</p>
    {
      paginationList.map((item)=>{
        return (
          item
        )
      })
    }

    <p className = 'px-5 py-1 bg-yellow-900/70 text-white hover:bg-yellow-900/90 rounded'
    onClick={()=>{
      if(Loginusers.length > endPage){
        setStartPage((prev)=>prev+pages)
        setEndPage((prev)=> prev+pages)

      }
    }}

    >Next{ " >"}</p>

    </div>

  </div>
    </>
  )
}

export default AdminUsers