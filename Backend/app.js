const express=require('express')
const app=express();
const dotenv=require('dotenv')
const path=require('path')
const cors = require('cors')
const bodyParser=require('body-parser')
const errorMiddleware = require('./middlewares/error')
const connectDatabase=require('./config/connectDatabase')
dotenv.config({path:path.join(__dirname,'config','config.env')})


const products=require('./Routes/product');
//const orders=require('./Routes/order');

connectDatabase()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use('/api/v1/',products);
//app.use('/api/v1/',orders);
app.use(errorMiddleware)

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is listening port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

process.on(`unhandledRejection`,(err)=>{
    console.log(`Error:${err.message}`);
    console.log('Shuting down the server due to unhandled rejection')
    server.close(()=>{
        process.exit(1)
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`);
    console.log('Shuting down the server due to uncaught exception error')
    server.close(()=>{
        process.exit(1)
    })
})
