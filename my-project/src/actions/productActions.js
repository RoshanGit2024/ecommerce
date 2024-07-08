import axios from 'axios';
import { adminProductRequest, 
         adminProductSuccess, 
         adminProductsFail, 
         productRequest, 
         productSuccess, 
         productsFail 
        } from '../slices/productsSlice';
import {  prodSingleRequest, 
          prodSingleSuccess, 
          prodSingleFail, 
          createReviewRequest, 
          createReviewSuccess, 
          createReviewFail, 
          newProductRequest, 
          newProductSuccess, 
          newProductFail, 
          deleteProductRequest, 
          deleteProductSuccess, 
          deleteProductFail, 
          updateProductRequest, 
          updateProductSuccess, 
          updateProductFail, 
          reviewsRequest, 
          reviewsSuccess, 
          reviewsFail, 
          deleteReviewRequest, 
          deleteReviewSuccess, 
          deleteReviewFail, 
          relatedProductRequest,
          relatedProductSuccess,
          relatedProductFail,
          changeReviewSubmit
        } from "../slices/productSlice";


export const getProducts = (keyword,price,category,rating,currentPage) => async (dispatch) => {
    try {
        dispatch(productRequest());
        let link = `${process.env.REACT_APP_API_URL}/products?page=${currentPage}`;
        let srchLink = `${process.env.REACT_APP_API_URL}/products`;
        if (keyword) {
           link=`${process.env.REACT_APP_API_URL}/products?keyword=${keyword}`;
        }
        if (price) {
          link += `&price[gte]=${price[0]}&&price[lte]=${price[1]}`;
        }
        if (category) {
          link += `&category=${category}`;
        }
        if (rating) {
          link += `&ratings=${rating}`;
        }
        const { data } = await axios.get(link);
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
    dispatch(prodSingleFail(error.response && error.response.data.message
      ? error.response.data.message
      : error.message))
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
    const {data}=await axios.put(`${process.env.REACT_APP_API_URL}/review`,reviewData,config);
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
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/admin/products/new`,productData);
      dispatch(newProductSuccess(data));
  } catch (error) {
      dispatch(newProductFail(error.response.data.message));
  }
};

export const deleteProduct =id => async (dispatch) => {
  try {
      dispatch(deleteProductRequest());
      await axios.delete(`${process.env.REACT_APP_API_URL}/admin/products/${id}`);
      dispatch(deleteProductSuccess());
  } catch (error) {
      dispatch(deleteProductFail(error.response.data.message));
  }
};

export const updateProduct =(id,productData) => async (dispatch) => {
  try {
      dispatch(updateProductRequest());
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/admin/products/${id}`,productData);
      dispatch(updateProductSuccess(data));
  } catch (error) {
      dispatch(updateProductFail(error.response.data.message));
  }
};

export const getReviews =id=> async (dispatch) => {
  try {
      dispatch(reviewsRequest());
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/admin/reviews`,{params:{id}});
      dispatch(reviewsSuccess(data));
  } catch (error) {
      const errorMessage = error.response && error.response.data ? error.response.data.message : 'An error occurred';
      dispatch(reviewsFail(errorMessage));
  }
};

export const deleteReview =(productId,id)=> async (dispatch) => {
  try {
      dispatch(deleteReviewRequest());
      await axios.delete(`${process.env.REACT_APP_API_URL}/admin/review`,{params:{productId,id}});
      dispatch(deleteReviewSuccess());
  } catch (error) {
      const errorMessage = error.response && error.response.data ? error.response.data.message : 'An error occurred';
      dispatch(deleteReviewFail(errorMessage));
  }
};

export const relatedProducts =id=> async(dispatch)=>{
  try{
    dispatch(relatedProductRequest()) 
    const {data}=await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}/related`);
    dispatch(relatedProductSuccess(data)) 
  }catch(error){
    dispatch(relatedProductFail(error.response && error.response.data.message
      ? error.response.data.message
      : error.message))
  }
}
