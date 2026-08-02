import {configureStore} from "@reduxjs/toolkit"
import bookReducer from "../services/BookSlice"
import cartReducer from "../services/cartSlice"

export const Store = configureStore({
    reducer : {
        AllBooks : bookReducer,
        cartStates : cartReducer,
    }
})