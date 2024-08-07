const express=require('express');
const { createOrder,getSigleOrder,myOrders,orders,UpdateOrder,deleteOrder, cancelOrder, getTodayOrder} = require('../controllers/orderController');
const router=express.Router();
const {isAuthenticateUser,authorizeRoles}=require('../middlewares/authenticate')

router.route('/order/new').post(isAuthenticateUser, createOrder)
router.route('/order/:id').get(isAuthenticateUser, getSigleOrder)
router.route('/myorders').get(isAuthenticateUser, myOrders)
router.route('/order/:id/cancel').put(isAuthenticateUser, cancelOrder)
router.route('/admin/order/today').get(isAuthenticateUser,authorizeRoles('admin'), getTodayOrder)

//Admin routes
router.route('/admin/orders').get(isAuthenticateUser,authorizeRoles('admin'),orders)
router.route('/admin/order/today').get(isAuthenticateUser,authorizeRoles('admin'), getTodayOrder)
router.route('/admin/order/:id').put(isAuthenticateUser,authorizeRoles('admin'),UpdateOrder)
                          .delete(isAuthenticateUser,authorizeRoles('admin'),deleteOrder)


module.exports=router