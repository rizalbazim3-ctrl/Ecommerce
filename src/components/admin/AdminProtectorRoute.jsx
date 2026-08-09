import { Navigate,Outlet } from "react-router-dom";
import useUsers from "../../services/useUsers";
import { User } from "lucide-react";

function AdminProtectorRoute(){
    const {
        data : users = {},
        isLoading,
        isError
    } = useUsers()

    if(isLoading){
        return <p>Loading...</p>
    }

    const role = users.role

    console.log(role)

    if(isError || !users){
      return  <Navigate to = "/Login" replace/>
    }

    if(role !== "admin"){
        return <Navigate to = "/"/>
    }

    return (
        <Outlet/>
    )
    
}

export default AdminProtectorRoute