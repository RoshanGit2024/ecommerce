const express=require('express');
const router=express.Router();
const {isAuthenticateUser,authorizeRoles}=require('../middlewares/authenticate');
const { syncCartitems, getCartItems, addCartItem } = require('../controllers/cartController');

router.route('/sync').post(isAuthenticateUser,syncCartitems)
router.route('/:userId').get(isAuthenticateUser, getCartItems)
router.route('/addcart').post(isAuthenticateUser,addCartItem)


module.exports=router