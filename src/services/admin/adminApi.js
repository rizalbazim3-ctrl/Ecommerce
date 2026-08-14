import axios from "axios"

export async function users (){
    const url = `http://localhost:4001/users`

    const response = await axios.get(url)

    return response.data
} 

export async function Books(){
    const response = await axios.get(`http://localhost:4001/books`)
    return response.data
}