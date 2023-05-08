import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {sendToken} from "../utils/features.js"
import { errorMiddleware } from "../middlewares/error.js";

export const register = async(req,res,next)=>{
try {

    const {name,email,password}= req.body;
    let user = await User.findOne({email});

    if(user) return next(new ErrorHandler("Email Already Exists",404));

    const hashPassword =await bcrypt.hash(password,10);
     user = await User.create({
       name:name,
       email:email,
       password:hashPassword
   });

   sendToken(res,user,"Register Successfully",201);  
 }
 catch (error) {
    next(error)
 }
}


export const login = async(req,res,next)=>{
try {
    const {email,password}= req.body; 
    const user = await User.findOne({email}).select("+password");
    if(!user) return next(new ErrorHandler("Email Not Found",404));

 const ismatch = await bcrypt.compare(password,user.password);
if(!ismatch) return next(new ErrorHandler("Incorrect Password",404));

sendToken(res,user,`Welcome Back ${user.name}`,200);

} catch (error) {
    next(error)
 }
}

export const logout = async(req,res)=>{
try {
    
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Developement" ? "lax" : "none",
        secure:process.env.NODE_ENV==="Developement" ? false : true,
        
    }).json({success:true,user:req.user});

   } catch (error) {
    console.log(error);
    
   }
}

export const getmyProfile = (req,res)=>{
try {
 
    res.status(200).json({success:true,user:req.user})

} catch (error) {
    console.log(error);   
 }    
}

