import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from "cloudinary"


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
        const { firstname, lastname, email, password } = req.body;

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
            firstname,
            lastname,
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

        // Check if the user already has a custom avatar saved
        let avatarUrl = user.avatarUrl; // Assuming avatarUrl is stored in the user schema
        
        if (!avatarUrl || avatarUrl.length === 0) {
            // If no custom avatar is found, generate one using UI Avatars
            const fullName = `${user.firstname} ${user.lastname}`;
            avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`;
        }

        // Send the user profile details along with the avatar URL as the response
        res.json({
            success: true,
            user: {
                ...user._doc,
                avatarUrl, // Include the avatar URL in the response
            },
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

// Update profile controller
const updateUserProfile = async (req, res) => {
    try {
        const { userId, firstname, lastname,email } = req.body;
        let avatarUrl;

        if (req.file) {
            console.log('Uploading image to Cloudinary:', req.file.path);
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log('Cloudinary result:', result);
            avatarUrl = result.secure_url;
            
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update user data
        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (email) user.email = email;
        if (avatarUrl) user.avatarUrl = avatarUrl; // Update avatar URL

        await user.save();

        // Return updated user data, including the avatar URL
        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
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


export {loginUser,registerUser,adminLogin,getUserProfile,updateUserProfile}