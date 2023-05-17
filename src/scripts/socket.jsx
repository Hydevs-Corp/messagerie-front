import { io } from "socket.io-client";

const socket = io("http://192.168.1.25:3000");

export default socket;

// http://192.168.1.70:5173/
