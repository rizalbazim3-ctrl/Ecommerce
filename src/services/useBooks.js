import { AllBooks } from "./BooksApi"
import { useQuery } from "@tanstack/react-query"
function useBooks() {
  return (
   useQuery({
    queryKey : ["books"],
    queryFn : AllBooks,
   })
  )
}

export default useBooks