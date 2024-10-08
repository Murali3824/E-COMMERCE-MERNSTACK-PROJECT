import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(item => item !== undefined);

        let imageUrls = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url; // Extract the URLs of the uploaded images
            })
        );
        // console.log(name, description, price, category, subCategory, sizes, bestseller);
        // console.log(imageUrls);
        const productData ={
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes:JSON.parse(sizes), // converting array to string
            bestseller:bestseller === "true" ? true : false,
            image:imageUrls,
            date:Date.now()
        }
        console.log(productData);

        const product = new productModel(productData)
        await product.save()

        res.json({
            success: true,
            message: 'Product added successfully.',
            // imageUrls
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }    
}


// function for list products
const listProducts = async (req,res) => {
    try {
        
        const product = await productModel.find({});
        res.json({
            success:true,
            products:product
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }    
}

// function for removing product
const removeProduct = async (req,res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({
            success:true,
            products:"product removed"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }    
}

// function for single product info
const singleProduct = async (req,res) => {
    try {
        
        const productinfo = await productModel.findById(req.body.id)
        res.json({
            success:true,
            product:productinfo
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }    
}


export { addProduct,listProducts,removeProduct,singleProduct }