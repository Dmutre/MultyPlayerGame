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
const PLAYER_SPEED = 5;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

io.on('connection', (socket) => {
  console.log('User connected');
  io.emit('playersUpdate', backendPlayers);

  socket.on('newPlayer', (player) => {
    player.id = socket.id;
    backendPlayers[player.id] = player;
    console.log(backendPlayers);
    io.emit('playersUpdate', backendPlayers);
  });

  socket.on('playerMove', (key) => {
    if (!backendPlayers[socket.id]) return;
    const player = backendPlayers[socket.id];
    if(key === 'A' || key === 'a') {
      player.x -= PLAYER_SPEED;
    } else if(key === 'd' || key === 'D') {
      player.x += PLAYER_SPEED;
    } else if(key === 's' || key === 'S') {
      player.y += PLAYER_SPEED;
    } else if(key === 'w' || key === 'W') {
      player.y -= PLAYER_SPEED;
    }
    io.emit('playerMoved', player);
  });
});

server.listen(PORT, () => {
  console.log(`Server listen on PORT: ${PORT}`);
});