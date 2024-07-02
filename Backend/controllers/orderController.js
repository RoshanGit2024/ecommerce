const orderModel = require('../models/orderModel')
const productModel = require('../models/productmodel')
const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler')
const cartModel = require('../models/cartModel');
const sendEmail = require('../utils/Email');

//create order - /api/v1/order

//updating product in cart items 

const updateCartStock = async (productId, newStockCount) =>{
  try {
    const carts = await cartModel.find({'items.product':productId}) 
    for(let cart of carts){
      cart.items.forEach(item => {
        if(item.product.toString() === productId.toString()){
          item.stock = newStockCount
        }
      })
      await cart.save()
    }
  } catch (error) {
      console.log("error occurd while updating cart stock:",error)
  }
}
exports.createOrder = catchAsyncError(async (req, res, next) => {
  const orderModel = require('../models/orderModel')
  //const productModel=require('../models/productmodel')

  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
  } = req.body;
  if (orderItems.length === 0) {
    return next(new ErrorHandler(`Order items do not exist`, 404));
  }
  for (let item of orderItems) {
    const product = await productModel.findById(item.product);

    if (product.stock < item.quantity) {
      return next(new ErrorHandler(`not enough stock available for product ${product.name}`, 400))
    }
    product.stock -= item.quantity
    await product.save({ validateBeforeSave: false })

    //updating stock in the cart
    await updateCartStock(product._id, product.stock)
  }
  
  const userId = req.user.id;
  const cart = await cartModel.findOne({ userId });

  {/*if (!cart || cart.items.length === 0) {
    return next(new ErrorHandler(`order items not exist`, 404))
  }*/}

  const order = await orderModel.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id
  })
  let mail = req.user.email
  const message =  `Your order has been confirmed, please check your order id follows to track your order\n\n
        order Id:${order._id}`
  try{
    sendEmail({
     email:mail,
     subject:"Order completed",
     message
    })

    res.status(200).json({
     success:true,
     message:`Email sent to ${mail}`
    })
  }catch(error){
     return next(new ErrorHandler(error.message),500)
  } 
  await cartModel.updateOne({ userId }, { $set: { items: [] } })
  res.status(200).json({
    success: true,
    order,
  })
})

exports.getSigleOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id).populate('user', 'name email')
  if (!order) {
    return next(new ErrorHandler(`order not found with this id:${req.params.id}`, 404))
  }
  res.status(200).json({
    success: true,
    order
  })
})


exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user.id })

  res.status(200).json({
    success: true,
    orders
  })
})

//Admin: Get All orders - api/v1/orders
exports.orders = catchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find()

  let totalAmount = 0;
  orders.forEach(order => {
    totalAmount += order.totalPrice
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders
  })
})

//updating product stock
exports.UpdateOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (order.orderStatus == 'delivered') {
    return next(new ErrorHandler('order has been already delivered', 400))
  }

  //updating the product stock of each  order item
  order.orderItems.forEach(async orderItem => {
    await updateStock(orderItem.product, orderItem.quantity)
  })

  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now()
  await order.save()

  res.status(200).json({
    success: true
  })
})

async function updateStock(productId, quantity) {
  const product = await productModel.findById(productId);
  product.stock -= quantity;
  product.save({ validateBeforeSave: false })
}

//Admin : Delete order - api/v1/order/:id

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler(`order not found with this id:${req.params.id}`, 404))
  }

  for (let item of order.orderItems) {
    const product = await productModel.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      await product.save()
    }
  }

  await orderModel.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
  })
})

//cancel order -api/v1/order/:id/cancel 

exports.cancelOrder = catchAsyncError(async (req, res, next) => {
  const { reason } = req.body;
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler(`order not found with this id:${req.params.id}`, 404))
  }
  if (['delivered', 'shipped'].includes(order.orderStatus.toLowerCase())) {
    return next(new ErrorHandler('Cannot cancel a delivered or shipped order', 400))
  }

  //updating stock

  for (let item of order.orderItems) {
    const product = await productModel.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      await product.save()
    }
  }
  order.status.push({ userStatus: 'canceled', reason })
  await order.save();

  res.status(200).json({
    success: true,
    order
  })
})
