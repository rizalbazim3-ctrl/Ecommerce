import axios from "axios"

export async function users (){
    const url = `http://localhost:4001/users`

    const response = await axios.get(url)

    return response.data
} 