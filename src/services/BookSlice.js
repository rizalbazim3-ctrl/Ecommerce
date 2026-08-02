import { createSlice } from "@reduxjs/toolkit";

const BookSlice = createSlice({
    name : "book",
    initialState : {
        search : ""
    },
    reducers : {
        setSearch : (state,action)=>{
            state.search = action.payload
        }
    }
})
export default BookSlice.reducer
export const {setSearch} = BookSlice.actions