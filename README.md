## Project Details
This repo is for my SHSU COSC 2327 Introduction to Computer Networks Chat Application class project. This is a real-time chat application built with Node.js, Express, and Socket.IO, featuring cluster-based architecture for high performance and scalability.

## Features

- **Real-time Messaging**: Built with Socket.IO for instant message delivery
- **Cluster Architecture**: Utilizes Node.js clustering for multi-core performance
- **Load Balancing**: Implements least-connection load balancing across worker processes
- **Static File Serving**: Serves HTML, CSS, and JavaScript files from the public directory
- **Broadcast Messaging**: Messages are broadcast to all connected clients
- **Process Monitoring**: Automatic worker process management and restart on failure

## Technical Stack

- **Backend**: Node.js with Express.js
- **Real-time Communication**: Socket.IO with cluster adapter
- **Clustering**: Node.js built-in cluster module
- **Load Balancing**: @socket.io/sticky for session persistence
- **Process Management**: Automatic worker spawning based on CPU cores

## Project Structure (SO FAR)

```
Chat-App/
├── chat-app/
│   ├── server.js          # Main server file with cluster setup
│   ├── package.json       # Dependencies and scripts
│   └── package-lock.json  # Dependency lock file
├── public/
│   └── index.html         # Static HTML file
└── README.md              # This file
```

## Installation & Setup

1. Navigate to the chat-app directory:
   ```bash
   cd chat-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Access the chat app:
   - Open your browser and go to `http://localhost:3000`
   - The server will automatically spawn worker processes based on your CPU cores

## How It Works

1. **Primary Process**: Manages worker processes and handles load balancing
2. **Worker Processes**: Handle actual client connections and message processing
3. **Message Flow**: 
   - Client sends message via Socket.IO
   - Message is logged with process ID
   - Message is broadcast to all connected clients
4. **Static Files**: HTML, CSS, and JS files are served from the `public` directory

## Dependencies

- `express`: Web framework for serving static files and handling HTTP requests
- `socket.io`: Real-time bidirectional event-based communication
- `@socket.io/cluster-adapter`: Enables Socket.IO clustering
- `@socket.io/sticky`: Session persistence across worker processes
- `ioredis`: Redis client for cluster communication (if needed)

## Contributors

- Mason R. Murphy