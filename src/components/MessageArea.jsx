import React, { useState, useEffect, useContext } from "react";
import Message from "./Message";
import Inputmessage from "./Inputmessage";
import socket from "../scripts/socket";
import { Box, ScrollArea, Flex } from "@mantine/core";
import GlobalContext from "../scripts/globalContext";

const MessageArea = () => {
    const [messageList, setMessageList] = useState([]);
    const { userAgent, setUserAgent } = useContext(GlobalContext);

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
        socket.on("DeleteMessage", (id) => {
            setMessageList((old) => {
                let newList = [...old];
                let nid = newList.findIndex((el) => el.id === id);
                newList.splice(nid, 1);
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
        <Box className="chatroom" w={"100%"} h={"100%"}>
            <ScrollArea h={"80%"}>
                {messageList.map((el, key) => (
                    <Message
                        {...el}
                        isOwner={el.user?.id === userAgent?.id}
                        key={key}
                    />
                ))}
                {/* je map le state ici => Message user, timestamp... */}
            </ScrollArea>
            <Flex h={"144px"} justify={"center"} align={"center"}>
                <Inputmessage />
            </Flex>
        </Box>
    );
};

export default MessageArea;
