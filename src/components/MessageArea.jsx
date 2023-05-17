import React, { useState, useEffect } from "react";
import Message from "./Message";
import Inputmessage from "./Inputmessage";
import socket from "../scripts/socket";
import { Box } from "@mantine/core";

const MessageArea = () => {
    const [messageList, setMessageList] = useState([]);
    // state de tout les messages
    useEffect(() => {
        socket.emit("RequestMessages", setMessageList);
        socket.on("NewMessage", (newMessage) => {
            if (messageList.find((el) => el.id === newMessage.id)) return;
            setMessageList((old) => {
                console.log("old", old);
                let newList = [...old];
                newList.push(newMessage);
                if (newList.length > 10) {
                    newList.shift();
                }
                return newList;
            });
        });
        socket.on("UpdateCurrentChatRoom", () => {
            socket.emit("RequestMessages", setMessageList);
        });
        return () => {
            socket.off("NewMessage");
            socket.off("UpdateCurrentChatRoom");
        };
    }, []);
    // recup tout les message => state

    // j'écoute l'arrivé d'autres messages push> state

    console.log("messageList", messageList);

    return (
        <Box className="chatroom">
            {messageList.map((el, key) => (
                <Message {...el} key={key} />
            ))}
            {/* je map le state ici => Message user, timestamp... */}
            <Inputmessage />
        </Box>
    );
};

export default MessageArea;
