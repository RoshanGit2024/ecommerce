const mongoose=require('mongoose')

const wishlistSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    wishProducts:[{
        name:{
            type:String,
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
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'product'
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'user'
        }
    }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: { type: String, default: 'active' }
})

wishlistSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
  });

const wishlistModel = mongoose.model('wishlist',wishlistSchema)

module.exports=wishlistModel;