const express = require('express');
const {
     registerUser ,
     loginUser, 
     logoutUser,
     getUserProfile,
     changePassword,
     updateProfile,
     getUsers,
     getSingleUser,
     updateUser,
     deleteUser,
     forgotPassword,
     resetPassword,
     updateUserImage,
     deleteImage,
     sendEmail
    } = require('../controllers/authController');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const {isAuthenticateUser, authorizeRoles} = require('../middlewares/authenticate')

const upload = multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..','uploads/users'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})

//user api
router.route('/register').post(upload.single('avatar'),registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/myprofile').get(isAuthenticateUser,getUserProfile)
router.route('/password/change').put(isAuthenticateUser,changePassword)
router.route('/update').put(isAuthenticateUser,upload.single('avatar'),updateProfile)
router.route('/updateimage').put(isAuthenticateUser,upload.single('avatar'),updateUserImage)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/deleteimage').delete(isAuthenticateUser,deleteImage)

//admin api
router.route('/admin/users').get(isAuthenticateUser, authorizeRoles('admin'), getUsers)
router.route('/admin/sendmail').post(isAuthenticateUser, authorizeRoles('admin'),sendEmail)
router.route('/admin/user/:id').get(isAuthenticateUser, authorizeRoles('admin'), getSingleUser)
                               .put(isAuthenticateUser, authorizeRoles('admin'), updateUser)
                               .delete(isAuthenticateUser, authorizeRoles('admin'), deleteUser)

module.exports = router;
