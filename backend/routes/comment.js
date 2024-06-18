import { Router } from "express"
import { createComment, deleteComment, getPostComment, updateComment } from "../controller/comments.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const commentRouter = Router();

//create
commentRouter.route('/create').post(verifyJwt,createComment)
//update
commentRouter.route('/:id').put(verifyJwt,updateComment)
//delete
commentRouter.route('/:id').delete(verifyJwt,  deleteComment)
//get post comment
commentRouter.route('/post/:postId').get(getPostComment)

export default commentRouter