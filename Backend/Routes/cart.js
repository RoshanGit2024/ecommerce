const express=require('express');
const router=express.Router();
const {isAuthenticateUser}=require('../middlewares/authenticate');
const { 
    syncCartitems, 
    getCartItems, 
    addCartItem, 
    deleteCart 
} = require('../controllers/cartController');

router.route('/sync').post(isAuthenticateUser,syncCartitems)
router.route('/:userId').get(isAuthenticateUser, getCartItems)
router.route('/addcart').post(isAuthenticateUser,addCartItem)
router.route('/cart/delete').delete(isAuthenticateUser,deleteCart)



module.exports=router