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
        try {

            const userExist = User.findOne({email:req.body.email })

            !userExist && res.status(401).json("User not found")
    
            const decryptedPassword  = CryptoJS.AES.decrypt(userExist.password, process.env.SECRET_KEY)
            const decryptedPass = decryptedPassword.toString(CryptoJS.enc.Utf8)
    
            decryptedPass !== req.body.password && res.status(401).json("Wrong password")
    
            const userToken = jwt.sign({ id: userExist.id }, process.env.JWT_SECRET, { expiresIn: "7d"})

            const  {password, __v, createdAt, upadatedAt, ...userData } = userExist._doc;

            res.status(200).json({...userData, token: userToken})
            
        } catch (error) {
            res.status(500).json({message: error})
        }


    } 
}