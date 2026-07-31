import React from 'react'
import axios from "axios"

export async function  AllBooks (){
    const response = await axios.get(
      "http://localhost:4001/books"
    )
    return response.data
    }