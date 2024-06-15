import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name:'wishlist',
    initialState:{
        items:localStorage.getItem('wishlistItems') ? JSON.parse(localStorage.getItem('wishlistItems')):[],
        loading:false,
    },
    reducers:{
        addWishlistRequest(state,action){
            state.loading = true;
        },
        toggleWishlistItem(state,action){
            const item = action.payload;
            const itemIndex = state.items.findIndex(i => i.product === item.product && i.userId === item.userId)

            if(itemIndex !== -1){
                state.items = state.items.filter(i => !(i.product === item.product && i.userId === item.userId))
            }else{
                state.items.push(item)
            }
            localStorage.setItem('wishlistItems',JSON.stringify(state.items))        
            state.loading=false;
        },
        removeWishlist(state,action){
            const filteredItems = state.items.filter(item => item.product !== action.payload);
            localStorage.setItem('wishlistItems',JSON.stringify(filteredItems));
            state.items = filteredItems;
        }
    }
})
const{actions,reducer}=wishlistSlice;
export const{
       addWishlistRequest,
       toggleWishlistItem,
       removeWishlist
} =actions;
export default reducer;