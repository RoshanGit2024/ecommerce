import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import productsReducer from "./slices/productsSlice";
import productReducer from './slices/productSlice'
import carttReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'
import orderReducer from './slices/orderSlice'
import userReducer from './slices/userSlice'


const reducer = combineReducers({
    productState:productsReducer,
    prodSingleState:productReducer,
    authState:authReducer,
    cartState:carttReducer,
    orderState:orderReducer,
    userState:userReducer
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk),
  });

export default store;