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

io.on('connect', (socket) => {
  console.log('User connected');
  io.emit('playersUpdate', backendPlayers);

  socket.on('newPlayer', (player) => {
    player.id = socket.id;
    backendPlayers[player.id] = player;
    console.log(backendPlayers);
    io.emit('playersUpdate', backendPlayers);
  });

  socket.on('playerMove', (keys) => {
    if (!backendPlayers[socket.id]) return;
    const player = backendPlayers[socket.id];
    if(keys.match(/a/i)) {
      player.x -= PLAYER_SPEED;
    } 
    if(keys.match(/d/i)) {
      player.x += PLAYER_SPEED;
    }
    if(keys.match(/s/i)) {
      player.y += PLAYER_SPEED;
    } 
    if(keys.match(/w/i)) {
      player.y -= PLAYER_SPEED;
    }
    io.emit('playerMoved', player);
  });

  socket.on('connectToRoom', () => {
    socket.join('room1');
    console.log('hello');
    io.to('room1').emit('connectionToRoom');
  });

  socket.on('disconnect', () => {
    delete backendPlayers[socket.id];
    console.log('I am here');
    console.log(backendPlayers);
    io.emit('playersUpdate');
  });
});

server.listen(PORT, () => {
  console.log(`Server listen on PORT: ${PORT}`);
});