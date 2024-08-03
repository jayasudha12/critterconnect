const User = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async(req,res)=>{
        try{
        const {name,email,password} = req.body;
        const exist = await User.findOne({email});
        if(!exist){
        const newuser = new User({
            name,
            email,
            password
        })
        await newuser.save();
        res.status(200).json({Msg:"User created Successfully"});
    }
        else{
            res.status(200).json({Msg:"User already exist"});
        }
        
    }
    catch(error){
        console.log(error);
       res.status(500).json({msg:"Internal Server error"})
    }


}
const login = async(req,res)=>{
  try{
    const {email,password} = req.body;
    const exist = await User.findOne({email});
    if(!exist){
        res.status(404).json({msg:"user is not found.Create new user"});
    }
    const valid = await bcrypt.compare(password,exist.password)
    if(!valid){
        res.status(400).json({msg:"Password does not match"})
    }
    const token = jwt.sign({_id:exist._id},'secret_key',{
        expiresIn:"24h"
    }
    )
    res.json({token})
  }
  catch(error){
     res.status(500).send({msg:"Internal server error"})
  }
    

}
module.exports = {register,login}