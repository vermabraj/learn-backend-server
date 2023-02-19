const express = require('express');
const {userModel} = require("../model/User.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router()

userRouter.post("/register", async (req, res)=>{
const {name,email,pass} = req.body;
try{
    bcrypt.hash(pass, 5,  async(err, hash) =>{
      // Store hash in your password DB.
      if(err) response.send({"msg":"something went wrong"})
      else{
 const user = new userModel({name,email,pass:hash});
    await user.save();
    res.send({"msg":"New user registered"})
      }
    });
}catch(err){
res.send({"msg":"something went wrong with registering user","error":err.message})
}

})


userRouter.post("/login", async(req, res) => {
  const {email,pass} = req.body;
  try{
    const user = await userModel.find({email});
    if(user.length>0){
         bcrypt.compare(pass,user[0].pass,  async(err, result) =>{
            if(result){
 let token = jwt.sign({ userID:user[0]._id }, "masai");
 res.send({ msg: "logged in", token: token });
            }else{
                 res.send({ msg: "something went wrong" });
            }
    
         })
    }else{
        res.send({"msg":"user not found"})
    }
  }catch(err){
    res.send({"msg":"something went wrong with login","error":err.message})
  }
});

module.exports = {userRouter}