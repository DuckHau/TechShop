import axios from "axios";

import {
  NEW_CATRGORY_REQUEST,
  NEW_CATRGORY_SUCCESS,
  NEW_CATRGORY_FAIL,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  CLEAR_ERRORS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DETAIL_CATEGORY_REQUEST,
  DETAIL_CATEGORY_SUCCESS,
  DETAIL_CATEGORY_FAIL,
} from "../Constants/CategoryConstants";
import { port } from "../../Utils/Util";

export const newCategory = (formData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATRGORY_REQUEST });

    const { data } = await axios.post(
      `${port}/category/create-category`,
      formData
    );
    dispatch({
      type: NEW_CATRGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CATRGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCategory = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORY_REQUEST });

    const { data } = await axios.get(`${port}/category`);

    dispatch({
      type: ALL_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORY_FAIL,
      payload: error.error,
    });
  }
};

// Delete CATEGORY (Admin)
export const delCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const { data } = await axios.delete(`${port}/category/${id}`);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCategory = (_id, category) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const { data } = await axios.patch(`${port}/category/${_id}`, category, {
      withCredentials: true,
      credentials: "include",
    });

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const detailCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_CATEGORY_REQUEST });

    const { data } = await axios.get(`${port}/category/${id}`, {
      withCredentials: true,
      credentials: "include",
    });

    dispatch({
      type: DETAIL_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
