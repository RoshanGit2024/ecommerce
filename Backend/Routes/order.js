const express=require('express');
const { createOrder} = require('../controllers/orderController');
const router=express.Router();
const {isAuthenticateUser}=require('../middlewares/authenticate')

router.route('/order/new').post(isAuthenticateUser, createOrder)

module.exports=router