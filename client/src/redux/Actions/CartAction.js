import { port } from "../../Utils/Util";
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
} from "../Constants/CartConstant";
import axios from "axios";

export const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_TO_CART_REQUEST });
      const res = await axios.get(`${port}/cart/getCartItems`, {
        withCredentials: true,
        credentials: "include",
      });
      if (res.status === 200) {
        const { cartItems } = res.data; // adjust this line
        console.log({ getCartItems: cartItems });

        dispatch({
          type: ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
        return cartItems;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = (product, newQty = 1) => {
  return async (dispatch, getState) => {
    let { cartItems, auth } = getState();

    // If cartItems is undefined, initialize it as an empty object
    if (!cartItems) {
      cartItems = {};
    }

    const quantity = (cartItems[product._id]?.quantity || 0) + newQty;
    cartItems[product._id] = { ...product, quantity };

    if (auth.isAuthenticated) {
      dispatch({ type: ADD_TO_CART_REQUEST });
      const payload = {
        cartItems: [{ product: product._id, quantity: newQty }],
      };
      try {
        const res = await axios.post(`${port}/cart/addToCart`, payload, {
          withCredentials: true,
          credentials: "include",
        });
        if (res.status === 201) dispatch(getCartItems());
      } catch (error) {
        console.log(error);
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    dispatch({ type: ADD_TO_CART_SUCCESS, payload: { cartItems } });
  };
};

export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REMOVE_CART_ITEM_REQUEST });
      const res = await axios.post(
        `${port}/cart/removeCartItem`,
        { payload },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (res.status === 202) {
        dispatch({ type: REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    // const { auth } = store.getState();
    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    console.log("upppppppppp");

    // if (auth.authenticate) {
    localStorage.removeItem("cart");
    //dispatch(getCartItems());
    if (cartItems) {
      //   const payload = {
      //     cartItems: Object.keys(cartItems).map((key, index) => {
      //       return {
      //         quantity: cartItems[key].qty,
      //         product: cartItems[key]._id,
      //       };
      //     }),
      //   };
      //   if (Object.keys(cartItems).length > 0) {
      //     const res = await axios.post(`${port}/cart/addToCart`, payload);
      //     if (res.status === 201) {
      //       dispatch(getCartItems());
      //     }
      //   }
      // } else {
      //   dispatch(getCartItems());
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: { cartItems } });
    }
    // } else {
    //   if (cartItems) {
    //     dispatch({
    //       type: ADD_TO_CART_SUCCESS,
    //       payload: { cartItems },
    //     });
    //   }
    // }
  };
};
