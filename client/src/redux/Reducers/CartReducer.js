import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  RESET_CART
} from '../Constants/CartConstant'

const initState = {
  cartItems: [],
  updatingCart: false,
  error: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      state = {
        ...state,
        updatingCart: true
      }
      break
    case ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false
      }
      break
    case ADD_TO_CART_FAILURE:
      state = {
        ...state,
        updatingCart: false,
        error: action.payload.error
      }
      break
    case RESET_CART:
      state = {
        ...initState
      }
  }
  return state
}
