import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder.addCase("productCreateRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("productCreateSuccess", (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
    // state.products.push(action.payload);
  });
  builder.addCase("productCreateFail", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  });
  builder.addCase("clearErrors", (state) => {
    state.error = null;
  });

  // get all products of shop
  builder.addCase("getAllProductsShopRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("getAllProductsShopSuccess", (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  });
  builder.addCase("getAllProductsShopFailed", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });

  // delete product of a shop
  builder.addCase("deleteProductRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("deleteProductSuccess", (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
    
  });
  builder.addCase("deleteProductFailed", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });


  // get all products
  builder.addCase("getAllProductsRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("getAllProductsSuccess", (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  });
  builder.addCase("getAllProductsFailed", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
});
