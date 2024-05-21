const productModel=require('../models/productmodel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')

//get products API = api/v1/products
exports.getProducts=async(req,res,next)=>{
   const query=req.query.keyword?{ name:{
      $regex: req.query.keyword,
      $options:'i'
   }}:{}

   const categoryCondition = req.query.category ? {
    category: req.query.category
    } : {};

    const qry ={
        ...query,
        ...categoryCondition
    }
   const products= await productModel.find(query).find(categoryCondition);
   

    res.json({
        success:'true',
        count:products.length,
        products
    })
}

//get single products API = api/v1/products/:id
exports.getSingleProducts=async(req,res,next)=>{
        console.log(req.params.id,'ID')
        const product=await productModel.findById(req.params.id)
        
        if(!product){
            return next(new ErrorHandler('product not found',400));
        }

        res.json({
            success:true,
            product
        })
    }

//create product - /api/v1/products/new
exports.postProducts=catchAsyncError(async(req,res,next)=>{
    const product = await productModel.create(req.body)
    await product.save();
    res.json({
        success:true,
        message:"product added successfully",
        product
    })
});

//update product -api/v1/product/:id

exports.updateProduct = async(req,res,next)=>{
   let product = productModel.findById(req.params.id)

   if(!product){
    return res.status(404).json({
       success:false,
       message:"product not found" 
    })
   }

   product = await productModel.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runvalidators:true
   })
    
   res.status(200).json({
    success:true,
    product
   })
}

//Delete product - api/v1/products/:id
exports.deleteProduct = async(req,res,next)=>{
    const product =await productModel.deleteOne({_id:req.params.id})

   if(!product){
    return res.status(404).json({
       success:false,
       message:"product not found" 
    });
   }
   res.status(200).json({
    success:true,
    message:"product deleted"
   })
}
