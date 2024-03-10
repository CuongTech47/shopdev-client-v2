import axios from "axios";
import { server } from "../../server";

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });
    //   const config = {
    //     headers: {
    //       "x-client-id": localStorage.getItem("x-client-id"),
    //       authorization: localStorage.getItem("accessToken"),
    //       "x-rtoken-id": localStorage.getItem("refreshToken"),
    //       "Content-Type": "multipart/form-data",
    //     },
    //   };

    const { data } = await axios.post(
      `${server}/product`,
      formData,

      {
        headers: {
          "x-client-id": localStorage.getItem("x-client-id"),
          authorization: localStorage.getItem("accessToken"),
          "x-rtoken-id": localStorage.getItem("refreshToken"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("data-product:::", data);
    dispatch({
      type: "productCreateSuccess",
      payload: data.metadata.product,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};
// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
      //   {
      //     headers: {
      //       "x-client-id": localStorage.getItem("x-client-id"),
      //       authorization: localStorage.getItem("accessToken"),
      //       "x-rtoken-id": localStorage.getItem("refreshToken"),
      //     },
    );
    // console.log(data.metadata.products);
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.metadata.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        headers: {
          "x-client-id": localStorage.getItem("x-client-id"),
          authorization: localStorage.getItem("accessToken"),
          "x-rtoken-id": localStorage.getItem("refreshToken"),
        },
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.metadata.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
