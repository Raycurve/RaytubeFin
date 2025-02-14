import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are no authenticated!"));
    }

    jwt.verify(token,process.env.JWTKEY,(err,user)=>{
        if(err) return next(createError(403,"Token is not vaild!"));

        req.user = user;
        next();
    })

}