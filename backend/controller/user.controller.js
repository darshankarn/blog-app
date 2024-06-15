import { User } from "../model/User";
import { ApiError } from "../utills/ApiError.js";
import { ApiResponse } from "../utills/ApiResponse.js";
import asyncHandler from "../utills/asyncHandler.js"

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

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = User.findById(user._id).select(
        "-password"
    );

    if(!createdUser){
        throw new ApiError(500,"Somthing went wronh while creating user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user created successfully")
    );
})


export {registerUser}