import express from "express";
import { addProduct,listProducts,removeProduct,singleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRoute = express.Router();

productRoute.post('/add',adminAuth,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 }
    ]), 
    addProduct
);
productRoute.post('/remove',adminAuth,removeProduct)
productRoute.get('/list',listProducts)
productRoute.post('/single',singleProduct)


export default productRoute;