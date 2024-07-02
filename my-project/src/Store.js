import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import productsReducer from "./slices/productsSlice";
import productReducer from './slices/productSlice'
import myCartReducer from './slices/myCartSlice'
import authReducer from './slices/authSlice'
import orderReducer from './slices/orderSlice'
import userReducer from './slices/userSlice'
import wishlistReducer from './slices/wishSlice'


const reducer = combineReducers({
    productState:productsReducer,
    prodSingleState:productReducer,
    authState:authReducer,
    myCartState:myCartReducer,
    orderState:orderReducer,
    userState:userReducer,
    wishState:wishlistReducer
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk),
  });

export default store;