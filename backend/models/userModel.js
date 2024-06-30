import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    fullname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    gender:{
        type: String,
        required: true,
        enum: ["male","female"]
    },
    profilePic:{
        type: String,
        default: ""
    }
    },
{ timestamps : true });

const User = mongoose.model("User",userModel);

export default User;