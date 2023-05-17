import React, { useEffect } from "react";
import { Text, Paper, Flex, Button } from "@mantine/core";
import socket from "../scripts/socket";

const Message = ({ user, content, timestamp }) => {
    return (
        <Paper
            shadow="xs"
            p="xs"
            radius="md"
            miw={200}
            maw={500}
            color="pink.4"
        >
            <Flex
                direction="row"
                gap={{ base: "sm", sm: "lg" }}
                justify="space-between"
                pb="ms"
            >
                <Text>{user?.username}Ici c'est le nom</Text>
                <Text>{timestamp}11:35</Text>
            </Flex>
            <Text ta="left" fz="sm">
                {content}
            </Text>
        </Paper>
    );
};

export default Message;
