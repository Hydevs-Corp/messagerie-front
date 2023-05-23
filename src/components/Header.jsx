import { Flex, Input, Button, Box } from "@mantine/core";
import { useState, useContext, createRef } from "react";
import socket from "../scripts/socket";
import GlobalContext from "../scripts/globalContext";

const Header = () => {
    const { userAgent, setUserAgent } = useContext(GlobalContext);
    const usernameInput = createRef();

    const submit = (e) => {
        e.preventDefault();
        socket.emit(
            "ChangeAuthorName",
            { userName: usernameInput.current?.value },
            setUserAgent
        );
    };

    return (
        <Box className="header" w={"100vw"}>
            <Flex
                justify={"flex-end"}
                align={"center"}
                wrap={"wrap"}
                w={"100%"}
                gap={20}
                px={40}
                py={10}
            >
                <form onSubmit={submit}>
                    <Input ref={usernameInput} />
                    <Button type="submit">UserClick</Button>
                </form>
            </Flex>
        </Box>
    );
};

export default Header;
