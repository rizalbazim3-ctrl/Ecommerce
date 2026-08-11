import { Navigate,Outlet } from "react-router-dom";
import useUsers from "../../services/useUsers";
import { User } from "lucide-react";

function AdminProtectorRoute(){
    const role = localStorage.getItem("role")


    if(  role !== "admin"){
        return <Navigate to = "/"/>
    }

    return (
        <Outlet/>
    )
    
}

export default AdminProtectorRoute