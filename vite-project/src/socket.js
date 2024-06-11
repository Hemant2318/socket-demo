//The Socket.IO client is initialized in this file:

import io from "socket.io-client";
const URL = "http://localhost:3000";

export const socket = io.connect(URL);
