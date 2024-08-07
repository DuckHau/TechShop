import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../Constants/ProductConstant";
import { port } from "../../Utils/Util";

const listProduct =
  (keyword = "", currentPage = 1, resPerPage = 12, price, category, sort) =>
  async (dispatch) => {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });

    const queryParams = new URLSearchParams({
      resPerPage,
      page: currentPage,
      ...(keyword && { keyword }),
      ...(category && { category }),
      ...(price && { price }),
      ...((sort === "price" && { sort: "price" }) ||
        (sort === "-price" && { sort: "-price" })),
    });
    const url = `/product?${queryParams.toString()}`;
    try {
      const { data } = await axios.get(port + url);

      dispatch({
        type: "PRODUCT_LIST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PRODUCT_LIST_FAIL",
        payload: error.response?.data.message || error.message,
      });
    }
  };

const detailProduct = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      port + `/product/${encodeURIComponent(slug)}`
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const { data } = await axios.get(`${port}/product/admin`, {
      withCredentials: true,
      credentials: "include",
    });

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.data.data,
    });
  }
};

const updateProduct = (slug, product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const { data } = await axios.put(port + `/product/${slug}`, product, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const { data } = await axios.post(port + "/product", product, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const data = await axios.delete(`${port}/product/${id}`);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.data,
    });
  }
};
export { listProduct, detailProduct, updateProduct, createProduct };
