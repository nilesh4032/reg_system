const mongoose = require("mongoose")
const dotenv = require("dotenv")
const express = require("express")
const app = express()
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000
dotenv.config({path:"./config.env"})
require("./db/conn")
// const User = require("./models/userschema")

app.use(express.json())
app.use(cookieParser());

// link the router file 
app.use(require("./router/auth"))

 





app.listen(port,()=>{
    console.log("server running on 5000 port");
})