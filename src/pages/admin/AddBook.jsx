import React from 'react'

function AddBook({setAddNewNote}) {
  return (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-yellow-50 w-[650px] max-h-[90vh] overflow-y-auto hide-scrollbar rounded-2xl p-7 shadow-xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-semibold text-yellow-900">
            Add New Book
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Add a new book to your store
          </p>
        </div>

        <button
          onClick={() => setAddNewNote(false)}
          className="text-gray-500 hover:text-yellow-900 text-xl"
        >
          ✕
        </button>

      </div>


      {/* Form */}
      <form className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-yellow-900 mb-2">
            Book Title
          </label>

          <input
            type="text"
            placeholder="Enter book title"
            className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
          />
        </div>


        {/* Author + Category */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-semibold text-yellow-900 mb-2">
              Author
            </label>

            <input
              type="text"
              placeholder="Enter author"
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
            />
          </div>


          <div>
            <label className="block text-sm font-semibold text-yellow-900 mb-2">
              Category
            </label>

            <input
              type="text"
              placeholder="Enter category"
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
            />
          </div>

        </div>


        {/* Price + Stock + Pages */}
        <div className="grid grid-cols-3 gap-4">

          <div>
            <label className="block text-sm font-semibold text-yellow-900 mb-2">
              Price
            </label>

            <input
              type="number"
              placeholder="₹ Price"
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
            />
          </div>


          <div>
            <label className="block text-sm font-semibold text-yellow-900 mb-2">
              Stock
            </label>

            <input
              type="number"
              placeholder="Stock"
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
            />
          </div>


          <div>
            <label className="block text-sm font-semibold text-yellow-900 mb-2">
              Pages
            </label>

            <input
              type="number"
              placeholder="Pages"
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
            />
          </div>

        </div>


        {/* Rating */}
        <div>

          <label className="block text-sm font-semibold text-yellow-900 mb-2">
            Rating
          </label>

          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="Rating (0 - 5)"
            className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
          />

        </div>


        {/* Image */}
        <div>

          <label className="block text-sm font-semibold text-yellow-900 mb-2">
            Book Image URL
          </label>

          <input
            type="url"
            placeholder="https://example.com/book.jpg"
            className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800"
          />

        </div>


        {/* Description */}
        <div>

          <label className="block text-sm font-semibold text-yellow-900 mb-2">
            Description
          </label>

          <textarea
            rows="4"
            placeholder="Enter book description"
            className="w-full border border-yellow-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-800 resize-none"
          />

        </div>


        {/* Best Seller */}
        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            id="bestSeller"
            className="w-4 h-4 accent-yellow-900"
          />

          <label
            htmlFor="bestSeller"
            className="text-sm font-semibold text-yellow-900"
          >
            Mark as Best Seller
          </label>

        </div>


        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-3">

          <button
            type="button"
            onClick={() => setAddNewNote(false)}
            className="px-5 py-3 rounded-lg border border-yellow-900 text-yellow-900 hover:bg-yellow-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-3 rounded-lg
            bg-yellow-900 text-white
            hover:bg-yellow-800 transition"
          >
            Add Book
          </button>

        </div>

      </form>

    </div>
  </div>

  )
}

export default AddBook