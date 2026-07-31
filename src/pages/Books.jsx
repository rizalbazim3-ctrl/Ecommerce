import React from 'react'
import BookCard from '../components/BookCard'
import useBooks from '../services/useBooks'

function Books() {

  const {data : books = [],
    isLoading,
    isError
  } = useBooks()

  return (
    

    <div>
      <BookCard books = {books}/>
    </div>
  )
}

export default Books