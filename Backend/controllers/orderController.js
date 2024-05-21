const orderModel=require('../models/orderModel')
const productModel=require('../models/productmodel')
const catchAsyncError = require('../middlewares/catchAsyncError')

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
        
    })
    

   //updating product stock
   async function updateProductStock(cartItems) {
      try {
          for (const item of cartItems) {
              const product = await productModel.findById(item.product._id);
              if (product) {
                  product.stock -= item.qty;
                  await product.save();
                  console.log(`Stock updated for product ${product.name}`);
              } else {
                  console.log(`Product with ID ${item.product._id} not found`);
              }
          }
      } catch (error) {
          console.error('Error updating product stock:', error);
          throw error; // Rethrow the error to handle it higher up the call stack if needed
      }
  updateProductStock(cartItems)
    .then(() => console.log('Stock update completed'))
    .catch((error) => console.error('Stock update failed:', error));
  

   const order=await orderModel.create({cartItems,amount,status})
   res.json({
    success:true,
    order
   })
}

