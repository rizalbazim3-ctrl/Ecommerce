import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    wishlistCount : 0,
    cartcount : 0
  },

  reducers: {
    setwishlistCount: (state, action) => {
      state.wishlistCount = action.payload
    },
     setcartcount : (state,action) => {
    state.cartcount = action.payload
  }
  },
});

export const { setwishlistCount,setcartcount } = cartSlice.actions;

export default cartSlice.reducer;