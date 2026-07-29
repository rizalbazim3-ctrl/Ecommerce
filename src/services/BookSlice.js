import { createSlice } from "@reduxjs/toolkit";

const BookSlice = createSlice({
    name : "book",
    initialState : {
        kithab : []
    },
    reducers : {
        addBook : (state,action)=>{
            state.kithab = action.payload
        }
    }
})
export default BookSlice.reducer
export const {addBook} = BookSlice.actions