import React from 'react'

function BookView({value}) {

    const {setBookView,viewBookId,books} = value
    const selectedBook =  books.find((item)=>item.id === viewBookId)
    
  return (
   
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-[#F2EFE9] w-[700px] max-h-[90vh]
      overflow-y-auto hide-scrollbar rounded-2xl shadow-xl p-7">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-semibold text-yellow-900">
            Book Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Product information
          </p>
        </div>

      </div>


      {/* Product Top Section */}
      <div className="flex gap-6 bg-gray-50 rounded-xl p-5">

        {/* Book Image */}
        <div className="w-36 h-52 flex-shrink-0 bg-white rounded-lg p-2">
          <img
            src={selectedBook.image}
            alt={selectedBook.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>


        {/* Basic Details */}
        <div className="flex flex-col justify-center">

          <h3 className="text-2xl font-bold text-yellow-900">
            {selectedBook.title}
          </h3>

          <p className="text-gray-600 mt-2">
            by {selectedBook.author}
          </p>

          <span className="w-fit mt-3 px-3 py-1 rounded-full
            bg-yellow-900 text-yellow-50 text-sm">
            {selectedBook.category}
          </span>

          <p className="text-2xl font-bold text-yellow-900 mt-4">
            ₹{selectedBook.price}
          </p>

        </div>

      </div>


      {/* Product Information */}
      <div className="mt-6">

        <h3 className="text-lg font-semibold text-yellow-900 mb-4">
          Product Information
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-gray-500/30 rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Rating
            </p>

            <p className="font-semibold text-yellow-900 mt-1">
              ⭐ {selectedBook.rating}
            </p>
          </div>


          <div className="bg-gray-500/30 rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Stock
            </p>

            <p className={
              selectedBook.stock <= 5
                ? "font-semibold text-red-600 mt-1"
                : "font-semibold text-green-600 mt-1"
            }>
              {selectedBook.stock} available
            </p>
          </div>


          <div className="bg-gray-500/30 rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Pages
            </p>

            <p className="font-semibold text-yellow-900 mt-1">
              {selectedBook.pages}
            </p>
          </div>


          <div className="bg-gray-500/30 rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Best Seller
            </p>

            <p className="font-semibold text-yellow-900 mt-1">
              {selectedBook.bestSeller ? "Yes" : "No"}
            </p>
          </div>

        </div>

      </div>


      {/* Description */}
      <div className="mt-6">

        <h3 className="text-lg font-semibold text-yellow-900 mb-3">
          Description
        </h3>

        <div className="bg-gray-500/30 rounded-lg p-4">
          <p className="text-gray-600 leading-7">
            {selectedBook.description}
          </p>
        </div>

      </div>


      {/* Close */}
      <button
        onClick={() => setBookView(false)}
        className="w-full mt-7 bg-yellow-900 text-white
        py-3 rounded-lg hover:bg-yellow-900/90 transition"
      >
        Close
      </button>

    </div>

  </div>

  )
}

export default BookView