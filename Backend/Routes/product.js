const express=require('express');
const { getProducts, getSingleProducts ,postProducts,updateProduct,deleteProduct} = require('../controllers/productcontroller');
const router=express.Router();

  
  //const upload = multer({ storage: storage });
router.route('/products').get(getProducts)
router.route('/products/new').post( postProducts)
router.route('/products/:id').get(getSingleProducts)
                             .put(updateProduct)
                             .delete(deleteProduct)

module.exports=router