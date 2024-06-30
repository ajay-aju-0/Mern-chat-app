import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"

const protectRoute = async (req, res, next) => {
    try {
        const token = res.cookie.jwt;
        if(!token) {
            return res.status(401).json({
                error:"Unauthorized - No Token Provided"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded) {
            return res.status(401).json({
                error:"Unauthorized - Token Invalid"
            })
        }

        const user = await userModel.findById(decoded.userId).select("-password")

        if(!user) {
            return res.status(404).json({
                error:"User not found"
            })
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protected route middleware ",error.message)
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

export default protectRoute;