const catchAsyncError = require("../middlewares/catchAsyncError");

exports.postFeedback = catchAsyncError(async(req,res,next)=>{
  const {rating,comments}=req.body;
  const newFeedback = feedbackMode
})