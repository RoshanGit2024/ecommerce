import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product:{}
    },
    reducers: {
        prodSingleRequest(state, action) {
            return {
                loading: true,
            }
        },
        prodSingleSuccess(state, action) {
            return {
                loading: false,
                product: action.payload.product
            }
        },
        prodSingleFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = productSlice
export const { prodSingleRequest, prodSingleSuccess, prodSingleFail } = actions

export default reducer