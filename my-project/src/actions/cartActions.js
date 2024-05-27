import axios from "axios"
import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice"
import { toast } from "react-toastify"

export const addcartItems = (id,quantity)=>async(dispatch)=>{
    try{
        dispatch(addCartItemRequest)
        const{data} = await axios.get(`http://localhost:8000/api/v1/products/${id}`)
        dispatch(addCartItemSuccess({
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].image,
            price:data.product.price,
            stock: data.product.stock,
            quantity
        }))
        toast.success("your cart items added successfully..")
    }catch(error){
        
    }
}