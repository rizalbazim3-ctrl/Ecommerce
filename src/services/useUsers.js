import React from 'react'
import { useQuery } from "@tanstack/react-query"
import {Users} from "./BooksApi"

function useUsers() {

return useQuery({
    queryKey : ["user"],
    queryFn : Users,
    })
}

export default useUsers