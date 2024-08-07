import axios from "axios";
import Cookies from "js-cookie";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  NEW_USER_REQUEST,
  NEW_USER_SUCCESS,
  NEW_USER_FAIL,
} from "../Constants/UserConstant";

import { RESET_CART } from "../Constants/CartConstant";
import { port } from "../../Utils/Util";
import { getCartItems } from "./CartAction";

// new update signup action
export const signup = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      const res = await axios.post(`${port}/user/signup`, user);
      if (res.status === 201) {
        dispatch({ type: REGISTER_USER_SUCCESS });
        const { token, user } = res.data;
        Cookies.set("token", token);
        Cookies.set("user", JSON.stringify(user));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        const { error } = res.data.message;
        dispatch({ type: REGISTER_USER_FAIL, payload: { error } });
      }
    } catch (error) {
      const { data } = error.response.data.message;
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: { error: data },
      });
      console.log(error.response.data.message);
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const res = await axios.post(
        `${port}/user/login`,
        {
          email,
          password,
        },
        { credentials: "include" }
      );

      if (res.status === 200) {
        const { token, user } = res.data;
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
        Cookies.set("token", token);
        Cookies.set("user", JSON.stringify(user));
        dispatch(getCartItems());
      }
    } catch (e) {
      dispatch({
        type: LOGIN_FAIL,
        payload: { error: e.response.data.message },
      });
      console.log(e.response.data.message);
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    if (token) {
      dispatch({ type: LOAD_USER_REQUEST });
      try {
        const { data } = await axios.get(`${port}/user/me`, {
          withCredentials: true,
        });
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: {
            token,
            user: data.user,
          },
        });
        dispatch(getCartItems());
      } catch (error) {
        console.log(error);
        dispatch({
          type: LOAD_USER_FAIL,
          payload: { error: error.response.data.error },
        });
      }
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGOUT_REQUEST });
      const res = await axios.get(
        `${port}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: { error: res.data.message },
        });
        Cookies.remove("token");
        Cookies.remove("user");
        dispatch({ type: RESET_CART });
      }

      // const res = await axios.post(`/admin/signout`);
      // if(res.status === 200){
    } catch (e) {
      dispatch({
        type: LOGOUT_FAIL,
        payload: { error: e.message },
      });
    }
  };
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await axios.delete(`${port}/user/admin/user/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const listUser = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`${port}/user/admin/users`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.data,
    });
  }
};

export const detailUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(port + `/user/admin/user/${id}`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const { data } = await axios.put(port + `/user/admin/user/${id}`, user, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: NEW_USER_REQUEST });
    const data = await axios.post(port + "/user/admin/create-user", user, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: NEW_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
