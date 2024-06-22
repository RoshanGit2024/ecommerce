const mongoose=require('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    items:[{
        name:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        stock:{
            type:Number,
            required:true
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'product'
        },
    }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: { type: String, default: 'active' }
})

cartSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
  });

const cartModel = mongoose.model('cart',cartSchema)

module.exports=cartModel;