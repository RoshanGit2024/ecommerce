const express=require('express');
const { getProducts, getSingleProducts ,postProducts,updateProduct,deleteProduct} = require('../controllers/productcontroller');
const router=express.Router();
const {isAuthenticateUser, authorizeRoles} = require('../middlewares/authenticate')


  
  //const upload = multer({ storage: storage });
router.route('/products').get(isAuthenticateUser,getProducts)
router.route('/products/new').post(isAuthenticateUser, authorizeRoles('admin'), postProducts)
router.route('/products/:id').get(getSingleProducts)
                             .put(updateProduct)
                             .delete(deleteProduct)

module.exports=router