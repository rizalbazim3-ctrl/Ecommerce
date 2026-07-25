import React from 'react'
import { Routes,Route } from 'react-router-dom'

import BookCard from "./components/BookCard"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import BookDetails from './pages/BookDetails'
import Books from "./pages/Books"
import Card from "./pages/Card"
import Checkout from "./pages/Checkout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import Register from "./pages/Register"
import Wishlist from "./pages/Wishlist"

function App() {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/Footer" element = {<Footer/>}/>
        <Route path = "/Navbar" element = {<Navbar/>} />
        <Route path = "/Books/:id" element = {<BookDetails/>}/>\
        <Route path = "/Books" element = {<Books/>}/>
        <Route path = "/Card" element = {<Card/>}/>
        <Route path = "/Checkout" element = {<Checkout/>}/>
        <Route path = "/Login" element = {<Login/>}/>
        <Route path = "/Orders" element = {<Orders/>}/>
        <Route path = "/Register" element = {<Register/>}/>
        <Route path = "/Wishlist" element = {<Wishlist/>}/>

      </Routes>
    </div>
  )
}

export default App