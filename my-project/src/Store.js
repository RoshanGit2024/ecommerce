import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import productsReducer from "./slices/productsSlice";
import productReducer from './slices/productSlice'
import authReducer from './slices/authSlice'


const reducer = combineReducers({
    productState:productsReducer,
    prodSingleState:productReducer,
    authState:authReducer
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk),
  });

export default store;