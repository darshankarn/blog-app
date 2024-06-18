import { Router } from 'express';
import { deleteUser, getUser, loginUser, logoutUser, refetchUser, registerUser, updatePassword } from '../controller/user.controller.js';
import verifyJwt from '../middlewares/auth.middleware.js';


const userRouter = Router();

//register
userRouter.route('/register').post(registerUser);
//login
userRouter.route('/login').post(loginUser);
//logout
userRouter.route('/logout').get(logoutUser);
//refetch
userRouter.route('/refetch').get(verifyJwt,refetchUser); 
//update password
userRouter.route('/:id').put(verifyJwt,updatePassword);
//delete 
userRouter.route('/:id').delete(verifyJwt,deleteUser);
//getuser
userRouter.route('/:id').get(getUser);
export default userRouter;