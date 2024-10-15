import express from 'express'
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js'
import userAuth from '../middleware/userAuth.js';

const cartRouter = express.Router();

cartRouter.post('/add',userAuth,addToCart)
cartRouter.post('/update',userAuth,updateCart)
cartRouter.post('/get',userAuth,getUserCart)


export default cartRouter;