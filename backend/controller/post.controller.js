import { Post } from "../model/Post.js";
import { ApiError } from "../utills/ApiError.js";
import { ApiResponse } from "../utills/ApiResponse.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import uploadOnCloud from "../utills/cloudinary.js";
import {Comment} from "../model/Comment.js"

// create
const createPost = asyncHandler(async(req,res)=>{
    try {
        const newPost = new Post(req.body)
        const savedPost = await newPost.save();
        return res.status(200).json(new ApiResponse(201,savedPost,"post created suceessfully"))
    } catch (error) {
        return res.status(500).json(err);
    }
})

// Update

const updatepost = asyncHandler(async(req,res)=>{
    const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    return res.status(201).json(new ApiResponse(201,updatedPost,"post updated successfully"));
})

//delete
const deletePost = asyncHandler(async(req,res)=>{
    const post = await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({postId:req.params.id})
    if(!Post){
        throw new ApiError(404,"Post Not Found");
    }
    return res.status(200).json(new ApiResponse(200,{},"post is deleted successfully"));
})

//get post details
const getPostDetails = asyncHandler(async(req,res)=>{
    const post = await Post.findById(req.params.id)
    if(!post){
        throw new ApiError(404,"post Not Found");
    }

    return res.status(201).json(new ApiResponse(201,post,"successfully fecthed post details"));
})

// get all post

const getAllPosts = asyncHandler(async(req,res)=>{
    const query = req.query;
    const searchFilter={
        title:{ $regex :query.search, $options: "i"}
    }
    const posts = await Post.find(query.search ? searchFilter : null).sort({createdAt:-1});
    return res.status(201).json(new ApiResponse(201,posts,"All post fetched"));
})

//GET Users POST
const getUserPosts = asyncHandler(async(req,res)=>{
    const posts = await Post.find({userId:req.params.userId}).sort({createdAt:-1});
    return res.status(201).json(new ApiResponse(201,posts,"All post fetched"));
})

//upload image
const uploadImage = asyncHandler(async(req,res)=>{
    const imgpath = req.file?.path;
    console.log(imgpath)
    if(!imgpath){
        throw new ApiError(400,"Image not found");
    }
    const response = await uploadOnCloud(imgpath);

    if(!res){
        throw new ApiError(500,"Failed to upload image");
    }
    const cloudPath = response.url;
    return res.status(200).json(new ApiResponse(200,cloudPath,"image upload successfully"))
})
export {createPost,updatepost,deletePost,getPostDetails,getAllPosts,getUserPosts,uploadImage}