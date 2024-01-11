
const User = require("../models/user.model")

const asyncHandler = require("express-async-handler")

const generateToken = require("../services/jwt.service")

// findone findbyid ==> object
// find ==> array

// 409  confligt
// 400 bad request 
// 401 un authrise
// 403 forbidden
// 404 notfound
// 201  created user

const authController = {
   register : asyncHandler(async(req,res)=>{
      const existUser = await User.findOne({email: req.body.email})
      // console.log(existUser)
      if(existUser){
         return res.status(409).send({message:"Email is already taken !!"})
      }
      let newUser = new User(req.body)
      await newUser.save()
      res.status(201).send({message : "Account Created !!!"})
   }),
   login : asyncHandler(async(req,res)=>{
      const data = req.body
      let user = await User.findOne({email:data.email})
      if(!user){
        return res.status(400).send("invalid email or password")
      }
      let validPass = await user.comparePassword(data.password)
      if(!validPass){
        return res.status(400).send("invalid email or password")

      }
      let token = generateToken(user._id)
      // console.log(token)
      const cookiesOptions ={
         expires :new Date(
            Date.now() + 24 * 60 * 60 * 1000
         )
      }
      res.cookie("access-token",`barear ${token}`,cookiesOptions)
      res.send({user,token})
   })
}

module.exports = authController