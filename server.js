const express = require("express");
const app = express();

app.use(express.static("public")); // Serve static files from 'public' folder

const expressServer = app.listen(8080, () => {
    console.log("Server running at http://192:168:1:47:8080");
});

const arr=[
  
    {
          "name":"Cabbage",
          "url":"https://www.freepngimg.com/thumb/categories/2970.png"
      }
      ];


const socketio = require("socket.io");
const io = socketio(expressServer);

let users = [];

io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    // Send the current users (optional)
    socket.emit("welcome", users.map(s => s.user));

    socket.on("add", (user) => {
        socket.user = user;
        users.push(socket);

        if (users.length < 2) {
            socket.emit("wait", "Waiting for an opponent...");
        } else {
            // Matchmaking: take first two users from the queue
            const p1 = users.shift();
            const p2 = users.shift();

            console.log(`Match Found: ${p1.user} vs ${p2.user}`);

            p1.emit("match_found", p2.user );
            p2.emit("match_found",p1.user );
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.user}`);

        // Remove from users queue if still in
        users = users.filter(s => s !== socket);
    });
});
