const jwt = require("jsonwebtoken")
const User = require("../models/userschema")


const authanticate = async (req , res , next) =>{

    try {
        
        const token = req.cookies.jwtoken
        const verifyToken = jwt.verify(token , "MYNAMEISOMNISHKUNDARIYAIAMAWEBDEVLOPER")

        const rootUser =  await User.findOne({_id:verifyToken._id, "tokens.token": token})
 
        if(!rootUser)
        { 
            throw new Error("User not found")
        }

        req.token = token 
        req.rootUser = rootUser
        req.userID = rootUser._id
        console.log(rootUser)
        next();
        
    } catch (error) {
        
        res.status(401).send("Unauthorized : No token Provided")
        console.log(error)
    }
}

module.exports = authanticate