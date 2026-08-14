import React from 'react'
import axios from "axios"

export async function  AllBooks (){
    const response = await axios.get(
      "http://localhost:4001/books"
    )
    const result = response.data.filter((item)=> item?.isDelete != true )
    
    return result
    }
export async function Users(){
  const id = localStorage.getItem("userId")

    const response = await axios.get(
    `http://localhost:4001/users/${id}`
  )
  return response.data

} 
export async function  removecart(id) {
  const userid = localStorage.getItem("userId")
  const list = await axios.get(` http://localhost:4001/users`)
  const listData = list.data
  console.log(listData)
   try{ const cartUpdated = await listData.filter((item)=> item.id !== id )
          await axios.patch(` http://localhost:4001/users/${userid}`,{
            cart : cartUpdated
          })
        }catch(error){
          console.log(error)
        }
      }