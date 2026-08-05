import { useState,useRef,useEffect} from "react"
import {
  ChevronDown,
  Search,
  Heart,
  ShoppingCart,
  User,
  Package,
  BookOpen,
} from "lucide-react"
import { data, useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { setSearch } from "../services/BookSlice"
import { useLocation } from "react-router-dom"
import useBooks from "../services/useBooks"
import useUsers from "../services/useUsers"

export default function Navbar({isLogin}) {
  const searchRef = useRef(null)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const categories = [
    "Fiction",
    "Non-Fiction",
    "Poetry",
    "Children's",
    "Biography",
    "History",
  ];
  const navigate = useNavigate()
  const search = useSelector((state)=> state.AllBooks.search)
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const userid = localStorage.getItem("userId")


  pathname === "/Books" && useEffect(()=>{
    searchRef.current?.focus()
  })

  const handleSearching = (e)=>{

    if(pathname === "/" || pathname === "/Cart" || pathname === "/Profile" || pathname === "/Wishlist" || pathname === "/BooksMystery"
      || pathname === "/BooksHistory" || pathname === "/BooksSelfhelp" || pathname === "/BooksScienceFiction" || pathname === "/BooksBiography"
      || pathname === "/BooksScienceFiction" || pathname === "/BooksRomance" 
    ){
      navigate("/Books")
      const value = e.target.value
       dispatch(setSearch(value))
    }
    else {
       const value = e.target.value
       dispatch(setSearch(value))
    }
  } 

  const {data : books = []} = useBooks()

  let cartCount = 0
  let wishlistCount = 0

  if(userid){const {
    data : user=[],
    isLoading
  } = useUsers()

  if(isLoading){
    return <p>Loading...</p>
  }

  if(user.cart){
  cartCount = user?.cart.filter((item)=> item) 
  wishlistCount = user?.wishlist.filter((item)=> item) 
}
  


}


  return (
    <div
      style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
      className="w-full sticky top-0 z-12"
    >

      {/* Main nav */}
      <nav className="w-full bg-[#fbf6ec]  rounded-xl border-b border-[#3b2a1f]/15 ">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-6 h-20">
          {/* Logo / home */}
          <a
            className="flex items-center gap-2 cursor-pointer group shrink-0"
            onClick={()=>{
              navigate("/")
            }}
          >
            <BookOpen
              size={26}
              className="text-[#8a4a1f] group-hover:text-[#c9a15c] transition-colors"
              strokeWidth={1.5}
            />
            <span
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[#2c2117] text-2xl tracking-[0.1em] font-bold group-hover:text-[#8a4a1f] transition-colors"
            >
              Wildink
            </span>
          </a>

          {/* Primary links */}
          <ul className="hidden lg:flex items-center gap-7 text-[15px] text-[#2c2117] shrink-0">
            <li
              className="relative cursor-pointer"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() =>{
                setTimeout(()=>{
                  setCategoriesOpen(false)
                },3000)
              }}
            >
              <span className="flex items-center gap-1 hover:text-[#8a4a1f] transition-colors">
                Categories
                <ChevronDown size={15} strokeWidth={1.5} />
              </span>

              {categoriesOpen && (
                <ul 
                className="absolute left-0 top-full mt-3 w-52 bg-[#fbf6ec] border border-[#3b2a1f]/15 shadow-lg py-2 z-20">


                    <li 
                    className="px-4 py-2 text-[14px] text-[#2c2117] hover:bg-[#8a4a1f]/10 hover:text-[#8a4a1f] transition-colors "
                    onClick={ ()=> {
                      navigate("/Books")
                    }} >All </li>
                    <li className="px-4 py-2 text-[14px] text-[#2c2117] hover:bg-[#8a4a1f]/10 hover:text-[#8a4a1f] transition-colors "
                    onClick={ ()=> {
                      navigate("/BooksFiction")
                    }} >Fiction</li>
                    <li className="px-4 py-2 text-[14px] text-[#2c2117] hover:bg-[#8a4a1f]/10 hover:text-[#8a4a1f] transition-colors "
                    onClick={ ()=> {
                      navigate("/BooksBiography")
                    }} >Biography</li>
                    <li className="px-4 py-2 text-[14px] text-[#2c2117] hover:bg-[#8a4a1f]/10 hover:text-[#8a4a1f] transition-colors "
                    onClick={ ()=> {
                      navigate("/BooksRomance")
                    }} >Romance</li>
                    <li className="px-4 py-2 text-[14px] text-[#2c2117] hover:bg-[#8a4a1f]/10 hover:text-[#8a4a1f] transition-colors "
                    onClick={ ()=> {
                      navigate("/BooksHistory")
                    }} >History</li>
                    <li className="px-4 py-2 text-[14px] text-[#2c2117] hover:bg-[#8a4a1f]/10 hover:text-[#8a4a1f] transition-colors "
                    onClick={ ()=> {
                      navigate("/BooksMystery")
                    }} >Mystery</li>
                    <li className="px-4 py-2 text-[14px] text-[#2c2117] hover:bg-[#8a4a1f]/10 hover:text-[#8a4a1f] transition-colors "
                    onClick={ ()=> {
                      navigate("/BooksScienceFiction")
                    }} >Science-Fiction</li>
                    <li className="px-4 py-2 text-[14px] text-[#2c2117] hover:bg-[#8a4a1f]/10 hover:text-[#8a4a1f] transition-colors "
                    onClick={ ()=> {
                      navigate("/BooksSelfhelp")
                    }} >Self-Help</li>
                </ul>
              )}
            </li>

            {/* <li className="cursor-pointer hover:text-[#8a4a1f] transition-colors whitespace-nowrap">
              Best sellers
            </li>
            <li className="cursor-pointer hover:text-[#8a4a1f] transition-colors whitespace-nowrap">
              New arrivals
            </li> */}
          </ul>

          {/* Search bar */}
          <div className="hidden md:flex flex-1">
            <div className="flex items-center w-full max-w-xl mx-auto bg-white border border-[#3b2a1f]/20 rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search books"
                ref={searchRef}
                className="w-full bg-transparent outline-none pl-5 pr-2 py-2.5 text-[15px] text-[#2c2117] placeholder:text-[#9a8b76]"
                style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                onChange={(e)=>{
                  handleSearching(e)
                }}
              />
              <button
                aria-label="Search"
                className="bg-[#8a4a1f] hover:bg-[#a35a28] transition-colors h-full px-4 py-2.5 flex items-center justify-center"
              >
                <Search size={17} className="text-[#fbf6ec]" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-5 shrink-0 text-[#2c2117] ml-auto ">
            <button
              aria-label="Wishlist"
              className="hover:text-[#8a4a1f] transition-colors relative"
              onClick={()=>{
                navigate("/Wishlist")
              }}
            >
              <Heart size={21} strokeWidth={1.5} className="" />
                {wishlistCount.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center">
                      {wishlistCount.length}
                    </span>
                  )}
            </button>

            <button
              aria-label="Cart"
              className="relative hover:text-[#8a4a1f] transition-colors relative"
              onClick={()=>{
                navigate("/Cart" )
              }}
            >
              <ShoppingCart size={21} strokeWidth={1.5} />
              {cartCount.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center">
                      {cartCount.length}
                    </span>
                  )}
            </button>

            <div
              className="relative"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => {
                setTimeout(()=>{
                  setAccountOpen(false)
                },3000)
              }}
            >
              <button
                aria-label="Account"
                className="flex items-center gap-1 hover:text-[#8a4a1f] transition-colors"
              >
                <User size={21} strokeWidth={1.5} />
              </button>

              {accountOpen && (
                <ul className="absolute right-0 top-full mt-3 w-44 bg-[#fbf6ec] border border-[#3b2a1f]/15 shadow-lg py-2 z-20 text-[14px]">

                 { localStorage.getItem("userId") ? <li className="px-4 py-2 text-[#2c2117] hover:bg-[#8a4a1f]/10 hover:text-[#8a4a1f] transition-colors cursor-pointer"
                  onClick={()=> {
                    navigate("/Profile")
                  }}>
                    Profile
                  </li>
                  :
                  <li className="px-4 py-2 text-[#2c2117] hover:bg-[#8a4a1f]/10 hover:text-[#8a4a1f] transition-colors cursor-pointer"
                  onClick={()=> {
                    navigate("/Login")
                  }}>
                    Login
                  </li> } 
                  <li 
                   onClick = {()=>{
                  navigate("/Orders")
                }}
                  className="px-4 py-2 text-[#2c2117] hover:bg-[#8a4a1f]/10 hover:text-[#8a4a1f] transition-colors cursor-pointer flex items-center gap-2">
                    <Package size={15} strokeWidth={1.5} 
                   />
                    My orders
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}