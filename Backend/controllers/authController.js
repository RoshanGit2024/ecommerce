const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendEmail = require('../utils/Email');
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwt')
const crypto = require('crypto')

exports.registerUser = catchAsyncError(async(req,res,next)=>{
   const{name,email,password}= req.body

   let avatar;
   let BASE_URL = process.env.BACKEND_URL;
   if(process.env.NODE_ENV === "production"){
      BASE_URL = `${req.protocol}://${req.get('host')}`
   }
   if(req.file){
      avatar = `${BASE_URL}/uploads/users/${req.file.originalname}`
   }
   const user =await User.create({
    name,
    email,
    password,
    avatar
   })

   sendToken(user,201,res)
})

exports.loginUser = catchAsyncError(async(req,res,next)=>{
   const{email,password}=req.body

   if(!email || !password){
      return next(new ErrorHandler('please enter email & password',400))
   }       

   //finding the user database
   const user =await User.findOne({email}).select('+password');

   if(!user){
      return next(new ErrorHandler('Invalid email or password',400))
   }

   if(!await user.isValidPassword(password)){
      return next(new ErrorHandler('Invalid email or password',401))
   }

   sendToken(user,201,res)

})
                 
//logout user
exports.logoutUser=(req,res,next)=>{
   res.cookie('token',null,{
      expires:new Date(Date.now()),
      httpOnly:true
   })
   .status(200)
   .json({
      success:true,
      message:"Logged out",
      active:Date.now()
   })
}

//Get user profile - /api/v1/myprofile
exports.getUserProfile = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.user.id)
  res.status(200).json({
   success:true,
   user
  })
})

//change password - 

exports.changePassword = catchAsyncError(async(req,res,next)=>{
   const user = await User.findById(req.user.id).select('+password');

   //check old password 
   const isPasswordCorrect = await user.isValidPassword(req.body.oldPassword);
   if (!isPasswordCorrect) {
      return next(new ErrorHandler('Old password is incorrect', 401));
  }
   //compare the password
  if(req.body.oldPassword === req.body.password){
   return next(new ErrorHandler('new password cannot be same', 401));
}
   //asigning new password 
   user.password = req.body.password;
   await user.save();
   res.status(200).json({
      success:true,
     }) 
 })

 //upadte profile
 exports.updateProfile = catchAsyncError(async(req,res,next)=>{
   let newUserData = {
      name:req.body.name,
      email:req.body.email
   }

   
   let avatar;
   let BASE_URL = process.env.BACKEND_URL;
   if(process.env.NODE_ENV === "production"){
      BASE_URL = `${req.protocol}://${req.get('host')}`
   }
   if(req.file){
      avatar = `${BASE_URL}/uploads/users/${req.file.originalname}`
      newUserData = {...newUserData,avatar}
   }
  const user =await User.findByIdAndUpdate(req.user.id,newUserData,{
   new:true,
   runValidators:true
  }) 

  res.status(200).json({
   success:true,
   user
  })
 })
 

 //get all users - api/v1/admin/users

 exports.getUsers = catchAsyncError(async(req,res,next)=>{
   const users = await User.find() 

   res.status(200).json({
      success:true,
      users
   })
 })

 //get single user - api/v1/admin/user/:id

 exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
   const user = await User.findById(req.params.id)

   if(!user){
      return next(new ErrorHandler(`user not found with id:${req.params.id}`,400));
   }

   res.json({
      success:true,
      user
   })
 })

 //update users - api/v1/admin/user/:id

 exports.updateUser = catchAsyncError(async(req,res,next)=>{
  
   const newUserData = {
      name:req.body.name,
      email:req.body.email,
      role:req.body.role
   }

   const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
      new:true,
      runValidators: true
   })


   res.status(200).json({
      success:true,
      user
   })
 })
 
 //Delete user - api/v1/admin/:id

 exports.deleteUser = catchAsyncError(async(req,res,next)=>{

   const user = await User.deleteOne({_id:req.params.id})

   if(!user){
      return next(new ErrorHandler(`user not found with id:${req.params.id}`,400))
   }
   res.status(200).json({
      success:true,
      message:"user deleted successfully"
   })
 })

 //Forgt password change - 

 exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
     const user =await User.findOne({email:req.body.email})

     if(!user){
      return next(new ErrorHandler('user not found with this email',404))
     }
     const resetToken = user.getResetToken();    
     await user.save({validateBeforeSave:false})

     //creating reset url
     let BASE_URL = process.env.FRONTEND_URL;
     if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
     }
     const resetUrl = `${BASE_URL}/password/reset/${resetToken}`

     const message = `Your password reset url is as follows\n\n
         ${resetUrl}\n\n If you have not requested this email, then ignore it.`

      try{
        sendEmail({
         email:user.email,
         subject:"ecomerceShop password recovery",
         message
        })

        res.status(200).json({
         success:true,
         message:`Email sent to ${user.email}`
        })
      }catch(error){
         user.resetPasswordToken = undefined;
         user.resetPasswordTokenExpire = undefined;
         await user.save({validateBeforeSave:false});
         return next(new ErrorHandler(error.message),500)
      }   
 })

 exports.resetPassword = catchAsyncError(async(req,res,next)=>{
   const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
   
   const user = await User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpire:{
         $gt : Date.now()
      }
   })
   if(!user){
      return next(new ErrorHandler("password reset token is invalid or expired"));
   }
   if(req.body.password !== req.body.confirmPassword){
      return next(new ErrorHandler("password does not match"))
   }
   user.password = req.body.password;
   user.resetPasswordToken = undefined;
   user.resetPasswordTokenExpire = undefined;
   await user.save({validateBeforeSave:false})

   sendToken(user,201,res)
})