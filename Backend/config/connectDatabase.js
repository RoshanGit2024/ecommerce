const mongose=require('mongoose')

const connectDatabase=()=>{
   mongose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true }).then((con)=>{
    console.log("MongoDB connectted to host:"+con.connection.host)
   })
}

module.exports=connectDatabase