import {Navigate,Outlet} from "react-router-dom"

export default function PublicRoute(){
    console.log("adminProte")
    const role = localStorage?.getItem("role")

    if(role === "user"){
      return  <Navigate to = "/" replace />
    }else if(!role) {
        return <Outlet/>
    }
}