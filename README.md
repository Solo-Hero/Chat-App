## About This Project
This is my chat application project for SHSU COSC 2327 Introduction to Computer Networks. I am in the process of building a real-time chat app using Node.js, Express, and Socket.IO with a cluster-based architecture that's designed to handle multiple users smoothly and scale as needed.

## What This App Can Do

- **Real-time Messaging**: Send and receive messages instantly using Socket.IO
- **Smart Scaling**: Uses Node.js clustering to take advantage of all your CPU cores
- **Load Balancing**: Automatically distributes connections across worker processes for better performance
- **Static File Serving**: Serves up HTML, CSS, and JavaScript files from the public folder
- **Group Chat**: Messages get broadcast to everyone connected to the chat
- **Auto-Recovery**: If a worker process crashes, it automatically restarts itself

## Tech Stack

Here's what I used to build this chat app:

- **Backend**: Node.js with Express.js for the server
- **Real-time Magic**: Socket.IO with cluster adapter for instant messaging
- **Scaling**: Node.js built-in cluster module to use multiple CPU cores
- **Smart Routing**: @socket.io/sticky keeps your session connected to the right worker
- **Process Management**: Automatically creates workers based on how many CPU cores you have

## Project Structure

Here's how I organized the files (still a work in progress!):

```
Chat-App/
├── chat-app/
│   ├── server.js          # The main server file that handles clustering
│   ├── package.json       # All the dependencies and scripts
│   └── package-lock.json  # Keeps dependency versions locked in
├── public/
│   └── index.html         # The chat interface that users see
└── README.md              # This file you're reading right now
```

## Getting Started

Ready to try out the chat app? Here's how to get it running:

1. **Navigate to the project folder:**
   ```bash
   cd chat-app
   ```

2. **Install all the required packages:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```
   *(You can also just run `server.js` directly in your favorite code editor like VS Code, VSCodium, etc.)*

4. **Open the chat app:**
   - Fire up your browser and head to `http://localhost:3000`
   - The server will automatically create worker processes based on your CPU cores

## How It All Works

Here is how it all works

1. **The Primary Process**: Manages all the worker processes and decides how to balance the load
2. **Worker Processes**: These are the ones actually handling your chat connections and processing messages
3. **Message Journey**: 
   - You type a message and hit send
   - It gets logged with which worker process handled it
   - Then it gets broadcast to everyone else in the chat
4. **Static Files**: All the HTML, CSS, and JavaScript files are served up from the `public` directory

## Dependencies

These are the dependencies needed for this project:

- `express`: The web framework that serves up static files and handles HTTP requests
- `socket.io`: Powers the real-time messaging - messages fly back and forth instantly
- `@socket.io/cluster-adapter`: Makes Socket.IO work with clustering (the magic behind scaling)
- `@socket.io/sticky`: Keeps your session connected to the right worker process
- `ioredis`: Redis client for cluster communication (if you need it for more advanced setups)

## Contributors

- **Mason R. Murphy**