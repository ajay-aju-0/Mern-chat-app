import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext"
import useConversation from "../zustand/useConversation"
import notificaitionSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages,setMessages } = useConversation();

    useEffect(() => {
        socket?.on("sendMessage",(newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificaitionSound);
            sound.play();
            setMessages([...messages,newMessage])
        })

        return () => socket.off("newMessage");
    },[socket, setMessages, messages])
}

export default useListenMessages;