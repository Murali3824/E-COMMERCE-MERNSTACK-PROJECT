import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay } from '../controllers/orderController.js'; 
import adminAuth from '../middleware/adminAuth.js'
import userAuth from '../middleware/userAuth.js'

const orderRouter = express.Router();

// admin routes
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment routes
orderRouter.post('/place',userAuth,placeOrder)
orderRouter.post('/stripe',userAuth,placeOrderStripe)
orderRouter.post('/razorpay',userAuth,placeOrderRazorpay)

// verify payment
orderRouter.post('/verifyStripe',userAuth,verifyStripe)
orderRouter.post('/verifyRazorpay',userAuth,verifyRazorpay)

// user router
orderRouter.post('/userorders',userAuth,userOrders)


export default orderRouter;