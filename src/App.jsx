import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
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
import ScrollTop from "./services/ScrollTop"
import PaymentResult from "./pages/PaymentResult"
import Profile from "./pages/Profile"
import ProtectorRouter from './services/ProtectorRouter'
import PublicRoute from "./services/PublicRoute"
import NotFound from './pages/NotFound'

//adminComponents

import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminBooks from "./pages/admin/AdminBooks"
import AdminProtectorRoute from './components/admin/AdminProtectorRoute'
import AdminUsers from './pages/admin/AdminUsers'
import AdminOrders from './pages/admin/AdminOrders'



function App() {

  return (
    <div>
      <ScrollTop />
      <Routes>
        //admin side

        <Route element={<AdminProtectorRoute />}>
          <Route element={<AdminLayout />} >
            <Route path="/Admin/Dashboard" element={<Dashboard />} />
            <Route path="/Admin/Books" element={<AdminBooks />} />
            <Route path="/Admin/Orders" element={<AdminOrders />} />
            <Route path="/Admin/Users" element={<AdminUsers />} />
          </Route>
        </Route>

        //userSide
        <Route element={<ProtectorRouter />} >
          <Route path="/Profile" element={<Profile />} />
          <Route path="/PaymentResult" element={<PaymentResult />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout/:id" element={<Checkout />} />
          <Route path="/Checkout" element={<Checkout />} />
        </Route>


        <Route element={<PublicRoute />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Route>


        <Route path="/" element={<Home />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Books/:id" element={<BookDetails />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/BooksFiction" element={<BooksFiction />} />
        <Route path="/BooksRomance" element={<BooksRomance />} />
        <Route path="/BooksHistory" element={<BooksHistory />} />
        <Route path="/BooksMystery" element={<BooksMystery />} />
        <Route path="/BooksSelfhelp" element={<BooksSelfhelp />} />
        <Route path="/BooksBiography" element={<BooksBiography />} />
        <Route path="/BooksScienceFiction" element={<BooksScienceFiction />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App