// Imports
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const PlayerHandler = require("./player/handler.js");
const LoginManager = require("./profiles/loginManager.js");
const EventHandlerMBE = require("./events/handler");

// Server and socket init
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Frontend initialization
app.use(express.static("public"));
server.listen(4000, () => {
    console.log("Server opened at http://127.0.0.1:4000");
});

// Player handling
const EventHandler = new EventHandlerMBE(io, new PlayerHandler(), new LoginManager());

// Socket handling
io.on("connection", (socket) => {
    console.log("Connection made.");

    // Should only receive custom events. Not "connect" and "disconnect"
    socket.onAny((event, ...args) => {
        EventHandler.runEvent(event, args);
    });

    socket.on("disconnect", () => {
        console.log("Connection lost.");
    });
});