const express = require('express');
const { registerUser ,loginUser, logoutUser} = require('../controllers/authController');
const router = express.Router();
const multer = require('multer');
const path = require('path')

const upload = multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..','uploads/users'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})})


router.route('/register').post(upload.single('avatar'),registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)



module.exports = router;
