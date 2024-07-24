import axios from 'axios'
import { toggleWishFail, toggleWishRequest, toggleWishSuccess, wishlistProdFail, wishlistProdRequest, wishlistProdSuccess } from '../slices/wishSlice';

export const addWishlist =(userId,productId) => async (dispatch) => {
    try {
        dispatch(toggleWishRequest());
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/togglewish`,{userId,productId});
        dispatch(toggleWishSuccess(data.wishes));
    } catch (error) {
        dispatch(toggleWishFail(error.response.data.message));
    }
  };

  export const getWishlist =userId => async (dispatch) => {
    try {
        dispatch(wishlistProdRequest());
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/wishlist/${userId}`);
        dispatch(wishlistProdSuccess(data.wishprods));
    } catch (error) {
        dispatch(wishlistProdFail(error.response.data.message));
    }
  };