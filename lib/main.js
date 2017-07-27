const PlayGame = require('./game.js');

document.addEventListener("DOMContentLoaded", () => {
  const myCanvas = document.getElementById("canvas");
  myCanvas.width = 600;
  myCanvas.height = 400;
  const ctx = myCanvas.getContext('2d');
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, 600, 400);
  const game = new PlayGame(ctx);
  game.startGame();
})
