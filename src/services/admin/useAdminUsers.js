import {useQuery} from "@tanstack/react-query"
import {users} from "./adminApi"

export default function useAdminUsers(){

   return ( 
    useQuery({
        queryKey : ["AdminUser"],
        queryFn : users,
    })
)
}