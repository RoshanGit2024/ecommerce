const products = require('../Data/products.json')
const productModel = require('../models/productmodel')
const dotenv = require('dotenv')
const connectDatabase = require('../config/connectDatabase')

dotenv.config({path:'Backend/config/config.env'})
connectDatabase()

const seedProducts = async () => {
    try {
        await productModel.deleteMany();
        console.log("products deleted")
        await productModel.insertMany(products)
        console.log("all products added!")
    } catch (error) {
        console.log(error.message)
    }
}

seedProducts()