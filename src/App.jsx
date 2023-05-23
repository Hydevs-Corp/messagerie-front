import { useEffect, useState } from "react";
import "./App.css";
import socket from "./scripts/socket";
import MessageArea from "./components/MessageArea";
import Header from "./components/Header";
import { Box } from "@mantine/core";
import GlobalContext from "./scripts/globalContext";

import RoomList from "./components/RoomList.jsx";

function App() {
    const [userAgent, setUserAgent] = useState({});
    //const { userAgent, setUserAgent } = useContext(GlobalContext);

    useEffect(() => {
        socket.on("connect", () => console.log("connexxxxxion"));
        setUserAgent((old) => {
            return { ...old, id: socket.id };
        });
    }, []);
    console.log("coucou, on est là", userAgent);
    return (
        <GlobalContext.Provider value={{ userAgent, setUserAgent }}>
            <Box w={"100vw"} h={"100vh"} className="app">
                <Header />
                <RoomList />
                <MessageArea />
            </Box>
        </GlobalContext.Provider>
    );
}

export default App;
