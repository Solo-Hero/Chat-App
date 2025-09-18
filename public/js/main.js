// Connect to the Socket.IO server
const socket = io();

// Create the HTML structure for chat messages
function generateMessageHTML(username, timestamp, message) {

    let formattedTimestamp;
    
    if (new Date().toLocaleDateString() === new Date(timestamp).toLocaleDateString()) {
        // Same day, include only time
        formattedTimestamp = new Date(timestamp).toLocaleTimeString();
    } else {
        // Not the same day, include date and time
        formattedTimestamp = new Date(timestamp).toLocaleString();
    }

    const html = `
    <div class="flex space-x-2 pl-2 pt-2">
      <div class="flex-shrink-0">
        <div class="h-10 w-10 rounded-full bg-indigo-400 flex items-center justify-center font-bold text-white">
            ${username.charAt(0).toUpperCase()}
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-baseline space-x-2">
          <div class="font-bold">
            ${username.charAt(0).toUpperCase() + username.slice(1)}
          </div>
          <div class="text-sm text-gray-400">
            ${formattedTimestamp}
          </div>
        </div>

        <div class="text-sm text-gray-500">
            ${message}
        </div>
      </div>
    </div>
    `
    
    return html;
}

// Listen for incoming messages from the server
socket.on("message", function(data) {

    const html = generateMessageHTML(data.username, data.timestamp, data.message);
    const element = document.createElement("li");
    element.innerHTML = html;
    document.getElementById("chat-messages").appendChild(element);

});

// Function to send a message (used by both button click and Enter key)
function sendMessage() {

    const message = document.getElementById("message").value.trim();
    
    // Only send if there's actually a message
    if (message) {
        socket.emit("message", {
            username: "david",
            message: message,
            timestamp: new Date()
        });
        
        document.getElementById("message").value = "";
    }

}

// Handle send button clicks to send messages
document.getElementById("send-message").addEventListener("click", sendMessage);

// Handle Enter key press in the textarea to send messages
document.getElementById("message").addEventListener("keydown", function(event) {

    // Check if Enter key was pressed (without Shift)
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent adding a new line
        sendMessage();
    }

});