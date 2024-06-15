import express from 'express';
import { Router } from 'express';
import User from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerUser } from '../controller/user.controller.js';


const userRouter = Router();

//register
userRouter.route('/register').post(registerUser);



//login


//logout