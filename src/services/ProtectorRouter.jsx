import React from 'react'
import {Navigate} from "react-router-dom"
import { Outlet } from 'react-router-dom'

function ProtectorRouter() {
 const user = localStorage.getItem("userId")
    if(!user){
        return <Navigate to = "/Login" replace />
    }
    return <Outlet/>
}

export default ProtectorRouter