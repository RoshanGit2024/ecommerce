const express=require('express');
const {getAdminProducts, 
       getProducts, 
       getSingleProducts ,
       getReviews,
       postProducts,
       updateProduct,
       deleteProduct,
       createReview, 
       deleteReview,
       relatedProducts,
       toggleWish,
       getWishList,
       removeProductImage} = require('../controllers/productcontroller');
const router=express.Router();
const {isAuthenticateUser, authorizeRoles} = require('../middlewares/authenticate')
const multer = require('multer');
const path = require('path');

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
router.route('/products/:id/related').get(relatedProducts)
router.route('/review').put(isAuthenticateUser,createReview)
router.route('/togglewish').post(isAuthenticateUser,toggleWish)
router.route('/wishlist/:userId').get(isAuthenticateUser,getWishList)

//admin API
router.route('/admin/products/new').post(isAuthenticateUser, authorizeRoles('admin'),upload.array('images'), postProducts)
router.route('/admin/products').get(isAuthenticateUser, authorizeRoles('admin'), getAdminProducts)
router.route('/admin/products/:id').delete(isAuthenticateUser, authorizeRoles('admin'), deleteProduct)
router.route('/admin/products/:id').put(isAuthenticateUser, authorizeRoles('admin'),upload.array('images'), updateProduct)
router.route('/admin/reviews').get(isAuthenticateUser, authorizeRoles('admin'),getReviews)
router.route('/admin/review').delete(isAuthenticateUser, authorizeRoles('admin'),deleteReview)
router.route('/admin/products/:id/image').delete(isAuthenticateUser, authorizeRoles('admin'),removeProductImage)

module.exports=router