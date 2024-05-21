const express=require('express');
const { getProducts, getSingleProducts ,postProducts} = require('../controllers/productcontroller');
const router=express.Router();

  
  //const upload = multer({ storage: storage });
router.route('/products').get(getProducts)
router.route('/products/:id').get(getSingleProducts)
router.route('/products').post( postProducts)

module.exports=router