import jwt from 'jsonwebtoken'

// for access to add & remove products
const adminAuth = async (req,res,next) => {
    try {
        
        const {token} = req.headers
        if (!token) {
            return res.json({
                success:false,
                message:"Not Authorizwd, Login Again"
            })
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                success:false,
                message:"Not Authorizwd, Login Again"
            })
        }
        next()

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}


export default adminAuth
