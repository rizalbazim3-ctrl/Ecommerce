import React from 'react'
import BookCard from '../components/BookCard'

function Books() {
  const fetchFeatureadBooks = async ()=>{
   try{ const response = await axios.get("http://localhost:4001/books")
    console.log(response.data.slice(0,8))
    return response.data
  }
    catch(error){
      console.error(error)
    }
  } 

  const {data : books = []} = useQuery({
    queryKey : ["book"],
    queryFn : fetchFeatureadBooks,
  })

  return (
    

    <div>
      <BookCard books = {books}/>
    </div>
  )
}

export default Books