import React, { useEffect, useContext } from "react";
import { Text, Paper, Flex, Button, useMantineTheme } from "@mantine/core";
import socket from "../scripts/socket";
import GlobalContext from "../scripts/globalContext";

const Message = ({ user, content, timestamp, id, isOwner }) => {
    let time = new Date(timestamp);

    let heure = time.getHours();
    let minute = time.getMinutes();

    const theme = useMantineTheme();
    return (
        <Flex w={"100%"} justify={isOwner ? "end" : "start"}>
            <Paper shadow="xs" p="xs" radius="md" w={"40%"} color="pink.4">
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
                <Text ta="left" fz="sm">
                    {content}
                </Text>
            </Paper>
        </Flex>
    );
};

export default Message;
