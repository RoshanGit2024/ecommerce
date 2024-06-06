const express=require('express');
const { createOrder,getSigleOrder,myOrders,orders,UpdateOrder,deleteOrder} = require('../controllers/orderController');
const router=express.Router();
const {isAuthenticateUser,authorizeRoles}=require('../middlewares/authenticate')

router.route('/order/new').post(isAuthenticateUser, createOrder)
router.route('/order/:id').get(isAuthenticateUser, getSigleOrder)
router.route('/myorders').get(isAuthenticateUser, myOrders)

//Admin routes
router.route('/admin/orders').get(isAuthenticateUser,authorizeRoles('admin'),orders)
router.route('/admin/order/:id').put(isAuthenticateUser,authorizeRoles('admin'),UpdateOrder)
                          .delete(isAuthenticateUser,authorizeRoles('admin'),deleteOrder)


module.exports=router