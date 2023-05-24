import React, { useState, useEffect, useContext } from "react";
import Message from "./Message";
import Inputmessage from "./Inputmessage";
import socket from "../scripts/socket";
import { Box, ScrollArea, Flex, Container } from "@mantine/core";
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
                // SEB
                if (newList.length > 15) {
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
        <Flex
            direction={"column"}
            sx={{
                height: "100%",
                maxWidth: "100%",
                margin: "auto",
                width: "900px",
            }}
            className="chatroom"
        >
            <Box
                w={"100%"}
                // w="400px"
                // maw={"100%"}
                h={"100%"}
                sx={(theme) => ({
                    boxSizing: "border-box",
                    flex: 1,
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                        width: "7px",
                        opacity: 0,
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? "#FFFFFF44"
                                : "#00000022",
                        borderRadius: "30px",
                        cursor: "default",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? "#FFFFFF55"
                                : "#00000033",
                    },
                })}
            >
                <Flex direction={"column"} gap="xs" p="xs">
                    {messageList.map((el, key) => (
                        <Message
                            {...el}
                            isOwner={el.user?.id === userAgent?.id}
                            key={key}
                        />
                    ))}
                </Flex>
                {/* je map le state ici => Message user, timestamp... */}
            </Box>
            <Flex justify={"center"} align={"center"}>
                <Inputmessage />
            </Flex>
        </Flex>
    );
};

export default MessageArea;
