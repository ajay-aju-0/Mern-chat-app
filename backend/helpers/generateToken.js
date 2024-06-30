import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = async (userId) => {
    try {
        const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"15d"});
        resizeBy.cookie("jwt",token,{
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,  // Prevent cross site scripting attacks
            sameSite: "strict", // Prevent CSRF attacks
            secure: process.env.NODE_ENV !== "development" 
        })
    } catch (error) {
        console.log("Token generation failed")
    }
}

export default generateTokenAndSetCookie;