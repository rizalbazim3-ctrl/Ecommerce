import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
    name : "admin",
    initialState : {
        adminSearch : ""
    },
    reducers : {
        setAdminSearch : (state,action)=>{
            state.adminSearch = action.payload
        }
    }
})

export default AdminSlice.reducer
export const {setAdminSearch} = AdminSlice.actions