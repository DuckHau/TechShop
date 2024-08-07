import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  allProduct,
  productDetailReducer,
  productListReducer,
} from "./Reducers/ProductReducer";
import cartReducer from "./Reducers/CartReducer";
import {
  allUsersReducer,
  authReducer,
  userDetailsReducer,
  userReducer,
} from "./Reducers/userReducer";
import {
  categoryReducer,
  delCategoryReducer,
  detailCategoryReducer,
  newCategoryReducer,
  updateCategoryReducer,
} from "./Reducers/CategoryReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./Reducers/OrderReducer";

const reducer = combineReducers({
  allProduct,
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  auth: authReducer,
  newCategory: newCategoryReducer,
  delCategory: delCategoryReducer,
  newOrder: newOrderReducer,
  orderList: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
  myOrder: myOrdersReducer,

  // Category admin reducer
  categoryList: categoryReducer,
  updateCategory: updateCategoryReducer,
  detailsCategory: detailCategoryReducer,

  // User admin reducer
  userReducer,
  userList: allUsersReducer,
  userDetail: userDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
