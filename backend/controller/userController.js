import userModel from "../models/userModel.js"

export const getUsersForSidebar = async(req,res) => {
    try {
        const loggedInUserId = req.user._id;

        const allUsers = await userModel.find({ _id: { $ne:loggedInUserId }}).select("-password");
        // console.log(allUsers)
        return res.status(200).json(allUsers);
    } catch (error) {
        console.log("error in getUsersForSidebar",error.message);
        return res.status(500).json({
            error:"Internal Server Error"
        })
    }
}