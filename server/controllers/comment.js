import { createError } from "../error.js";
import Comments from "../models/Comments.js";
import Video from "../models/Video.js";

export const test = (req,res)=>{
    res.json("success comment");
}


export const addComment = async (req,res,next)=>{
    const comment = new Comments({...req.body, userId:req.user.id});
    try{
        const savedComment = await comment.save();
        res.status(200).json(savedComment);
    }catch(err){
        next(err);
    }
}

export const deleteComment = async (req,res,next)=>{
    try{
        const comment = await Comments.findById(req.params.id);
        const video = await Video.findById(comment.videoId);
        if(comment.userId === req.user.id  || req.user.id === video.userId){
            await Comments.findByIdAndDelete(req.params.id);

            res.status(200).json("Comment deleted")
        }
        else{
            return next(createError(403,"You can't delete other's comments"));
        }
    }catch(err){
        next(err);
    }
}

export const getComment = async (req,res,next)=>{
    try{
        const comments = await Comments.find({videoId: req.params.videoId});
        res.status(200).json(comments);
    }catch(err){
        next(err);
    }
}