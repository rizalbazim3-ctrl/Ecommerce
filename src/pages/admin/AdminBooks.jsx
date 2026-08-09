import React from 'react'

function AdminBooks() {
  return (
    <div className='px-5'>
      <nav className = "flex justify-between px-10 py-5">
        <h1 className='text-3xl font-bold text-yellow-900 opacity-200' 
        >Books</h1>
        <button className='rounded-lg bg-yellow-800 text-yellow-100 p-3 hover:bg-green-900 hover:scale-102 transition duration-100 '
        >+Add New Book</button>
      </nav>

       <p>Manage All Books</p>

      <div className = "flex  gap-5 mt-6 px-10">
          <p className = "rounded-3xl bg-yellow-700 px-5 py-1"
          >Catogeries</p>
          <p className = "rounded-3xl bg-yellow-700 px-5 py-1"
          >Stocks</p>
      </div>

      <section className='flex justify-between px-10 mt-10'
      >
        <p>Book</p>
        <p>Author</p>
        <p>Catogery</p>
        <p>Price</p>
        <p>Stock</p>
        <p>Action</p>
      </section>
    </div>
  )
}

export default AdminBooks