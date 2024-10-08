import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';


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


// api endpoints
app.get('/',(req,res)=>{
    res.send("server running")
})

app.listen(port,()=>{
    console.log("Server started on PORT : "+port);
})