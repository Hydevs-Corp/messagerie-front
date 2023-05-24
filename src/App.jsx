import { useEffect, useState } from "react";
import "./App.css";
import socket from "./scripts/socket";
import MessageArea from "./components/MessageArea";
import Haut from "./components/Haut";
import { Box, AppShell, Navbar, Header } from "@mantine/core";
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
            <AppShell
                sx={{
                    ".mantine-AppShell-main": {
                        maxHeight: "100vh",
                        width: "100vw",
                    },
                }}
                className="app"
                navbar={
                    <Navbar bg={"blue"} width={{ base: 300 }}>
                        <RoomList />
                    </Navbar>
                }
                header={
                    <Header height={{ base: 100 }}>
                        <Haut />
                    </Header>
                }
            >
                <MessageArea />
            </AppShell>
        </GlobalContext.Provider>
    );
}

export default App;
