import {Navigate,Outlet} from "react-router-dom"

export default function PublicRoute(){

    const id =  localStorage.getItem("userId")
    if(id){
      return  <Navigate to = "/" replace />
    }else {
        return <Outlet/>
    }
}