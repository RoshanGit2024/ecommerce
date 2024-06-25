import {  addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice"
import axios from "axios"

export const addcartItems = (userId,id,quantity)=>async(dispatch)=>{
    try{
        dispatch(addCartItemRequest)
        const{data} = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`)
        dispatch(addCartItemSuccess({
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].image,
            stock: data.product.stock,
            quantity,
            userId
        }))
    }catch(error){
    }
}



