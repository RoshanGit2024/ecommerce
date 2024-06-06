const orderModel=require('../models/orderModel')
const productModel=require('../models/productmodel')
const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler')

//create order - /api/v1/order
exports.createOrder=catchAsyncError(async(req,res,next)=>{
    const orderModel=require('../models/orderModel')
    const productModel=require('../models/productmodel')
    
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
  }=req.body;

  const order = await orderModel.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt:Date.now(),
    user:req.user.id
  })
       res.status(200).json({
        success:true,
        order
       })
    })

    exports.getSigleOrder = catchAsyncError(async(req,res,next)=>{
        const order = await orderModel.findById(req.params.id).populate('user','name email')
        if(!order){
          return next(new ErrorHandler(`order not found with this id:${req.params.id}`,404))
        }
        res.status(200).json({
          success:true,
          order
        })
    })
    

    exports.myOrders = catchAsyncError(async(req,res,next)=>{
      const orders = await orderModel.find({user: req.user.id})

      res.status(200).json({
        success:true,
        orders
      })
  })

  //Admin: Get All orders - api/v1/orders
   exports.orders = catchAsyncError(async(req,res,next)=>{
    const orders = await orderModel.find()

    let totalAmount = 0;
    orders.forEach(order =>{
      totalAmount += order.totalPrice
    })

    res.status(200).json({
      success:true,
      totalAmount,
      orders
    })
})

   //updating product stock
   exports.UpdateOrder = catchAsyncError(async(req,res,next)=>{
    const order = await orderModel.findById(req.params.id);

    if(order.orderStatus == 'delivered'){
       return next(new ErrorHandler('order has been already delivered',400))
    }

    //updating the product stock of each  order item
    order.orderItems.forEach(async orderItem =>{
      await updateStock(orderItem.product,orderItem.quantity)
    })

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt=Date.now()
    await order.save()

    res.status(200).json({
      success:true
    })
   })

   async function updateStock(productId,quantity){
    const product = await productModel.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave:false})
   }

   //Admin : Delete order - api/v1/order/:id

   exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await orderModel.findById(req.params.id);
    if(!order){
      return next(new ErrorHandler(`order not found with this id:${req.params.id}`,404))
    }

    await orderModel.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success:true,
    })
   })

