import { addWishlistRequest, toggleWishlistItem } from "../slices/wishSlice"
import axios from "axios"

export const addWishlist = (userId,id)=>async(dispatch)=>{
    try{
        dispatch(addWishlistRequest())
        const{data} = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`)
        dispatch(toggleWishlistItem({
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].image,
            stock: data.product.stock,
            userId
        }))
    }catch(error){
    }
}