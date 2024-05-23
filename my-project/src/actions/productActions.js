import axios from 'axios';
import { productRequest, productSuccess, productsFail } from '../slices/productsSlice';
import {  prodSingleRequest, prodSingleSuccess, prodSingleFail } from "../slices/productSlice";


export const getProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch(productRequest());
        let url = `${process.env.REACT_APP_API_URL}/products`;
        if (keyword) {
            url += `?keyword=${keyword}`;
        }
        const { data } = await axios.get(url);
        dispatch(productSuccess(data));
    } catch (error) {
        dispatch(productsFail(error.response.data.message));
    }
};

export const getProduct =id=> async(dispatch)=>{
  try{
    dispatch(prodSingleRequest()) 
    const {data}=await axios.get(process.env.REACT_APP_API_URL + '/products/'+id);
    dispatch(prodSingleSuccess(data)) 
  }catch(error){
    dispatch(prodSingleFail(error.message))
  }
}

