import generateTokenAndSetCookie from '../helpers/generateToken.js';
import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const signUpController = async (req,res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({
                error:"passwords do not match"
            })
        }
        if(password.length < 6) {
            return res.status(400).json({
                error:"password must be atleast 6 characters long"
            })
        }

        const user = await userModel.findOne({username:username})

        if(user) {
            return res.status(400).json({
                error:"An user with this username already exists"
            })
        }

        const salts = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salts)

        // https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new userModel({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        if(newUser) {
            await generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({
                error:"Invalid user data"
            })
        }
    } catch (error) {
        console.log("error in signup controller",error.message);
        return res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

export const loginController = async (req,res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({username:username})

        if(!user) {
            return res.status(400).json({
                error:"User doesn't exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!isPasswordCorrect) {
            return res.status(400).json({
                error:"Invalid Password"
            })
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        })        
    } catch (error) {
        console.log("error in login controller",error.message);
        return res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

export const logoutController = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({
            message:"Logged out successfully"
        })
    } catch (error) {
        console.log("error in logout controller",error.message);
        return res.status(500).json({
            error:"Internal Server Error"
        })
    }
}
