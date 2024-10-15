import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe';
import razorpay from 'razorpay'
import dotenv from 'dotenv';
dotenv.config();


// placing orders using COD Method
const placeOrder = async (req,res) => {
    try {
        
        const {userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({
            success:true,
            message:"Order Placed"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// Initialize Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing orders using STRIPE Method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        // Create the order in your database
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Create line items for Stripe Checkout
        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        // Add delivery charge
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Charges" },
                unit_amount: 1000, // Delivery charge in paise (₹10)
            },
            quantity: 1,
        });

        // Create the Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// verify stripe payment
const verifyStripe = async (req,res) => {

    const {orderId, success, userId} = req.body

    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({
                success:true,
                message:"Order Placed "
            })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({
                success:false,
                message:"Order not placed"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// Initialize Razorpay instance
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// placing orders using RAZORPAY Method
const placeOrderRazorpay = async (req,res) => {
    try {
        
        const { userId, items, amount, address } = req.body;

        // Create the order in your database
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "razorpay",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Create Razorpay order
        const options = {
            amount: amount * 100, // amount in paise
            currency: 'INR',
            receipt: newOrder._id.toString(), // Use the order ID as the receipt
        };

        // Create Razorpay order
        await razorpayInstance.orders.create(options,(error,order) => {
            if (error) {
                console.log(error);
                return res.json({
                    success:false,
                    message:error
                })
            }
            res.json({
                success:true,
                order
            })
        });

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// verify razorpay
const verifyRazorpay = async (req,res) => {
    try {

        const {userId, razorpay_order_id} = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        // console.log(orderInfo);
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({
                success:true,
                message:"Payment successfull"
            })
        } else {
            res.json({
                success:false,
                message:"Payment Failed"
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// all oders data for admin panel
const allOrders = async (req,res) => {
    try {
        
        const orders = await orderModel.find({})
        res.json({
            success:true,
            orders
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// User oders data for frontend(myorder page)
const userOrders = async (req,res) => {
    try {
        
        const {userId} = req.body

        const orders = await orderModel.find({userId})
        res.json({
            success:true,
            orders
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// update order status from admin panel
const updateStatus = async (req,res) => {
    try {
        
        const {orderId,status} = req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({
            success:true,
            message:'status updated'
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}


export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay }