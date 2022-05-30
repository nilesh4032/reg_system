const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()

const authanticate = require("../middleware/authanticate")

require("../db/conn")
const User = require("../models/userschema")

router.get("/", (req, res) => {
    res.send("hello")
})

// user registration 

router.post("/register", async (req, res) => {
    console.log(req.body);
    // res.json({message:req.body})

    const { name, email, phone, work,country, password, cpassword } = req.body

    if (!name || !email || !phone || !work ||!country || !password || !cpassword) {
        return res.status(422).json({ error: "enter valid data" })
    }

    try {

        const userExist = await User.findOne({ email:email })

        if (userExist) {
            return res.status(422).json({ error: "Email already exist" })
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" })
        }
        else {
            const user = new User({ name, email, phone, work,country, password, cpassword })

            //⚠️ hashing password is middleware and the code of this is in user scema file

            //save data to db
            const userRegister = await user.save()

            res.status(201).json({ message: "user register successfuly" })
        }
    }
    catch (err) {
        console.log(err);
    }



})


//user login

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "please filled data" })
        }

        const userLogin = await User.findOne({ email: email })

        if(userLogin)
        {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            // this function is define in userschema file
            const token = await userLogin.generateAuthToken()
            
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now() + 25892000000),//after 30 days token will expire
                httpOnly:true
            })

            if (!isMatch) {
                res.status(400).json({ message: "Invalid credential" })
            }
            else {
                res.status(200).json({ message: "user signin successfully" })
            }
        }
        else
        {
            res.status(400).json({ message: "Invalid credential" })
        }
       


    } catch (err) {
        console.log(err);
    }
})





router.get("/about",authanticate,(req,res)=>{
    res.send(req.rootUser)
})


// get user data for contact and home page 

router.get("/getdata",authanticate,(req,res)=>{
    res.send(req.rootUser)
})

router.post("/contact",authanticate, async(req,res)=>{
    try {
        
        const {name , email , phone , message} = req.body

        if(!name || !email || !phone || !message)
        {
            return res.json({error:"Please fill the contact form"})
        }

        const userContact = await User.findOne({_id:req.userID})

        if(userContact)
        {
            const userMessage = await userContact.addMessage(name , email , phone , message)

            await userContact.save()

            res.status(201).json({message:"User contact Successfully"})

        }
        
    } catch (error) {
        console.log(error)
    }
})


router.get("/logout",authanticate,(req,res)=>{
    res.clearCookie("jwtoken",{path:"/"})
    res.status(200).send(req.rootUser)
})

// router.get("/signup",(req,res)=>{
//     res.send("hello signup")
// })

module.exports = router;