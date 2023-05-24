import React, { useEffect, useContext } from "react";
import { Text, Paper, Flex, Button, useMantineTheme, Box } from "@mantine/core";
import socket from "../scripts/socket";
import "./Message.css";

const Message = ({ user, content, timestamp, id, isOwner }) => {
    let time = new Date(timestamp);

    let heure = time.getHours();
    let minute = time.getMinutes();

    const theme = useMantineTheme();
    return (
        <Flex justify={isOwner ? "end" : "start"}>
            <Paper w={"70%"} shadow="xs" p="xs" radius="md" color="pink.4">
                <Flex
                    direction="row"
                    gap={{ base: "sm", sm: "lg" }}
                    justify="space-between"
                    pb="ms"
                >
                    <Text>{user?.username}</Text>
                    <Text>
                        {heure}:{minute}
                    </Text>
                    <Button
                        onClick={() => socket.emit("DeleteMessage", id)}
                        sx={{
                            backgroundColor: theme.colors.red[8],
                        }}
                    ></Button>
                </Flex>
                <Text className="Texte" ta="left" size={"sm"}>
                    {content}
                </Text>
            </Paper>
        </Flex>
    );
};

export default Message;
