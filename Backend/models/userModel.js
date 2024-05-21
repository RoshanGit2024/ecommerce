const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter a name']
    },
    email:{
        type:String,
        required:[true,'please enter the email'],
        unique:true,
        validate:[validator.isEmail,'please eneter valid email']  
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        maxlength:[6,'password cannot exceed 6 charecter']
    },
    avatar:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
})
userSchema.pre('save',async function(next){
    this.password =await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken = function(){
    jwt.sign({id:this.id},)
}
let model = mongoose.model('user',userSchema);
module.exports = model