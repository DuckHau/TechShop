import {
  NEW_CATRGORY_REQUEST,
  NEW_CATRGORY_SUCCESS,
  NEW_CATRGORY_RESET,
  NEW_CATRGORY_FAIL,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_RESET,
  CLEAR_ERRORS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_RESET,
  DETAIL_CATEGORY_RESET,
  DETAIL_CATEGORY_FAIL,
  DETAIL_CATEGORY_SUCCESS,
  DETAIL_CATEGORY_REQUEST
} from '../Constants/CategoryConstants'

const initialState = {
  categoryList: [],
  loading: false,
  isDeleted: false,
  error: null
}
export const newCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case NEW_CATRGORY_REQUEST:
      return {
        ...state,
        loading: true
      }

    case NEW_CATRGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        category: action.payload.category
      }

    case NEW_CATRGORY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case NEW_CATRGORY_RESET:
      return {
        ...state,
        success: false
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

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: action.payload.categoryList
      }

    case ALL_CATEGORY_FAIL:
      return {
        loading: false,
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

export const delCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      }

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload
      }

    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_CATEGORY_RESET:
      return {
        ...state,
        isDeleted: false
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

// DEtail Category Admin
export const detailCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DETAIL_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      }

    case DETAIL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload.category
      }

    case DETAIL_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DETAIL_CATEGORY_RESET:
      return {
        ...state,
        isDeleted: false
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

export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      }

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryList: action.payload.categoryList,
        isDeleted: action.payload
      }

    case UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_CATEGORY_RESET:
      return {
        ...state,
        isDeleted: false
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
