import conversationModel from "../models/conversationModel.js"
import messageModel from "../models/messageModel.js"
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async(req,res) => {    
    try {
        const { message } = req.body;
        const { id:recieverId } = req.params;
        const senderId = req.user._id;

        let conversation = await conversationModel.findOne({
                                participants:{$all:[senderId,recieverId]}
                            });

        if(!conversation) {
            conversation = await conversationModel.create({
                            participants:[senderId,recieverId]
                            })
        }

        const newMessage = new messageModel({
            senderId,
            recieverId,
            message
        });

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        //this will run in parallel
        await Promise.all([
            conversation.save(),
            newMessage.save()
        ])
        
        const recieverSocketId = getRecieverSocketId(recieverId);

        
        if(recieverSocketId) {
            // io.to(socket_id).emit() is used to send to specific client.
            io.to(recieverSocketId).emit("sendMessage",newMessage);
        }

        res.status(200).json(newMessage);
                    
    } catch (error) {
        console.log("error in sendMessage",error.message);
        return res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

export const getMessages = async(req,res) => {
    try {
        const { id:userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await conversationModel.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate({path:"messages"});

        if(!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("error in getMessages",error.message);
        return res.status(500).json({
            error:"Internal Server Error"
        })
    }
}