import { useEffect } from "react";
import "./App.css";
import socket from "./scripts/socket";
import MessageArea from "./components/MessageArea";
import Header from "./components/Header";
import { Box } from "@mantine/core";

import RoomList from "./components/RoomList.jsx";

function App() {
    useEffect(() => {
        socket.on("connect", () => console.log("connexxxxxion"));
    }, []);

    return (
        <Box className="app">
            <Header />
            <RoomList />
            <MessageArea />
        </Box>
    );
}

export default App;
