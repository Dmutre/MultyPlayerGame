'use strict';

const arena = document.querySelector('.arena');
const start = document.getElementsByClassName('start')[0];
const socket = io();

const players = {};
let currentKey;

socket.on('playersUpdate', (backendPlayers) => {
  for(const backendPlayer of Object.values(backendPlayers)) {
    if(!players[backendPlayer.id]) {
      const newPlayer = new Enemy(backendPlayer);
      players[backendPlayer.id] = newPlayer;
      arena.appendChild(newPlayer.draw());
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

window.addEventListener('keydown', (event) => {
  currentKey = event.key;
});

window.addEventListener('keyup', (event) => {
  currentKey = null;
});

setInterval(() => {
  if(currentKey) {
    socket.emit('playerMove', currentKey);
  }
}, 15);

socket.on('playerMoved', (player) => {
  const localPlayer = document.getElementById(player.id);
  localPlayer.style.top = player.y + 'px';
  localPlayer.style.left = player.x + 'px';
});
