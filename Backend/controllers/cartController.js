const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const cartModel = require('../models/cartModel')

exports.syncCartitems=catchAsyncError(async(req,res,next)=>{
    const {userId, items} = req.body;
    let cart = await cartModel.findOne({userId})
    if(!cart){
        cart = await cartModel.create({ userId, items });
    } else {
        if(!cart.items){
            cart.items = []
        }
        items.forEach(newItem => {
            const existingItem = cart.items.find(item => item.product.toString() === newItem.product)
            if(!existingItem){
                cart.items.push(newItem)
            }
        });
    }
        await cart.save()
        res.status(200).json({ message: 'Cart synced successfully' });
 })
 
 //adding cart items
 exports.addCartItem = catchAsyncError(async (req, res,next) => {
    const { userId, item } = req.body;
        const cart = await cartModel.findOne({ userId })
        if (cart) {
            const existingItem = cart.items.find(x => x.product.toString() === item.product);
            if (existingItem) {
                return next(new ErrorHandler(`item already exist in cart`,400))
            } else {
                cart.items.push(item);
                await cart.save();
            }
        } else {
            await cartModel.create({ userId, items: [item] });
        }
        res.status(200).json({ 
            success:true,
            items: cart.items  
        });
})
 
//get cart items
 exports.getCartItems = catchAsyncError(async (req, res,next) => {
    const { userId } = req.params;
        const cart = await cartModel.findOne({ userId })
        if(!cart){
            return next(new ErrorHandler(`cart not found`,404))
        }
        res.status(200).json({
            success:true,
            items:cart.items
        })
});

//deleting items from cart
exports.deleteCart = catchAsyncError(async (req, res,next) => {
    const { userId, productId } = req.body;
        const cart = await cartModel.findOne({ userId })
        if(!cart){
            return next(new ErrorHandler(`cart not found`,404))
        }

        const itemIndex = cart.items.findIndex (item => item.product.toString() === productId)

        if(itemIndex === -1){
            return next(new ErrorHandler('product not found in cart',404)) 
        }
        cart.items.splice(itemIndex,1)
        
        await cart.save()
        res.status(200).json({
            success:true,
            items:"item removed from cart successfully"
        })
});
