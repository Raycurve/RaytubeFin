import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";
export const test = (req,res)=>{
    res.json("success user");
}

export const update = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set:req.body,
            },
            {new: true});

            res.status(200).json(updatedUser); 
        
        }
        catch(err){
            next(err);
        }
    }
    else{
        return next(createError(403, "You can update only your account!"));
    }
}
export const deleteUser = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
            const updatedUser = await User.findByIdAndDelete(req.params.id);

            res.status(200).json("The user has been deleted."); 
        
        }
        catch(err){
            next(err);
        }
    }
    else{
        return next(createError(403, "You can delete only your account!"));
    }
}
export const getUser = async (req,res,next)=>{
    try{
        const getUser = await User.findById(req.params.id);
        if(!getUser) return next(createError(403,"No such user exists!"));
        res.status(200).json(getUser);
    }
    catch(err){
        next(err);
    }
}
export const subs = async (req,res,next)=>{
    try{
        //we push the param id to current subschannel string
        //and add 1 to subscount of the params id user
        await User.findByIdAndUpdate(req.user.id,{
            $push: {subscriberChannels: req.params.id},
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscribers: 1},
        });
        res.status(200).json("Subscription Successfull");
    }
    catch(err){
        next(err);
    }
}
export const unsubs = async (req,res,next)=>{
    try{
        //we pull the param id to current subschannel string
        //and add -1 to subscount of the params id user

        //here todo is one thing if the subs id in param is actually subscribed bu user id then only -1; so its todo.
        await User.findByIdAndUpdate(req.user.id,{
            $pull: {subscriberChannels: req.params.id},
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscribers: -1},
        });
        res.status(200).json("Unsubscription Successfull");
    }
    catch(err){
        next(err);
    }
}
export const like = async(req,res,next)=>{
    try{
        
        const vid=await Video.findByIdAndUpdate(req.params.videoId,{
            
            $addToSet:{likes:req.user.id},
            $pull: {dislikes:req.user.id}
        });


        res.status(200).json("Like done");
    }
    catch(err){
        next(err);
    }
    

}
export const dislike = async (req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.videoId,{
            $addToSet:{dislikes:req.user.id},
            $pull: {likes:req.user.id}
        });

        res.status(200).json("dislike done");
    }
    catch(err){
        next(err);
    }
}