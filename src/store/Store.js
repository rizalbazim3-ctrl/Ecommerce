import {configureStore} from "@reduxjs/toolkit"
import bookReducer from "../services/BookSlice"
import cartReducer from "../services/cartSlice"
import adminReducer from "../services/admin/adminSlice"

export const Store = configureStore({
    reducer : {
        AllBooks : bookReducer,
        cartStates : cartReducer,
        adminFilter : adminReducer,
    }
})