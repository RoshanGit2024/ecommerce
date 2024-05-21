const express=require('express');
const { createOrder,getSigleOrder,myOrders,orders,UpdateOrder} = require('../controllers/orderController');
const router=express.Router();
const {isAuthenticateUser,authorizeRoles}=require('../middlewares/authenticate')

router.route('/order/new').post(isAuthenticateUser, createOrder)
router.route('/order/:id').get(isAuthenticateUser, getSigleOrder)
router.route('/myorders').get(isAuthenticateUser, myOrders)

//Admin routes
router.route('/orders').get(isAuthenticateUser,authorizeRoles('admin'),orders)
router.route('/order/:id').put(isAuthenticateUser,authorizeRoles('admin'),UpdateOrder)


module.exports=router