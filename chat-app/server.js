// Import everything needed for the server
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

// Set up our Express app and HTTP server
const app = express();
const httpServer = http.createServer(app);

// Create our Socket.IO server with CORS enabled (so it plays nice with browsers)
const io = new Server(httpServer, {

    cors: {

        origin: "*",        // Allow connections from anywhere (for development)
        methods: ["GET", "POST"]  // Only allow these HTTP methods

    }

});

// Serve up all our static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// When someone visits the root URL, send them our chat interface
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, '../public/index.html'));

});

// Socket.IO connection handling
io.on("connection", (socket) => {

    console.log(`User connected: ${socket
        .id}`);

    // Listen for incoming messages from clients
    socket.on("message", (data) => {

        console.log(`Message received:`, data);
        
        // Send the message to everyone connected (including the sender)
        io.emit("message", data);

    });

    // When someone leaves the chat, let us know
    socket.on("disconnect", () => {

        console.log(`User disconnected: ${socket.id}`);

    });

});

// Fire up the server and let everyone know it's ready to rock!
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
    
});