const express=require('express')
const app=express();
const dotenv=require('dotenv')
const path=require('path')
const cors = require('cors')
const bodyParser=require('body-parser')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error')
const connectDatabase=require('./config/connectDatabase')
dotenv.config({path:path.join(__dirname,'config','config.env')})


const products=require('./Routes/product');
const auth = require('./Routes/auth')
const orders=require('./Routes/order');
const payment=require('./Routes/payment')

  
  
  app.use(cookieParser())
   connectDatabase()

app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
  }));
  
app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',orders);
app.use('/api/v1/',payment);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}
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
