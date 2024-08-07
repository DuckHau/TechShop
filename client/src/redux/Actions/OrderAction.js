import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
} from "../Constants/OrderConstant";
import store from "../store";
import { port } from "../../Utils/Util";

export const createOrder = (cartItems, totalPrice) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const { auth } = store.getState();
    if (auth.isAuthenticated) {
      const { data } = await axios.post(
        `${port}/order/add-order`,
        {
          totalPrice: totalPrice,
          items: cartItems,
          paymentStatus: "pending",
          paymentType: "COD",
          orderStatus: "ordered",
          // address: address, // Add address
          // phone: phone, // Add phone
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message,
    });
  }
};

// export const createOrderVNPAY = (cartItems, totalPrice) => async (dispatch) => {
//   try {
//     dispatch({
//       type: CREATE_ORDER_REQUEST,
//     });

//     const { auth } = store.getState();
//     if (auth.isAuthenticated) {
//       const { data } = await axios.post(
//         `${port}/order/create_payment_url`,
//         {
//           totalPrice: totalPrice,
//           items: cartItems,
//           paymentStatus: "pending",
//           paymentType: "VNPAY PAYMENT",
//           orderStatus: "ordered",
//         },
//         {
//           withCredentials: true,
//           credentials: "include",
//         }
//       );
//       dispatch({
//         type: CREATE_ORDER_SUCCESS,
//         payload: data,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: CREATE_ORDER_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_ORDERS_REQUEST,
    });

    const { data } = await axios.get(`${port}/order/admin/get-orders`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchDetailsOrders = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`${port}/order/get-order/${id}`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ORDER_REQUEST,
    });

    const { data } = await axios.put(
      `${port}/order/admin/${id}`,
      {
        status,
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ORDER_REQUEST,
    });

    const { data } = await axios.delete(`${port}/order/admin/${id}`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const MyOrderAction = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_ORDERS_REQUEST,
    });

    const { data } = await axios.get(`${port}/order/me/order`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
