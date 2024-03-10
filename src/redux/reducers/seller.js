import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  // isSeller: false,
  isLoading: true,
  // isAuthenticated: false,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder.addCase("LoadSellerRequest", (state) => {
    state.isLoading = true;
  });

  builder.addCase("LoadSellerSuccess", (state, action) => {
    state.isSeller = true;
    state.isLoading = false;
    state.seller = action.payload;
  });

  builder.addCase("LoadSellerFail", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSeller = false;
  });

  builder.addCase("clearErrors", (state) => {
    state.error = null;
  });
});
