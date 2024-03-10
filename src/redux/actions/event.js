import axios from "axios";
import { server } from "../../server";

// create event
export const createEvent = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const { d } = await axios.post(`${server}/event`, data, {
      headers: {
        "x-client-id": localStorage.getItem("x-client-id"),
        authorization: localStorage.getItem("accessToken"),
        "x-rtoken-id": localStorage.getItem("refreshToken"),
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(d);
    dispatch({
      type: "eventCreateSuccess",
      payload: d.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/event/get-all-events-shop/${id}`
    );
    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data.metadata.events,
    });

    console.log(data);
  } catch (error) {
    dispatch({
      type: "getAllEventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        headers: {
          "x-client-id": localStorage.getItem("x-client-id"),
          authorization: localStorage.getItem("accessToken"),
          "x-rtoken-id": localStorage.getItem("refreshToken"),
        },
      }
    );

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFailed",
      payload: error.response.data.message,
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAllEventsSuccess",
      payload: data.metadata.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailed",
      payload: error.response.data.message,
    });
  }
};
