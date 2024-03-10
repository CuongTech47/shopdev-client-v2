import axios from "axios";
import { server } from "../../server";

// get all orders of user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersUserRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-all-orders-of-user/${userId}`,
      {
        headers: {
          "x-client-id": localStorage.getItem("x-client-id"),
          authorization: localStorage.getItem("accessToken"),
          "x-rtoken-id": localStorage.getItem("refreshToken"),
        },
      }
    );

    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data.metadata.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersUserFailed",
      payload: error.response.data.message,
    });
  }
};

// get all orders of seller
export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersShopRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-all-orders-of-shop/${shopId}`,
      {
        headers: {
          "x-client-id": localStorage.getItem("x-client-id"),
          authorization: localStorage.getItem("accessToken"),
          "x-rtoken-id": localStorage.getItem("refreshToken"),
        },
      }
    );

    dispatch({
      type: "getAllOrdersShopSuccess",
      payload: data.metadata.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersShopFailed",
      payload: error.response.data.message,
    });
  }
};
