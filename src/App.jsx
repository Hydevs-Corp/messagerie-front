import { useEffect } from "react";
import "./App.css";
import socket from "./scripts/Socket";

function App() {
    useEffect(() => {
        socket.on("connect", () => console.log("connexxxxxion"));
    }, []);

    return <></>;
}

export default App;
