import mongoose from "mongoose";

const connectToMongoDB = async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongodb")
    } catch (error) {
        console.log("Error connecting to mongodb")
    }
}

export default connectToMongoDB;