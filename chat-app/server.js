// Import everything needed for the server
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
// Importing Redis client (compatible with Valkey)
// By default the Redis client connects to Redis/Valkey instance running at localhost:6379
const Redis = require("ioredis");
const valkeyClient = new Redis();

// Connect to Valkey (Redis-compatible)
valkeyClient.on('error', (err) => {
    console.error('Valkey Client Error:', err);
});

valkeyClient.on('connect', () => {
    console.log('Connected to Valkey');
});

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
io.on("connection", async (socket) => {

    console.log(`User connected: ${socket
        .id}`);

    // Fetching all the messages from Valkey
    try {
        const existingMessages = await valkeyClient.lrange("chat_messages", 0, -1);
        
        // Parsing the messages to JSON
        const parsedMessages = existingMessages.map((item) => JSON.parse(item));
        
        // Sending all the messages to the user
        socket.emit("historical_messages", parsedMessages);
    } catch (error) {
        console.error('Error fetching historical messages from Valkey:', error);
    }

    // Listen for incoming messages from clients
    socket.on("message", async (data) => {

        console.log(`Message arrived at ${process.pid}:`, data);
        
        try {
            // Store message in Valkey
            await valkeyClient.lpush("chat_messages", JSON.stringify(data));
        } catch (error) {
            console.error('Error storing message in Valkey:', error);
        }
        
        // Send the message to everyone connected (including the sender)
        io.emit("message", data);

    });

    // When someone leaves the chat, let us know
    socket.on("disconnect", () => {

        console.log(`User disconnected: ${socket.id}`);

    });

});

// Fire up the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
    
});