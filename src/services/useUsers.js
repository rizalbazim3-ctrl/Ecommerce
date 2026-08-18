import React from 'react'
import { useQuery } from "@tanstack/react-query"
import {Users} from "./BooksApi"

function useUsers() {
const userId = localStorage.getItem("userId")
return  useQuery({
    queryKey : ["user"],
    queryFn : Users,
    enabled : !!userId,
    })
}

export default useUsers