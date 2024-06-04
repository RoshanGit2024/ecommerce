import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false
    },
    reducers: {
        productRequest(state, action) {
            return {
                loading: true,
            }
        },
        productSuccess(state, action) {
            return {
                loading: false,
                products: action.payload.products,
                productsCount:action.payload.count,
            }
        },
        productsFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        adminProductRequest(state, action) {
            return {
                loading: true,
            }
        },
        adminProductSuccess(state, action) {
            return {
                loading: false,
                products: action.payload.products,
            }
        },
        adminProductsFail(state, action) {
            return {
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
});

const { actions, reducer } = productsSlice
export const { productRequest, 
               productSuccess, 
               productsFail,
               adminProductRequest,
               adminProductSuccess,
               adminProductsFail } = actions

export default reducer