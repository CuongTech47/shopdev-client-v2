import axios from "axios";
import { server } from "../../server";
// load User

export const loadUser = () => async (dispatch) => {
  try {
    dispatch: ({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/load-user`, {
      headers: {
        "x-client-id": localStorage.getItem("x-client-id"),
        authorization: localStorage.getItem("accessToken"),
        "x-rtoken-id": localStorage.getItem("refreshToken"),
      },
    });
    console.log("data:::", data);
    dispatch({
      type: "LoadUserSuccess",
      payload: data.metadata.user,
    });
  } catch (error) {
    // console.log(error.response.data.message);
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// load Shop Seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch: ({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/load-shop`, {
      headers: {
        "x-client-id": localStorage.getItem("x-client-id"),
        authorization: localStorage.getItem("accessToken"),
        "x-rtoken-id": localStorage.getItem("refreshToken"),
      },
    });
    console.log("data-shop:::", data);
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.metadata.shop,
    });
  } catch (error) {
    // console.log(error.response.data.message);
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};

// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          headers: {
            // "Access-Control-Allow-Credentials": true,
            "x-client-id": localStorage.getItem("x-client-id"),
            authorization: localStorage.getItem("accessToken"),
            "x-rtoken-id": localStorage.getItem("refreshToken"),
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.metadata.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

// update user address
export const updatUserAddress =
  (province, district, ward, address1, addressType) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          province,
          district,
          ward,
          address1,
          addressType,
        },
        {
          headers: {
            "x-client-id": localStorage.getItem("x-client-id"),
            authorization: localStorage.getItem("accessToken"),
            "x-rtoken-id": localStorage.getItem("refreshToken"),
          },
        }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User address updated succesfully!",
          user: data.metadata.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      {
        headers: {
          "x-client-id": localStorage.getItem("x-client-id"),
          authorization: localStorage.getItem("accessToken"),
          "x-rtoken-id": localStorage.getItem("refreshToken"),
        },
      }
    );
    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data.metadata.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};
