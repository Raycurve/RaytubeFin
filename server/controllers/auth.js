import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
// import {cookie} from "cookie-parser";


export const test = (req,res)=>{
    res.json("auth");
}

export const signup = async(req,res,next)=>{

    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body,password:hash});

        await newUser.save();
        res.status(200).send("User has been created");

    }catch(err){
        next(err);
    }
    
}

export const signin = async(req,res,next)=>{

    try{
        const user = await User.findOne({name: req.body.name});
        if(!user) return next(createError(404,"User not found!"));
        
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrect) return next(createError(400,"Wrong Credentials!"));
  
        const token  = jwt.sign({id:user._id},process.env.JWTKEY);
        const {password,...oth} = user._doc;
        
        res.cookie("access_token",token,{
            httpOnly: true,
            //secures by confining the cookie accesible by browsers only
        }).status(200).json(oth);

    }catch(err){
        next(err);
    }
    
}

export const logout = (req,res,next)=>{
    res.clearCookie("access_token", {
        httpOnly: true,
      });
      return res.status(200).json("Logged out successfully.");
}

export const googleAuth = async(req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        //if registered already then give a cookie and done
        if(user){
            const token  = jwt.sign({id:user._id},process.env.JWTKEY);
            
            res.cookie("access_token",token,{
                httpOnly: true,
                //secures by confining the cookie accesible by browsers only
            }).status(200).json(user._doc);
        }
        //if not registered gotta add it in the db then a cookie
        else{
            const newUser = new User({
                ...req.body,
                fromGoogle:true
            })
            const savedUser = await newUser.save(); 
            const token  = jwt.sign({id:savedUser._id},process.env.JWTKEY);
            
            res.cookie("access_token",token,{
                httpOnly: true,
                //secures by confining the cookie accesible by browsers only
            }).status(200).json(savedUser._doc);
        }

    }
    catch(err){
        next(err);
    }
}