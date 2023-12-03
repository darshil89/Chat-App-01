const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/public/index.html'));
});

// Socket.io
// whatever we got from the user to the server
io.on('connection', (socket) => {
    socket.on('user-message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(9000, () => {
  console.log('server running at http://localhost:9000');
});