import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name:'wishlist',
    initialState:{
        wishItems:[],
        loading:false,
        isWishlistUpdated:false
    },
    reducers:{
        toggleWishRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        toggleWishSuccess(state, action) {
            return {
                ...state,
                loading: false,
                wishItems: action.payload,
                isWishlistUpdated:true,
            }
        },
        toggleWishFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isWishlistUpdated:false
            }
        },
        wishlistProdRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        wishlistProdSuccess(state, action) {
            return {
                ...state,
                loading: false,
                wishItems: action.payload,
            }
        },
        wishlistProdFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state,action){
            return {
                ...state,
                error:null
            }
        }
    }
})
const{actions,reducer}=wishlistSlice;
export const{
       toggleWishFail,
       toggleWishRequest,
       toggleWishSuccess,
       wishlistProdFail,
       wishlistProdRequest,
       wishlistProdSuccess,
       clearError
} =actions;
export default reducer;