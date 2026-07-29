import {configureStore} from "@reduxjs/toolkit"
import bookReducer from "../services/BookSlice"

export const Store = configureStore({
    reducer : {
        AllBooks : bookReducer,
    }
})