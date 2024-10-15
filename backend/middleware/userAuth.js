import jwt from 'jsonwebtoken'

// for acces to add & remove cart products
const userAuth = async (req,res,next) => {
    try {
        
        const {token} = req.headers
        if (!token) {
            return res.json({
                success:false,
                message:"Not Authorizwd, Login Again"
            })
        }
        try {
            
            const token_decode = jwt.verify(token,process.env.JWT_SECRET)
            req.body.userId = token_decode.id
            next()
            
        } catch (error) {
            console.log(error);
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


export default userAuth
