const mongoose = require("mongoose")

//connection with mongodb atlas 
const DB =process.env.DATABASE

mongoose.connect(DB,{
    useNewUrlParser:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
})
.then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("failed to connect");
})