import express from 'express';
import { loginUser,registerUser,adminLogin,getUserProfile, updateUserProfile } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.post('/profile',userAuth,getUserProfile)
userRouter.put('/updateprofile',userAuth,upload.single('avatar'),updateUserProfile)


export default userRouter;
