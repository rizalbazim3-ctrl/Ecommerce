import React,{useEffect} from 'react'
import { Routes,Route } from 'react-router-dom'
import axios from "axios"
import BookCard from "./components/BookCard"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import BookDetails from './pages/BookDetails'
import Books from "./pages/Books"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import Register from "./pages/Register"
import Wishlist from "./pages/Wishlist"
import BooksFiction from "./pages/BooksFiction"
import BooksRomance from "./pages/BooksRomance"
import BooksHistory from "./pages/BooksHistory"
import BooksMystery from "./pages/BooksMystery"
import BooksSelfhelp from "./pages/BooksSelfhelp"
import BooksBiography from "./pages/BooksBiography"
import BooksScienceFiction from "./pages/BooksScienceFiction"
import { useSelector,useDispatch } from 'react-redux'
import { addBook } from './services/BookSlice'
import ScrollTop from "./services/ScrollTop"



function App() {
  const dispatch = useDispatch()
  const kithab = useSelector((state)=>state.AllBooks.kithab)
  useEffect(()=>{
      const fetchFeatureadBooks = async ()=>{
   try{ const response = await axios.get("http://localhost:4001/books")
     dispatch(addBook(response.data))
  }
    catch(error){
      console.error(error)
    }
  }
   fetchFeatureadBooks()
  },[dispatch])
  return (
    <div>
      <ScrollTop/>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/Footer" element = {<Footer/>}/>
        <Route path = "/Navbar" element = {<Navbar/>} />
        <Route path = "/Books/:id" element = {<BookDetails/>}/>
        <Route path = "/Books" element = {<Books/>}/>
        <Route path = "/Cart" element = {<Cart/>}/>
        <Route path = "/Checkout" element = {<Checkout/>}/>
        <Route path = "/Login" element = {<Login/>}/>
        <Route path = "/Orders" element = {<Orders/>}/>
        <Route path = "/Register" element = {<Register/>}/>
        <Route path = "/Wishlist" element = {<Wishlist/>}/>
        <Route path = "/BooksFiction" element = {<BooksFiction/>}/>
        <Route path = "/BooksRomance" element = {<BooksRomance/>}/>
        <Route path = "/BooksHistory" element = {<BooksHistory/>}/>
        <Route path = "/BooksMystery" element = {<BooksMystery/>}/>
        <Route path = "/BooksSelfhelp" element = {<BooksSelfhelp/>}/>
        <Route path = "/BooksBiography" element = {<BooksBiography/>}/>
        <Route path = "/BooksScienceFiction" element = {<BooksScienceFiction/>}/>
      </Routes>
    </div>
  )
}

export default App