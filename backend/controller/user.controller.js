import { Comment } from "../model/Comment.js";
import { Post } from "../model/Post.js";
import { User } from "../model/User.js";
import { ApiError } from "../utills/ApiError.js";
import { ApiResponse } from "../utills/ApiResponse.js";
import {asyncHandler} from "../utills/asyncHandler.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerUser = asyncHandler(async(req,res)=>{
    
    const {username,email,password} = req.body;
    
    if(!username){
        throw new ApiError(400,"username is required!!");
    }

    if(!email){
        throw new ApiError(400,"email is required");
    }

    if(!password){
        throw new ApiError(400,"password is required");
    }

    const userExists = await User.findOne({
        $or: [{username},{email}],
    });

    if(userExists){
        throw new ApiError(400,"user already exists with same username or email")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hashSync(password,salt)

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password: hashedPassword
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    );

    if(!createdUser){
        throw new ApiError(500,"Somthing went wronh while creating user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user created successfully")
    );
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        throw new ApiError(400,"email and password is required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404,"User Not Found");
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
        throw new ApiError(401,"Wrong credentials");
    }
    const token = jwt.sign({id: user._id},process.env.SECRET,{expiresIn: "3d"});
    const info = await User.findById(user._id).select("-password");
    return res.cookie("token",token).status(201).json(
        new ApiResponse(201,info,"user is logedin")
    )
})

const logoutUser = asyncHandler(async(req,res)=>{
    return res.clearCookie("token",{sameSite: "none", secure: true}).status(200).send("User is logout successfully");
})

const updatePassword = asyncHandler(async(req,res) => {

    if(!req.body.password){
        throw new ApiError(400,"password is required for update");
    }

    const user = await User.findById(req.params.id)
    const match = await bcrypt.compare(req.body.password,user.password)

    if(!match){
        return res.status(400).json(new ApiResponse(400,{},"Password is wrong"))
    }
    const newuser = await User.findByIdAndUpdate(req.params.id,{$set:{username:req.body.username,email:req.body.email}},{new: true}).select("-password");
    return res.status(200).json(new ApiResponse(200,newuser,"password upadted successfully"));
})

//delete account

const deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        throw new ApiError(404,"User Not Found");
    }
    await Post.deleteMany({userId: user._id});
    await Comment.deleteMany({userId: user._id});

    return res.status(200).json(new ApiResponse(200,{},"user is deleted successfully"));
})

//get user
const getUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    if(!user){
        throw new ApiError(404,"User Not Found");
    }

    return res.status(201).json(new ApiResponse(201,user,"successfully fecthed user"));
})

//Refetch User
const refetchUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.userId).select("-password");
    return res.status(201).json(new ApiResponse(201,user,"User etched successfully"));
})

export {registerUser,loginUser,logoutUser,updatePassword,deleteUser,getUser,refetchUser}