'use strict';
require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const io = new Server(server);

const backendPlayers = {};

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('newPlayer', (player) => {
    player.id = socket.id;
    backendPlayers[player.id] = player;
    console.log(backendPlayers);
    io.emit('playersUpdate', backendPlayers);
  });

  socket.on('keyDown', (players) => {
    console.log(players);
  })
});

server.listen(PORT, () => {
  console.log(`Server listen on PORT: ${PORT}`);
});