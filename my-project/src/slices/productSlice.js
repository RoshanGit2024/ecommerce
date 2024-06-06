import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product:{},
        isReviewSubmited:false,
        isProductCreated:false,
        isProductDeleted:false,
        isProductUpdated:false
    },
    reducers: {
        prodSingleRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        prodSingleSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        prodSingleFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        createReviewRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        createReviewSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReviewSubmited:true
            }
        },
        createReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state,action){
           return{
             ...state,
             error:null
           }
        },
        clearReviewSubmited(state,action){
           return{
             ...state,
             isReviewSubmited:false
           }
        }
        ,
        clearProduct(state,action){
           return{
             ...state,
             product:{}
           }
        },
        newProductRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        newProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated:true
            }
        },
        newProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductCreated:false
            }
        },
        clearProductCreated(state,action){
            return{
                ...state,
                isProductCreated:false
            }
        },
        deleteProductRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        deleteProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isProductDeleted:true
            }
        },
        deleteProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearProductDeleted(state,action){
            return{
                ...state,
                isProductDeleted:false
            }
        },
        updateProductRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        updateProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated:true
            }
        },
        updateProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearProductUpdated(state,action){
            return{
                ...state,
                isProductUpdated:false
            }
        }
    }
});

const { actions, reducer } = productSlice
export const { prodSingleRequest,
               prodSingleSuccess, 
               prodSingleFail ,
               createReviewFail,
               createReviewRequest,
               createReviewSuccess,
               clearError,
               clearReviewSubmited,
               clearProduct,
               newProductFail,
               newProductRequest,
               newProductSuccess,
               clearProductCreated,
               deleteProductFail,
               deleteProductRequest,
               deleteProductSuccess,
               clearProductDeleted,
               updateProductFail,
               updateProductRequest,
               updateProductSuccess,
               clearProductUpdated} = actions

export default reducer