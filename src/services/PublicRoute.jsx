import {Navigate,Outlet} from "react-router-dom"

export default function PublicRoute(){
  
    const role = localStorage?.getItem("role")

    if(role === "user"){
      return  <Navigate to = "/" replace />
    }else if(role === "admin"){
        return <Navigate to = "/Admin/Dashboard" replace/>
    }
    else if(!role) {
        return <Outlet/>
    }
}