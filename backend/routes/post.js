import express from "express"
import { Router } from "express"
import { createPost, deletePost, getAllPosts, getPostDetails, getUserPosts, updatepost, uploadImage } from "../controller/post.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const postRouter = Router();

//Create
postRouter.route('/create').post(verifyJwt,createPost)
//update
postRouter.route('/:id').put(verifyJwt,updatepost)
//delete post
postRouter.route('/:id').delete(verifyJwt,deletePost)
//get post details
postRouter.route('/:id').get(getPostDetails)
//get all posts
postRouter.route('/').get(getAllPosts);
//get users post
postRouter.route('/user/:userId').get(getUserPosts);
//upload
postRouter.route('/upload').post(upload.single('img'),uploadImage)

export default postRouter