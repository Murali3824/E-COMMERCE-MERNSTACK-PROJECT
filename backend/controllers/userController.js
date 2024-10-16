import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user Login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        // checking user is registred or not
        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exists or enter your email correctly",
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({
                success:true,
                token:token
            })
        }
        else{
            res.json({
                success:false,
                message:"Invalid password "
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}

// Route for user Register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            });
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // save to DB
        const newUser = new userModel({
            name,
            email, // Correct field name
            password: hashPassword
        });

        const user = await newUser.save();
        
        const token = createToken(user._id);
        res.json({
            success: true,
            token: token,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};


// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.body.userId;  // Get userId from the request (set by the userAuth middleware)

        // Fetch the user data from the database, excluding the password field
        const user = await userModel.findById(userId).select('-password');
        
        if (!user) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        // Send the user profile details as the response
        res.json({
            success: true,
            user,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};




// Route for admin login
const adminLogin = async (req,res) => {
    try {
        
        const {email,password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token  = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({
                success:true,
                token:token
            })
        } else {
            res.json({
                success:false,
                message:error.message
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}


export {loginUser,registerUser,adminLogin,getUserProfile}