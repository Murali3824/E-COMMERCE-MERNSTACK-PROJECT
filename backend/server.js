import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


// App Config
const app = express()
const port = process.env.PORT || 4000
dotenv.config();
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api routes
app.use('/api/user',userRouter)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


// api endpoints
app.get('/',(req,res)=>{
    res.send("server running")
})

app.listen(4000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:4000');
});
