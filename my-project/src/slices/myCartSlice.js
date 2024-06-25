//cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios"


const initialState = {
    items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    loading: false,
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    isCartDeleted:false,
    error: null
}
const myCartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(x => x.id == item.product);
            if (existingItem) {
                toast.error("item exist")
            } else {
                state.items.push(item);
                toast.success("item added successfully")
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        addCartToData(state,action){
            state.items = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setCartItems(state, action) {
            state.items = action.payload;
        },
        deleteCartItemSuccess(state, action) {
            state.items = state.items.filter(item => item.product !== action.payload);
            state.isCartDeleted = true
        },
        setError(state, action) {
            state.error=action.payload;
            state.isCartDeleted = false
        },
        increaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if (item.product == action.payload) {
                    item.quantity = item.quantity + 1
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items));

        },
        decreaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if (item.product == action.payload) {
                    item.quantity = item.quantity - 1
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items));

        },
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item => {
                return item.product !== action.payload
            })
            localStorage.setItem('cartItems', JSON.stringify(filterItems));
            return {
                ...state,
                items: filterItems
            }
        },
        clearCartDeleted(state,action){
            state.isCartDeleted = false;
        },
        clearError(state,action){
            state.error = null
        }
    }
})

const { actions, reducer } = myCartSlice
export const {
    addToCart,
    setLoading,
    setCartItems,
    increaseCartItemQty,
    decreaseCartItemQty,
    deleteCartItemSuccess,
    setError,
    addCartToData,
    removeItemFromCart,
    clearCartDeleted,
    clearError
} = actions

export default reducer