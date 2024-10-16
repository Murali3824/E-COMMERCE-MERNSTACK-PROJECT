import userModel from "../models/userModel.js";


// // add products to user cart
const addToCart = async (req,res) => {
    
    try {

        const  { userId, itemId, size } = req.body

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }
        
        const userData = await userModel.findById(userId)
        if (!userData) {
            return res.status(401).json({
                success: false,
                message: "User not found. Please log in or register."
            });
        }

        let cartData = await userData.cartData;
        
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({
            success:true,
            message:"added to cart"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// update user cart
const updateCart = async (req,res) => {
    try {

        const  { userId, itemId, size, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity
        
        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({
            success:true,
            message:"cart updated"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}


// // get user cart data
const getUserCart = async (req,res) => {
    try {
        
        const {userId} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        // console.log(cartData);
        res.json({
            success:true,
            cartData // check this while fetching the data
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}


export { addToCart, updateCart, getUserCart }