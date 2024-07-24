import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'related',
    initialState: {
        loading: false,
        relatedProduct:{}
    },
    reducers: {
        relatedProductRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        relatedProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                relatedProduct: action.payload.relatedProducts,
            }
        },
        relatedProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = productSlice
export const {
               relatedProductFail,
               relatedProductRequest,
               relatedProductSuccess
            } = actions

export default reducer