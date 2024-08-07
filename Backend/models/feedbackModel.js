const mongoose=require('mongoose')

const feedbackSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    ratting:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    comments:{
        type:String,
        trim:true,
        maxlength:1000
    },
    timeStamp: { 
        type: Date, 
        default: Date.now 
    },
})
const feedbackModel = mongoose.model('feedback',feedbackSchema)

module.exports=feedbackModel;