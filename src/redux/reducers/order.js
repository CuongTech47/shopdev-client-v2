import { buildCreateSlice, createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder.addCase("getAllOrdersUserRequest", (state) => {
    state.isLoading = true;
  });

  builder.addCase("getAllOrdersUserSuccess", (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  });
  builder.addCase("getAllOrdersUserFailed", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });

  // get all orders of shop
  // getAllOrdersShopRequest: (state) => {
  //   state.isLoading = true;
  // },
  // getAllOrdersShopSuccess: (state, action) => {
  //   state.isLoading = false;
  //   state.orders = action.payload;
  // },
  // getAllOrdersShopFailed: (state, action) => {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // },

  builder.addCase("getAllOrdersShopRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("getAllOrdersShopSuccess", (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  });
  builder.addCase("getAllOrdersShopFailed",(state,action) => {
    state.isLoading = false;
      state.error = action.payload;
  })
});
