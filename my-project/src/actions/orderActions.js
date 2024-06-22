import { toast } from "react-toastify"
import { adminOrderFail,
         adminOrderRequest, 
         adminOrderSuccess, 
         cancelOrderFail, 
         cancelOrderRequest, 
         cancelOrderSuccess, 
         createOrderFail, 
         createOrderRequest, 
         createOrderSuccess, 
         deleteOrderFail, 
         deleteOrderRequest, 
         deleteOrderSuccess, 
         orderDetailFail, 
         orderDetailRequest, 
         orderDetailSuccess, 
         updateOrderFail, 
         updateOrderRequest, 
         updateOrderSuccess, 
         userOrderFail, 
         userOrderRequest, 
         userOrderSuccess 
        } from "../slices/orderSlice"
import axios from 'axios'


export const createOrder=order=>async(dispatch)=>{
    try {
       dispatch(createOrderRequest())
       const {data}= await axios.post(`${process.env.REACT_APP_API_URL}/order/new`,order)
       dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
        if(error.response && error.response.status === 400){
            toast.error("item already in cart")
          }else{
            console.error('Error adding cart item:', error);
          }
    }
}

export const userOrders=async(dispatch)=>{
    try {
       dispatch(userOrderRequest())
       const {data}= await axios.get(`${process.env.REACT_APP_API_URL}/myorders`)
       dispatch(userOrderSuccess(data))
    } catch (error) {
        dispatch(userOrderFail(error.response.data.message))
    }
}

export const orderDetail=id=>async(dispatch)=>{
    try {
       dispatch(orderDetailRequest())
       const {data}= await axios.get(`${process.env.REACT_APP_API_URL}/order/${id}`)
       dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}

export const adminOrders=async(dispatch)=>{
    try {
       dispatch(adminOrderRequest())
       const {data}= await axios.get(`${process.env.REACT_APP_API_URL}/admin/orders`)
       dispatch(adminOrderSuccess(data))
    } catch (error) {
        dispatch(adminOrderFail(error.response.data.message))
    }
}

export const deleteOrder=id=>async(dispatch)=>{
    try {
       dispatch(deleteOrderRequest())
       await axios.delete(`${process.env.REACT_APP_API_URL}/admin/order/${id}`)
       dispatch(deleteOrderSuccess())
    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message))
    }
}

export const updateOrder=(id,orderData)=>async(dispatch)=>{
    try {
       dispatch(updateOrderRequest())
       const {data} = await axios.put(`${process.env.REACT_APP_API_URL}/admin/order/${id}`,orderData)
       dispatch(updateOrderSuccess(data))
    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message ))
    }
}


export const cancelOrder=(id,reason)=>async(dispatch)=>{
    try {
       dispatch(cancelOrderRequest())
       const {data} = await axios.put(`${process.env.REACT_APP_API_URL}/order/${id}/cancel`,{reason})
       dispatch(cancelOrderSuccess(data))
    } catch (error) {
        dispatch(cancelOrderFail(error.response.data.message ))
    }
}
