const ErrorHandler = require('../utils/errorHandler')
const User = require('../models/userModel')
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')

exports.isAuthenticateUser = catchAsyncError(async(req,res,next)=>{
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler('Login first to handle this resource', 401))
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
  
    if (!req.user) {
      return res.status(401).json({ message: "User not found. Please login again." });
    }
  
    next();
    })

exports.authorizeRoles = (...roles)=>{
   return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role}is not allowed`,401))
        }
        next();
    }
}

