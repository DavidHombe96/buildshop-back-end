const User = require('../models/User')

const CryptoJS = require("crypto-js")
const jwt =require("jsonwebtoken")

module.exports = {

    createUser: async (res, req) => {
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            location:req.body.location,
            password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
        })

        try {
            await newUser.save()
        } catch (error) {
            res.status(500).json({message: error})
        }
    } ,

    loginUser: async (res, req) => {
        const userExist = User.findOne({email:req.body.email })

        !userExist && res.status(401).json("User not found")
    } 
}