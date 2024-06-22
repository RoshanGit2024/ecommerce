import { toast } from "react-toastify"
import {  setLoading, setCartItems } from "../slices/myCartSlice"
import axios from "axios"

export const syncCartItems = (userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const localCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (localCartItems) {
            await axios.post(`${process.env.REACT_APP_API_URL}/sync`, { userId, items: localCartItems });
            localStorage.removeItem('cartItems');
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/${userId}`);
        dispatch(setCartItems(data.items));
    } catch (error) {
        console.error('Error syncing cart items:', error);
    } finally {
        dispatch(setLoading(false));
    }
};

{/*export const addToCartDatabase = (userId, item) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const{data} = await axios.post(`${process.env.REACT_APP_API_URL}/addcart`, { userId, item });
        dispatch(addCartDatabase(data));
        } catch (error) {
          if(error.response && error.response.status === 400){
            toast.error("item already in cart")
          }else{
            console.error('Error adding cart item:', error);
          }
        } finally {
            dispatch(setLoading(false));
        }
    }; */}

export const getCartItems =(userId)=> async(dispatch) =>{
    try{
        dispatch(setLoading(true))
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/${userId}`)
        dispatch(setCartItems(data.items))
        console.log(data.items)
    }catch(error){
        console.log("Error while fetching cart",error)
    }finally{
        dispatch(setLoading(false))
    }
}
