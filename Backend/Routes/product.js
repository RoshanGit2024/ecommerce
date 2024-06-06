const express=require('express');
const {getAdminProducts, getProducts, getSingleProducts ,getReviews,postProducts,updateProduct,deleteProduct,createReview} = require('../controllers/productcontroller');
const router=express.Router();
const {isAuthenticateUser, authorizeRoles} = require('../middlewares/authenticate')
const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/products' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })
  
  
router.route('/products').get(getProducts)
router.route('/products/:id').get(getSingleProducts)
router.route('/review').put(isAuthenticateUser,createReview)
router.route('/reviews').get(getReviews)

//admin routes
router.route('/admin/products/new').post(isAuthenticateUser, authorizeRoles('admin'),upload.array('images'), postProducts)
router.route('/admin/products').get(isAuthenticateUser, authorizeRoles('admin'), getAdminProducts)
router.route('/admin/products/:id').delete(isAuthenticateUser, authorizeRoles('admin'), deleteProduct)
router.route('/admin/products/:id').put(isAuthenticateUser, authorizeRoles('admin'),upload.array('images'), updateProduct)


module.exports=router