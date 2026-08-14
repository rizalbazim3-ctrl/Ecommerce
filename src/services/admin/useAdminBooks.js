import React from 'react'
import { Books } from '../admin/adminApi'
import { useQuery } from '@tanstack/react-query'

function useAdminBooks() {

   return (
     useQuery({
        queryKey : ["books"],

        queryFn : Books,
    })
)
}

export default useAdminBooks