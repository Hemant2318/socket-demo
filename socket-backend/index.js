// 1. create express server
const express = require("express");
// 2. create app variable, which is instance of express library to use create our backend server
const app = express();
// 3. create http server
const http = require("http");
const server = http.createServer(app);
// 4. create Server class of socket.io
const { Server } = require("socket.io");
// 5. import cors and use in app
const cors = require("cors");
app.use(cors());

// 6. create one variable to access socket functionality in backend
const io = new Server(server, {
  // fixed cors error
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  //join room
  socket.on("join_room", (data) => {
    socket.join(data)
  })

  // send message
  socket.on("send_message", (data) => {

    //this use for the specific user
    socket.to(data.room).emit("recieve_message", data)

    //this use for the all user
    // socket.broadcast.emit("recieve_message", data)
  })
})



// 7. start the server
server.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});
