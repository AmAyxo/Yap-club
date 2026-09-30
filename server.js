const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the website
app.use(express.static("public"));

// Socket.IO
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join", (name) => {
        console.log(name + " joined Yap Club");
    });

    socket.on("message", (data) => {
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Render provides the port
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Yap Club is running on port ${PORT}`);
});