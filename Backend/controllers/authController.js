const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorhandler')
const sendToken = require('../utils/jwt')

exports.registerUser = catchAsyncError(async(req,res,next)=>{
   const{name,email,password}= req.body

   let avatar;
   if(req.file){
      avatar = `${process.env.BACKEND_URL}/uploads/users/${req.file.originalname}`
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
      message:"Logged out"
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
   if(req.file){
      avatar = `${process.env.BACKEND_URL}/uploads/users/${req.file.originalname}`
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