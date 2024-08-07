import { CLEAR_ERRORS } from '../Constants/OrderConstant'
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
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS
} from '../Constants/ProductConstant'

const initialState = {
  products: [],
  loading: false,
  error: null
}

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
    case ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_LIST_SUCCESS:
    case ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
        filteredProductsCount: action.payload.filteredProductsCount
      }
    case PRODUCT_LIST_FAIL:
    case ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const allProduct = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data
      }

    case ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data
      }
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const newProduct = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload
      }
    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true
      }

    case PRODUCT_UPDATE_SUCCESS:
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload
      }
    case PRODUCT_UPDATE_FAIL:
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}
