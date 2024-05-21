const orderModel=require('../models/orderModel')
const productModel=require('../models/productmodel')

//create order - /api/v1/order
exports.createOrder=async(req,res,next)=>{
   const cartItems=req.body;
   const amount = Number(cartItems.reduce((acc,item)=>(acc+item.product.price * item.qty),0)).toFixed(2)
   const status='pending'

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
