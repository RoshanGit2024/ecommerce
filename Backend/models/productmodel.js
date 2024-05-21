const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
   name:{
    type:String,
    required:[true,"please enter product name"],
    trim:true,
    maxLength:[100,"product name cannot exceed 100 charecters"]
   },
   price:{
    type:Number,
    default:0.0
   },
   description:{
    type:String,
    required:[true,"please enter product description"]
   },
   ratings:{
    type:String,
    default:0
   },
   images:[
    {
        image:{
            type:String,
            required:true
        }
    }
   ],
   category:{
    type:String,
    required:[true,"please enter product category"],
    enum:{
        values:[
            'Electronics',
            'Mobile phones',
            'Laptops',
            'Food',
            'Books',
            'cloths/shoes',
            'Sports',
            'Outdoor',
            'Home',
            'Accessories'
        ],
        message:"please select correct category",
    }
   },
   seller:{
    type:String,
    required:[true,"please enter product seller"]
   },
   stock:{
    type:Number,
    required:[true,"please enter product stock"],
    maxLength:[20,"product stock cannot exceed 20"]
   },
   numberOfreviews:{
    type:Number,
    default:0
   },
   reviews:[
    {
        name:{
            type:String,
            required:true
        },
        rating:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }
   ],
   user:{
      type:mongoose.Schema.Types.ObjectId
   },
   createAt:{
    type:Date,
    default:Date.now()
   }
})

const productModel = mongoose.model('product',productSchema)

module.exports=productModel;