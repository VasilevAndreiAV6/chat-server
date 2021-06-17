const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let messages = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    if (JSON.parse(msg).name != "" || JSON.parse(msg).message != "") {
      messages.push(JSON.parse(msg));
      console.log('message: ' + JSON.stringify(messages));
    }
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', JSON.stringify(messages));
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
server.listen(port, () => {
  console.log('listening on:' + port);
});
