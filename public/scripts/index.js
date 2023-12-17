'use strict';

const arena = document.querySelector('.arena');
const start = document.getElementsByClassName('start')[0];
const socket = io();

const players = {};

socket.on('playersUpdate', (backendPlayers) => {
  for(const backendPlayer of Object.values(backendPlayers)) {
    console.log('I add new player');
    if(!players[backendPlayer.id]) {
      const player = new Player(backendPlayer.name);
      player.id = backendPlayer.id;
      players[backendPlayer.id] = player;
      arena.appendChild(player.draw());
    }
  }
  console.log(players);
});

function newPlayer() {
  const input = document.getElementById("playerName");
  start.style.display = 'none';
  const player = new Player(input.value)
  socket.emit('newPlayer', player);
}