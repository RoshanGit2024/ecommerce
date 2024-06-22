//cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios"


const initialState = {
    items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    loading: false,
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    error:null
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
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setCartItems(state, action) {
            state.items = action.payload;
        },
        increaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if(item.product == action.payload) {
                    item.quantity = item.quantity + 1
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items));

        },
        decreaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if(item.product == action.payload) {
                    item.quantity = item.quantity - 1
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items));

        }
    }
});

const { actions, reducer } = myCartSlice
export const { 
               addToCart,
               setLoading,
               setCartItems,
               increaseCartItemQty,
               decreaseCartItemQty
            } = actions

            export const addToCartDatabase = (userId, item) => async (dispatch) => {
                try {
                    dispatch(setLoading(true));
                    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/addcart`, { userId, item });
                    dispatch(addToCart(item)); // Update Redux state with the new item
                } catch (error) {
                    if (error.response && error.response.status === 400) {
                        toast.error("Item already exists in the cart");
                    } else {
                        console.error('Error adding cart item:', error);
                        toast.error("Error adding item to cart");
                    }
                } finally {
                    dispatch(setLoading(false));
                }
            };

export default reducer