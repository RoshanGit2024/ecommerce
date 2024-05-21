const productModel=require('../models/productmodel')

//get products API = api/v1/products
exports.getProducts=async(req,res,next)=>{
   const query=req.query.keyword?{ name:{
      $regex: req.query.keyword,
      $options:'i'
   }}:{}
   const products= await productModel.find(query);
    res.json({
        success:'true',
        products
    })
}

//get single products API = api/v1/products/:id
exports.getSingleProducts=async(req,res,next)=>{
    try{
        console.log(req.params.id,'ID')
        const product=await productModel.findById(req.params.id)
        res.json({
            success:true,
            product
        })
    }catch(error){
       res.status(404).json({
        success:false,
        message:'unable to get the products with that id'
       })
    }
    
}

exports.postProducts=async(req,res)=>{
    const { name, price, description, category, seller, stock, numberOfReduce,image } = req.body;

    const product = new productModel({ name, 
                                     price, 
                                     description, 
                                     category, 
                                     seller, 
                                     stock, 
                                     numberOfReduce,
                                     image});
    await product.save();
    res.json({
        success:true,
        message:"product added successfully",
        product
    })
}
