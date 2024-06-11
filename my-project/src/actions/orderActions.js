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
         userOrderSuccess } from "../slices/orderSlice"
import axios from 'axios'


export const createOrder=order=>async(dispatch)=>{
    try {
       dispatch(createOrderRequest())
       const {data}= await axios.post('http://localhost:8000/api/v1/order/new',order)
       dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}

export const userOrders=async(dispatch)=>{
    try {
       dispatch(userOrderRequest())
       const {data}= await axios.get('http://localhost:8000/api/v1/myorders')
       dispatch(userOrderSuccess(data))
    } catch (error) {
        dispatch(userOrderFail(error.response.data.message))
    }
}

export const orderDetail=id=>async(dispatch)=>{
    try {
       dispatch(orderDetailRequest())
       const {data}= await axios.get(`http://localhost:8000/api/v1/order/${id}`)
       dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}

export const adminOrders=async(dispatch)=>{
    try {
       dispatch(adminOrderRequest())
       const {data}= await axios.get('http://localhost:8000/api/v1/admin/orders')
       dispatch(adminOrderSuccess(data))
    } catch (error) {
        dispatch(adminOrderFail(error.response.data.message))
    }
}

export const deleteOrder=id=>async(dispatch)=>{
    try {
       dispatch(deleteOrderRequest())
       await axios.delete(`http://localhost:8000/api/v1/admin/order/${id}`)
       dispatch(deleteOrderSuccess())
    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message))
    }
}

export const updateOrder=(id,orderData)=>async(dispatch)=>{
    try {
       dispatch(updateOrderRequest())
       const {data} = await axios.put(`http://localhost:8000/api/v1/admin/order/${id}`,orderData)
       dispatch(updateOrderSuccess(data))
    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message ))
    }
}


export const cancelOrder=(id,reason)=>async(dispatch)=>{
    try {
       dispatch(cancelOrderRequest())
       const {data} = await axios.put(`http://localhost:8000/api/v1/order/${id}/cancel`,{reason})
       dispatch(cancelOrderSuccess(data))
    } catch (error) {
        dispatch(cancelOrderFail(error.response.data.message ))
    }
}
