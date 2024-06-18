import { Post } from "../model/Post.js";
import { ApiError } from "../utills/ApiError.js";
import { ApiResponse } from "../utills/ApiResponse.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { Comment } from "../model/Comment.js";

// create
const createComment = asyncHandler(async(req,res)=>{
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save();
        return res.status(200).json(new ApiResponse(201,savedComment,"Comment created suceessfully"))
    } catch (error) {
        return res.status(500).json(err);
    }
})

// Update

const updateComment = asyncHandler(async(req,res)=>{
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    return res.status(201).json(new ApiResponse(201,updatedComment,"Comment updated successfully"));
})

//delete
const deleteComment = asyncHandler(async(req,res)=>{
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if(!comment){
        throw new ApiError(404,"Comment Not Found");
    }
    return res.status(200).json(new ApiResponse(200,{},"Comment is deleted successfully"));
})


//GET POST comments
const getPostComment = asyncHandler(async(req,res)=>{
    const comments = await Comment.find({postId:req.params.postId}).sort({createdAt:-1});
    return res.status(201).json(new ApiResponse(201,comments,"All comments fetched"));
})

export {createComment,updateComment,deleteComment,getPostComment}