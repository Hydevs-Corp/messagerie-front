import { useState, useEffect } from "react";
import {
    Box,
    Navbar,
    useMantineTheme,
    Text,
    Divider,
    Flex,
    Button,
    TextInput,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import socket from "../scripts/socket";

// const RoomList = ({ rooms }) => {
/* 
    on ne reçoit pas rooms d'un agrument,
    mais d'un socket.
    Alors il faut faire le point d'entré ici
*/

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState("");
    const theme = useMantineTheme();

    useEffect(() => {
        socket.emit("RequestChatRoom", setRooms);
        socket.on("UpdateRoom", setRooms);
        socket.on("DeleteRoom", (roomName) => {
            setRooms((old) => {
                let newList = [...old];
                let newRoomName = rooms.findIndex(
                    (e) => e.roomName === roomName
                );
                newList.splice(newRoomName, 1);
                return newList;
            });
        });
    }, []);

    console.log("roomList", rooms);

    return (
        <Flex h={"100%"}>
            <Navbar
                className="roomlist"
                height={"100%"}
                p="xs"
                width={{ base: 300 }}
                sx={{ backgroundColor: theme.colors.blue[1] }}
            >
                <Flex direction={"column"} gap={15}>
                    <Navbar.Section>
                        <Text>ChatRooms </Text>
                    </Navbar.Section>
                    <Navbar.Section>
                        <Flex>
                            {/* <TextInput onInput={(e) => setRoomName(e.value.target)} /> */}
                            <TextInput
                                onInput={(e) => setRoomName(e.target.value)}
                            />
                            <Button
                                onClick={() =>
                                    socket.emit("CreateRoom", roomName)
                                }
                            ></Button>
                        </Flex>
                        <Divider size="xs" my={"xs"} />
                    </Navbar.Section>

                    <Navbar.Section grow mt="md">
                        <Box ta="left" pl={10}>
                            {rooms.map((el, id) => (
                                <Box key={id}>
                                    {el.roomName}
                                    <Button
                                        onClick={() =>
                                            socket.emit("joinRoom", el.roomName)
                                        }
                                    >
                                        Join
                                    </Button>
                                    <Button
                                        sx={{
                                            backgroundColor:
                                                theme.colors.red[8],
                                        }}
                                        onClick={() =>
                                            socket.emit(
                                                "DeleteRoom",
                                                el.roomName
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>
                                    <Divider size="xs" />
                                </Box>
                            ))}
                        </Box>
                    </Navbar.Section>
                </Flex>
            </Navbar>
        </Flex>
    );
};

export default RoomList;
