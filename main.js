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

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

server.listen(PORT, () => {
  console.log(`Server listen on PORT: ${PORT}`);
});