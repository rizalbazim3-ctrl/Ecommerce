import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BookCard from "../components/BookCard";
import useBooks from "../services/useBooks";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

function Books() {
  const [maxPrice, setMaxPrice] = useState(2000);

  const search = useSelector((state) => state.AllBooks.search);

  const {
    data: books = [],
    isLoading,
    isError,
  } = useBooks();

  const filteredBooks = books.filter(
    (book) =>
      (!search ||
        book.title.toLowerCase().includes(search.toLowerCase())) &&
      book.price <= maxPrice
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className="w-full relative">
      <Navbar />

      {/* Banner */}
      <AnimatePresence>
        {!search && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src="booksforbooks.png"
              alt="banner"
              className="w-[90%] h-[500px] mx-auto my-10 rounded-xl"
            />

            <p className="text-4xl font-serif font-bold text-[#3b2a20] text-center mb-10">
              The Story Shelf
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search heading */}
      <AnimatePresence>
        {search && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-3xl font-serif text-center mt-10 text-[#3b2a20]"
          >
            Showing results for{" "}
            <span className="italic">"{search}"</span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* Books */}
      <motion.section
        layout
        className="mt-20 mb-10 mx-20 grid grid-cols-4 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35 }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>

      {/* Filter */}
      <div className={`absolute ${!search ? "top-170 left-40 " : "top-25 left-10" } flex gap-15`}>
        <p className="font-semibold text-lg text-black/60 mt-3">
          Filter
        </p>

        <div className="w-70">
          <div className="flex justify-between mx-2 mb-2">
            <span>Price</span>
            <span>₹{maxPrice}</span>
          </div>

          <input
            type="range"
            min="0"
            max="2000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#8b6f47]"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Books;