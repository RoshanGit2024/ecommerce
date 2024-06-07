import axios from 'axios';
import { adminProductRequest, adminProductSuccess, adminProductsFail, productRequest, productSuccess, productsFail } from '../slices/productsSlice';
import {  prodSingleRequest, prodSingleSuccess, prodSingleFail, createReviewRequest, createReviewSuccess, createReviewFail, newProductRequest, newProductSuccess, newProductFail, deleteProductRequest, deleteProductSuccess, deleteProductFail, updateProductRequest, updateProductSuccess, updateProductFail, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail } from "../slices/productSlice";


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
        const errorMessage = error.response && error.response.data ? error.response.data.message : 'An error occurred';
        dispatch(productsFail(errorMessage));
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

export const createReview =reviewData=> async(dispatch)=>{
  try{
    dispatch(createReviewRequest()) 
    const config={
      headers:{
        'content-type':'application/json'
      }
    }
    const {data}=await axios.put('http://localhost:8000/api/v1/review',reviewData,config);
    dispatch(createReviewSuccess(data)) 
  }catch(error){
    dispatch(createReviewFail(error.response.data.message))
  }
}

export const getAdminProducts = async (dispatch) => {
  try {
      dispatch(adminProductRequest());
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/admin/products`);
      dispatch(adminProductSuccess(data));
  } catch (error) {
      dispatch(adminProductsFail(error.response.data.message));
  }
};

export const createNewProduct =productData => async (dispatch) => {
  try {
      dispatch(newProductRequest());
      const { data } = await axios.post('http://localhost:8000/api/v1/admin/products/new',productData);
      dispatch(newProductSuccess(data));
  } catch (error) {
      dispatch(newProductFail(error.response.data.message));
  }
};

export const deleteProduct =id => async (dispatch) => {
  try {
      dispatch(deleteProductRequest());
      await axios.delete(`http://localhost:8000/api/v1/admin/products/${id}`);
      dispatch(deleteProductSuccess());
  } catch (error) {
      dispatch(deleteProductFail(error.response.data.message));
  }
};

export const updateProduct =(id,productData) => async (dispatch) => {
  try {
      dispatch(updateProductRequest());
      const { data } = await axios.put(`http://localhost:8000/api/v1/admin/products/${id}`,productData);
      dispatch(updateProductSuccess(data));
  } catch (error) {
      dispatch(updateProductFail(error.response.data.message));
  }
};

export const getReviews =id=> async (dispatch) => {
  try {
      dispatch(reviewsRequest());
      const { data } = await axios.get('http://localhost:8000/api/v1/admin/reviews',{params:{id}});
      dispatch(reviewsSuccess(data));
  } catch (error) {
      const errorMessage = error.response && error.response.data ? error.response.data.message : 'An error occurred';
      dispatch(reviewsFail(errorMessage));
  }
};

export const deleteReview =(productId,id)=> async (dispatch) => {
  try {
      dispatch(deleteReviewRequest());
      await axios.delete('http://localhost:8000/api/v1/admin/review',{params:{productId,id}});
      dispatch(deleteReviewSuccess());
  } catch (error) {
      const errorMessage = error.response && error.response.data ? error.response.data.message : 'An error occurred';
      dispatch(deleteReviewFail(errorMessage));
  }
};

