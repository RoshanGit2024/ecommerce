const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


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
        maxlength:[6,'password cannot exceed 6 charecter'],
        select:false
    },
    avatar:{
        type:String
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
    if (!this.isModified('password')) {
        next();
    }
    this.password =await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword =async function(enteredPassword){
   return bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.getResetToken = function(){
    //Generating the token
    const token = crypto.randomBytes(20).toString('hex');

    //Generating Hash and setbto resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

    //set token expire time 
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return token
}
let model = mongoose.model('user',userSchema);
module.exports = model