import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const test = (req,res)=>{
    res.json("success video");
}

export const addVideo = async(req,res,next)=>{
    const newVideo = new Video({userId: req.user.id, ...req.body});
    try{
        const savedVid = await newVideo.save();
        res.status(200).json(savedVid);
    }
    catch(err){
        next(err);
    }
}

export const updateVideo = async(req,res,next)=>{
    try{
        const vid = await Video.findById(req.params.id);
        if(!vid) return next(createError(404,"Video not found!"));
        if(req.user.id === vid.userId){
            const updatedvid  =  await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json(updatedvid);
        }
        else{
            return next(createError(401,"You are not authenticated to update other's video"));
        }
    }
    catch(err){
        next(err);
    }
}

export const deleteVideo = async(req,res,next)=>{
    try{
        const vid = await Video.findById(req.params.id);
        if(!vid) return next(createError(404,"Video not found!"));
        if(req.user.id === vid.userId){
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("Video deleted Succesfully");
        } 
        else{
            return next(createError(401,"You are not authenticated to delete other's video"));
        }
    }
    catch(err){
        next(err);
    }
}

export const getVideo = async(req,res,next)=>{
    try{
        const vid  = await Video.findById(req.params.id);
        if(vid){
            res.status(200).json(vid);
        }
        else{
            return next(createError(404,"video not found!"));
        }
    }
    catch(err){
        next(err);
    }
}

export const addView = async(req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        res.status(200).json("The view has been increased");
    }
    catch(err){
        next(err);
    }
}
export const random = async(req,res,next)=>{
    try{
        //sample for random
        const vids = await Video.aggregate([{$sample : {size:40}}]);
        res.status(200).json(vids);
    }
    catch(err){
        next(err);
    }
}
export const trend = async(req,res,next)=>{
    try{
        //-1 for most views 1 for least
        const vids = await Video.find().sort({views:-1});
        res.status(200).json(vids);
    }
    catch(err){
        next(err);
    }
}
export const sub = async(req,res,next)=>{
    try{
        // const vids = await
        const user =  await User.findById(req.user.id);
        const Subbed = user.subscriberChannels;
    
        const vids = await Promise.all(
            Subbed.map( async (channelId)=>{
                
                const vidsEach =await Video.find({userId:channelId})
                return vidsEach;
            })
        );
        res.status(200).json(vids.flat().sort((a,b)=>b.createdAt - a.createdAt));

    }
    catch(err){
        next(err);
    }
}

export const getByTags = async(req,res,next)=>{
    const tags = req.query.tags.split(",");
    // console.log(tags);
    try{
        const vids = await Video.find({tags: {$in: tags}}).limit(20);

        res.status(200).json(vids);
    }
    catch(err){
        next(err);
    }
}

export const search = async(req,res,next)=>{
    const query = req.query.q;

    try{
        //-1 for most views 1 for least
        const vids = await Video.find({
            title: {$regex:query, $options : "i"},
        }).limit(40);
        res.status(200).json(vids);
    }
    catch(err){
        next(err);
    }
}